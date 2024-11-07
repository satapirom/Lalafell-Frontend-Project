import React, { useEffect } from "react";
import toast from "react-hot-toast";

const GoogleSignUp = ({ onSuccess }) => {
    useEffect(() => {
        // โหลด Google Sign-In SDK
        const loadGoogleScript = () => {
            // ตรวจสอบว่ามีสคริปต์อยู่แล้วหรือไม่
            if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
                initializeGoogleSignIn();
                return;
            }

            const script = document.createElement('script');
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogleSignIn;
            script.onerror = () => {
                console.error('Failed to load Google Sign-In script');
                toast.error("Failed to initialize Google Sign-In");
            };
            document.body.appendChild(script);
        };

        const initializeGoogleSignIn = () => {
            if (!window.google) {
                console.error('Google Sign-In SDK not loaded');
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true
                });

                // สร้างปุ่ม Sign In ด้วย Google
                window.google.accounts.id.renderButton(
                    document.getElementById('google-signup-button'),
                    {
                        theme: 'outline',
                        size: 'large',
                        width: document.getElementById('google-signup-button').offsetWidth,
                        text: 'signup_with'
                    }
                );
            } catch (error) {
                console.error('Error initializing Google Sign-In:', error);
                toast.error("Failed to initialize Google Sign-In");
            }
        };

        loadGoogleScript();

        // Cleanup
        return () => {
            // ทำความสะอาด Google Sign-In เมื่อ component ถูก unmount
            if (window.google?.accounts?.id) {
                window.google.accounts.id.cancel();
            }
        };
    }, []);

    const handleGoogleResponse = async (response) => {
        if (!response.credential) {
            console.error('No credential received from Google');
            toast.error("Google sign-up failed");
            return;
        }

        try {
            // ถอดรหัส JWT token เพื่อดึงข้อมูลผู้ใช้
            const decoded = JSON.parse(atob(response.credential.split('.')[1]));

            const userData = {
                tokenId: response.credential,
                email: decoded.email,
                name: decoded.name,
                picture: decoded.picture
            };

            await onSuccess(userData);
        } catch (error) {
            console.error('Error processing Google response:', error);
            toast.error("Failed to process Google sign-up");
        }
    };

    return (
        <div className="w-full mb-6">
            {/* ปุ่ม Google Sign-In จะถูกแสดงที่นี่ */}
            <div
                id="google-signup-button"
                className="w-full"
            ></div>

            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-600">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
        </div>
    );
};

export default GoogleSignUp;