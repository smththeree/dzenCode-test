import { z } from "zod";

export const AuthSchema = z.object({
  username: z
    .string()
    .min(3, "Username is required and must be at least 3 characters"),
  password: z
    .string()
    .min(5, "Password is required and must be at least 5 characters"),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
