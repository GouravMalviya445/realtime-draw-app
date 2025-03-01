import { z } from "zod"; 

export const userSignupValidation = z.object({
  email: z.string().email(),
  firstName: z.string().min(3, {message: "First name must be at least 3 characters long"}),
  lastName: z.string().min(3, { message: "Last name must be at least 3 characters long" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})
