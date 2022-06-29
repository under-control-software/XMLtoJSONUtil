const { Console } = require("console");
const fs = require("fs");
const parser = require("xml-js");

fs.readFile("C:\\Users\\mohit\\Downloads\\c4r4.xml", "utf-8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
    return;
  }

  const jsonData = JSON.parse(parser.xml2json(data, {compact: true, spaces: 4}));
  let innerData, avgTime = 0, count = 0;
  console.log("Start Reading");
  let time = [];
  jsonData.testResults.httpSample.forEach((value, ind) => {
    try {
      innerData = JSON.parse(value.responseData["_text"]).data;
      count++;
      if (parseInt(innerData.hero.queryTime) < 1) {
        avgTime += 1;
      } else {
        avgTime += parseInt(innerData.hero.queryTime);
      }
      time.push(parseInt(innerData.hero.queryTime));
    } catch (err) {}
  });
  console.log("Average time:", avgTime / count);
  time.sort();
  const ind99 = Math.floor(0.99*count);
  console.log("99th Percentile time: ", time[ind99]);
});
