const { Console } = require("console");
const fs = require("fs");
const parser = require("xml-js");

fs.readFile("/users/shreeteshm/Desktop/test.xml", "utf-8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
    return;
  }

  const jsonData = JSON.parse(
    parser.xml2json(data, { compact: true, spaces: 4 })
  );

  let read = 0,
    write = 0,
    count = 0;

  jsonData.testResults.httpSample.forEach((value, ind) => {
    try {
      if (value.requestHeader._text.includes("localhost:5011")) {
        read++;
      } else if (value.requestHeader._text.includes("localhost:5012")) {
        write++;
      }
    } catch (err) {
      count++;
    }
  });
  console.log("Read:", read);
  console.log("Write:", write);
  console.log("Errors:", count);
});
