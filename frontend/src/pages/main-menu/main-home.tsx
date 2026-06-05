import Categories from "@/components/customer-menu/categories"
import CustomCakeBanner from "@/components/customer-menu/custom-cake-bannner"
import FeaturedProducts from "@/components/customer-menu/featured-products"
import MainHero from "@/components/customer-menu/main-hero"
import Recommendations from "@/components/customer-menu/recommendations"
import Testimonials from "@/components/customer-menu/testimonials"

export default function MainHome() {
  return (
    <div className="">
      <Categories />
      <MainHero />
      <FeaturedProducts />

      <Testimonials />
      <Recommendations />
      <CustomCakeBanner />
    </div>
  )
}
