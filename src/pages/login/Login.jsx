// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import InputField from "../../components/register/InputField";
import FormValidate from "../../validations/FormValidate.js";
import toast from 'react-hot-toast';
import WelcomeBanner from "../../components/register/WelcomeBanner";
import Button from "../../components/register/Button";
import { useAuth } from "../../contexts/AuthContext";
import { AuthService } from "../../utils/axiosInstance";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // ถ้ามี token อยู่แล้วและอยู่ที่หน้า login ให้ redirect ไปหน้า home
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await AuthService.login({
                username: formData.username,
                password: formData.password,
            });

            if (response.status === 200) {
                login();
                toast.success("Login successful");

                // ตรวจสอบ returnUrl จาก URL parameters
                const params = new URLSearchParams(location.search);
                const returnUrl = params.get('returnUrl');

                if (returnUrl) {
                    navigate(decodeURIComponent(returnUrl));
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Invalid username or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 w-full max-w-screen-laptopl mt-20 overflow-hidden laptop:grid-cols-2">
                <WelcomeBanner />
                <div className="p-8 lg:p-12">
                    <h2 className="text-2xl laptop:text-3xl font-bold text-gray-800 mb-4">
                        Sign In to Your Account
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Welcome back! Please log in to continue.
                    </p>

                    <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white mb-6">
                        <img
                            src="../images/icon-google1.svg"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                        Sign in with Google
                    </button>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {[
                            {
                                label: "Username",
                                type: "text",
                                name: "username",
                                value: formData.username,
                                validation: FormValidate.username
                            },
                            {
                                label: "Password",
                                type: showPassword ? "text" : "password",
                                name: "password",
                                value: formData.password,
                                validation: FormValidate.password
                            }
                        ].map((field, index) => (
                            <InputField
                                key={index}
                                label={field.label}
                                type={field.type}
                                name={field.name}
                                value={field.value}
                                validation={field.validation}
                                onChange={handleChange}
                                showPassword={field.name === "password" ? showPassword : undefined}
                                togglePasswordVisibility={field.name === "password" ? togglePasswordVisibility : undefined}
                            />
                        ))}

                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;


