import bcrypt from "bcryptjs"
import { errorMonitor } from "events";

async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error("Error while hashing the password")
  }
}

async function comparePassword(password: string, hashedPassword: string) {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (err) {
    throw new Error("Error while comparing the password");
  }
}

export { hashPassword, comparePassword }