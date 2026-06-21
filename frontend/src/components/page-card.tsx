// components/PaginatedCardList.tsx
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ApiResponse from "@/lib/api/api-response"
import type { PaginationMeta } from "@/types/pagination.types"

interface PaginatedCardListProps<T> {
  apiUrl: string // endpoint (e.g. "/api/posts")
  renderItem: (item: T, index: number) => React.ReactNode // 👈 function that produces components
  itemsPerPage?: number
  emptyMessage?: string
}
export default function PaginatedCardGrid<T>({
  apiUrl,
  renderItem,
  itemsPerPage = 6,
  emptyMessage = "No items to display",
}: PaginatedCardListProps<T>) {
  const [data, setData] = useState<T[]>([])
  const [pagination, setPagination] = useState<PaginationMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchPage = async (page: number) => {
    setLoading(true)
    setError(null)

    try {
      // Example API endpoint with pagination
      const url = new URL(apiUrl, window.location.origin)
      url.searchParams.set("page", page.toString())
      url.searchParams.set("limit", itemsPerPage.toString())
      const res = await fetch(url.toString())
      const json = await res.json()

      // Use your ApiResponse class to parse the response
      const apiResponse = ApiResponse.fromApiArray<T[]>(json)

      if (apiResponse.isSuccess()) {
        setData(apiResponse.data as T[])
        setPagination(apiResponse.pagination || null)
      } else {
        setError(apiResponse.message || "Failed to load data")
      }
    } catch (err) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPage(currentPage)
  }, [currentPage])
  const hasPrev = pagination ? pagination.current_page > 1 : false
  const hasNext = pagination
    ? pagination.current_page < pagination.last_page
    : false
  const handlePrev = () => {
    if (hasPrev) setCurrentPage((p) => p - 1)
  }

  const handleNext = () => {
    if (hasNext) setCurrentPage((p) => p + 1)
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  if (error) {
    return (
      <Card className="w-full border-red-500">
        <CardContent className="p-4 text-red-600">Error: {error}</CardContent>
      </Card>
    )
  }
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, idx) => renderItem(item, idx))}
      </div>

      {/* Pagination Controls */}
      {pagination && (
        <div className="flex items-center justify-between px-4 py-2">
          <Button variant="outline" onClick={handlePrev} disabled={!hasPrev}>
            Previous
          </Button>
          <span className="text-sm">
            Page {pagination.current_page} of {pagination.last_page} (
            {pagination.total} total)
          </span>
          <Button variant="outline" onClick={handleNext} disabled={!hasNext}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
