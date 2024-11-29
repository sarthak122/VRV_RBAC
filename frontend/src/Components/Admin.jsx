import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Table } from "./Table";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../constants/constants";
import { RoleCard } from "./RoleCard";

export const Admin = () => {
  const [users, setUsers] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRoles, setTotalRoles] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInActiveUsers] = useState(0);
  const [roleCounts, setRoleCounts] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    // user ? user.role === ADMIN ? getUsers() : navigate('/home') : ''
    getUsers();
  }, [users]);

  const getUsers = async () => {
    try {
      const request = await axios.get(
        "http://localhost:8080/api/admin/getusers",
        { withCredentials: true }
      );
      const response = request.data;
      if (request.status === 200) {
        const totalRoles = [
          ...new Set(response.users.map((user) => user?.role)),
        ].length;
        const activeUsers = response.users.filter(
          (user) => user?.status === "Active"
        ).length;
        const inactiveUsers = response.users.filter(
          (user) => user?.status === "Inactive"
        ).length;
        // Count users by role
        debugger;
        const roleCounts = response.users.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        setUsers(response.users);
        setTotalUsers(response.users.length);
        setTotalRoles(totalRoles);
        setActiveUsers(activeUsers);
        setInActiveUsers(inactiveUsers);
        setRoleCounts(roleCounts);

        console.log(response);
        console.log(roleCounts);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };
  // const handleRoleChange = (id, newRole) => {
  //   setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
  // };

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/admin/${id}/role`,
        { loggedInUserId: user._id, role: newRole }, // Include the request body here
        { withCredentials: true } // Send credentials like cookies
      );
      if (res.data.success) {
        const updatedData = users.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        );
        setUsers(updatedData);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/admin/${id}/status`,
        { loggedInUserId: user._id, status: newStatus }, // Include the request body here
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedData = users.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user
        );
        setUsers(updatedData);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      debugger;
      const res = await axios.delete(
        `http://localhost:8080/api/admin/delete/${id}`,
        {
          data: { loggedInUserId: user._id }, // Include the request body here
          withCredentials: true, // Send credentials like cookies
        }
      );

      if (res.data.success) {
        const updatedData = users.filter((user) => user.id !== id);
        setUsers(updatedData);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl">{totalUsers}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Total Roles</h3>
            <p className="text-3xl">{totalRoles}</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-3xl">{activeUsers}</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Inactive Users</h3>
            <p className="text-3xl">{inactiveUsers}</p>
          </div>
        </div>

        {/* User Table */}
        <Table
          users={users}
          handleRoleChange={handleRoleChange}
          handleStatusChange={handleStatusChange}
          handleDelete={handleDelete}
        />
        <div className="flex flex-col md:flex-row gap-6 justify-center mt-4">
          <RoleCard roleCounts={roleCounts} />
        </div>
      </div>
    </>
  );
};
