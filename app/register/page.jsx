'use client'
import { createUser } from "../actions/userActions";
import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [buyingPower, setBuyingPower] = useState("");
    const [error, setError] = useState(null);
    
    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await createUser(username, buyingPower, password, confirmPassword)

        if(res.error){
            setError(res.error);
        } else {
            const signInRes = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });
            
            if (signInRes?.error) {
                setError("Login failed after registration");
                return;
            }
        
            redirect("/");
        }   
    }

    return ( 
        <div>
            {error && <div className="text-red-500">{error}</div>}

            <form onSubmit={handleRegister}>
                <label htmlFor="username">username:</label>
                <input type="text" name="username" className="border" value={username} onChange={(e) => setUsername(e.target.value)} required/>

                <label htmlFor="buying_power">Buying Power:</label>
                <input type="text" name="buying_power" className="border" value={buyingPower} onChange={(e) => setBuyingPower(e.target.value)} required/>

                <label htmlFor="password">password:</label>
                <input type="text" name="password" className="border" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <label htmlFor="confirm_password">confirm_password:</label>
                <input type="text" name="confirm_password" className="border" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>

                <button type="submit">Submit</button>
            </form>
        </div>
     );
}
 
export default RegisterPage;