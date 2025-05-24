// import React, { useEffect, useState } from "react";
// import { getAllAssignments } from "../api/assignments";

// const AssignmentsPage = () => {
//     const [assignments, setAssignments] = useState([]);

//     useEffect(() => {
//         getAllAssignments()
//             .then((data) => setAssignments(data))
//             .catch((err) => console.error("Failed to fetch assignments", err));
//     }, []);

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Assignments</h1>
//             <ul className="list-disc list-inside">
//                 {assignments.map((item) => (
//                     <li className="font-bold" key={item.id}>
//                         asset : {item.assetId} - Assigned to: {item.personnelId} - Date: {item.assignmentDate}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AssignmentsPage;


// import React, { useEffect, useState } from "react";
// import { getAllAssignments, createAssignment, deleteAssignment } from "../api/assignments";
// import Input from "../components/ui/Input";
// import Button from "../components/ui/Button";
// import { Card, CardContent } from "../components/ui/Card";

// const AssignmentsPage = () => {
//     const [assignments, setAssignments] = useState([]);
//     const [formData, setFormData] = useState({
//         personnelId: "",
//         assetId: "",
//         locationId: "",
//         assignmentDate: "",
//         status: "ACTIVE"
//     });

//     useEffect(() => {
//         loadAssignments();
//     }, []);

//     const loadAssignments = () => {
//         getAllAssignments()
//             .then(data => setAssignments(data))
//             .catch(err => console.error("Failed to fetch assignments", err));
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await createAssignment({
//                 ...formData,
//                 assignmentDate: formData.assignmentDate || new Date().toISOString().split('T')[0]
//             });
//             setFormData({ personnelId: "", assetId: "", locationId: "", assignmentDate: "", status: "ACTIVE" });
//             loadAssignments();
//         } catch (err) {
//             console.error("Assignment creation failed:", err);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await deleteAssignment(id);
//             loadAssignments();
//         } catch (err) {
//             console.error("Deletion failed:", err);
//         }
//     };

//     return (
//         <div className="p-6 max-w-4xl mx-auto mt-10">
//             <h1 className="text-3xl font-bold mb-6 text-center">Assignments Management</h1>

//             <Card className="mb-8">
//                 <CardContent className="p-4 space-y-4">
//                     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <Input name="personnelId" type="number" placeholder="Personnel ID" value={formData.personnelId} onChange={handleChange} required />
//                         <Input name="assetId" type="number" placeholder="Asset ID" value={formData.assetId} onChange={handleChange} required />
//                         <Input name="locationId" type="number" placeholder="Location ID" value={formData.locationId} onChange={handleChange} required />
//                         <Input name="assignmentDate" type="date" placeholder="Assignment Date" value={formData.assignmentDate} onChange={handleChange} />
//                         <Input name="status" placeholder="Status" value={formData.status} onChange={handleChange} />
//                         <Button type="submit" className="col-span-full">Create Assignment</Button>
//                     </form>
//                 </CardContent>
//             </Card>

//             <div className="space-y-4">
//                 {assignments.map((item) => (
//                     <Card key={item.id}>
//                         <CardContent className="p-4 flex justify-between items-center flex-wrap">
//                             <div className="text-sm space-y-1">
//                                 <div><strong>Asset:</strong> {item.assetId}</div>
//                                 <div><strong>Personnel:</strong> {item.personnelId}</div>
//                                 <div><strong>Location:</strong> {item.locationId}</div>
//                                 <div><strong>Date:</strong> {item.assignmentDate}</div>
//                                 <div><strong>Status:</strong> {item.status}</div>
//                             </div>
//                             <Button variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AssignmentsPage;

import React, { useEffect, useState } from "react";
import { getAllAssignments, createAssignment, deleteAssignment } from "../api/assignments";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Users, MapPin, Calendar, Activity, Trash2, Plus, UserCheck, Package } from "lucide-react";

const AssignmentsPage = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState({
        personnelId: "",
        assetId: "",
        locationId: "",
        assignmentDate: "",
        status: "ACTIVE"
    });

    useEffect(() => {
        loadAssignments();
    }, []);

    const loadAssignments = async () => {
        try {
            setLoading(true);
            const data = await getAllAssignments();
            setAssignments(data);
        } catch (err) {
            console.error("Failed to fetch assignments", err);
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
            await createAssignment({
                ...formData,
                assignmentDate: formData.assignmentDate || new Date().toISOString().split('T')[0]
            });
            setFormData({ personnelId: "", assetId: "", locationId: "", assignmentDate: "", status: "ACTIVE" });
            await loadAssignments();
        } catch (err) {
            console.error("Assignment creation failed:", err);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this assignment?")) {
            try {
                await deleteAssignment(id);
                await loadAssignments();
            } catch (err) {
                console.error("Deletion failed:", err);
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACTIVE': return 'bg-green-100 text-green-800 border-green-200';
            case 'INACTIVE': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'COMPLETED': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 mt-10">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                {/* <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
                        <UserCheck className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Assignment Management
                    </h1>
                    <p className="text-gray-600 text-lg">Manage personnel and asset assignments efficiently</p>
                </div> */}

                {/* Create Assignment Form */}
                <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-lg">
                        <div className="flex items-center space-x-3">
                            <Plus className="h-6 w-6 text-white" />
                            <h2 className="text-xl font-semibold text-white">Create New Assignment</h2>
                        </div>
                    </div>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <Users className="h-4 w-4 mr-2 text-indigo-600" />
                                        Personnel ID
                                    </label>
                                    <Input
                                        name="personnelId"
                                        type="number"
                                        placeholder="Enter Personnel ID"
                                        value={formData.personnelId}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <Package className="h-4 w-4 mr-2 text-indigo-600" />
                                        Asset ID
                                    </label>
                                    <Input
                                        name="assetId"
                                        type="number"
                                        placeholder="Enter Asset ID"
                                        value={formData.assetId}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                                        Location ID
                                    </label>
                                    <Input
                                        name="locationId"
                                        type="number"
                                        placeholder="Enter Location ID"
                                        value={formData.locationId}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                                        Assignment Date
                                    </label>
                                    <Input
                                        name="assignmentDate"
                                        type="date"
                                        value={formData.assignmentDate}
                                        onChange={handleChange}
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <Activity className="h-4 w-4 mr-2 text-indigo-600" />
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="h-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">Inactive</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    type="submit"
                                    disabled={creating}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-8 py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
                                >
                                    {creating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-4 w-4 mr-2" />

                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Assignments List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Current Assignments</h2>
                        <div className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                            Total: {assignments.length}
                        </div>
                    </div>

                    {assignments.length === 0 ? (
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-12 text-center">
                                <UserCheck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Assignments Found</h3>
                                <p className="text-gray-500">Create your first assignment to get started.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {assignments.map((assignment) => (
                                <Card key={assignment.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Users className="h-4 w-4 mr-1 text-indigo-600" />
                                                        Personnel
                                                    </div>
                                                    <div className="font-semibold text-gray-800">ID: {assignment.personnelId}</div>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Package className="h-4 w-4 mr-1 text-indigo-600" />
                                                        Asset
                                                    </div>
                                                    <div className="font-semibold text-gray-800">ID: {assignment.assetId}</div>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <MapPin className="h-4 w-4 mr-1 text-indigo-600" />
                                                        Location
                                                    </div>
                                                    <div className="font-semibold text-gray-800">ID: {assignment.locationId}</div>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Calendar className="h-4 w-4 mr-1 text-indigo-600" />
                                                        Date
                                                    </div>
                                                    <div className="font-semibold text-gray-800">
                                                        {new Date(assignment.assignmentDate).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                                                    {assignment.status}
                                                </span>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(assignment.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />

                                                </Button>
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

export default AssignmentsPage;
