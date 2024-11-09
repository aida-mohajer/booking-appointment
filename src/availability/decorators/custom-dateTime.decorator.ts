import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsCustomDateTimeString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isCustomDateTimeString",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Regex to match "YYYY-MM-DD HH:MM" format
          const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
          if (typeof value !== "string" || !dateTimeRegex.test(value)) {
            return false;
          }

          const [datePart, timePart] = value.split(" ");
          const [year, month, day] = datePart.split("-").map(Number);
          const [hours, minutes] = timePart.split(":").map(Number);

          const date = new Date(year, month - 1, day, hours, minutes);
          return (
            !isNaN(date.getTime()) && // Date is valid
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day &&
            date.getHours() === hours &&
            date.getMinutes() === minutes
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in the format YYYY-MM-DD HH:MM`;
        },
      },
    });
  };
}
