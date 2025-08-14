import { z } from "zod";

export const OrderSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required and must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description is required and must be at least 3 characters"),
});

export const ProductSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required and must be at least 3 characters"),
  serialNumber: z
    .string()
    .min(3, "Serial number is required and must be at least 3 characters"),
  isNew: z.string(),
  type: z.string().min(3, "Type is required and must be at least 3 characters"),
  specification: z
    .string()
    .min(3, "Specification is required and must be at least 3 characters"),
  price: z.object({
    value: z.string(),
    symbol: z.string(),
    isDefault: z.boolean(),
  }),
  guarantee: z.object({
    start: z.date(),
    end: z.date(),
  }),
});

export type OrderSchemaType = z.infer<typeof OrderSchema>;
export type ProductSchemaType = z.infer<typeof ProductSchema>;
