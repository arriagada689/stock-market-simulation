'use client'
import Link from "next/link";
import { redirect } from "next/navigation"
import { useGlobalContext } from "@/context/GlobalContext";

const Navbar = () => {
    const { isLoggedIn, logoutUser } = useGlobalContext()
    
    const handleLogOut = () => {
        logoutUser()
        redirect('/')
    }

    return ( 
        <nav className="flex justify-between gap-x-5 px-10">
            <div className="space-x-3">
                <Link href={'/'}>Home</Link>
                <Link href={'/register'}>Register</Link>
                <Link href={'/login'}>Login</Link>
            </div>

            {isLoggedIn && 
                <div className="space-x-3">
                    <Link href={'/profile'}>Profile</Link>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            }
        </nav>
     );
}
 
export default Navbar;