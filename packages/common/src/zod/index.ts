import { z } from "zod";


export const userSignupValidation = z.object({
  email: z.string().email(),
  name: z.string().min(3, {message: "First name must be at least 3 characters long"}),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

export const userSigninValidation = z.object({
	email: z.string().email(),
	password: z.string().min(6, {message: "password must be at least 6 character long"})
});

export const createRoomValidation = z.object({
  name: z.string().toLowerCase().trim().min(3, { message: "name is to short" }).max(255, { message: "name is too long" })
})

