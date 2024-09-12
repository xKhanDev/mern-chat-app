import { useState } from "react";
import { toast } from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);

     const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
        const success = handleInputError({ fullname, username, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.message || 'Something went wrong');
            }

            const data = await res.json();
            console.log(data);

        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

const handleInputError = ({ fullname, username, password, confirmPassword, gender }) => {
    if (!fullname || !username || !password || !confirmPassword) {
        toast.error("All fields are required");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
};
