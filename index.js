const fs = require("fs");

try {
  const data = fs.readFileSync("./service.js", "utf8");
  cleanCode(data);
} catch (err) {
  console.error(err);
}

function cleanCode(data) {
  data = data.split("\n");
  for (let i = 0; i < data.length; i++) {
    data[i] = data[i].replace(/(\r\n|\n|\r|\s)/gm, "");
  }
  main(data);
}

function countLines(data) {
  let validLines = 0;
  let insideComment = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].startsWith("/*")) {
      insideComment = true;
    } else if (insideComment && data[i].includes("*/")) {
      insideComment = false;
    } else if (
      !insideComment &&
      !(data[i].startsWith("//") || data[i] == "" || data[i].startsWith("*"))
    ) {
      validLines++;
    }
  }
  return validLines;
}

function main(data) {
  return console.log("The number of valid lines of code is:", countLines(data));
}
