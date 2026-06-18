import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, ShoppingCart, Star, ChevronRight, Upload } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { AppHeader } from "@/components/layout/header"
import AppFooter from "@/components/layout/footer"
import { BreadCrumb } from "@/components/breadcrumb"
import { ProdukService } from "@/services/produk-service"
import { StarRating } from "@/components/produk/star_rating"
import { toast } from "sonner"
import { Produk } from "@/models/produk.model"
import { UlasanService } from "@/services/ulasan-service"
import { Ulasan } from "@/models/ulasan.model"
import { ProductCard } from "@/components/produk/produk-card"
import { Gambar } from "@/models/gambar.model"
import { Search } from "lucide-react"
import { MoreVertical, Paperclip, Send, Smile, Badge } from "lucide-react"
const CHAT_HISTORY = [
  {
    id: 1,
    title: "Recommendation",
    sub: "Rainbow Delight Cake...",
    time: "JUST NOW",
    active: true,
  },
  {
    id: 2,
    title: "Order #4521",
    sub: "Status of my strawberry tart...",
    time: "2H AGO",
  },
  {
    id: 3,
    title: "Anniversary Cake",
    sub: "Do you have tiered cakes?",
    time: "YESTERDAY",
  },
]

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: "ai",
    text: "Halo! Saya Dona, asisten virtual Dona Cake. Senang sekali bisa membantu Anda hari ini. Ada yang bisa saya bantu untuk merayakan momen spesial Anda?",
    chips: ["Lihat Menu", "Status Pesanan", "Custom Cake"],
  },
  {
    id: 2,
    from: "user",
    text: "Saya sedang mencari kue ulang tahun yang cantik dan unik untuk akhir pekan ini.",
  },
  {
    id: 3,
    from: "ai",
    text: "Berdasarkan preferensi Anda untuk sesuatu yang unik, saya sangat merekomendasikan **Rainbow Delight Cake** kami yang legendaris.",
    product: {
      name: "Rainbow Delight Cake",
      desc: "Perpaduan 4 lapisan spons lembut dengan krim vanilla madu dan dekorasi emas 24k yang",
      badge: "Best Seller",
      emoji: "🎂",
    },
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState("")

  const send = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "user", text: input },
    ])
    setInput("")
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "ai",
          text: "Tentu! Saya akan membantu Anda dengan itu. Ada pertanyaan lain?",
        },
      ])
    }, 800)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex max-h-[calc(100vh-56px)] flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex w-64 shrink-0 flex-col border-r border-border bg-background">
          <div className="space-y-3 p-4">
            <Button className="w-full gap-2 text-sm">
              <span className="text-base">+</span> New Chat
            </Button>
            <div className="relative">
              <Search
                size={13}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search chats..."
                className="h-8 pl-8 text-xs"
              />
            </div>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto px-2">
            {CHAT_HISTORY.map((c) => (
              <button
                key={c.id}
                className={`w-full rounded-lg px-3 py-3 text-left transition-colors ${c.active ? "bg-muted" : "hover:bg-muted/50"}`}
              >
                <div className="mb-0.5 flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${c.active ? "text-primary" : "text-foreground"}`}
                  >
                    {c.title}
                  </span>
                  <span className="text-[9px] text-muted-foreground">
                    {c.time}
                  </span>
                </div>
                <p className="truncate text-[11px] text-muted-foreground">
                  {c.sub}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-background px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-base">
                  🤖
                </div>
                <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Dona AI</p>
                <p className="text-[10px] font-medium text-green-500">Online</p>
              </div>
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <MoreVertical size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
              >
                {msg.from === "ai" && (
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-xs space-y-2 lg:max-w-md ${msg.from === "user" ? "flex flex-col items-end" : ""}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.from === "user" ? "rounded-tr-sm bg-primary text-primary-foreground" : "rounded-tl-sm border border-border bg-background text-foreground shadow-sm"}`}
                  >
                    {msg.text.replace(/\*\*/g, "")}
                  </div>
                  {msg.chips && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.chips.map((c) => (
                        <button
                          key={c}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.product && (
                    <Card className="max-w-xs overflow-hidden shadow-sm">
                      <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-primary/20 to-muted text-5xl">
                        {msg.product.emoji}
                        <Badge className="absolute top-2 right-2 bg-primary text-[9px] text-primary-foreground">
                          {msg.product.badge}
                        </Badge>
                      </div>
                      <CardContent className="space-y-2 p-3">
                        <p className="text-sm font-bold text-foreground">
                          {msg.product.name}
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {msg.product.desc}
                        </p>
                        <Button size="sm" className="w-full text-xs">
                          Lihat Detail
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border bg-background px-4 py-3">
            <div className="flex items-center gap-2">
              <button className="shrink-0 text-muted-foreground hover:text-foreground">
                <Paperclip size={18} />
              </button>
              <button className="shrink-0 text-muted-foreground hover:text-foreground">
                <Smile size={18} />
              </button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Tulis pesan untuk Dona..."
                className="flex-1 bg-muted/30 text-sm focus-visible:ring-0"
              />
              <button
                onClick={send}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary transition-colors hover:bg-primary/90"
              >
                <Send size={15} className="text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
