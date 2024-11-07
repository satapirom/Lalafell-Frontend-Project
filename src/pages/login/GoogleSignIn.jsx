import React, { useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

const GoogleSignIn = ({ onSuccess }) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    // Check if it's correctly loaded from .env
    console.log('Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);

    const handleGoogleResponse = useCallback(async (response) => {
        if (response.credential) {
            try {
                await onSuccess({ tokenId: response.credential });
            } catch (error) {
                console.error("Google sign-in error:", error);
                toast.error("การเข้าสู่ระบบด้วย Google ล้มเหลว กรุณาลองใหม่อีกครั้ง");
            }
        } else {
            toast.error("ไม่ได้รับข้อมูลยืนยันตัวตนจาก Google กรุณาลองใหม่");
        }
    }, [onSuccess]);

    useEffect(() => {
        // Load the Google Identity Services script
        const loadGoogleScript = () => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="https://accounts.google.com/gsi/client"]`)) {
                    resolve();
                    return;
                }

                const script = document.createElement("script");
                script.src = "https://accounts.google.com/gsi/client";
                script.async = true;
                script.defer = true;
                script.onload = resolve;
                script.onerror = () => reject(new Error("Failed to load Google Sign-In script"));
                document.head.appendChild(script);
            });
        };

        const initializeGoogle = async () => {
            try {
                await loadGoogleScript();

                // Initialize Google Identity Services
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                // Render the custom Google Sign-In button
                window.google.accounts.id.renderButton(
                    document.getElementById("google-signin-button"),
                    {
                        theme: "outline",
                        size: "large",
                        width: "100%",
                        logo_alignment: "center",
                    }
                );
            } catch (error) {
                console.error("Google initialization error:", error);
                toast.error("ไม่สามารถโหลด Google Sign-In ได้ กรุณารีเฟรชหน้าเว็บ");
            }
        };

        if (clientId) {
            initializeGoogle();
        } else {
            console.error("VITE_GOOGLE_CLIENT_ID is not defined");
            toast.error("การตั้งค่า Google Sign-In ไม่ถูกต้อง");
        }

        // Cleanup function
        return () => {
            const googleScript = document.querySelector(`script[src="https://accounts.google.com/gsi/client"]`);
            if (googleScript) {
                googleScript.remove();
            }
        };
    }, [clientId, handleGoogleResponse]);

    return (
        <div className="w-full mb-6">
            <div
                id="google-signin-button"
                className="w-full flex justify-center"
            ></div>
            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-600">หรือ</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
        </div>
    );
};

export default GoogleSignIn;


