import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Truck, MapPin, Phone, Mail, User, Check, Shield, BadgeCheck, IndianRupee, ShoppingBag, PartyPopper, FileText, MessageCircle } from "lucide-react";
import { useParams } from "react-router";
import { useCart } from "@/context/CartContext";
import { FadeUp } from "@/components/animations";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(`WD${Date.now().toString(36).toUpperCase()}`);

  const gst = Math.round(totalPrice * 0.18);
  const delivery = totalPrice > 50000 ? 0 : 999;
  const total = totalPrice + gst + delivery;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      navigate(`/order-success/${orderId}`);
    }, 2000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-32 min-h-screen bg-cream text-center">
        <div className="max-w-md mx-auto px-4">
          <ShoppingBag className="w-16 h-16 text-maroon-200 mx-auto mb-4" />
          <h2 className="font-heading text-2xl text-dark mb-2">Your cart is empty</h2>
          <p className="text-dark/50 mb-6">Add some products to proceed with checkout.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-maroon-900 text-white rounded-full font-premium text-sm hover:bg-maroon-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeUp>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-dark/50 hover:text-maroon-900 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </FadeUp>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress */}
            <div className="flex items-center gap-4 mb-8">
              {["Delivery", "Payment", "Review"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step > i ? "bg-maroon-900 text-white" : step === i + 1 ? "bg-gold text-dark" : "bg-maroon-100 text-maroon-400"
                  }`}>
                    {step > i ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium ${step >= i + 1 ? "text-dark" : "text-dark/40"}`}>{s}</span>
                  {i < 2 && <div className={`w-12 h-px ${step > i + 1 ? "bg-maroon-900" : "bg-maroon-200"}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Delivery */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 border border-maroon-100/50">
                <h2 className="font-heading text-2xl text-dark mb-6">Delivery Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-dark">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon-400" />
                      <input type="text" placeholder="John Doe" className="w-full pl-11 pr-4 py-3 border border-maroon-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-900/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-dark">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon-400" />
                      <input type="tel" placeholder="+91 98765 43210" className="w-full pl-11 pr-4 py-3 border border-maroon-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-900/20" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-dark">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon-400" />
                      <input type="email" placeholder="john@example.com" className="w-full pl-11 pr-4 py-3 border border-maroon-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-900/20" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-dark">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-maroon-400" />
                      <textarea placeholder="Full address with landmark" rows={3} className="w-full pl-11 pr-4 py-3 border border-maroon-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-900/20 resize-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-dark">City</label>
                    <input type="text" placeholder="Mumbai" className="w-full px-4 py-3 border border-maroon-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-900/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-dark">Pincode</label>
                    <input type="text" placeholder="400001" className="w-full px-4 py-3 border border-maroon-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-900/20" />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full py-4 bg-maroon-900 text-white rounded-xl font-premium font-semibold hover:bg-maroon-800 transition-colors"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 border border-maroon-100/50">
                <h2 className="font-heading text-2xl text-dark mb-6">Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {[
                    { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
                    { id: "netbanking", label: "Net Banking", desc: "All major banks" },
                    { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive" },
                    { id: "emi", label: "EMI", desc: "3, 6, 9, 12 months" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                        paymentMethod === method.id ? "bg-maroon-50 border-maroon-300" : "bg-white border-maroon-200 hover:border-maroon-300"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id ? "border-maroon-900" : "border-maroon-300"
                      }`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-maroon-900 rounded-full" />}
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="hidden"
                      />
                      <div>
                        <p className="font-medium text-dark text-sm">{method.label}</p>
                        <p className="text-xs text-dark/50">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border border-maroon-200 text-dark rounded-xl font-premium hover:bg-maroon-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-maroon-900 text-white rounded-xl font-premium font-semibold hover:bg-maroon-800 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl p-8 border border-maroon-100/50">
                  <h2 className="font-heading text-2xl text-dark mb-6">Review Your Order</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4 pb-4 border-b border-maroon-100 last:border-0">
                        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-medium text-dark">{item.product.name}</h4>
                          <p className="text-sm text-dark/50">{item.selectedColor || item.product.colors[0]} · Qty: {item.quantity}</p>
                          <p className="font-semibold text-maroon-900 mt-1">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border border-maroon-200 text-dark rounded-xl font-premium hover:bg-maroon-50 transition-colors"
                  >
                    Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handlePlaceOrder}
                    className="flex-1 py-4 bg-gold text-dark rounded-xl font-premium font-semibold hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Shield className="w-5 h-5" />
                    Place Order
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-maroon-100/50">
              <h3 className="font-heading text-lg text-dark mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-dark/60">Subtotal</span>
                  <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark/60">GST (18%)</span>
                  <span className="font-medium">₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark/60">Delivery</span>
                  <span className={delivery === 0 ? "text-green-600 font-medium" : "font-medium"}>
                    {delivery === 0 ? "Free" : `₹${delivery.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between font-heading text-lg pt-3 border-t border-maroon-100">
                  <span>Total</span>
                  <span className="text-maroon-900">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-dark/50">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  Secure checkout
                </div>
                <div className="flex items-center gap-2 text-xs text-dark/50">
                  <Truck className="w-4 h-4 text-maroon-900" />
                  Free delivery on orders above ₹50,000
                </div>
                <div className="flex items-center gap-2 text-xs text-dark/50">
                  <IndianRupee className="w-4 h-4 text-gold" />
                  EMI options available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderSuccess() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  return (
    <div className="pt-20 min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <PartyPopper className="w-12 h-12 text-green-600" />
        </motion.div>

        <FadeUp>
          <h1 className="font-heading text-4xl text-dark mb-4">Order Confirmed!</h1>
          <p className="text-dark/60 mb-2">Thank you for shopping with Woodnest.</p>
          <p className="text-dark/60 mb-8">Your order <span className="font-semibold text-maroon-900">{orderId}</span> has been placed successfully.</p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-white rounded-2xl p-8 border border-maroon-100/50 mb-8 text-left">
            <h3 className="font-heading text-lg text-dark mb-4">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-maroon-50 rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-maroon-900" />
                </div>
                <div>
                  <h4 className="font-medium text-dark">WhatsApp Confirmation</h4>
                  <p className="text-sm text-dark/50">You'll receive an order confirmation on WhatsApp shortly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-maroon-50 rounded-full flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-maroon-900" />
                </div>
                <div>
                  <h4 className="font-medium text-dark">Invoice</h4>
                  <p className="text-sm text-dark/50">Your invoice will be emailed within 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-maroon-50 rounded-full flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-maroon-900" />
                </div>
                <div>
                  <h4 className="font-medium text-dark">Delivery</h4>
                  <p className="text-sm text-dark/50">Estimated delivery: 5-7 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(`/track-order/${orderId}`)}
              className="px-8 py-4 bg-maroon-900 text-white rounded-full font-premium font-semibold hover:bg-maroon-800 transition-colors"
            >
              Track Order
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-4 border border-maroon-200 text-dark rounded-full font-premium hover:bg-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

export function TrackOrder() {
  const { orderId } = useParams<{ orderId: string }>();
  const [step] = useState(2);

  const steps = [
    { label: "Order Placed", time: "Apr 29, 10:30 AM", done: true },
    { label: "Processing", time: "Apr 29, 2:15 PM", done: true },
    { label: "Shipped", time: "Apr 30, 9:00 AM", done: false },
    { label: "Out for Delivery", time: "Expected May 2", done: false },
    { label: "Delivered", time: "Expected May 2", done: false },
  ];

  return (
    <div className="pt-20 min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeUp>
          <h1 className="font-heading text-3xl text-dark mb-2">Track Your Order</h1>
          <p className="text-dark/60 mb-10">Order ID: <span className="font-semibold text-maroon-900">{orderId}</span></p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-white rounded-2xl p-8 border border-maroon-100/50 mb-8">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-maroon-100">
                <motion.div
                  initial={{ height: "0%" }}
                  animate={{ height: `${(step / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute top-0 left-0 w-full bg-maroon-900"
                />
              </div>

              <div className="space-y-8">
                {steps.map((s, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      i <= step ? "bg-maroon-900 text-white" : "bg-maroon-100 text-maroon-400"
                    }`}>
                      {i <= step ? <Check className="w-5 h-5" /> : <span className="text-sm">{i + 1}</span>}
                    </div>
                    <div className="pt-2">
                      <h4 className={`font-medium ${i <= step ? "text-dark" : "text-dark/40"}`}>{s.label}</h4>
                      <p className="text-sm text-dark/50">{s.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="bg-white rounded-2xl p-8 border border-maroon-100/50">
            <h3 className="font-heading text-lg text-dark mb-4">Delivery Address</h3>
            <p className="text-dark/60 text-sm leading-relaxed">
              John Doe<br />
              123 Furniture Lane, Apartment 4B<br />
              Andheri West, Mumbai, Maharashtra<br />
              PIN: 400053<br />
              Phone: +91 98765 43210
            </p>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
