
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff, Lock, User, Shield, AlertCircle, CheckCircle } from "lucide-react";
import styles from "../index.css"

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { token } = await loginUser({ username, password });
            login(token);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Geometric shapes */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/20 to-blue-100/20 rounded-full blur-3xl"></div>

                {/* Floating elements */}
                <div className="absolute top-10 right-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="absolute bottom-10 left-10 w-6 h-6 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 left-10 w-3 h-3 bg-indigo-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/3 right-10 w-5 h-5 bg-pink-400 rounded-full animate-bounce delay-300"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">

                {/* Left Side - Branding/Hero */}
                <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Shield size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                MAMS
                            </h1>
                            <p className="text-gray-600 text-lg">Military Asset Management System</p>
                        </div>
                    </div>

                    {/* Hero Content */}
                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold text-gray-800 leading-tight">
                            Secure Access to Your
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                                Military Assets
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Manage, track, and secure your military equipment with our advanced
                            asset management platform. Built for professionals who demand excellence.
                        </p>

                        {/* Features */}
                        <div className="space-y-4 pt-4">
                            {[
                                "Advanced Security Protocols",
                                "Real-time Asset Tracking",
                                "Comprehensive Reporting",
                                "Multi-level Access Control"
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="text-green-500 w-5 h-5" />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Decorative Image Placeholder */}
                    <div className="mt-8">
                        <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-inner">
                            <div className="text-center space-y-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                                    <Shield size={40} className="text-white" />
                                </div>
                                <p className="text-gray-600 font-medium">Trusted by Military Organizations Worldwide</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex justify-center lg:justify-end">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                                <Shield size={32} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                MAMS
                            </h1>
                            <p className="text-gray-600">Military Asset Management</p>
                        </div>

                        {/* Login Card */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                                <p className="text-gray-600">Please sign in to your account</p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                                    <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Username Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Username</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                {/* <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-gray-600">Remember me</span>
                                    </label>
                                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                        Forgot password?
                                    </a>
                                </div> */}

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Signing In...</span>
                                        </div>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </form>

                            {/* Footer */}
                            <div className="text-center pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-600">
                                    Protected by advanced security protocols
                                </p>
                                <div className="flex items-center justify-center space-x-2 mt-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-xs text-gray-500">System Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-500">
                                Need access? Contact your system administrator
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Elements */}
            <div className="absolute bottom-4 right-4 hidden lg:flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">Secure Connection</span>
            </div>
        </div>
    );
};

export default LoginPage;



// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import { AuthContext } from "../context/AuthContext";
// import styles from "../index.css"

// const LoginPage = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { token } = await loginUser({ username, password });
//             login(token);
//             navigate("/dashboard");
//         } catch (err) {
//             alert("Invalid credentials");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//                 <input
//                     className="w-full p-2 mb-4 border rounded"
//                     placeholder="Username"
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <input
//                     className="w-full p-2 mb-4 border rounded"
//                     type="password"
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default LoginPage;
