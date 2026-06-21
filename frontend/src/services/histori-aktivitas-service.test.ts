import { describe, it, expect, vi } from "vitest"
import HistoriAktivitasService from "./histori-aktivitas-service"
import { Produk } from "@/models/produk.model"
import { AktivitasJenis } from "@/types/enums"
import ApiResponse from "@/lib/api/api-response"
import api from "@/lib/api/config"

// Mock the API
vi.mock("@/lib/api/config", () => ({
  default: {
    post: vi.fn(),
  },
}))

describe("HistoriAktivitasService", () => {
  const mockProduk = new Produk({
    id: 1,
    nama_produk: "Test Product",
    harga: 100000,
    stok: 10,
  })

  const mockSuccessResponse = {
    data: {
      data: { id: 1, jenis_aktivitas: "view_product", produk_terkait: 1 },
      message: "Activity created successfully",
      status: "success",
    },
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe("createSingle", () => {
    it("should create a single activity record", async () => {
      // Mock successful API response
      vi.mocked(api.post).mockResolvedValue(mockSuccessResponse)

      const result = await HistoriAktivitasService.createSingle(
        mockProduk,
        AktivitasJenis.VIEW_PRODUCT
      )

      expect(api.post).toHaveBeenCalledWith(
        "/aktivitas",
        {
          jenis_aktivitas: "view_product",
          produk_terkait: 1,
        }
      )
      expect(result.isSuccess()).toBe(true)
      expect(result.data).toEqual(mockSuccessResponse.data.data)
    })

    it("should handle API errors", async () => {
      const mockError = new Error("Network error")
      vi.mocked(api.post).mockRejectedValue(mockError)

      const result = await HistoriAktivitasService.createSingle(
        mockProduk,
        AktivitasJenis.VIEW_PRODUCT
      )

      expect(result.isSuccess()).toBe(false)
      expect(result.message).toContain("Network error")
    })
  })

  describe("createMultiples", () => {
    it("should create multiple activity records", async () => {
      vi.mocked(api.post).mockResolvedValue(mockSuccessResponse)

      const result = await HistoriAktivitasService.createMultiples(
        mockProduk,
        AktivitasJenis.ORDER
      )

      expect(api.post).toHaveBeenCalledWith(
        "/aktivitas/batch",
        {
          aktivitas: [
            {
              jenis_aktivitas: "order",
              produk_terkait: 1,
            },
          ],
        }
      )
      expect(result.isSuccess()).toBe(true)
    })
  })

  describe("createBatchActivities", () => {
    it("should create batch activities for multiple products", async () => {
      const mockProduk2 = new Produk({
        id: 2,
        nama_produk: "Test Product 2",
        harga: 200000,
        stok: 5,
      })

      vi.mocked(api.post).mockResolvedValue(mockSuccessResponse)

      const result = await HistoriAktivitasService.createBatchActivities([
        { produk: mockProduk, jenisAktivitas: AktivitasJenis.VIEW_PRODUCT },
        { produk: mockProduk2, jenisAktivitas: AktivitasJenis.ORDER },
      ])

      expect(api.post).toHaveBeenCalledWith(
        "/aktivitas/batch",
        {
          aktivitas: [
            {
              jenis_aktivitas: "view_product",
              produk_terkait: 1,
            },
            {
              jenis_aktivitas: "order",
              produk_terkait: 2,
            },
          ],
        }
      )
      expect(result.isSuccess()).toBe(true)
    })
  })
})