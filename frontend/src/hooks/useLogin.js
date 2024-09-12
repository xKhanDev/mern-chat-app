import { useState } from "react";
import toast from "react-hot-toast"

const useLogin = () => {
    const[loading,setLoading]=useState(false);

    const login = async ({username,password}) => {
        const success = handleInputError({username,password});
        if(!success) return;
    
        setLoading(true)
        try {
            const response  = await fetch("api/v1/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            })

            if(!response.ok){
                const errorData = await response.json()
                toast.error(errorData.message || "Invalid Credentials");
            }

            const data = await response.json()
            console.log(data);
            
            
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred');
        } finally {
            setLoading(false)
        }
    }
    return {loading,login}
    }

export default useLogin

const handleInputError =({username,password})=>{
    if(!username || !password){
        toast.error("All feilds are required");
        return false;
    }
    return true;

}
