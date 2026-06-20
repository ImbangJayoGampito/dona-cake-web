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
  ProductDetail: "/produk/{id}", // dynamic
  Ulasan: "/ulasan",
  Popular: "/popular",
  Home: "/",
  Kategori: "/kategori",
  Katalog: "/katalog",
  CreateBooking: "/booking/create",
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
  CartItem: "/keranjang/{id}",
  ClearCart: "/keranjang",

  // Orders
  Orders: "/pesanan",
  OrderSuccessful: "/pesanan/success",
  OrderDetail: "/pesanan/{id}",
  CancelOrder: "/pesanan/{id}/cancel",

  // Bookings
  Bookings: "/booking",
  BookingDetail: "/booking/{id}",
  CancelBooking: "/booking/{id}/cancel",

  // Transactions
  Transactions: "/transaksi",
  TransactionDetail: "/transaksi/{id}",
  PayOrder: "/pesanan/{id}/pay",
  PayBooking: "/booking/{id}/pay",

  // Reviews (write/update)
  CreateUlasan: "/ulasan",
  UpdateUlasan: "/ulasan/{id}",
  DeleteUlasan: "/ulasan/{id}",

  // Notifications
  Notifications: "/notifikasi",
  MarkNotificationRead: "/notifikasi/{id}/read",
  MarkAllRead: "/notifikasi/read-all",
  UnreadCount: "/notifikasi/unread-count",

  // Chatbot
  ChatConversations: "/chatbot/conversations",
  StartConversation: "/chatbot/conversations",
  SendMessage: "/chatbot/conversations/{id}/message",
  ConversationDetail: "/chatbot/conversations/{id}",
  ResetConversation: "/chatbot/conversations/{id}/reset",
  ReportConversation: "/chatbot/conversations/{id}/report",
  EndConversation: "/chatbot/conversations/{id}/end",

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
  ToggleReviewVisibility: "/ulasan/{id}/toggle-visibility",
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
export const UpdateOrderStatus = "/pesanan/{id}/status" as const
export const VerifyBooking = "/booking/{id}/verify" as const
