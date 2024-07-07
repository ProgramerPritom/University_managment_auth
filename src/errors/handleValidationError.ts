import mongoose from "mongoose"
import { IGenericError } from "../app/interfaces/error"
const handleValidationError = (err: mongoose.Error.ValidationError): IGenericError[] => {
    const errors: IGenericError[] = Object.values(err.errors).map((el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      if (el instanceof mongoose.Error.ValidatorError || el instanceof mongoose.Error.CastError) {
        return {
          path: el.path,
          message: el.message,
        };
      }
      return { path: 'unknown', message: 'Unknown error' }; // Default case if type doesn't match
    });

    const statusCode = 400;
    return errors;
  };
  
  export default handleValidationError;