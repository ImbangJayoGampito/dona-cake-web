import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Mail,
  ArrowRight,
} from "lucide-react"
import { Pesanan } from "@/models/pesanan.model"
interface WhatsAppButtonProps {
  pesanan: Pesanan
  beginningMessage?: string
}
export default function WhatsAppButton({
  pesanan,
  beginningMessage,
}: WhatsAppButtonProps) {
  const whatsappPhone = "6281819200000" // Format: country code + number without +

  // Generate WhatsApp URL with optional message
  const generateWhatsAppUrl = () => {
    const message = `Halo, saya ingin bertanya tentang pesanan dengan ID: ${pesanan?.id || ""}
      ${beginningMessage ? `\n\n${beginningMessage}` : ""}`
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`
  }

  // Open WhatsApp in new tab
  const handleWhatsAppClick = () => {
    window.open(generateWhatsAppUrl(), "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="gap-2 bg-green-500 text-white hover:bg-green-600"
    >
      <MessageCircle className="h-4 w-4" />
      <span>Chat via WhatsApp</span>
    </Button>
  )
}
