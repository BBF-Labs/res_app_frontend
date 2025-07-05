"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Crown, Check, CreditCard, Calendar, TrendingUp, Zap, Star, Download, BarChart3 } from "lucide-react"

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
  popular?: boolean
}

interface UsageStats {
  resumesCreated: number
  resumesLimit: number
  aiChatsUsed: number
  aiChatsLimit: number
  exportsUsed: number
  exportsLimit: number
}

const plans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    features: ["3 resume templates", "1 resume creation", "Basic export (PDF)", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    interval: "month",
    popular: true,
    features: [
      "All premium templates",
      "Unlimited resumes",
      "AI writing assistance",
      "Resume scoring",
      "All export formats",
      "Priority support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    interval: "month",
    features: [
      "Everything in Pro",
      "Advanced AI features",
      "Custom templates",
      "Team collaboration",
      "Analytics dashboard",
      "White-label exports",
      "Dedicated support",
    ],
  },
]

export default function BillingPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentPlan, setCurrentPlan] = useState("free")
  const [usageStats, setUsageStats] = useState<UsageStats>({
    resumesCreated: 1,
    resumesLimit: 1,
    aiChatsUsed: 0,
    aiChatsLimit: 0,
    exportsUsed: 3,
    exportsLimit: 5,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Mock current subscription
    setCurrentPlan(user?.subscription || "free")
  }, [user])

  const handleSubscribe = async (planId: string) => {
    setIsLoading(true)

    try {
      // Simulate Paystack integration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setCurrentPlan(planId)
      toast({
        title: "Subscription updated!",
        description: `You've successfully subscribed to the ${plans.find((p) => p.id === planId)?.name} plan.`,
      })
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getCurrentPlanDetails = () => {
    return plans.find((plan) => plan.id === currentPlan) || plans[0]
  }

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === 0) return 0
    return Math.min((used / limit) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
            <p className="text-muted-foreground">Manage your subscription and view usage statistics.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Plan & Usage */}
            <div className="lg:col-span-1 space-y-6">
              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-primary" />
                    <span>Current Plan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{getCurrentPlanDetails().name}</h3>
                    <div className="text-3xl font-bold text-primary mb-4">
                      ${getCurrentPlanDetails().price}
                      <span className="text-sm text-muted-foreground font-normal">
                        /{getCurrentPlanDetails().interval}
                      </span>
                    </div>
                    {currentPlan !== "free" && (
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Next billing: Jan 15, 2024</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Usage Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Usage This Month</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Resumes Created</span>
                      <span>
                        {usageStats.resumesCreated}/{usageStats.resumesLimit || "∞"}
                      </span>
                    </div>
                    <Progress
                      value={getUsagePercentage(usageStats.resumesCreated, usageStats.resumesLimit)}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>AI Chats</span>
                      <span>
                        {usageStats.aiChatsUsed}/{usageStats.aiChatsLimit || "∞"}
                      </span>
                    </div>
                    <Progress
                      value={getUsagePercentage(usageStats.aiChatsUsed, usageStats.aiChatsLimit)}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Exports</span>
                      <span>
                        {usageStats.exportsUsed}/{usageStats.exportsLimit || "∞"}
                      </span>
                    </div>
                    <Progress
                      value={getUsagePercentage(usageStats.exportsUsed, usageStats.exportsLimit)}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Usage History
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Subscription Plans */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
                <p className="text-muted-foreground">
                  Upgrade or change your subscription plan to unlock more features.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative ${plan.popular ? "border-primary shadow-lg" : ""} ${
                      currentPlan === plan.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="mr-1 h-3 w-3" />
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold">
                        ${plan.price}
                        <span className="text-sm text-muted-foreground font-normal">/{plan.interval}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {currentPlan === plan.id ? (
                        <Button disabled className="w-full">
                          <Check className="mr-2 h-4 w-4" />
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleSubscribe(plan.id)}
                          disabled={isLoading}
                          className="w-full"
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processing...
                            </>
                          ) : plan.id === "free" ? (
                            "Downgrade to Free"
                          ) : currentPlan === "free" ? (
                            <>
                              <Zap className="mr-2 h-4 w-4" />
                              Upgrade to {plan.name}
                            </>
                          ) : (
                            `Switch to ${plan.name}`
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Billing Information */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Your payment method and billing details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Billing Address</h4>
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">
                          123 Main Street
                          <br />
                          San Francisco, CA 94105
                          <br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
