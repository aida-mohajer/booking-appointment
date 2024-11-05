import { Request } from "express";
import { Pagination } from "../middlewares/pagination";
import { Search } from "../middlewares/search";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
      };
      pagination?: Pagination;
      search?: Search;
    }
  }
}
