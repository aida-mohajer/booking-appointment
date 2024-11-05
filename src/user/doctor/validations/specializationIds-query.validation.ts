// import { Request, Response, NextFunction } from "express";

// export const validateQuerySpecializationIds = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const specializationIds = req.query.specializationIds;
//   if (specializationIds) {
//     if (!specializationIds || typeof specializationIds !== "string") {
//       return res.status(400).json({
//         error:
//           "Invalid input. Please provide a comma-separated in the 'ids' query parameter.",
//       });
//     }

//     const idsArray = specializationIds.split(",");

//     const id = Number(id);

//     const invalidIds = idsArray.filter((id) => !id.test(id.trim()));

//     if (invalidIds.length > 0) {
//       return res.status(400).json({
//         error:
//           "Invalid id format for the following ids: " + invalidIds.join(", "),
//       });
//     }
//   }
//   next();
// };
