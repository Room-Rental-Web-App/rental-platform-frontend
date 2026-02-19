import { useEffect, useState } from "react";
import Api from "../api/Api";
import "../CSS/my-plans.css";

function MyPlans() {
  const [plans, setPlans] = useState([]);
  const email = localStorage.getItem("email");



  function getAllMyPlan() {
    Api.get(`/subscription/my-plans/${email}`)
      .then((response) => {
        setPlans(response.data);
      })
      .catch((error) => {
        console.error("Error fetching my plans:", error);
      });

  }
  useEffect(() => {
    getAllMyPlan()
  }, []);

  return (
    <div className="my-plans-container">
      <h2>My Subscription History</h2>

      {plans.length === 0 && (
        <p className="no-plan">You haven't purchased any plan yet.</p>
      )}

      <div className="plans-grid">
        {plans.map(plan => {
          const expired = new Date(plan.endDate) < new Date();
          return (
            <div key={plan.id} className={`plan-card ${plan.active && !expired ? "active" : "expired"}`}>
              <h3>{plan.planCode.replaceAll("_", " ")}</h3>

              <p><b>Start:</b> {new Date(plan.startDate).toLocaleString()}</p>
              <p><b>End:</b> {new Date(plan.endDate).toLocaleString()}</p>
              <p className="status">
                {plan.active && !expired ? "ACTIVE" : "EXPIRED"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyPlans;
