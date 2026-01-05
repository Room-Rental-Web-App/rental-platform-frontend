import React, { useState } from "react";
import { Save, Edit3, Trash2, Plus, Layout, FileText } from "lucide-react";
import "../../css/AdminControl.css";

const AdminPremiumControl = () => {
  const [activeTab, setActiveTab] = useState("pricing");

  return (
    <div className="admin-premium-page">
      <div className="admin-header">
        <h2>
          <Layout size={24} /> Premium Control Center
        </h2>
        <div className="admin-tabs">
          <button
            className={activeTab === "pricing" ? "active-tab" : ""}
            onClick={() => setActiveTab("pricing")}
          >
            Manage Plans
          </button>
          <button
            className={activeTab === "docs" ? "active-tab" : ""}
            onClick={() => setActiveTab("docs")}
          >
            Edit Documentation
          </button>
        </div>
      </div>

      <div className="admin-content-card">
        {activeTab === "pricing" ? (
          <div className="pricing-manager">
            <div className="manager-header">
              <h3>Active Plans</h3>
              <button className="btn-add">
                <Plus size={18} /> Add Plan
              </button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Monthly (₹)</th>
                  <th>Yearly (₹)</th>
                  <th>Features</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gold Plan</td>
                  <td>
                    <input
                      type="number"
                      defaultValue={499}
                      className="admin-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={4500}
                      className="admin-input"
                    />
                  </td>
                  <td>4 Features</td>
                  <td className="actions-cell">
                    <button className="btn-icon save">
                      <Save size={18} />
                    </button>
                    <button className="btn-icon delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="docs-editor">
            <div className="manager-header">
              <h3>
                <FileText size={18} /> Update Terms & Conditions
              </h3>
              <button className="btn-save-all">Publish Changes</button>
            </div>
            <div className="editor-group">
              <label>Section Title</label>
              <input
                type="text"
                className="admin-input"
                defaultValue="Refund Policy"
              />
              <label>Content Text</label>
              <textarea
                className="admin-textarea"
                rows="6"
                defaultValue="Users can request a refund within 48 hours..."
              ></textarea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPremiumControl;
