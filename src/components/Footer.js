// import React from "react";

// const Footer = () => {
//     return (
//         <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
//             <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
//                 <div>
//                     <h3 className="text-lg font-semibold mb-2 text-white">About MAMS</h3>
//                     <p>Military Asset Management System to track and manage all assignments, assets, and logistics with ease and security.</p>
//                 </div>

//                 <div>
//                     <h3 className="text-lg font-semibold mb-2 text-white">Quick Links</h3>
//                     <ul className="space-y-2">
//                         <li><a href="/assignments" className="hover:text-blue-400">Assignments</a></li>
//                         <li><a href="/assets" className="hover:text-blue-400">Assets</a></li>
//                         <li><a href="/personnel" className="hover:text-blue-400">Personnel</a></li>
//                         <li><a href="/purchases" className="hover:text-blue-400">Purchases</a></li>
//                     </ul>
//                 </div>

//                 <div>
//                     <h3 className="text-lg font-semibold mb-2 text-white">Contact</h3>
//                     <p>Email: info@mams.gov</p>
//                     <p>Phone: +91 99999 88888</p>
//                     <p>Address: HQ Building, Sector 12, India</p>
//                 </div>
//             </div>

//             <div className="text-center mt-8 text-sm text-gray-500">© 2025 MAMS. All rights reserved.</div>
//         </footer>
//     );
// };

import React from "react";

// Your existing Footer component
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">About MAMS</h3>
                    <p>Military Asset Management System to track and manage all assignments, assets, and logistics with ease and security.</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/assignments" className="hover:text-blue-400">Assignments</a></li>
                        <li><a href="/assets" className="hover:text-blue-400">Assets</a></li>
                        <li><a href="/personnel" className="hover:text-blue-400">Personnel</a></li>
                        <li><a href="/purchases" className="hover:text-blue-400">Purchases</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Contact</h3>
                    <p>Email: info@mams.gov</p>
                    <p>Phone: +91 99999 88888</p>
                    <p>Address: HQ Building, Sector 12, India</p>
                </div>
            </div>

            <div className="text-center mt-8 text-sm text-gray-500">© 2025 MAMS. All rights reserved.</div>
        </footer>
    );
};

export default Footer;