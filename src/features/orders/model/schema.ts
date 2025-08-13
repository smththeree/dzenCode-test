import { z } from "zod";

export const OrderSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required and must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description is required and must be at least 3 characters"),
});

export type OrderSchemaType = z.infer<typeof OrderSchema>;
