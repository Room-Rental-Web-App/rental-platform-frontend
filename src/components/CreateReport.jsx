import { useState } from "react";
import "../css/createReport.css"
import Api from "../api/Api";


export default function CreateReport({ reporterId, reportType: initialReportType, targetId: initialTargetId }) {

    const [reportType, setReportType] = useState(initialReportType || "ROOM");
    const [targetId, setTargetId] = useState(initialTargetId || "");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const isLocked = initialReportType && initialTargetId;

    const submitReport = async () => {
        if (!targetId || !reason) {
            alert("All fields are required");
            return;
        }

        if (reason.length < 10) {
            alert("Reason must be at least 10 characters");
            return;
        }

        try {
            setLoading(true);

            await Api.post(`/reports?reporterId=${reporterId}`, {
                reportType,
                targetId: Number(targetId),
                reason
            });

            alert("Report submitted successfully");
            setReason("");

        } catch (err) {
            console.error(err);
            alert("Failed to submit report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-container">
            <h3>Report</h3>

            {/* Report Type */}
            {!isLocked && (
                <>
                    <label>Report Type</label>
                    <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                        <option value="ROOM">Room</option>
                        <option value="ROOM_OWNER">Room Owner</option>
                        <option value="USER">User</option>
                    </select>
                </>
            )}

            {/* Target ID */}
            {!isLocked && (
                <>
                    <label> {reportType === "ROOM" && "Room ID"} {reportType === "ROOM_OWNER" && "Owner User ID"}{reportType === "USER" && "User ID"} </label>
                    <input type="number" placeholder="Enter ID" value={targetId} onChange={(e) => setTargetId(e.target.value)} />
                </>
            )}

            {/* Read-only display when locked */}
            {isLocked && (
                <p>
                    <strong>Reporting:</strong> {reportType} (ID: {targetId})
                </p>
            )}

            {/* Reason */}
            <label>Reason</label>
            <textarea placeholder="Explain clearly (min 10 characters)" value={reason} onChange={(e) => setReason(e.target.value)}
            />

            <button onClick={submitReport} disabled={loading}>
                {loading ? "Submitting..." : "Submit Report"}
            </button>
        </div>
    );
}
