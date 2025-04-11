import React, { useEffect, useState } from "react";
import { API_PATHS } from "./utils/apiPaths";

const App = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(API_PATHS.DASHBOARD.GET_DATA, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
          },
        });
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Expense Tracker"),
    dashboardData
        ? React.createElement(
                "pre",
                null,
                JSON.stringify(dashboardData, null, 2)
            )
        : React.createElement("p", null, "Loading...")
);
};

export default App;