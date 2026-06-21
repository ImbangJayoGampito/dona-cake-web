// pages/transaksi/PayOrderPage.tsx

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TransaksiService } from '@/services/transaksi-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, Upload } from 'lucide-react'

export default function PayOrderPage() {
  const { id } = useParams<{ id: string }>()
  const pesananId = parseInt(id || '0')
  const [isLoading, setIsLoading] = useState(false)
  const [metodePembayaran, setMetodePembayaran] = useState<'transfer_bank' | 'e_wallet' | 'cash_on_delivery' | 'credit_card'>('transfer_bank')
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
      if (!validTypes.includes(selectedFile.type)) {
        setError('File harus berupa gambar (JPEG, PNG, JPG, WEBP)')
        return
      }

      if (selectedFile.size > 2 * 1024 * 1024) { // 2MB
        setError('Ukuran file maksimal 2MB')
        return
      }

      setFile(selectedFile)
      setFilePreview(URL.createObjectURL(selectedFile))
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError('Silakan unggah bukti pembayaran')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await TransaksiService.payOrder(pesananId, {
        metode_pembayaran: metodePembayaran,
        file: file
      })

      if (response.status === 'success') {
        alert('Pembayaran berhasil dikirim. Menunggu konfirmasi dari staff.')
        navigate(`/pesanan/${pesananId}/success`)
      } else {
        setError(response.message || 'Gagal memproses pembayaran')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setError('Terjadi kesalahan saat memproses pembayaran')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Pembayaran Pesanan #{pesanan.id}</CardTitle>
            <CardDescription>
              Unggah bukti pembayaran untuk pesanan Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Detail Pesanan</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ID Pesanan:</span>
                    <span className="font-bold">#{pesananId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-bold">Menunggu Pembayaran</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metode_pembayaran">Metode Pembayaran</Label>
                  <Select
                    value={metodePembayaran}
                    onValueChange={(value) => setMetodePembayaran(value as any)}
                  >
                    <SelectTrigger id="metode_pembayaran">
                      <SelectValue placeholder="Pilih metode pembayaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transfer_bank">Transfer Bank</SelectItem>
                      <SelectItem value="e_wallet">E-Wallet</SelectItem>
                      <SelectItem value="credit_card">Kartu Kredit</SelectItem>
                      <SelectItem value="cash_on_delivery">Bayar di Tempat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bukti_pembayaran">Bukti Pembayaran</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      id="bukti_pembayaran"
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="bukti_pembayaran" className="cursor-pointer">
                      {filePreview ? (
                        <div className="space-y-4">
                          <img
                            src={filePreview}
                            alt="Preview bukti pembayaran"
                            className="max-w-full h-auto max-h-64 mx-auto rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setFile(null)
                              setFilePreview(null)
                            }}
                          >
                            Ganti File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            Klik untuk mengunggah bukti pembayaran
                          </p>
                          <p className="text-xs text-gray-400">
                            Format: JPEG, PNG, JPG, WEBP | Maks: 2MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button type="submit" disabled={isLoading || !file}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      'Kirim Pembayaran'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}