// src/components/Homepage.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AppHeader } from "@/components/layout/header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Rocket, Shield, Zap, Globe, ChevronRight, Menu } from "lucide-react"

export default function Homepage() {
  const features = [
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Fast Performance",
      description: "Lightning fast loading times and smooth interactions.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure by Default",
      description: "Enterprise-grade security to keep your data safe.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Easy to Customize",
      description: "Fully customizable components that adapt to your brand.",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Scale",
      description: "Built to handle traffic from anywhere in the world.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO at TechFlow",
      content:
        "This platform has transformed how we work. The product is top-notch.",
      avatar: "https://github.com/shadcn.png",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content:
        "The best investment we've made. Customer support is always responsive.",
      avatar: "https://github.com/vercel.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation with Sheet for mobile */}
      <AppHeader />
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Build Better Products
            <br />
            With Modern Tools
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground">
            The all-in-one platform that helps you create amazing digital
            experiences. Fast, secure, and built for scale.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              Start Free Trial
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required · Free 14-day trial
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Why Choose Us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything you need to succeed in one powerful platform
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="border-0 shadow-sm transition hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Trusted by Developers
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-foreground italic">
                        "{testimonial.content}"
                      </p>
                      <div className="mt-4">
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join thousands of teams who are already building with us.
          </p>
          <Button size="lg" variant="secondary" className="mt-8 gap-2">
            Get Started Now
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <div className="space-y-2 text-sm">
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Features
                </Button>
                <br />
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Pricing
                </Button>
                <br />
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Documentation
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <div className="space-y-2 text-sm">
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  About
                </Button>
                <br />
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Blog
                </Button>
                <br />
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Careers
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Resources</h3>
              <div className="space-y-2 text-sm">
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Community
                </Button>
                <br />
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Support
                </Button>
                <br />
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Status
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <div className="space-y-2 text-sm">
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Privacy
                </Button>
                <br />
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Terms
                </Button>
                <br />
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary-foreground hover:text-primary"
                >
                  Security
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
