'use client'
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";

const Navbar = () => {
    const { isLoggedIn } = useGlobalContext()
    
    return ( 
        <nav>
            <Link href={'/'}>Home</Link>
        </nav>
     );
}
 
export default Navbar;