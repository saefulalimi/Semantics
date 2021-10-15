import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/action";
import { Link, useHistory } from "react-router-dom";

function Dashboard() {
  const history = useHistory();
  let dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser());
      console.log("sucess logout", response);
      history.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="relative min-h-screen flex">
        <div className="bg-blue-800 text-blue-100 w-64">
          logo
          {/* navigation */}
          <nav>
           <Link className="block py-2 px-4" to="/profile">
              Profile
            </Link>
            <Link className="block py-2 px-4" to="/activity">
              Activity
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </div>
        {/* content */}
        <div className="flex-1 p-10 text-2xl font-bold">
          <h2>Dashboard</h2>
        </div>
      </div>

      <button>
        <Link to="/activity">Activity</Link>
      </button>
    </div>
  );
}

export default Dashboard;
