import api from "../api/api"
import { useEffect } from "react"

export default function HomePage() {
    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const response = await api.get("/health");
                console.log("API response:", response.data);
            } catch (error) {
                console.error("API error:", error)
            }
        };

        fetchHealth();
    }, []);
    
    return (
        <div>
            <h1>HomePage</h1>
        </div>
    )
}