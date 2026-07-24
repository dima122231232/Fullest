import "./globals.css";
import "lenis/dist/lenis.css";

import LenisProvider from "@/components/LenisProvider";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <LenisProvider>
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}