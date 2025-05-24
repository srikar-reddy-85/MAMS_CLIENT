// import React from "react";

// const TransfersPage = () => {
//     return <h2>Transfers</h2>;
// };

// export default TransfersPage;

// src/pages/TransfersPage.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TransfersPage = () => {
//     const [transfers, setTransfers] = useState([]);

//     useEffect(() => {
//         const fetchTransfers = async () => {
//             const token = localStorage.getItem("token");
//             const response = await axios.get("http://localhost:8080/api/v1/transfers", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             console.log(response.data);
//             setTransfers(response.data);
//         };
//         fetchTransfers();
//     }, []);

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-semibold mb-4">Transfers</h1>
//             <ul className="list-disc list-inside">
//                 {transfers.map((item) => (
//                     <li key={item.id}>
//                         Asset: {item.assetId} - From: {item.fromLocationId} - To: {item.toLocationId}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TransfersPage;

import React, { useEffect, useState } from "react";
import { getAllTransfers, createTransfer, deleteTransfer } from "../api/transfers";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { ArrowRightLeft, MapPin, Calendar, User, Package, Trash2, Plus, FileText, Users } from "lucide-react";

const TransfersPage = () => {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState({
        assetId: "",
        personnelId: "",
        fromLocationId: "",
        toLocationId: "",
        transferDate: "",
        reason: ""
    });

    useEffect(() => {
        loadTransfers();
    }, []);

    const loadTransfers = async () => {
        try {
            setLoading(true);
            const data = await getAllTransfers();
            setTransfers(data);
        } catch (err) {
            console.error("Failed to fetch transfers", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setCreating(true);
            await createTransfer({
                ...formData,
                transferDate: formData.transferDate || new Date().toISOString().split('T')[0]
            });
            setFormData({
                assetId: "",
                personnelId: "",
                fromLocationId: "",
                toLocationId: "",
                transferDate: "",
                reason: ""
            });
            await loadTransfers();
        } catch (err) {
            console.error("Transfer creation failed:", err);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this transfer record?")) {
            try {
                await deleteTransfer(id);
                await loadTransfers();
            } catch (err) {
                console.error("Deletion failed:", err);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 mt-10">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                {/* <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full mb-4">
                        <ArrowRightLeft className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        Transfer Management
                    </h1>
                    <p className="text-gray-600 text-lg">Manage asset and personnel transfers between locations</p>
                </div> */}

                {/* Create Transfer Form */}
                <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 rounded-t-lg">
                        <div className="flex items-center space-x-3">
                            <Plus className="h-6 w-6 text-white" />
                            <h2 className="text-xl font-semibold text-white">Create New Transfer</h2>
                        </div>
                    </div>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <Package className="h-4 w-4 mr-2 text-teal-600" />
                                        Asset ID
                                    </label>
                                    <Input
                                        name="assetId"
                                        type="number"
                                        placeholder="Enter Asset ID"
                                        value={formData.assetId}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <Users className="h-4 w-4 mr-2 text-teal-600" />
                                        Personnel ID
                                    </label>
                                    <Input
                                        name="personnelId"
                                        type="number"
                                        placeholder="Enter Personnel ID"
                                        value={formData.personnelId}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-red-600" />
                                        From Location ID
                                    </label>
                                    <Input
                                        name="fromLocationId"
                                        type="number"
                                        placeholder="Enter From Location ID"
                                        value={formData.fromLocationId}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-green-600" />
                                        To Location ID
                                    </label>
                                    <Input
                                        name="toLocationId"
                                        type="number"
                                        placeholder="Enter To Location ID"
                                        value={formData.toLocationId}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                                        Transfer Date
                                    </label>
                                    <Input
                                        name="transferDate"
                                        type="date"
                                        value={formData.transferDate}
                                        onChange={handleChange}
                                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2 lg:col-span-1">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <FileText className="h-4 w-4 mr-2 text-teal-600" />
                                        Reason
                                    </label>
                                    <Input
                                        name="reason"
                                        type="text"
                                        placeholder="Enter transfer reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={creating}
                                    className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium px-8 py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
                                >
                                    {creating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <ArrowRightLeft className="h-4 w-4 mr-2" />

                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transfers List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Transfer Records</h2>
                        <div className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                            Total: {transfers.length}
                        </div>
                    </div>

                    {transfers.length === 0 ? (
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-12 text-center">
                                <ArrowRightLeft className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Transfers Found</h3>
                                <p className="text-gray-500">Create your first transfer record to get started.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {transfers.map((transfer) => (
                                <Card key={transfer.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col space-y-4">
                                            {/* Header with transfer direction */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                                                            <MapPin className="h-3 w-3 mr-1" />
                                                            From: {transfer.fromLocationId}
                                                        </div>
                                                        <ArrowRightLeft className="h-4 w-4 text-teal-600" />
                                                        <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                            <MapPin className="h-3 w-3 mr-1" />
                                                            To: {transfer.toLocationId}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(transfer.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />

                                                </Button>
                                            </div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Package className="h-4 w-4 mr-1 text-teal-600" />
                                                        Asset
                                                    </div>
                                                    <div className="font-semibold text-gray-800">ID: {transfer.assetId}</div>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <User className="h-4 w-4 mr-1 text-teal-600" />
                                                        Personnel
                                                    </div>
                                                    <div className="font-semibold text-gray-800">ID: {transfer.personnelId}</div>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Calendar className="h-4 w-4 mr-1 text-teal-600" />
                                                        Date
                                                    </div>
                                                    <div className="font-semibold text-gray-800">
                                                        {transfer.transferDate ? new Date(transfer.transferDate).toLocaleDateString() : 'N/A'}
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <FileText className="h-4 w-4 mr-1 text-teal-600" />
                                                        Reason
                                                    </div>
                                                    <div className="font-semibold text-gray-800">
                                                        {transfer.reason || 'No reason provided'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransfersPage;
