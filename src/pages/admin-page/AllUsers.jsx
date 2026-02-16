import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import { Trash2, User } from "lucide-react";
import "../../css/adminCommon.css";
import MyLoader from "../../components/MyLoader";
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {
      setLoading(true)
      const res = await axios.get(API_ENDPOINTS.ADMIN_ALL_USERS, {
        headers: getAuthHeaders(),
      });
      console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
    finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(API_ENDPOINTS.DELETE_USER(id), {
        headers: getAuthHeaders(),
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.log(err)
      alert("Failed to delete user");
    }
  };

  if (loading) return <MyLoader data={"Loading Registered Users... Please wait..."} />
  return (
    <div className="admin-layout">
      <div className="admin-main-content">
        <h2>
          <User /> Registered Users
        </h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.role}`}>{u.role}</span>
                </td>
                <td>
                  <button onClick={() => deleteUser(u.id)} className="del-btn">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllUsers;
