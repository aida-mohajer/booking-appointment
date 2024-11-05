import { Request } from "express";
import { Pagination } from "./middlewares/pagination";
import { Search } from "./middlewares/search";

// interface DateQueryParamsBase {
//   year: number;
//   day?: number;
// }

// interface DateQueryParamsWithMonth extends DateQueryParamsBase {
//   month: number;
// }

// interface DateQueryParamsWithoutMonth extends DateQueryParamsBase {
//   month?: number;
// }

// // You can then use these types in your requests
// type DateQueryParams = DateQueryParamsWithMonth | DateQueryParamsWithoutMonth;

export interface CustomRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
  pagination?: Pagination;
  search?: Search;
  dateQuery?: {
    year?: number;
    month?: number;
    day?: number;
  };
  // dateQuery?: DateQueryParams;
}
