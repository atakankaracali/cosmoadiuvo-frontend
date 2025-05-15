import { useEffect, useState } from "react";
import axios from "axios";

const VisitCounter = () => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchVisitCount = async () => {
            try {
                const res = await axios.post<{ count: number }>(
                    `${import.meta.env.VITE_BACKEND_URL}/api/increment-visit`
                );
                setCount(res.data.count);
            } catch (err) {
                console.error("Visitor counter failed:", err);
            }
        };

        fetchVisitCount();
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
