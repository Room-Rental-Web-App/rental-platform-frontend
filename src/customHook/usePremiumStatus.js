import { useEffect, useState } from "react";
import Api from "../api/Api";


export default function usePremiumStatus() {

   const email = localStorage.getItem("email");
   const role = localStorage.getItem("role");

    const [isPremiumUser, setIsPremiumUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email || !role) {
            setIsPremiumUser(false);
            setLoading(false);
            return;
        }

        Api.get("/subscription/check", { params: { email, role } })
            .then(res => {
                console.log("Premium status:", res.data);
                setIsPremiumUser(false);
            })
            .catch(() => setIsPremiumUser(false))
            .finally(() => setLoading(false));

    }, [email, role]);

    return { isPremiumUser, loading };
}
