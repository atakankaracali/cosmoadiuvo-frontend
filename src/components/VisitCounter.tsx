import { useEffect, useState } from "react";
import axios from "axios";

const VisitCounter = () => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const hasVisited = localStorage.getItem("hasVisitedCosmoAdiuvo");

        const fetchVisitCount = async () => {
            try {
                const res = await axios.post<{ count: number }>(
                    `${import.meta.env.VITE_BACKEND_URL}/api/visit`
                );
                setCount(res.data.count);
                localStorage.setItem("hasVisitedCosmoAdiuvo", "true");
            } catch (err) {
                console.error("Visitor counter failed:", err);
            }
        };

        if (!hasVisited) {
            fetchVisitCount();
        } else {
            axios
                .get<{ count: number }>(
                    `${import.meta.env.VITE_BACKEND_URL}/api/visit`
                )
                .then((res) => setCount(res.data.count))
                .catch((err) =>
                    console.error("Failed to fetch visit count:", err)
                );
        }
    }, []);

    return (
        <div className="text-center text-sm text-gray-400 mt-4">
            {count !== null
                ? `🌌 Total cosmic visitors: ${count}`
                : "✨ Counting stardust..."}
        </div>
    );
};

export default VisitCounter;