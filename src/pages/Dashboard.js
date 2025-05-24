// import React from "react";

// const Dashboard = () => {
//     return <h2>Dashboard</h2>;
// };

// export default Dashboard;


// import React from "react";
// import { logoutUser } from "../services/authService";

// const Dashboard = () => {
//     return (
//         <div>
//             <h2>Dashboard</h2>
//             <button onClick={logoutUser}>Logout</button>
//         </div>
//     );
// };

// export default Dashboard;


// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { logoutUser } from "../services/authService";

// const Dashboard = () => {
//     const { authData } = useContext(AuthContext);
//     console.log(authData);

//     return (
//         <div className="p-4">
//             <h1 className="text-3xl font-bold">Dashboard</h1>
//             <p className="mt-2">Welcome, role: <strong style={{ color: "black" }}>{authData?.role}</strong></p>
//             <button onClick={logoutUser}>Logout</button>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { motion } from "framer-motion";
import { getAllAssets } from "../api/assets";
import { getAllAssignments } from "../api/assignments";
import { getAllLocations } from "../api/locations";
import { getAllPersonnel } from "../api/personnel";
import { getAllPurchases } from "../api/purchases";
import { getAllTransfers } from "../api/transfers";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area
} from "recharts";
import {
    Package,
    Users,
    MapPin,
    ShoppingCart,
    ArrowRightLeft,
    TrendingUp,
    TrendingDown,
    Activity,
    Calendar,
    AlertTriangle,
    CheckCircle,
    Clock,
    LogOut,
    RotateCcw
} from "lucide-react";

const Dashboard = () => {
    const { authData } = useContext(AuthContext);
    const [dashboardData, setDashboardData] = useState({
        assets: [],
        assignments: [],
        locations: [],
        personnel: [],
        purchases: [],
        transfers: []
    });
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    // Mock data - replace with actual API calls
    // const mockData = {
    //     assets: [
    //         { id: 1, name: "Laptop Dell", type: "Electronics", status: "Available", quantity: 25 },
    //         { id: 2, name: "Rifle M4", type: "Weapon", status: "Assigned", quantity: 150 },
    //         { id: 3, name: "Vehicle HMMWV", type: "Vehicle", status: "Maintenance", quantity: 8 },
    //         { id: 4, name: "Radio Set", type: "Communication", status: "Available", quantity: 40 },
    //         { id: 5, name: "Generator", type: "Equipment", status: "Available", quantity: 12 }
    //     ],
    //     assignments: [
    //         { id: 1, personnelId: 1, assetId: 1, locationId: 1, assignmentDate: "2024-01-15", status: "Active" },
    //         { id: 2, personnelId: 2, assetId: 2, locationId: 2, assignmentDate: "2024-01-10", status: "Active" },
    //         { id: 3, personnelId: 3, assetId: 3, locationId: 1, assignmentDate: "2024-01-08", status: "Completed" }
    //     ],
    //     locations: [
    //         { id: 1, name: "Base Alpha", description: "Main Operations Base", region: "North" },
    //         { id: 2, name: "Base Beta", description: "Training Facility", region: "South" },
    //         { id: 3, name: "Outpost Charlie", description: "Forward Operating Base", region: "East" }
    //     ],
    //     personnel: [
    //         { id: 1, name: "John Smith", rank: "Captain", unit: "1st Battalion", contactInfo: "john@military.com" },
    //         { id: 2, name: "Jane Doe", rank: "Lieutenant", unit: "2nd Battalion", contactInfo: "jane@military.com" },
    //         { id: 3, name: "Mike Johnson", rank: "Sergeant", unit: "3rd Battalion", contactInfo: "mike@military.com" }
    //     ],
    //     purchases: [
    //         { id: 1, assetId: 1, locationId: 1, quantity: 10, purchaseDate: "2024-01-15", supplier: "Tech Corp" },
    //         { id: 2, assetId: 2, locationId: 2, quantity: 50, purchaseDate: "2024-01-10", supplier: "Defense Inc" },
    //         { id: 3, assetId: 3, locationId: 1, quantity: 2, purchaseDate: "2024-01-08", supplier: "Motors Ltd" }
    //     ],
    //     transfers: [
    //         { id: 1, assetId: 1, personnelId: 1, fromLocationId: 1, toLocationId: 2, transferDate: "2024-01-12", reason: "Deployment" },
    //         { id: 2, assetId: 2, personnelId: 2, fromLocationId: 2, toLocationId: 3, transferDate: "2024-01-09", reason: "Mission" }
    //     ]
    // };

    // useEffect(() => {
    //     fetchDashboardData();
    // }, []);

    // const fetchDashboardData = async () => {
    //     setLoading(true);
    //     setRefreshing(true);
    //     try {
    //         // Replace with actual API calls
    //         // const assets = await getAllAssets();
    //         // const assignments = await getAllAssignments();
    //         // const locations = await getAllLocations();
    //         // const personnel = await getAllPersonnel();
    //         // const purchases = await getAllPurchases();
    //         // const transfers = await getAllTransfers();

    //         setTimeout(() => {
    //             setDashboardData(mockData);
    //             setLoading(false);
    //             setRefreshing(false);
    //         }, 1000);
    //     } catch (error) {
    //         console.error("Error fetching dashboard data:", error);
    //         setLoading(false);
    //         setRefreshing(false);
    //     }
    // };

    const fetchAllDataParallel = async () => {
        try {
            setLoading(true);
            setError(null);

            // Parallel API calls - all execute simultaneously
            const [assets, assignments, locations, personnel, purchases, transfers] = await Promise.all([
                getAllAssets(),
                getAllAssignments(),
                getAllLocations(),
                getAllPersonnel(),
                getAllPurchases(),
                getAllTransfers()
            ]);

            setDashboardData({
                assets,
                assignments,
                locations,
                personnel,
                purchases,
                transfers
            });
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllDataParallel();
    }, []);

    // Analytics calculations
    const analytics = {
        totalAssets: dashboardData.assets.reduce((sum, asset) => sum + asset.quantity, 0),
        totalPersonnel: dashboardData.personnel.length,
        totalLocations: dashboardData.locations.length,
        totalPurchases: dashboardData.purchases.length,
        totalTransfers: dashboardData.transfers.length,
        activeAssignments: dashboardData.assignments.filter(a => a.status === 'Active').length,

        // Asset status distribution
        assetStatusData: dashboardData.assets.reduce((acc, asset) => {
            const status = asset.status;
            acc[status] = (acc[status] || 0) + asset.quantity;
            return acc;
        }, {}),

        // Asset type distribution
        assetTypeData: dashboardData.assets.reduce((acc, asset) => {
            const type = asset.type;
            acc[type] = (acc[type] || 0) + asset.quantity;
            return acc;
        }, {}),

        // Regional distribution
        regionData: dashboardData.locations.reduce((acc, location) => {
            const region = location.region;
            acc[region] = (acc[region] || 0) + 1;
            return acc;
        }, {}),

        // Monthly purchase trends (mock data)
        purchaseTrendData: [
            { month: 'Jan', purchases: 15, value: 45000 },
            { month: 'Feb', purchases: 22, value: 67000 },
            { month: 'Mar', purchases: 18, value: 52000 },
            { month: 'Apr', purchases: 28, value: 78000 },
            { month: 'May', purchases: 32, value: 95000 }
        ]
    };

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

    const StatCard = ({ title, value, icon: Icon, trend, color, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {trend && (
                        <div className={`flex items-center mt-2 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.positive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                            <span className="text-sm font-medium">{trend.value}%</span>
                            <span className="text-xs text-gray-500 ml-1">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </motion.div>
    );

    const ChartCard = ({ title, children, className = "" }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}
        >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            {children}
        </motion.div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Command Dashboard</h1>
                        <p className="text-gray-600 mt-1">
                            Welcome back, <span className="font-semibold text-blue-600">{authData?.role}</span>
                        </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                        <button
                            onClick={fetchAllDataParallel}
                            disabled={refreshing}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            <RotateCcw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                            <span>Refresh</span>
                        </button>
                        {/* <button
                            onClick={logoutUser}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button> */}
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Assets"
                        value={analytics.totalAssets}
                        icon={Package}
                        trend={{ positive: true, value: 12 }}
                        color="bg-blue-500"
                        delay={0}
                    />
                    <StatCard
                        title="Active Personnel"
                        value={analytics.totalPersonnel}
                        icon={Users}
                        trend={{ positive: true, value: 8 }}
                        color="bg-green-500"
                        delay={0.1}
                    />
                    <StatCard
                        title="Active Assignments"
                        value={analytics.activeAssignments}
                        icon={Activity}
                        trend={{ positive: false, value: 3 }}
                        color="bg-purple-500"
                        delay={0.2}
                    />
                    <StatCard
                        title="Total Locations"
                        value={analytics.totalLocations}
                        icon={MapPin}
                        color="bg-orange-500"
                        delay={0.3}
                    />
                </div>

                {/* Secondary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Recent Purchases"
                        value={analytics.totalPurchases}
                        icon={ShoppingCart}
                        trend={{ positive: true, value: 25 }}
                        color="bg-indigo-500"
                        delay={0.4}
                    />
                    <StatCard
                        title="Asset Transfers"
                        value={analytics.totalTransfers}
                        icon={ArrowRightLeft}
                        trend={{ positive: true, value: 15 }}
                        color="bg-cyan-500"
                        delay={0.5}
                    />
                    <StatCard
                        title="Maintenance Items"
                        value={dashboardData.assets.filter(a => a.status === 'Maintenance').reduce((sum, a) => sum + a.quantity, 0)}
                        icon={AlertTriangle}
                        color="bg-yellow-500"
                        delay={0.6}
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Asset Status Distribution */}
                    <ChartCard title="Asset Status Distribution">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={Object.entries(analytics.assetStatusData).map(([status, count]) => ({
                                        name: status,
                                        value: count
                                    }))}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {Object.entries(analytics.assetStatusData).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    {/* Asset Type Distribution */}
                    <ChartCard title="Asset Types">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={Object.entries(analytics.assetTypeData).map(([type, count]) => ({
                                type,
                                count
                            }))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Purchase Trends and Regional Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Purchase Trends */}
                    <ChartCard title="Purchase Trends" className="lg:col-span-2">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={analytics.purchaseTrendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip
                                    formatter={(value, name) => [
                                        name === 'purchases' ? value : `$${value.toLocaleString()}`,
                                        name === 'purchases' ? 'Purchases' : 'Value'
                                    ]}
                                />
                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="purchases"
                                    stackId="1"
                                    stroke="#3B82F6"
                                    fill="#3B82F6"
                                    fillOpacity={0.6}
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    {/* Regional Distribution */}
                    <ChartCard title="Regional Distribution">
                        <div className="space-y-4">
                            {Object.entries(analytics.regionData).map(([region, count], index) => (
                                <div key={region} className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">{region}</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${(count / Math.max(...Object.values(analytics.regionData))) * 100}%`,
                                                    backgroundColor: COLORS[index % COLORS.length]
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 w-6">{count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ChartCard>
                </div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[
                            { type: 'assignment', message: 'New asset assigned to John Smith', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
                            { type: 'purchase', message: '25 laptops purchased from Tech Corp', time: '4 hours ago', icon: ShoppingCart, color: 'text-blue-600' },
                            { type: 'transfer', message: 'Equipment transferred to Base Beta', time: '6 hours ago', icon: ArrowRightLeft, color: 'text-purple-600' },
                            { type: 'maintenance', message: 'Vehicle HMMWV scheduled for maintenance', time: '8 hours ago', icon: AlertTriangle, color: 'text-yellow-600' },
                            { type: 'assignment', message: 'Assignment completed by Jane Doe', time: '1 day ago', icon: CheckCircle, color: 'text-green-600' }
                        ].map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <activity.icon className={`w-5 h-5 mt-0.5 ${activity.color}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">{activity.message}</p>
                                    <div className="flex items-center mt-1 space-x-2">
                                        <Clock className="w-3 h-3 text-gray-400" />
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;