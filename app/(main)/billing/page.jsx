"use client";

import ContactUsModal from "@/app/(main)/billing/_components/ContactUsModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  CreditCard,
  Gift,
  Loader2,
  Lock,
  MessageSquareMore,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const plans = [
  {
    name: "Starter",
    price: 0,
    description: "Free plan for personal use.",
    features: ["100 requests/month", "Basic analytics", "Community support"],
  },
  {
    name: "Basic",
    price: 49,
    description: "Perfect for small teams",
    features: [
      "100 AI Interviews/month",
      "Basic AI Rating",
      "Candidate Link Sharing",
      "Standard Reporting",
    ],
  },
  {
    name: "Pro",
    price: 99,
    description: "Ideal for growing teams",
    features: [
      "200 AI Interviews/month",
      "Advanced AI Rating",
      "Candidate Link Sharing",
      "Detailed Reporting",
      "Live Interview Scheduling",
      "Basic Recommendations",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited AI Interviews",
      "Custom AI Rating Models",
      "Advanced Link Sharing Options",
      "Custom Reporting & Analytics",
      "Integrated Live Scheduling",
      "Advanced Recommendations",
      "Dedicated Support",
    ],
  },
];

const BillingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("Starter");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [country, setCountry] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleContactClick = () => {
    setIsModalOpen(true);
  };

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const applyCoupon = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (couponCode === "SAVE10") {
        setDiscount(10);
        setIsCouponApplied(true);
      } else if (couponCode === "PROMO20") {
        setDiscount(20);
        setIsCouponApplied(true);
      } else {
        setDiscount(0);
        setIsCouponApplied(false);
        alert("Invalid coupon code.");
      }
    }, 1000);
  };

  const handleSubscribe = async () => {
    const selectedPlanData = plans.find((plan) => plan.name === selectedPlan);
    if (!selectedPlanData) return;
  
    if (selectedPlanData.price === 0) {
      setIsSubscribed(true);
      try {
        await sendConfirmationEmail(email, selectedPlan);
        toast.success("Confirmation email sent!");
      } catch (error) {
        toast.error("Failed to send confirmation email.");
      }
      return;
    }
  
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      setIsSubscribed(true);
      try {
        await sendConfirmationEmail(email, selectedPlan);
        toast.success("Confirmation email sent!");
      } catch (error) {
        toast.error("Failed to send confirmation email.");
      }
    }, 2000);
  };
  

  const selectedPlanData = plans.find((plan) => plan.name === selectedPlan);
  const finalPrice =
    selectedPlanData?.price === "Custom"
      ? "Contact us"
      : Math.max(
          0,
          selectedPlanData.price - selectedPlanData.price * (discount / 100)
        );

  const isFreePlan = selectedPlanData.price === 0;

  const canSubscribe =
    isFreePlan ||
    (name.trim() &&
      cardNumber.trim() &&
      expiryDate.trim() &&
      cvv.trim() &&
      country.trim());

  if (isSubscribed) {
    return (
      <div className="text-white flex items-center justify-center animate-fadeUp mt-32 md:mt-52">
        <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-md border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-green-400 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Subscription Successful!
            </CardTitle>
            <CardDescription className="text-gray-300">
              Thank you for subscribing to the {selectedPlan} plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              You will receive a confirmation email shortly. Your subscription
              is active.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard">
              <Button
                className="w-full bg-blue-500/90 hover:bg-blue-500 text-white cursor-pointer"
                onClick={() => setIsSubscribed(false)}
              >
                Go to Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-4 sm:p-8 animate-fadeUp">
      <div className="max-w-4xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl p-2 font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-slideInRight">
          Billing & Subscription
        </h1>

        {/* Plan Selection */}
        <div className="space-y-6 pt-3">
          <p className="text-center text-md text-gray-600 max-w-xl mx-auto animate-slideInLeft">
            Find the plan that best fits your needs and scale your experience
            with ease.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 animate-slideInRight">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              return (
                <Card
                  key={plan.name}
                  onClick={() => handlePlanSelect(plan.name)}
                  className={cn(
                    "relative group cursor-pointer transition-all duration-300 rounded-xl border shadow-md hover:scale-[1.02]",
                    "bg-gradient-to-br from-gray-900 to-gray-800 border-white/10 hover:border-white/20",
                    isSelected &&
                      "border-4 border-blue-500 shadow-blue-500/40 scale-105"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                      Selected
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-4">
                      {plan.price === "Custom" ? (
                        <span className="text-blue-400">Contact Us</span>
                      ) : (
                        <>
                          ${plan.price}
                          <span className="text-sm text-gray-400"> /month</span>
                        </>
                      )}
                    </div>

                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-gray-300 flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Separator className="bg-gray-600" />
        {/* Payment Information */}
        {selectedPlanData.price !== 0 && (
          <div className="space-y-6 animate-slideInRight1">
            <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Payment Information
            </h2>
            {selectedPlanData.price !== 0 && (
              <div className="flex flex-wrap justify-center gap-4 pt-3">
                <Button
                  variant={
                    paymentMethod === "credit-card" ? "default" : "outline"
                  }
                  onClick={() => handlePaymentMethodSelect("credit-card")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all duration-300",
                    "bg-gradient-to-br from-gray-900 to-gray-800 hover:bg-white/10 hover:text-blue-500 border border-white/10 cursor-pointer",
                    paymentMethod === "credit-card" &&
                      "border-2 border-blue-500 shadow-md shadow-blue-500/30 scale-[1.03]"
                  )}
                >
                  <CreditCard className="h-4 w-4" />
                  Credit Card
                </Button>

                <Button
                  variant={paymentMethod === "paypal" ? "default" : "outline"}
                  onClick={() => handlePaymentMethodSelect("paypal")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all duration-300",
                    "bg-gradient-to-br from-gray-900 to-gray-800 hover:bg-white/10  border border-white/10 cursor-pointer",
                    paymentMethod === "paypal" &&
                      "border-2 border-yellow-400 shadow-md shadow-yellow-400/30 scale-[1.03]"
                  )}
                >
                  <span className="text-yellow-300 hover:text-yellow-500 font-semibold">
                    PayPal
                  </span>
                </Button>

                <Button
                  variant={
                    paymentMethod === "gift-card" ? "default" : "outline"
                  }
                  onClick={() => handlePaymentMethodSelect("gift-card")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all duration-300",
                    "bg-gradient-to-br from-gray-900 to-gray-800 hover:bg-white/10 hover:text-green-500 border border-white/10 cursor-pointer",
                    paymentMethod === "gift-card" &&
                      "border-2 border-green-400 shadow-md shadow-green-400/30 scale-[1.03]"
                  )}
                >
                  <Gift className="h-4 w-4 text-green-300" />
                  Gift Card
                </Button>
              </div>
            )}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white tracking-wide">
                  {paymentMethod === "credit-card" && "Credit Card Details"}
                  {paymentMethod === "paypal" && "PayPal Account"}
                  {paymentMethod === "gift-card" && "Gift Card Details"}
                </CardTitle>
                <CardDescription className="text-gray-400 mt-1">
                  Enter your{" "}
                  {paymentMethod === "credit-card"
                    ? "credit card"
                    : paymentMethod === "paypal"
                      ? "PayPal"
                      : "gift card"}{" "}
                  information to proceed.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {paymentMethod === "credit-card" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm text-gray-300">
                        Name on Card
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="card-number"
                        className="text-sm text-gray-300"
                      >
                        Card Number
                      </Label>
                      <Input
                        id="card-number"
                        type="text"
                        inputMode="numeric"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          const raw = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16);
                          const formatted = raw
                            .replace(/(.{4})/g, "$1 ")
                            .trim();
                          setCardNumber(formatted);
                        }}
                        placeholder="**** **** **** ****"
                        className="bg-black/20 text-white border-gray-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="expiry-date"
                          className="text-sm text-gray-300"
                        >
                          Expiry Date
                        </Label>
                        <Input
                          id="expiry-date"
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          value={expiryDate}
                          onChange={(e) => {
                            let raw = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4);
                            if (raw.length >= 3) {
                              raw = raw.replace(/(\d{2})(\d{1,2})/, "$1/$2");
                            }
                            setExpiryDate(raw);
                          }}
                          placeholder="MM/YY"
                          className="bg-black/20 text-white border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-sm text-gray-300">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) => {
                            const val = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4);
                            setCvv(val);
                          }}
                          placeholder="123"
                          className="bg-black/20 text-white border-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="country"
                        className="text-sm text-gray-300"
                      >
                        Country
                      </Label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="w-full bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500/30">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {["US", "CA", "GB", "IR"].map((code) => (
                            <SelectItem
                              key={code}
                              value={code}
                              className="text-white hover:bg-gray-700/50"
                            >
                              {
                                {
                                  US: "United States",
                                  CA: "Canada",
                                  GB: "United Kingdom",
                                  IR: "Iran",
                                }[code]
                              }
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm text-gray-300"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-black/20 text-white border-gray-700"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === "paypal" && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="paypal-email"
                      className="text-sm text-gray-300"
                    >
                      PayPal Email
                    </Label>
                    <Input
                      id="paypal-email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                )}

                {paymentMethod === "gift-card" && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="gift-card-number"
                      className="text-sm text-gray-300"
                    >
                      Gift Card Number
                    </Label>
                    <Input
                      id="gift-card-number"
                      type="text"
                      placeholder="XXXX-XXXX-XXXX"
                      className="bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="coupon-code"
                    className="text-sm text-gray-300"
                  >
                    Coupon Code (Optional)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon-code"
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-black/30 text-white border border-gray-700 focus:ring-2 focus:ring-green-400/40"
                    />
                    <Button
                      onClick={applyCoupon}
                      disabled={isLoading || isCouponApplied}
                      className={cn(
                        "bg-green-500/90 text-white hover:bg-green-500 transition-all cursor-pointer",
                        isLoading && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Applying...
                        </>
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                  {isCouponApplied && (
                    <p className="text-green-400 text-sm mt-1">
                      Coupon applied! You get {discount}% off.
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={handleSubscribe}
                  disabled={!canSubscribe}
                  className={cn(
                    "w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg transition-all hover:opacity-90 cursor-pointer",
                    !canSubscribe && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-md border border-white/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  Order Summary
                  <Wallet className="w-5 h-5 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Plan:</span>
                  <span className="text-white font-medium">{selectedPlan}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Price:</span>
                  <span className="text-white font-medium">
                    ${selectedPlanData?.price}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Discount:</span>
                    <span className="text-green-400 font-medium">
                      {discount}%
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-semibold">Total:</span>
                  <div className="text-xl font-semibold text-blue-400">
                    {finalPrice === "Contact us" ? (
                      <span className="text-blue-400">Contact us</span>
                    ) : (
                      <>${finalPrice.toFixed(2)}</>
                    )}
                  </div>
                </div>
                {selectedPlanData?.price === "Custom" && (
                  <button
                    onClick={handleContactClick}
                    className="w-full mt-4 px-6 py-2 text-sm font-semibold bg-blue-600 border-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 border-2 hover:border-purple-500 duration-500 transition-all transform focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Contact Us{" "}
                      <MessageSquareMore className="w-5 h-5 text-white animate-bounce" />
                    </span>
                  </button>
                )}

                {/* Contact us modal */}
                <ContactUsModal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mt-6 text-gray-500 text-sm">
        <Lock className="w-4 h-4 mr-1" />
        Payments are encrypted & secured with SSL.
      </div>
    </div>
  );
};

export default BillingPage;
