import { requestHandler, ApiError, ApiResponse } from "@repo/be-common/src/utils";
import { userSignupValidation, userSigninValidation } from "@repo/common/src/types";
import { prisma } from "@repo/db/prisma";


// Register user 
const userSignup = requestHandler(async (req, res) => {
  
  const {success, data, error} = userSignupValidation.safeParse(req.body);
  if (!success) {
    throw new ApiError(400, "Invalid Inputs", error.errors, error.stack)
  }

  try {
    // check user already exist or not
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    if (existingUser) {
      throw new ApiError(400, "User already exist with this email");
    }

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      },
      select: {
        name: true,
        email: true,
        id: true,
        avatarUrl: true,
        createdAt: true,
      }
    });
    if (!newUser?.id) {
      throw new ApiError(500, "Error while creating user");
    }

    return res
      .status(201)
      .json(new ApiResponse(
        201, 
        "User Registered Successfully",
        { user: newUser }
      ))
    
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