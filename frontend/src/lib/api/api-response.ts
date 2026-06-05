import type { PaginationMeta } from "@/types/pagination.types"

export default class ApiResponse<T> {
  status: "success" | "error"
  data?: T
  pagination?: PaginationMeta
  message?: string
  errors?: Record<string, string[]>
  constructor(
    data?: T,
    status: "success" | "error" = "success",
    pagination?: PaginationMeta,
    message?: string,
    errors?: Record<string, string[]>
  ) {
    this.status = status
    this.data = data
    this.pagination = pagination
    this.message = message
    this.errors = errors
  }
  static fromApiSingle<U>(
    response: any,
    itemMapper?: (item: any) => U
  ): ApiResponse<U> {
    const status = response.status ?? "success"
    const data = response.data ?? response
    const pagination = response.pagination
    const message = response.message
    const errors = response.errors

    let mappedData: U
    if (itemMapper && !Array.isArray(data)) {
      mappedData = itemMapper(data)
    } else {
      mappedData = data as U
    }

    return new ApiResponse<U>(mappedData, status, pagination, message, errors)
  }
  static fromApiArray<U>(
    response: any,
    itemMapper?: (item: any) => U
  ): ApiResponse<U[]> {
    const status = response.status ?? "success"
    const data = response.data ?? response
    const pagination = response.pagination
    const message = response.message
    const errors = response.errors

    let mappedData: U[]
    if (itemMapper && Array.isArray(data)) {
      mappedData = data.map(itemMapper)
    } else if (itemMapper && !Array.isArray(data)) {
      mappedData = [itemMapper(data)]
    } else {
      mappedData = data
    }

    return new ApiResponse<U[]>(mappedData, status, pagination, message, errors)
  }

  isSuccess(): boolean {
    return this.status === "success"
  }

  isError(): boolean {
    return this.status === "error"
  }
}
