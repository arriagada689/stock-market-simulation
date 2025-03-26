import '@/assets/globals.css'
import Navbar from '@/components/Navbar';
import { GlobalProvider } from '@/context/GlobalContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
    title: 'Stock Market Simulation'
}

const MainLayout = ({ children }) => {
    return ( 
        <AuthProvider>
            <GlobalProvider>
                <html suppressHydrationWarning>
                    <body>
                        <main>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <Navbar />
                                {children}
                            </ThemeProvider>
                        </main>
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    );
}
 
export default MainLayout;