import { describe } from "mocha";
import { convertRating, getWine, sortWine } from "./util.js";
import { expect } from "chai";
import { headers } from "../constant/constant.js";

describe("convert rating", () => {
  it("convert robison rating", () => {
    const rating = "Robinson: 10";
    const res = convertRating(rating);
    const expected = 50;
    expect(expected).to.equal(res);
  });

  it("convert parker rating", () => {
    const rating = "Parker: 90";
    const res = convertRating(rating);
    const expected = 90;
    expect(expected).to.equal(res);
  });
});

describe("get wine", () => {
  it("get wine completely", () => {
    const row = [
      "1290",
      "Baron De Rothschild",
      "Chile",
      "Chardonnay",
      "2019",
      "Valle Central",
      "Parker: 94",
    ];

    const wine = getWine(row);
    row.forEach((v, i) => {
      expect(v).to.equal(wine[headers[i]]);
    });
    expect(94).to.equal(wine.convertedRating);
  });
});

describe("sort wine", () => {
  it("sort correctly", () => {
    const wines = [
      {
        convertedRating: 40,
      },
      {
        convertedRating: 60,
      },
    ];

    const res = sortWine(wines);
    const expected = [
      {
        convertedRating: 60,
      },
      {
        convertedRating: 40,
      },
    ];
    expect(expected).to.deep.equal(res);
  });
});
