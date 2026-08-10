import "lenis/dist/lenis.css";
import "./globals.css";

import Header from "@/components/header/header";
import LenisProvider from "@/components/LenisProvider";
import Footer from "@/components/footer/footer";

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            history.scrollRestoration = "manual";
                            document.documentElement.classList.add("is-loading");
                            window.scrollTo(0, 0);

                            window.addEventListener("load", () => {
                                document.documentElement.classList.remove("is-loading");
                            });
                        `,
                    }}
                />
            </head>

            <body>
                <div className="wrapper">
                    <Header />

                    <LenisProvider>
                        {children}
                        <Footer />
                    </LenisProvider>
                </div>
            </body>
        </html>
    );
}
