import React from "react";

const Terms = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // ถ้า `isOpen` เป็น false ไม่ต้องแสดง Modal

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms & Conditions</h2>
                <p className="text-gray-600 text-sm overflow-y-auto max-h-64">
                    <p className="mt-4 text-gray-600">
                        By creating an account with Lalafell Custom Keyboard Store, you agree to the following terms and conditions:
                    </p>

                    <h3 className="text-xl font-semibold mt-6 text-gray-800">1. Data Collection and Usage</h3>
                    <p className="mt-2 text-gray-600">
                        We collect personal information such as your name, email address, and shipping address to provide you with the best shopping experience. Your data will be securely stored and used only for the purpose of order processing and customer support.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 text-gray-800">2. Account Registration</h3>
                    <p className="mt-2 text-gray-600">
                        You are responsible for maintaining the confidentiality of your login credentials. Any activities performed under your account are your responsibility. If you suspect any unauthorized access, please contact us immediately.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 text-gray-800">3. Payment Terms</h3>
                    <p className="mt-2 text-gray-600">
                        All payments made on our platform are secure. We accept major credit cards and other payment methods. Refunds and returns are subject to our <a href="/refund-policy" className="text-blue-500 hover:underline">Refund Policy</a>.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 text-gray-800">4. Website Usage</h3>
                    <p className="mt-2 text-gray-600">
                        Users are allowed to interact with our website, post reviews, and share their experiences. However, any inappropriate, harmful, or misleading content is prohibited.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 text-gray-800">5. Limitation of Liability</h3>
                    <p className="mt-2 text-gray-600">
                        Lalafell Custom Keyboard Store is not responsible for any indirect damages arising from the use of our products or services. Our liability is limited to the value of the purchased product.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 text-gray-800">6. Changes to Terms</h3>
                    <p className="mt-2 text-gray-600">
                        We reserve the right to update these terms at any time. You will be notified of any significant changes through email or by a notice on our website.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 text-gray-800">7. Account Termination</h3>
                    <p className="mt-2 text-gray-600">
                        We reserve the right to suspend or terminate your account in case of any breach of our terms and conditions.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 text-gray-800">8. Contact Us</h3>
                    <p className="mt-2 text-gray-600">
                        If you have any questions or concerns about these terms, feel free to contact our support team at <a href="mailto:support@lalafellkeyboards.com" className="text-blue-500 hover:underline">support@lalafellkeyboards.com</a>.
                    </p>

                    <p className="mt-6 text-sm text-gray-600">
                        By clicking "I accept," you confirm that you have read and agree to the <a href="/terms" className="text-blue-500 hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
                    </p>

                </p>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    ✖️
                </button>
            </div>
        </div >
    );
};

export default Terms;
