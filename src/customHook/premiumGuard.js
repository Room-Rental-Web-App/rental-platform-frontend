export function premiumGuard(navigate) {
  const isPremium = localStorage.getItem("isPremium");

  // Already premium → allow
  if (isPremium) return true;

  // Ask only free users
  const goPremium = window.confirm(
    "This feature is available for Premium users only.\nDo you want to upgrade now?"
  );

  if (goPremium) {
    navigate("/premium");
  }

  return false; // Block feature
}
