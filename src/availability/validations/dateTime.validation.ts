import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

//this middleware is used in create availablibity dto
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
          if (typeof value === "string" && dateTimeRegex.test(value)) {
            const [datePart, timePart] = value.split(" ");
            const [year, month, day] = datePart.split("-").map(Number);
            const [hours, minutes] = timePart.split(":").map(Number);
            const date = new Date(year, month - 1, day, hours, minutes);

            if (isNaN(date.getTime())) {
              return false;
            }

            if (month < 1 || month > 12) {
              return false; // Invalid month
            }
            const daysInMonth = new Date(year, month, 0).getDate();
            if (day < 1 || day > daysInMonth) {
              return false; // Invalid day
            }

            if (hours < 0 || hours > 23) {
              return false; // Invalid hours
            }
            if (minutes < 0 || minutes > 59) {
              return false; // Invalid minutes
            }

            // If all checks pass, the date is valid
            return true;
          }

          return false; // Format doesn't match
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in the format YYYY-MM-DD HH:MM`;
        },
      },
    });
  };
}
