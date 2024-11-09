import { Request } from "express";
import { Pagination } from "./middlewares/pagination";
import { Search } from "./middlewares/search";
import { Role } from "./enum/role.enum";

export interface CustomRequest extends Request {
  user?: {
    id: number;
    // role: Role;
    role: string;
  };
  pagination?: Pagination;
  search?: Search;
  dateQuery?: {
    year?: number;
    month?: number;
    day?: number;
  };
}
