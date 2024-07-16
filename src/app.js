import { createReadStream, createWriteStream } from "fs";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";
import { getWine, sortWine } from "./util/util.js";
import { outputHeaders } from "./constant/constant.js";

const generate = (inputPath, outputPath) => {
  let wines = [];

  createReadStream(inputPath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => wines.push(getWine(row)))
    .on("end", () => {
      wines = sortWine(wines);

      const writableStream = createWriteStream(outputPath);
      const stringifier = stringify({ header: true, columns: outputHeaders });
      wines.forEach((wine) =>
        stringifier.write([
          wine.country,
          wine.vineyard,
          wine.winery,
          wine.type,
          wine.vintage,
          wine.rating,
          wine.price,
          wine.entrydate.format("DD-MM-YYYY"),
        ])
      );
      stringifier.pipe(writableStream);
    })
    .on("error", (error) => {
      console.log(error.message);
    });
};

export default generate;
