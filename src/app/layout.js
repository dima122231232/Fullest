import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/header/header";
import LenisProvider from "@/components/LenisProvider";
import Footer from "@/components/footer/footer";

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body>
                <div className="wrapper">
                    <Header/>
                    <LenisProvider>
                        {children}
                    <Footer/>
                    </LenisProvider>
                </div>
            </body>
        </html>
    );
}