// src/lib/routes/api.ts

// =============================================================================
// PUBLIC ROUTES (No authentication required)
// =============================================================================
export const PublicRoutes = {
  Test: "/test",
  Login: "/auth/login",
  Register: "/auth/register",
  Products: "/produk",
  ProductCategories: "/produk/categories",
  ProductDetail: "/produk/{produk}", // dynamic
  Reviews: "/ulasan",
  Popular: "/popular",
  Home: "/",
} as const

// =============================================================================
// PROTECTED ROUTES (Any authenticated user)
// =============================================================================
export const ProtectedRoutes = {
  // Auth management
  Logout: "/auth/logout",
  LogoutAll: "/auth/logout-all",
  Me: "/auth/me",
  ChangePassword: "/auth/change-password",
  UpdateProfile: "/auth/profile",
  FromToken: "/auth/from-token",

  // Pelanggan profile
  PelangganProfile: "/pelanggan/profile",
  UpdatePelangganProfile: "/pelanggan/profile",

  // Cart
  Cart: "/keranjang",
  CartItem: "/keranjang/{keranjang}",
  ClearCart: "/keranjang",

  // Orders
  Orders: "/pesanan",
  OrderDetail: "/pesanan/{pesanan}",
  CancelOrder: "/pesanan/{pesanan}/cancel",

  // Bookings
  Bookings: "/booking",
  BookingDetail: "/booking/{booking}",
  CancelBooking: "/booking/{booking}/cancel",

  // Transactions
  Transactions: "/transaksi",
  TransactionDetail: "/transaksi/{transaksi}",
  PayOrder: "/pesanan/{pesanan}/pay",
  PayBooking: "/booking/{booking}/pay",

  // Reviews (write/update)
  CreateReview: "/ulasan",
  UpdateReview: "/ulasan/{ulasan}",
  DeleteReview: "/ulasan/{ulasan}",

  // Notifications
  Notifications: "/notifikasi",
  MarkNotificationRead: "/notifikasi/{notifikasi}/read",
  MarkAllRead: "/notifikasi/read-all",
  UnreadCount: "/notifikasi/unread-count",

  // Chatbot
  ChatConversations: "/chatbot/conversations",
  StartConversation: "/chatbot/conversations",
  SendMessage: "/chatbot/conversations/{chatbotLog}/message",
  ConversationDetail: "/chatbot/conversations/{chatbotLog}",
  ResetConversation: "/chatbot/conversations/{chatbotLog}/reset",
  ReportConversation: "/chatbot/conversations/{chatbotLog}/report",
  EndConversation: "/chatbot/conversations/{chatbotLog}/end",

  // Recommendations
  Recommendations: "/rekomendasi",
  PopularProducts: "/rekomendasi/popular",

  // Activity
  Aktivitas: "/aktivitas",

  // Images
  UploadGambar: "/gambar/upload",
  DeleteGambar: "/gambar/{gambar}",
} as const

// =============================================================================
// STAFF / ADMIN ROUTES (role: admin, karyawan)
// =============================================================================
export const StaffRoutes = {
  Dashboard: "/staff/dashboard",
  FinancialReport: "/staff/laporan/keuangan",
  RevenueChart: "/staff/laporan/keuangan/chart",
  CustomerBehavior: "/staff/laporan/perilaku-pelanggan",
  ProductionQueue: "/staff/produksi/antrean",
} as const

// =============================================================================
// ADMIN ONLY ROUTES (role: admin)
// =============================================================================
export const AdminRoutes = {
  Users: "/admin/users",
  CreateUser: "/admin/users",
  UpdateUserRole: "/admin/users/{user}/role",
  DeleteUser: "/admin/users/{user}",
  AdminDashboard: "/admin/dashboard",
  ToggleReviewVisibility: "/ulasan/{ulasan}/toggle-visibility",
  AdminChatConversations: "/chatbot/admin/conversations",
  AdminChatConversationDetail: "/chatbot/admin/conversations/{chatbotLog}",
} as const

// =============================================================================
// PRODUCT MANAGEMENT (Admin & Karyawan) – using same base paths
// =============================================================================
export const ProductManagementRoutes = {
  CreateProduct: "/produk",
  UpdateProduct: "/produk/{produk}",
  DeleteProduct: "/produk/{produk}",
} as const

// Staff/Admin specific endpoints not in objects above
export const UpdateOrderStatus = "/pesanan/{pesanan}/status" as const
export const VerifyBooking = "/booking/{booking}/verify" as const
