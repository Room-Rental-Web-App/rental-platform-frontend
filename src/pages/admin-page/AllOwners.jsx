import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import { UserCheck, Mail, Phone, ExternalLink, Trash2 } from "lucide-react";
import "../../css/adminOwners.css";
import MyLoader from "../../components/MyLoader";
const AllOwner = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      setLoading(true);
      // API call to get users filtered by ROLE_OWNER
      const res = await axios.get(API_ENDPOINTS.ADMIN_ALL_OWNERS, {
        headers: getAuthHeaders(),
      });
      setOwners(res.data);
    } catch (err) {
      console.error("Error fetching owners:", err);
    }
    finally {
      setLoading(false);
    }
  };

  const deleteOwner = async (id) => {
    if (
      !window.confirm(
        "Are you sure? This will delete the owner and their listings."
      )
    )
      return;
    try {
      await axios.delete(API_ENDPOINTS.DELETE_USER(id), {
        headers: getAuthHeaders(),
      });
      setOwners(owners.filter((o) => o.id !== id));
      alert("Owner deleted successfully.");
    } catch (err) {
      console.log(err);
      alert("Failed to delete owner.");
    }
  };

  if (loading) return <MyLoader data={"Loading Room-Owners... Please wait..."} />

  return (
    <div className="admin-layout">
      <div className="admin-main-content">
        <header className="admin-page-header">
          <h2>
            <UserCheck size={28} /> Room Owners Management
          </h2>
          <p>View and manage all registered property owners</p>
        </header>

        {loading ? (
          <div className="loader">Loading Owners...</div>
        ) : (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Owner Name/Email</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {owners.length > 0 ? (
                  owners.map((owner) => (
                    <tr key={owner.id}>
                      <td>#{owner.id}</td>
                      <td>
                        <div className="user-info">
                          <div className="avatar">
                            {owner.email.charAt(0).toUpperCase()}
                          </div>
                          <span>{owner.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <Mail size={14} /> {owner.email} <br />
                          {owner.phone && (
                            <>
                              <Phone size={14} /> {owner.phone}
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="badge ROLE_OWNER">Verified Owner</span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="view-btn" title="View Listings">
                            <ExternalLink size={16} />
                          </button>
                          <button
                            className="del-btn"
                            onClick={() => deleteOwner(owner.id)}
                            title="Delete Owner"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "center", padding: "30px" }}
                    >
                      No Owners Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOwner;
