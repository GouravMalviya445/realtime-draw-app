import { requestHandler, ApiError, ApiResponse } from "@repo/be-common/src/utils";
import { userSignupValidation } from "../schemas/userSignupValidation";
import { userSigninValidation } from "../schemas/userSigninValidation";

const userSignup = requestHandler(async (req, res) => {
  const {success, data, error} = userSignupValidation.safeParse(req.body);
  if (!success) {
    throw new ApiError(400, "Invalid Inputs", error.errors, error.stack)
  }

  try {
    // db calls  
  } catch (error: any) {
    throw new ApiError(500, "Error while registering user", [], error.stack)
  }
})

const userSignin = requestHandler(async (req, res) => {
  
  const {success, data, error} = userSigninValidation.safeParse(req.body);
  if (!success) {
    throw new ApiError(400, "Invalid Inputs", error.errors, error.stack)
  }

  try {
    // db calls
  } catch (error: any) {
    throw new ApiError(500, "Error while signing in user", [], error.stack)
  }
})

export {
  userSignup,
  userSignin
}