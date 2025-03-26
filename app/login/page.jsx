'use client'
import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await signIn("credentials", {
          redirect: false,
          username: username,
          password: password,
        });
    
        if (res.error) {
            setError(res.error);
        } else {
            redirect('/')
        }
    }

    return ( 
        <div>
            {error && <div className="text-red-500">{error}</div>}

            <form onSubmit={handleLogin}>
                <label htmlFor="username">username:</label>
                <input type="text" name="username" className="border" value={username} onChange={(e) => setUsername(e.target.value)} required/>

                <label htmlFor="password">password:</label>
                <input type="text" name="password" className="border" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <button type="submit">Submit</button>
            </form>
        </div>
     );
}
 
export default LoginPage;