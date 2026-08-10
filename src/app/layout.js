import "lenis/dist/lenis.css";
import "./globals.css";

import Header from "@/components/header/header";
import LenisProvider from "@/components/LenisProvider";
import Footer from "@/components/footer/footer";

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="preload"
                    href="/fonts/TWKLausanne-350.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />

                <link
                    rel="preload"
                    href="/fonts/TWKLausanne-200.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            document.documentElement.classList.add("is-loading");

                            history.scrollRestoration = "manual";
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
