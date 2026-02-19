import { useState } from "react";
import "../CSS/createReport.css"
import Api from "../api/Api";


export default function CreateReport({ reporterId, reportType: initialReportType, targetId: initialTargetId }) {

    const [reportType, setReportType] = useState(initialReportType || "ROOM");
    const [targetId, setTargetId] = useState(initialTargetId || "");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const isLocked = initialReportType && initialTargetId;
    const countWords = (text) => {
        return text.trim().split(/\s+/).filter(Boolean).length;
    };

    const submitReport = async () => {
        if (!targetId || !reason.trim()) {
            alert("All fields are required");
            return;
        }

        const charCount = reason.trim().length;

        if (charCount < 20) {
            alert("Reason must contain at least 20 characters");
            return;
        }

        if (charCount > 500) {
            alert("Reason must not exceed 500 characters");
            return;
        }

        try {
            setLoading(true);

            await Api.post(`/reports?reporterId=${reporterId}`, {
                reportType,
                targetId: Number(targetId),
                reason: reason.trim()
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
            <textarea
                placeholder="Explain clearly (20–500 characters)"
                value={reason}
                maxLength={500}
                onChange={(e) => setReason(e.target.value)}
            />

            <p className="word-count">
                {reason.length} / 500 characters
            </p>


            <button onClick={submitReport} disabled={loading}>
                {loading ? "Submitting..." : "Submit Report"}
            </button>
        </div>
    );
}
