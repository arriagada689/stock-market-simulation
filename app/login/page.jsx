'use client'
import { loginUser } from "../actions/userActions";
import { useActionState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext"; 
import { redirect } from "next/navigation";

const initialState = {
    username: '',
    password: '',
    confirm_password: ''
}

const LoginPage = () => {
    const [state, formAction] = useActionState(loginUser, initialState);
    const { authUser } = useGlobalContext()

    useEffect(() => {
        if(state.user){
            authUser(state.user)
            redirect('/')
        }
    }, [state])

    return ( 
        <div>
            {state?.error && <div className="text-red-500">{state.error}</div>}

            <form action={formAction}>
                <label htmlFor="username">username:</label>
                <input type="text" name="username" className="border"/>

                <label htmlFor="password">password:</label>
                <input type="text" name="password" className="border"/>

                <button type="submit">Submit</button>
            </form>
        </div>
     );
}
 
export default LoginPage;