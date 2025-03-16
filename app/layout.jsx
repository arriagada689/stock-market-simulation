import '@/assets/globals.css'
import Navbar from '@/components/Navbar';
import { GlobalProvider } from '@/context/GlobalContext';

export const metadata = {
    title: 'Stock Market Simulation'
}

const MainLayout = ({ children }) => {
    return ( 
        <GlobalProvider>
            <html>
                <body>
                    <main>
                        <Navbar />
                        {children}
                    </main>
                </body>
            </html>
        </GlobalProvider>
    );
}
 
export default MainLayout;