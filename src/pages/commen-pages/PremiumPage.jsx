import React from 'react'
import PremiumUser from '../user-page/PremiumUser';
import PremiumOwner from '../room-owner-page/PremiumOwner';

function PremiumPage() {
  const role = localStorage.getItem("role");

  return role === "ROLE_OWNER" ? <PremiumOwner /> : <PremiumUser />;
}

export default PremiumPage