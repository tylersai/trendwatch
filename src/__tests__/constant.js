import {API_END_POINT, POSTER_PATH, minsToString} from "../utils/constant";

it("api end point", () => {
  expect(API_END_POINT);
});

it("poster path", () => {
  expect(POSTER_PATH);
});

it("fn: mins to Hrs string", () => {
  expect(minsToString(90)).toEqual("01:30 Hrs");
  expect(minsToString(122)).toEqual("02:02 Hrs");
  expect(minsToString(120)).toEqual("02:00 Hrs");
});