// import React from "react";

// const Dashboard = () => {
//     return <h2>Dashboard</h2>;
// };

// export default Dashboard;

// src/pages/Dashboard.js
import React from "react";
import { logoutUser } from "../services/authService";

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
};

export default Dashboard;
