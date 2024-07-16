import moment from "moment/moment.js";
import { headers } from "../constant/constant.js";

const convertRating = (rating) => {
  let ratings = rating.split(":");
  let ratingName = ratings[0];
  let ratingVal = parseInt(ratings[1].trim());

  if (ratingName == "Robinson") {
    return ratingVal * 5;
  }
  return ratingVal;
};

const getWine = (row) => {
  let wine = {};
  row.forEach((v, i) => {
    wine[headers[i]] = v.trim();
  });
  wine.convertedRating = convertRating(wine.rating);
  wine.entrydate = moment();
  return wine;
};

const sortWine = (wines) =>
  wines.sort((a, b) => b.convertedRating - a.convertedRating);

export { convertRating, getWine, sortWine };
