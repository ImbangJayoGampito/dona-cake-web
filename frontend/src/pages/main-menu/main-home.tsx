import Categories from "@/components/customer-menu/categories"
import CustomCakeBanner from "@/components/customer-menu/custom-cake-bannner"
import FeaturedProducts from "@/components/customer-menu/featured-products"
import MainHero from "@/components/customer-menu/main-hero"
import Recommendations from "@/components/customer-menu/recommendations"
import Testimonials from "@/components/customer-menu/testimonials"
import { AppHeader } from "@/components/layout/header"
import AppFooter from "@/components/layout/footer"
export default function MainHome() {
  return (
    <div className="">
      <AppHeader />
      <MainHero />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
      <Recommendations />
      <CustomCakeBanner />
      <AppFooter />
    </div>
  )
}
