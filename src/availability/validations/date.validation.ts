// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from "class-validator";

// @ValidatorConstraint({ name: "isDateValid", async: false })
// export class IsDateValidConstraint implements ValidatorConstraintInterface {
//   validate(dateString: string) {
//     const datePattern = /^\d{4}-\d{2}-\d{2}$/;
//     if (!datePattern.test(dateString)) return false;

//     // Parse the date parts
//     const [year, month, day] = dateString.split("-").map(Number);

//     // Check month and day range
//     if (month < 1 || month > 12) return false;

//     // Validate the day based on month and leap years
//     const daysInMonth = this.getDaysInMonth(month, year);
//     return day > 0 && day <= daysInMonth;
//   }

//   getDaysInMonth(month: number, year: number): number {
//     // Check for leap year in February
//     return new Date(year, month, 0).getDate();
//   }

//   defaultMessage() {
//     return "Invalid date. Please use the format YYYY-MM-DD and ensure the date is valid.";
//   }
// }

// // Custom decorator to use the constraint
// export function IsDateValid(validationOptions?: ValidationOptions) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsDateValidConstraint,
//     });
//   };
// }
