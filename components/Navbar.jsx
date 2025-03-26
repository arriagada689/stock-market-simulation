'use client'
import Link from "next/link";
import { redirect } from "next/navigation"
import SearchBar from "./SearchBar";
import { ModeToggle } from "./ModeToggle";

import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    
    const handleLogOut = () => {
        signOut()
        redirect('/')
    }

    return ( 
        <nav className="flex justify-between gap-x-5 px-10 py-5">
            <div className="space-x-3">
                <Link href={'/'}>Home</Link>
                <Link href={'/register'}>Register</Link>
                <Link href={'/login'}>Login</Link>
            </div>

            <SearchBar />

            <ModeToggle />

            {session && 
                <div className="space-x-3">
                    <Link href={'/profile'}>Profile</Link>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            }
        </nav>
     );
}
 
export default Navbar;