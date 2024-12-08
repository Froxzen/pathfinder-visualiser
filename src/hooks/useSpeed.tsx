import { useContext } from "react";
import { SpeedContext } from "../context/SpeedContext"

export const useSpeed = () => {
    const context = useContext(SpeedContext);
    if (!context) {
        throw new Error("useSped must be used within a SpeedProvider");
    }

    return context
}