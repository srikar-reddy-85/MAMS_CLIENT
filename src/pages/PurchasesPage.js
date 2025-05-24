import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Calendar,
    Package,
    MapPin,
    Truck,
    Edit,
    Trash2,
    X,
    Filter,
    Download,
    AlertCircle
} from "lucide-react";
import { createPurchase, deletePurchase, getAllPurchases } from "../api/purchases";

// Mock API functions - replace with your actual API calls
const mockPurchases = [
    {
        id: 1,
        assetId: 101,
        locationId: 201,
        quantity: 50,
        purchaseDate: "2024-01-15",
        supplier: "Tech Solutions Inc"
    },
    {
        id: 2,
        assetId: 102,
        locationId: 202,
        quantity: 25,
        purchaseDate: "2024-01-10",
        supplier: "Office Supplies Co"
    },
    {
        id: 3,
        assetId: 103,
        locationId: 201,
        quantity: 100,
        purchaseDate: "2024-01-08",
        supplier: "Industrial Equipment Ltd"
    }
];

const PurchasesPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [formData, setFormData] = useState({
        assetId: "",
        locationId: "",
        quantity: "",
        purchaseDate: "",
        supplier: ""
    });

    // Simulate API call
    useEffect(() => {
        const fetchPurchases = async () => {
            setLoading(true);
            // Replace with: const response = await getAllPurchases();
            setTimeout(async () => {
                const data = await getAllPurchases();
                setPurchases(data);
                // setPurchases(mockPurchases);
                setLoading(false);
            }, 1000);
        };
        fetchPurchases();
    }, []);

    const filteredPurchases = purchases.filter(purchase =>
        purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.assetId.toString().includes(searchTerm) ||
        purchase.locationId.toString().includes(searchTerm)
    );

    const handleCreatePurchase = async (e) => {
        e.preventDefault();
        try {
            // Validate required fields
            if (!formData.assetId || !formData.locationId || !formData.quantity || !formData.purchaseDate) {
                alert('Please fill in all required fields');
                return;
            }

            // Replace with: const newPurchase = await createPurchase(formData);
            // const newPurchase = {
            //     id: Date.now(),
            //     ...formData,
            //     assetId: parseInt(formData.assetId),
            //     locationId: parseInt(formData.locationId),
            //     quantity: parseInt(formData.quantity)
            // };
            const newPurchase = await createPurchase(formData);
            setPurchases([...purchases, newPurchase]);
            setShowCreateModal(false);
            resetForm();
        } catch (error) {
            console.error("Error creating purchase:", error);
        }
    };

    const handleDeletePurchase = async (id) => {
        try {
            // Replace with: await deletePurchase(id);
            await deletePurchase(id);
            setPurchases(purchases.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting purchase:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            assetId: "",
            locationId: "",
            quantity: "",
            purchaseDate: "",
            supplier: ""
        });
    };

    const openEditModal = (purchase) => {
        setSelectedPurchase(purchase);
        setFormData({
            assetId: purchase.assetId.toString(),
            locationId: purchase.locationId.toString(),
            quantity: purchase.quantity.toString(),
            purchaseDate: purchase.purchaseDate,
            supplier: purchase.supplier
        });
        setShowEditModal(true);
    };

    const PurchaseCard = ({ purchase, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Asset ID: {purchase.assetId}</h3>
                            <p className="text-sm text-gray-500">Purchase #{purchase.id}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => openEditModal(purchase)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDeletePurchase(purchase.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Location: {purchase.locationId}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Qty: {purchase.quantity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 truncate">{purchase.supplier}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                    </span>
                    <span className="text-xs text-gray-500">
                        {Math.floor(Math.random() * 30)} days ago
                    </span>
                </div>
            </div>
        </motion.div>
    );

    // const Modal = ({ isOpen, onClose, title, children }) => (
    //     <AnimatePresence>
    //         {isOpen && (
    //             <motion.div
    //                 initial={{ opacity: 0 }}
    //                 animate={{ opacity: 1 }}
    //                 exit={{ opacity: 0 }}
    //                 className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    //                 onClick={onClose}
    //             >
    //                 <motion.div
    //                     initial={{ scale: 0.95, opacity: 0 }}
    //                     animate={{ scale: 1, opacity: 1 }}
    //                     exit={{ scale: 0.95, opacity: 0 }}
    //                     onClick={(e) => e.stopPropagation()}
    //                     className="bg-white rounded-xl shadow-xl w-full max-w-md"
    //                 >
    //                     <div className="flex items-center justify-between p-6 border-b border-gray-200">
    //                         <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    //                         <button
    //                             onClick={onClose}
    //                             className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
    //                         >
    //                             <X className="w-5 h-5" />
    //                         </button>
    //                     </div>
    //                     {children}
    //                 </motion.div>
    //             </motion.div>
    //         )}
    //     </AnimatePresence>
    // );

    const Modal = ({ isOpen, onClose, title, children }) => {
        if (!isOpen) return null;

        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                onClick={onClose}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-xl shadow-xl w-full max-w-md"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        );
    };

    const PurchaseForm = ({ onSubmit, buttonText }) => (
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Asset ID
                    </label>
                    <input
                        type="number"
                        required
                        value={formData.assetId}
                        onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter asset ID"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location ID
                    </label>
                    <input
                        type="number"
                        required
                        value={formData.locationId}
                        onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter location ID"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                    </label>
                    <input
                        type="number"
                        required
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter quantity"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Purchase Date
                    </label>
                    <input
                        type="date"
                        required
                        value={formData.purchaseDate}
                        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier
                </label>
                <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter supplier name (optional)"
                />
            </div>

            <div className="flex space-x-3 pt-4">
                <button
                    onClick={onSubmit}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                    {buttonText}
                </button>
                <button
                    onClick={() => {
                        setShowCreateModal(false);
                        setShowEditModal(false);
                        resetForm();
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading purchases...</p>
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
                    className="mb-8"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Purchases</h1>
                            <p className="text-gray-600 mt-1">Manage and track all asset purchases</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <Download className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Purchase</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by supplier, asset ID, or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </button>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
                >
                    {[
                        { label: "Total Purchases", value: purchases.length, icon: Package, color: "blue" },
                        { label: "This Month", value: "12", icon: Calendar, color: "green" },
                        { label: "Total Quantity", value: purchases.reduce((acc, p) => acc + p.quantity, 0), icon: Package, color: "purple" },
                        { label: "Suppliers", value: new Set(purchases.map(p => p.supplier)).size, icon: Truck, color: "orange" }
                    ].map((stat, index) => (
                        <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Purchases Grid */}
                {filteredPurchases.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
                    >
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Purchases Found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm ? "No purchases match your search criteria." : "Get started by adding your first purchase."}
                        </p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Purchase</span>
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPurchases.map((purchase, index) => (
                            <PurchaseCard key={purchase.id} purchase={purchase} index={index} />
                        ))}
                    </div>
                )}

                {/* Create Purchase Modal */}
                <Modal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    title="Create New Purchase"
                >
                    <PurchaseForm onSubmit={handleCreatePurchase} buttonText="Create Purchase" />
                </Modal>

                {/* Edit Purchase Modal */}
                <Modal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    title="Edit Purchase"
                >
                    <PurchaseForm
                        onSubmit={() => {
                            // Handle edit logic here
                            setShowEditModal(false);
                            resetForm();
                        }}
                        buttonText="Update Purchase"
                    />
                </Modal>
            </div>
        </div>
    );
};

export default PurchasesPage;
