// Login.jsx
import React, { useState } from "react";
import InputField from "../../components/register/InputField";
import axiosInstance from "../../utils/axiosInstance";
import formValidate from "../../validations/FormValidate";
import WelcomeBanner from "../../components/register/WelcomeBanner";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/register/Button";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { setIsLoggedIn } = useAuth(); // ใช้ useAuth เพื่อเข้าถึง setIsLoggedIn
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/api/v1/login', {
                username: formData.username,
                password: formData.password,
            });

            if (response.status === 200) {
                setIsLoggedIn(true);
                console.log("Login successful");
                navigate('/'); // นำทางไปที่หน้า Home
            } else {
                console.log("Login failed");
            }

        } catch (error) {
            console.log("An error occurred: ", error.message);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 w-full max-w-screen-laptopl mt-16 bg-white shadow-lg rounded-lg overflow-hidden laptop:grid-cols-2">
                <WelcomeBanner />
                <div className="p-8 lg:p-12">
                    <h2 className="text-2xl laptop:text-3xl font-bold text-gray-800 mb-4">Sign In to Your Account</h2>
                    <p className="text-gray-600 mb-6">Welcome back! Please log in to continue.</p>

                    <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-6">
                        <img src="../images/icon-google1.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {[
                            {
                                label: "username",
                                type: "text",
                                name: "username",
                                value: formData.username,
                                validation: formValidate.username
                            },
                            {
                                label: "Password",
                                type: showPassword ? "text" : "password",
                                name: "password",
                                value: formData.password,
                                validation: formValidate.password
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
                        >
                            Sign In
                        </Button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?
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


