import { requestHandler, ApiError, ApiResponse } from "@repo/be-common/src/utils";
import { hashPassword, comparePassword, createJwtToken } from "@repo/be-common/src/lib";
import { userSignupValidation, userSigninValidation } from "@repo/common/zod";
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

    // create hash and store in DB
    const hashedPassword = await hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword
      },
      select: {
        name: true,
        email: true,
        id: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
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
    throw new ApiError(500, error.message || "Error while registering user", error?.errors || [], error.stack)
  }
})

const userSignin = requestHandler(async (req, res) => {
  const { success, data, error } = userSigninValidation.safeParse(req.body);
  if (!success) {
    throw new ApiError(400, "Invalid Inputs", error.errors, error.stack)
  }

  try {
    // db calls
    
    const existedUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    if (!existedUser?.id) {
      throw new ApiError(404, "User not found with this email");
    }

    const isPasswordCorrect = await comparePassword(data.password, existedUser.password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Password is not correct");
    }
    
    const user = {
      id: existedUser.id,
      email: existedUser.email,
      name: existedUser.name,
      avatarUrl: existedUser.avatarUrl,
      createdAt: existedUser.createdAt
    }
    
    // create accessToken
    const accessToken = createJwtToken({ id: user.id });

    return res
      .status(200)
      .json(new ApiResponse(
        200,
        "User logged in Successfully",
        {
          user,
          accessToken
        }
      ))
    
  } catch (error: any) {
    throw new ApiError(500, error.message || "Error while signing in user", error?.errors || [], error.stack)
  }
})

const getCurrentUser = requestHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(
      200,
      "User fetched successfully",
      { user: req.user }
    ))
})

export {
  userSignup,
  userSignin,
  getCurrentUser,
}