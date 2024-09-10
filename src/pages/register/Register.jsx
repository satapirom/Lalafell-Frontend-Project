import React, { useState } from "react";
import InputField from "../../components/register/InputField";
import Terms from "./Terms";
import axiosInstance from "../../utils/axiosInstance";
import formValidate from "../../validations/FormValidate";
import WelcomeBanner from "../../components/register/WelcomeBanner";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/register/Button";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        try {
            const response = await axiosInstance.post('/api/v1/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                termsAccepted: formData.termsAccepted,
                termsVersion: "1.0"
            });

            if (response.status === 201) {
                console.log("Registration successful");
                navigate('/login');
            } else {
                console.log("Registration failed");
            }

        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log("Username or email already exists");
            } else {
                console.log("An error occurred: ", error.message);
            }
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 w-full max-w-screen-laptopl mt-16 bg-white shadow-lg rounded-lg overflow-hidden laptop:grid-cols-2">
                <WelcomeBanner />
                <div className="p-8 lg:p-12">
                    <h2 className="text-xl laptop:text-2xl font-bold text-gray-800">Create Your Account</h2>
                    <p className="text-gray-600 mt-2 mb-4">Welcome to the best place for custom keyboards!</p>

                    <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <img src="../images/icon-google1.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Sign up with Google
                    </button>

                    <div className="mt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                {
                                    label: "Username",
                                    type: "text",
                                    name: "username",
                                    value: formData.username,
                                    validation: formValidate.username
                                },
                                {
                                    label: "Email",
                                    type: "email",
                                    name: "email",
                                    value: formData.email,
                                    validation: formValidate.email
                                },
                                {
                                    label: "Password",
                                    type: showPassword ? "text" : "password",
                                    name: "password",
                                    value: formData.password,
                                    validation: formValidate.password
                                },
                                {
                                    label: "Confirm Password",
                                    type: "password",
                                    name: "confirmPassword",
                                    value: formData.confirmPassword,
                                    validation: formValidate.confirmPassword
                                },
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

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                    I accept the <span onClick={() => setShowTerms(true)} className="text-blue-500 hover:underline cursor-pointer">terms & conditions</span>
                                </label>
                            </div>
                            <Button
                                type="submit"
                            >
                                Sign up
                            </Button>
                        </form>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <Terms isOpen={showTerms} onClose={() => setShowTerms(false)} />
        </div>
    );
};

export default Register;







