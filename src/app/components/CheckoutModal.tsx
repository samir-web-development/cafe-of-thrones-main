import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Hash, User as UserIcon, Phone } from "lucide-react";
import { useCart, CartItem } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const { cartItems, cartTotal, setCartItems, setIsCartOpen } = useCart();
    const { user } = useAuth();

    const [orderType, setOrderType] = useState<"home_delivery" | "table_order">("home_delivery");
    const [customerName, setCustomerName] = useState(user?.user_metadata?.full_name || "");
    const [customerPhone, setCustomerPhone] = useState(user?.user_metadata?.phone_number || "");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [tableNumber, setTableNumber] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Build the WhatsApp message
            let message = `*New Order from Cafe of Thrones*\n\n`;
            message += `*Customer details:*\n`;
            message += `Name: ${customerName}\n`;
            message += `Phone: ${customerPhone}\n`;

            if (orderType === "home_delivery") {
                message += `Type: Home Delivery\n`;
                message += `Address: ${deliveryAddress}\n\n`;
            } else {
                message += `Type: Table Order\n`;
                message += `Table No: ${tableNumber}\n\n`;
            }

            message += `*Order items:*\n`;
            cartItems.forEach((item: CartItem) => {
                message += `- ${item.quantity}x ${item.name} (${item.price})\n`;
            });

            message += `\n*Total: ${cartTotal}*`;

            const adminPhoneNumber = "919226347261"; // Replace with actual cafe admin WhatsApp number
            const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(message)}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, "_blank");

            // Success cleanup
            setSuccess(true);
            setCartItems([]); // clear the local cart state

            setTimeout(() => {
                setSuccess(false);
                onClose();
                setIsCartOpen(false);
            }, 3000);

        } catch (err: any) {
            console.error("Order submission error:", err);
            setError(err.message || "Failed to process the order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#3d1f00]/60 backdrop-blur-sm z-[55]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: "100%", scale: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: "100%", scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 bottom-0 left-0 right-0 w-full sm:max-w-md bg-[#fdf6ec] sm:rounded-2xl rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] sm:shadow-2xl z-[60] overflow-hidden sm:max-h-[90vh] max-h-[85vh] flex flex-col"
                    >
                        {/* Mobile handle indicator */}
                        <div className="sm:hidden w-full flex justify-center absolute top-0 left-0 z-20 pt-3">
                            <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
                        </div>

                        {/* Header */}
                        <div className="h-20 sm:h-24 bg-[#2a1500] relative flex items-center justify-center shrink-0">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#fdf6ec] relative z-10 sm:mt-0 mt-3" style={{ letterSpacing: "1px" }}>
                                Finalize Order
                            </h2>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#fdf6ec]/80 hover:text-white transition-colors z-10 p-1.5 bg-[#472605] sm:bg-transparent rounded-full sm:rounded-none"
                            >
                                <X size={20} className="sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Form Area */}
                        <div className="p-5 sm:p-8 bg-[#fdf6ec] overflow-y-auto flex-1">
                            {success ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", damping: 15 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                                        className="w-24 h-24 bg-[#ECB159]/20 text-[#ECB159] rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(236,177,89,0.3)]"
                                    >
                                        <motion.svg
                                            className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"
                                            ></motion.path>
                                        </motion.svg>
                                    </motion.div>
                                    <motion.h3
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="text-3xl font-bold text-[#3d1f00] mb-3"
                                    >
                                        Order Confirmed!
                                    </motion.h3>
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="text-[#9e7c5a] text-lg max-w-[250px] mx-auto leading-relaxed"
                                    >
                                        Your royal delicacies will be prepared and served shortly.
                                    </motion.p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    {error && (
                                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                                            {error}
                                        </div>
                                    )}

                                    {/* Order Type Toggle */}
                                    <div className="flex p-1 bg-white border border-[#e8d9c8] rounded-xl sm:rounded-2xl shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setOrderType("home_delivery")}
                                            className={`flex-1 py-2 sm:py-2.5 text-sm font-bold rounded-lg sm:rounded-xl transition-all ${orderType === "home_delivery" ? "bg-[#3d1f00] text-white shadow-md transform scale-[1.02]" : "text-[#9e7c5a] hover:text-[#3d1f00]"}`}
                                        >
                                            Home Delivery
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setOrderType("table_order")}
                                            className={`flex-1 py-2 sm:py-2.5 text-sm font-bold rounded-lg sm:rounded-xl transition-all ${orderType === "table_order" ? "bg-[#3d1f00] text-white shadow-md transform scale-[1.02]" : "text-[#9e7c5a] hover:text-[#3d1f00]"}`}
                                        >
                                            Table Order
                                        </button>
                                    </div>

                                    {/* Customer Details */}
                                    <div className="relative">
                                        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#b09070]">
                                            <UserIcon size={18} className="sm:w-5 sm:h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Name"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className="w-full bg-white border border-[#e8d9c8] rounded-xl sm:rounded-2xl py-2.5 sm:py-3.5 pl-10 sm:pl-12 pr-4 text-[#3d1f00] placeholder-[#b09070] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#ECB159] focus:border-transparent transition-all shadow-sm hover:border-[#d4a878]"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#b09070]">
                                            <Phone size={18} className="sm:w-5 sm:h-5" />
                                        </div>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="Phone Number"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            className="w-full bg-white border border-[#e8d9c8] rounded-xl sm:rounded-2xl py-2.5 sm:py-3.5 pl-10 sm:pl-12 pr-4 text-[#3d1f00] placeholder-[#b09070] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#ECB159] focus:border-transparent transition-all shadow-sm hover:border-[#d4a878]"
                                        />
                                    </div>

                                    {/* Conditional Fields based on Order Type */}
                                    {orderType === "home_delivery" ? (
                                        <div className="relative">
                                            <div className="absolute left-3.5 sm:left-4 top-4 text-[#b09070]">
                                                <MapPin size={18} className="sm:w-5 sm:h-5" />
                                            </div>
                                            <textarea
                                                required
                                                placeholder="Full Delivery Address"
                                                value={deliveryAddress}
                                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                                rows={2}
                                                className="w-full bg-white border border-[#e8d9c8] rounded-xl sm:rounded-2xl py-3 pl-10 sm:pl-12 pr-4 text-[#3d1f00] placeholder-[#b09070] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#ECB159] focus:border-transparent transition-all resize-none shadow-sm hover:border-[#d4a878]"
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#b09070]">
                                                <Hash size={18} className="sm:w-5 sm:h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Table Number"
                                                value={tableNumber}
                                                onChange={(e) => setTableNumber(e.target.value)}
                                                className="w-full bg-white border border-[#e8d9c8] rounded-xl sm:rounded-2xl py-2.5 sm:py-3.5 pl-10 sm:pl-12 pr-4 text-[#3d1f00] placeholder-[#b09070] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#ECB159] focus:border-transparent transition-all shadow-sm hover:border-[#d4a878]"
                                            />
                                        </div>
                                    )}

                                    <div className="border-t border-[#e8d9c8] pt-4 sm:pt-5 mt-2 sm:mt-4">
                                        <div className="flex items-center justify-between mb-4 sm:mb-5 px-1">
                                            <span className="text-[#7a5c3e] font-medium text-sm sm:text-base">Total Amount</span>
                                            <span className="text-[#3d1f00] font-black text-xl sm:text-2xl">₹ {cartTotal}</span>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#ECB159] hover:bg-[#d49a3d] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-[15px] sm:text-[16px] transition-all active:scale-[0.98] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                "Place Order"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
