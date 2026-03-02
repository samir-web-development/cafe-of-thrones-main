import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Phone, MessageSquare } from "lucide-react";

interface ContactUsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactUsModal({ isOpen, onClose }: ContactUsModalProps) {
    const [name, setName] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Admin WhatsApp Number
        const adminPhoneNumber = "919226347261";

        // Format the WhatsApp message
        const whatsappMessage =
            `*New Contact Us Message*
*Name:* ${name}
*Contact:* ${contactInfo}

*Message:*
${message}`;

        // Construct URL and open in new tab
        const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, "_blank");

        // Clear form and close modal
        setName("");
        setContactInfo("");
        setMessage("");
        onClose();
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
                        className="fixed inset-0 bg-[#3d1f00]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ y: -50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                            className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md"
                        >
                            {/* Header Area */}
                            <div className="h-28 bg-[#2a1500] relative flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                                <h2 className="text-3xl font-bold text-[#fdf6ec] relative z-10 font-serif italic" style={{ letterSpacing: "1px" }}>
                                    Contact Us
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-[#fdf6ec]/80 hover:text-white transition-colors z-10 p-1 bg-black/20 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form Area */}
                            <div className="p-6 md:p-8 bg-[#fdf6ec]">
                                <p className="text-[#7a5c3e] text-center mb-6 text-sm">
                                    Have a question or feedback? Send us a message and we'll reply to you on WhatsApp!
                                </p>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b09070]">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-white border border-[#e8d9c8] rounded-xl py-3 pl-11 pr-4 text-[#3d1f00] placeholder-[#b09070] focus:outline-none focus:ring-2 focus:ring-[#ECB159] focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b09070]">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Phone Number or Email"
                                            value={contactInfo}
                                            onChange={(e) => setContactInfo(e.target.value)}
                                            className="w-full bg-white border border-[#e8d9c8] rounded-xl py-3 pl-11 pr-4 text-[#3d1f00] placeholder-[#b09070] focus:outline-none focus:ring-2 focus:ring-[#ECB159] focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-3 top-4 text-[#b09070]">
                                            <MessageSquare size={18} />
                                        </div>
                                        <textarea
                                            required
                                            placeholder="Your Message..."
                                            rows={4}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full bg-white border border-[#e8d9c8] rounded-xl py-3 pl-11 pr-4 text-[#3d1f00] placeholder-[#b09070] focus:outline-none focus:ring-2 focus:ring-[#ECB159] focus:border-transparent transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#ECB159] hover:bg-[#d49a3d] text-white py-3.5 rounded-xl font-bold transition-all active:scale-[0.98] shadow-sm mt-2 flex items-center justify-center gap-2"
                                    >
                                        Send towards WhatsApp
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
