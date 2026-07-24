import "lenis/dist/lenis.css";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body>
                <LenisProvider>
                {children}
                </LenisProvider>
            </body>
        </html>
    );
}