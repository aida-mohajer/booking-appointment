import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

// Custom decorator to validate a datetime string in the format 'YYYY-MM-DD'
export function IsCustomDateString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isCustomDateString",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Regex to match "YYYY-MM-DD" format
          const dateTimeRegex = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?$/;
          if (typeof value !== "string" || !dateTimeRegex.test(value)) {
            return false;
          }

          const [datePart, timePart] = value.split(" ");
          const [year, month, day] = datePart.split("-").map(Number);

          // Ensure the date is valid
          const date = new Date(year, month - 1, day);
          return !isNaN(date.getTime());
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in the format YYYY-MM-DD`;
        },
      },
    });
  };
}
