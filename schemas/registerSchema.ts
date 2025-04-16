import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  username: z.string().min(3, "3 characters minimum"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  profilePicUrl: z.string().url("Must be a valid URL"),
  password: z.string().min(6, "6 characters minimum"),
});
