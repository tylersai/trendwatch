export const API_END_POINT = process.env.REACT_APP_API_END_POINT;
export const POSTER_PATH = process.env.REACT_APP_POSTER_PATH;

export const minsToString = (runtime) => "0" + parseInt(runtime/60) + ":" + 
  ((runtime%60) < 10 ? "0"+(runtime%60):(runtime%60)) + " Hrs";