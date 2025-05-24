// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// const navLinks = [
//     { name: "Dashboard", path: "/" },
//     { name: "Assignments", path: "/assignments" },
//     { name: "Assets", path: "/assets" },
//     { name: "Personnel", path: "/personnel" },
//     { name: "Locations", path: "/locations" },
//     { name: "Transfers", path: "/transfers" },
//     { name: "Purchases", path: "/purchases" },
// ];

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <header className="bg-white shadow-md sticky top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//                 <Link to="/" className="text-2xl font-bold text-blue-600">MAMS</Link>
//                 <nav className="hidden md:flex space-x-6">
//                     {navLinks.map(link => (
//                         <Link key={link.name} to={link.path} className="text-gray-700 hover:text-blue-600 font-medium">
//                             {link.name}
//                         </Link>
//                     ))}
//                 </nav>
//                 <div className="md:hidden">
//                     <button onClick={() => setIsOpen(!isOpen)}>
//                         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                     </button>
//                 </div>
//             </div>

//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         className="md:hidden bg-white px-4 pb-4"
//                         initial={{ height: 0 }}
//                         animate={{ height: "auto" }}
//                         exit={{ height: 0 }}
//                     >
//                         <ul className="space-y-2">
//                             {navLinks.map(link => (
//                                 <li key={link.name}>
//                                     <Link to={link.path} className="block text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>
//                                         {link.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </header>
//     );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Home, ShoppingCart, Repeat, ClipboardList, Menu } from "lucide-react";
// import { logoutUser } from "../services/authService";

// const navItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
//     { name: "Purchases", path: "/purchases", icon: <ShoppingCart size={20} /> },
//     { name: "Transfers", path: "/transfers", icon: <Repeat size={20} /> },
//     { name: "Assignments & Expenditures", path: "/assignments", icon: <ClipboardList size={20} /> },
// ];

// const Navbar = () => {
//     const location = useLocation();
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <nav className="bg-white shadow-md fixed w-full top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//                 <div className="text-xl font-bold text-gray-800">MAMS</div>
//                 <div className="md:hidden">
//                     <button onClick={() => setIsOpen(!isOpen)}>
//                         <Menu size={24} />
//                     </button>
//                 </div>
//                 <ul className={`md:flex gap-6 ${isOpen ? "block" : "hidden"} absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none px-4 md:px-0 py-4 md:py-0`}>
//                     {navItems.map(({ name, path, icon }) => (
//                         <li key={name} className="py-2 md:py-0">
//                             <Link to={path} className="relative group text-gray-600 hover:text-blue-600 font-medium block">
//                                 <motion.div
//                                     whileHover={{ scale: 1 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className={`flex items-center gap-2 ${location.pathname === path ? "text-blue-600" : ""}`}
//                                 >
//                                     {icon}
//                                     <span>{name}</span>
//                                 </motion.div>
//                             </Link>
//                         </li>
//                     ))}
//                     <li className=" relative group text-gray-600 hover:text-red-600 font-medium block py-2 md:py-0 hover:cursor-pointer" onClick={logoutUser}>
//                         <motion.div
//                             whileHover={{ scale: 1 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             logout
//                         </motion.div>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
//=============================================== stable ========================

// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Home, ShoppingCart, Repeat, ClipboardList, Menu, X, LogOut, User } from "lucide-react";
// import { logoutUser } from "../services/authService";

// const navItems = [
//     { name: "Dashboard", path: "/dashboard", icon: Home },
//     { name: "Purchases", path: "/purchases", icon: ShoppingCart },
//     { name: "Transfers", path: "/transfers", icon: Repeat },
//     { name: "Assignments & Expenditures", path: "/assignments", icon: ClipboardList },
// ];

// const Navbar = () => {
//     const location = useLocation();
//     const [isOpen, setIsOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);

//     // Handle scroll effect
//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 20);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     // Close mobile menu when route changes
//     useEffect(() => {
//         setIsOpen(false);
//     }, [location]);

//     const handleLogout = () => {
//         logoutUser();
//         setIsOpen(false);
//     };

//     return (
//         <>
//             {/* Main Navbar */}
//             <motion.nav
//                 initial={{ y: -100 }}
//                 animate={{ y: 0 }}
//                 className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
//                     ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
//                     : "bg-white shadow-sm border-b border-gray-200"
//                     }`}
//             >
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-16">
//                         {/* Logo */}
//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="flex items-center space-x-2"
//                         >
//                             <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                                 <span className="text-white font-bold text-sm">M</span>
//                             </div>
//                             <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

//                             </span>
//                         </motion.div>

//                         {/* Desktop Navigation */}
//                         <div className="hidden md:flex items-center space-x-1">
//                             {navItems.map(({ name, path, icon: Icon }, index) => {
//                                 const isActive = location.pathname === path;
//                                 return (
//                                     <motion.div
//                                         key={path}
//                                         initial={{ opacity: 0, y: -20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ delay: index * 0.1 }}
//                                     >
//                                         <Link
//                                             to={path}
//                                             className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 group ${isActive
//                                                 ? "bg-blue-50 text-blue-600 shadow-sm"
//                                                 : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                                                 }`}
//                                         >
//                                             <Icon size={18} />
//                                             <span className="font-medium">{name}</span>
//                                             {isActive && (
//                                                 <motion.div
//                                                     layoutId="activeTab"
//                                                     className="absolute inset-0 bg-blue-50 rounded-lg border border-blue-200/50"
//                                                     style={{ zIndex: -1 }}
//                                                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                                                 />
//                                             )}
//                                         </Link>
//                                     </motion.div>
//                                 );
//                             })}
//                         </div>

//                         {/* Desktop Logout */}
//                         <div className="hidden md:flex items-center space-x-4">
//                             <motion.button
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 onClick={handleLogout}
//                                 className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
//                             >
//                                 <LogOut size={18} />
//                                 <span className="font-medium">Logout</span>
//                             </motion.button>
//                         </div>

//                         {/* Mobile menu button */}
//                         <motion.button
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             onClick={() => setIsOpen(!isOpen)}
//                             className="md:hidden relative p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
//                         >
//                             <AnimatePresence mode="wait">
//                                 {isOpen ? (
//                                     <motion.div
//                                         key="close"
//                                         initial={{ rotate: -90, opacity: 0 }}
//                                         animate={{ rotate: 0, opacity: 1 }}
//                                         exit={{ rotate: 90, opacity: 0 }}
//                                         transition={{ duration: 0.2 }}
//                                     >
//                                         <X size={24} />
//                                     </motion.div>
//                                 ) : (
//                                     <motion.div
//                                         key="menu"
//                                         initial={{ rotate: 90, opacity: 0 }}
//                                         animate={{ rotate: 0, opacity: 1 }}
//                                         exit={{ rotate: -90, opacity: 0 }}
//                                         transition={{ duration: 0.2 }}
//                                     >
//                                         <Menu size={24} />
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </motion.button>
//                     </div>
//                 </div>
//             </motion.nav>

//             {/* Mobile Menu Overlay */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <>
//                         {/* Backdrop */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             onClick={() => setIsOpen(false)}
//                             className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
//                         />

//                         {/* Mobile Menu */}
//                         <motion.div
//                             initial={{ opacity: 0, x: "100%" }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: "100%" }}
//                             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                             className="fixed top-16 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden overflow-hidden"
//                         >
//                             <div className="flex flex-col h-full">
//                                 {/* Header */}
//                                 <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
//                                     <div className="flex items-center space-x-3">
//                                         <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                                             <User size={20} className="text-white" />
//                                         </div>
//                                         <div>
//                                             <h3 className="font-semibold text-gray-900">Welcome</h3>
//                                             <p className="text-sm text-gray-600">Manage your assets</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Navigation Items */}
//                                 <div className="flex-1 py-6">
//                                     {navItems.map(({ name, path, icon: Icon }, index) => {
//                                         const isActive = location.pathname === path;
//                                         return (
//                                             <motion.div
//                                                 key={path}
//                                                 initial={{ opacity: 0, x: 50 }}
//                                                 animate={{ opacity: 1, x: 0 }}
//                                                 transition={{ delay: index * 0.1 }}
//                                             >
//                                                 <Link
//                                                     to={path}
//                                                     className={`flex items-center space-x-4 px-6 py-4 mx-4 rounded-xl transition-all duration-200 ${isActive
//                                                         ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
//                                                         : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
//                                                         }`}
//                                                 >
//                                                     <Icon size={20} />
//                                                     <span className="font-medium">{name}</span>
//                                                     {isActive && (
//                                                         <motion.div
//                                                             layoutId="activeMobile"
//                                                             className="ml-auto w-2 h-2 bg-white rounded-full"
//                                                         />
//                                                     )}
//                                                 </Link>
//                                             </motion.div>
//                                         );
//                                     })}
//                                 </div>

//                                 {/* Footer */}
//                                 <div className="p-6 border-t border-gray-100 bg-gray-50">
//                                     <motion.button
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ delay: 0.4 }}
//                                         onClick={handleLogout}
//                                         className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors duration-200 font-medium shadow-lg"
//                                     >
//                                         <LogOut size={18} />
//                                         <span>Logout</span>
//                                     </motion.button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </>
//                 )}
//             </AnimatePresence>

//             {/* Spacer for fixed navbar */}
//             <div className="h-16" />
//         </>
//     );
// };

// export default Navbar;

//=================================================================================================

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingCart, Repeat, ClipboardList, Menu, X, LogOut, User, UserPlus } from "lucide-react";
import { logoutUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user } = useContext(AuthContext);

    // Base navigation items for all users
    const baseNavItems = [
        { name: "Dashboard", path: "/dashboard", icon: Home },
        { name: "Purchases", path: "/purchases", icon: ShoppingCart },
        { name: "Transfers", path: "/transfers", icon: Repeat },
        { name: "Assignments", path: "/assignments", icon: ClipboardList },
    ];

    // Add Register link only for admin users
    const navItems = localStorage.getItem("role") === "ADMIN"
        ? [...baseNavItems, { name: "Register", path: "/register", icon: UserPlus }]
        : baseNavItems;

    // Handle scroll effect
    useEffect(() => {
        // console.log(localStorage.getItem("role"));
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const handleLogout = () => {
        logoutUser();
        setIsOpen(false);
    };

    return (
        <>
            {/* Main Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
                    : "bg-white shadow-sm border-b border-gray-200"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-2"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

                            </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map(({ name, path, icon: Icon }, index) => {
                                const isActive = location.pathname === path;
                                return (
                                    <motion.div
                                        key={path}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={path}
                                            className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 group ${isActive
                                                ? "bg-blue-50 text-blue-600 shadow-sm"
                                                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            <Icon size={18} />
                                            <span className="font-medium">{name}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-blue-50 rounded-lg border border-blue-200/50"
                                                    style={{ zIndex: -1 }}
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Desktop User Info & Logout */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* User Role Badge */}
                            {user?.role && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === "ADMIN"
                                        ? "bg-purple-100 text-purple-800"
                                        : user.role === "BASE_COMMANDER"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-green-100 text-green-800"
                                        }`}
                                >
                                    {user.role.replace(/_/g, ' ')}
                                </motion.div>
                            )}

                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                            >
                                <LogOut size={18} />
                                <span className="font-medium"></span>
                            </motion.button>
                        </div>

                        {/* Mobile menu button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden relative p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Mobile Menu */}
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-16 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                            <User size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {user?.fullName || "Welcome"}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {user?.role ? user.role.replace(/_/g, ' ') : "Manage your assets"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Items */}
                                <div className="flex-1 py-6">
                                    {navItems.map(({ name, path, icon: Icon }, index) => {
                                        const isActive = location.pathname === path;
                                        return (
                                            <motion.div
                                                key={path}
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link
                                                    to={path}
                                                    className={`flex items-center space-x-4 px-6 py-4 mx-4 rounded-xl transition-all duration-200 ${isActive
                                                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                                        }`}
                                                >
                                                    <Icon size={20} />
                                                    <span className="font-medium">{name}</span>
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="activeMobile"
                                                            className="ml-auto w-2 h-2 bg-white rounded-full"
                                                        />
                                                    )}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Footer */}
                                <div className="p-6 border-t border-gray-100 bg-gray-50">
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors duration-200 font-medium shadow-lg"
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer for fixed navbar */}
            <div className="h-16" />
        </>
    );
};

export default Navbar;