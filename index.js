const fs = require("fs");
const parser = require("xml2json");

fs.readFile("/users/shreeteshm/Desktop/test.xml", "utf-8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
    return;
  }

  const jsonData = JSON.parse(parser.toJson(data));
  let innerData,
    avgTime = 0;
  jsonData.testResults.httpSample.forEach((value, ind) => {
    innerData = JSON.parse(value.responseData["$t"]).data;
    avgTime += parseInt(innerData.hero.queryTime);
  });
  console.log(
    "Average time:",
    avgTime / jsonData.testResults.httpSample.length
  );
});
