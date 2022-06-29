const fs = require("fs");
const parser = require("xml2json");

fs.readFile("/users/shreeteshm/Downloads/c4r1.xml", "utf-8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
    return;
  }
  console.log("Running...");
  const jsonData = JSON.parse(parser.toJson(data));
  let innerData,
    avgTime = 0,
    count = 0;
  jsonData.testResults.httpSample.forEach((value, ind) => {
    try {
      innerData = JSON.parse(value.responseData["$t"]).data;
      count++;
      if (parseInt(innerData.hero.queryTime) < 1) {
        avgTime += 1;
      } else {
        avgTime += parseInt(innerData.hero.queryTime);
      }
    } catch (err) {}
  });
  console.log("Average time:", avgTime / count);
  console.log(count);
});
