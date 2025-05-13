"use client";

import { CheckCircle, Lock, X } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const defaultPlan = searchParams.get("plan") || "basic";

  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [processing, setProcessing] = useState(null); 
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState(null);

  
  // Simulate payment processing
  const handleAlternativePayment = (paymentMethod) => {
    setProcessing(paymentMethod); 
    setShowModal(true); 
    setSuccess(false);
    setTimeout(() => {
      setProcessing(null); 
      setSuccess(true);
    }, 3000);
  };

  const handleCreditCardPayment = (e) => {
    e.preventDefault();
    setFormError(null);

    // Basic form validation
    if (!fullName) {
      setFormError("Please enter your full name.");
      return;
    }
    if (cardNumber.replace(/\s/g, "").length < 13) {
      setFormError("Invalid card number.");
      return;
    }
    if (!expiration) {
      setFormError("Please select expiration date.");
      return;
    }
    if (cvv.length < 3) {
      setFormError("CVV must be 3 or 4 digits.");
      return;
    }
    
    setProcessing("creditcard");
    setShowModal(true);
    setSuccess(false);

    setTimeout(() => {
      setProcessing(null);
      setSuccess(true);
      setIsPaymentConfirmed(true);
    }, 3000);
  };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
                setFullName("");
                setCardNumber("");
                setExpiration("");
                setCvv("");
            }, 5000); 
            return () => clearTimeout(timer);
        }
    }, [success]);

  const getCardType = (number) => {
    const re = {
      barclays: /^49/,
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      mellat: /^61/,
    };

    if (re.barclays.test(number)) return "barclays";
    if (re.visa.test(number)) return "visa";
    if (re.mastercard.test(number)) return "mastercard";
    if (re.amex.test(number)) return "amex";
    if (re.mellat.test(number)) return "mellat";
    return "default";
  };

  const cardType = getCardType(cardNumber.replace(/\s/g, ""));

  const cardIcons = {
    visa: "/visa.svg",
    mastercard: "/mastercard.svg",
    amex: "/amex.svg",
    mellat: "/Mellat.png",
    barclays: "/barclays.svg",
    default: "/credit-card.svg",
  };

  const cardGradients = {
    visa: "from-blue-100 via-blue-300 to-blue-500",
    mastercard: "from-yellow-100 via-orange-300 to-red-400",
    amex: "from-green-100 via-teal-300 to-green-500",
    mellat: "from-red-100 via-red-300 to-pink-500",
    barclays: "from-sky-300 via-sky-200 to-sky-50",
    default: "from-black/5 via-sky-200 to-purple-200",
  };

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    IRR: "﷼",
    GBP: "£",
  };

  const formatPrice = (value, currency) => {
    let locale = "en-US";

    if (currency === "EUR") locale = "de-DE";
    if (currency === "IRR") locale = "fa-IR";
    if (currency === "GBP") locale = "en-GB";

    const formatted = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
    }).format(value);

    if (currency === "IRR") {
      return <span dir="rtl">{formatted} ریال</span>;
    }

    return `${currencySymbols[currency]}${formatted}`;
  };

  const plans = {
    basic: {
      name: "Basic",
      price: { USD: 49, EUR: 45, IRR: 2000000, GBP: 40 },
      features: [
        { text: "10 AI Interviews/month", included: true },
        { text: "Basic AI Rating", included: true },
        { text: "Candidate Link Sharing", included: true },
        { text: "Standard Reporting", included: true },
        { text: "Live Interview Scheduling", included: false },
        { text: "Advanced Recommendations", included: false },
      ],
    },
    pro: {
      name: "Pro",
      price: { USD: 99, EUR: 90, IRR: 4000000, GBP: 85 },
      features: [
        { text: "50 AI Interviews/month", included: true },
        { text: "Advanced AI Rating", included: true },
        { text: "Candidate Link Sharing", included: true },
        { text: "Detailed Reporting", included: true },
        { text: "Live Interview Scheduling", included: true },
        { text: "Basic Recommendations", included: true },
      ],
    },
  };

  const plan = plans[selectedPlan];

  // Format card number with spaces
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 16);
    let formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4);
    setCvv(value);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Upgrade to {plan.name} Plan
        </h1>
        <p className="text-gray-500 mb-6">
          Unlock powerful AI features to streamline your hiring process.
        </p>

        {/* Currency Toggle */}
        <div className="flex justify-center sm:justify-end mb-6">
          <div className="flex flex-wrap justify-center sm:justify-end gap-2 bg-white/30 backdrop-blur-sm p-2 rounded-xl shadow-lg ring-1 ring-gray-200 max-w-full">
            {Object.keys(currencySymbols).map((cur) => {
              const isSelected = currency === cur;
              return (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer
                    ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-md scale-[1.05]"
                        : "text-gray-700 hover:bg-gray-100/60 hover:text-indigo-600"
                    }`}
                >
                  <Image
                    src={`/flags/${cur.toLowerCase()}.svg`}
                    alt={`${cur} flag`}
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full shadow-sm"
                  />
                  {cur}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plan Summary */}
        <div className="bg-gray-100 p-6 rounded-xl mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h2 className="text-lg font-semibold text-gray-800">
              {plan.name} Plan
            </h2>
            <span
              className={`text-xl sm:text-2xl font-bold ${
                plan.price.USD === 99 ? "text-purple-600" : "text-blue-600"
              }`}
            >
              {formatPrice(plan.price[currency], currency)}
              <span className="text-sm font-normal text-gray-500">/month</span>
            </span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 text-sm pt-2">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                {feature.included ? (
                  <CheckCircle className="text-green-500 w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                ) : (
                  <X className="text-gray-400 w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                )}
                <span
                  className={
                    feature.included ? "text-gray-700" : "text-gray-400"
                  }
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Live Card Preview */}
        <div
          className={`bg-gradient-to-br ${cardGradients[cardType]} text-black rounded-2xl p-5 sm:p-8 mb-8 shadow-xl hover:scale-[1.02] transition-transform border-2 border-blue-400 w-full max-w-3xl mx-auto`}
        >
          {/* Top Row: Name and Icon */}
          <div className="flex justify-between items-center mb-5">
            <span className="text-base sm:text-lg font-semibold uppercase tracking-wider text-gray-800 truncate max-w-[70%]">
              {fullName || "FULL NAME"}
            </span>
            <Image
              src={cardIcons[cardType] || "/credit-card.svg"}
              alt="Card Icon"
              width={45}
              height={28}
              className="flex-shrink-0"
            />
          </div>

          {/* Card Number */}
          <div className="text-2xl sm:text-3xl font-bold tracking-widest mb-6 break-words">
            {cardNumber || "**** **** **** ****"}
          </div>

          {/* Expiration & CVV */}
          <div className="grid grid-cols-2 gap-4 text-sm sm:text-base text-gray-500 font-medium">
            <div className="flex flex-col">
              <span className="text-gray-800 text-xs sm:text-sm">
                Expiration
              </span>
              <span>{expiration || "MM/YY"}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-gray-800 text-xs sm:text-sm">CVV</span>
              <span>{cvv || "***"}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form className="space-y-6 mb-8" onSubmit={handleCreditCardPayment}>
          {" "}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="card-number"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <div className="relative">
              <input
                id="card-number"
                type="text"
                required
                maxLength={19}
                className="mt-1 block w-full p-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Image
                  src={cardIcons[cardType] || "/credit-card.svg"}
                  alt="Card Icon"
                  width={32}
                  height={20}
                  className="object-contain"
                />
              </div>
            </div>
            {cardNumber.replace(/\s/g, "").length < 13 && (
              <p className="text-red-500 text-sm mt-1">Invalid card number</p>
            )}
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="expiration"
                className="block text-sm font-medium text-gray-700"
              >
                Expiration Date
              </label>
              <input
                id="expiration"
                type="month"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                required
                maxLength={4}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={cvv}
                onChange={handleCvvChange}
              />
              {cvv.length < 3 && (
                <p className="text-red-500 text-sm mt-1">
                  CVV must be 3 or 4 digits
                </p>
              )}
            </div>
          </div>
          {formError && (
            <p className="text-red-500 text-sm mt-2">{formError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            Confirm and Pay {formatPrice(plan.price[currency], currency)}
          </button>
        </form>

        {/* Alternative Payment Methods */}
        <div className="mt-8 flex flex-col justify-center items-center">
          <div className="flex items-center w-full mb-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-md font-semibold text-gray-500 whitespace-nowrap">
              Or pay with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleAlternativePayment("paypal")}
              className="flex w-20 h-10 items-center justify-center bg-transparent hover:scale-110 ease-in-out duration-300 text-white font-semibold py-2 px-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <Image
                src="/paypal.svg"
                alt="PayPal"
                width={60}
                height={25}
                className="object-contain"
              />
            </button>
            <button
              onClick={() => handleAlternativePayment("applepay")}
              className="flex w-20 h-10 items-center justify-center bg-transparent hover:scale-110 ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 cursor-pointer"
            >
              <Image
                src="/applepay.svg"
                alt="Apple Pay"
                width={60}
                height={25}
                className="object-contain"
              />
            </button>
            <button
              onClick={() => handleAlternativePayment("googlepay")}
              className="flex w-20 h-10 items-center justify-center bg-transparent hover:scale-110 ease-in-out duration-300 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <Image
                src="/google-pay.svg"
                alt="Google Pay"
                width={60}
                height={25}
                className="object-contain"
              />
            </button>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center mt-6 text-gray-500 text-sm">
          <Lock className="w-4 h-4 mr-1" />
          Payments are encrypted & secured with SSL.
        </div>
      </div>

      {/* Processing Modal */}
      {processing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-2xl flex flex-col items-center gap-4">
            <svg
              className="animate-spin h-10 w-10 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-lg font-semibold text-gray-800">
              Processing your payment...
            </p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-2xl flex flex-col items-center gap-4">
            <CheckCircle className="text-green-600 w-16 h-16" />
            <p className="text-2xl font-semibold text-gray-900">
              Payment Successful!
            </p>
            <p className="text-gray-600 text-center">
              Thank you for upgrading to the {plan.name} plan.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

// Export the default component wrapped in Suspense
export default function PaymentPage() {
  return (
      <Suspense fallback={<div>Loading payment options...</div>}>
          <PaymentPageContent />
      </Suspense>
  );
}