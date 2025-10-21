import moment from "moment";
export const fmt = (d) => moment(d).format("YYYY-MM-DD");
export const monthDay = (d) => moment(d).format("MMM D");
