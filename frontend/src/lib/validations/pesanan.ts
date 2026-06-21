
import { z } from "zod"
import { PesananStatus } from "@/types/enums"


const validStatuses = Object.values(PesananStatus) as [string, ...string[]]

export const itemPesananSchema = z.object({
  produk_id: z.number().int().positive(),
  kuantitas: z.number().int().min(1),
  catatan: z.string().max(500).optional(),
})

export const createPesananSchema = z.object({
  items: z.array(itemPesananSchema).min(1, "Minimal 1 item"),
})

export const updatePesananSchema = z.object({
  status_pesanan: z.enum(validStatuses).optional(),
  total_harga: z.number().min(0).optional(),
})


export const pesananSchema = z.union([createPesananSchema, updatePesananSchema])
