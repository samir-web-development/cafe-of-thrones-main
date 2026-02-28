import { useEffect } from "react";

export function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#fdf6ec] min-h-screen pt-28 pb-16 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8d9c8]/50">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2a1500] mb-8 font-serif">Privacy Policy</h1>

                <div className="space-y-6 text-[#7a5c3e] leading-relaxed">
                    <p>Last updated: February 2025</p>

                    <section>
                        <h2 className="text-xl font-semibold text-[#3d1f00] mb-3">1. Introduction</h2>
                        <p>Welcome to Cafe of Thrones. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#3d1f00] mb-3">2. The Data We Collect About You</h2>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> includes delivery address, email address and telephone numbers.</li>
                            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#3d1f00] mb-3">3. How We Use Your Personal Data</h2>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling your food order).</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#3d1f00] mb-3">4. WhatsApp Orders</h2>
                        <p>When you place an order, your order details, name, and delivery information are sent directly to our official WhatsApp number to facilitate fast and secure processing of your food delivery or table order. We do not store this information on any external database server; it remains strictly between you and our cafe administration.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#3d1f00] mb-3">5. Contact Us</h2>
                        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                        <ul className="mt-2 text-[#2a1500] font-medium">
                            <li>Email: privacy@cafeofthrones.com</li>
                            <li>Phone: +91 98765 43210</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
