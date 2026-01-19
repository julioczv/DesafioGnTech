import Providers from "./providers";
import Shell from "./shell/shell";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
        <body>
        <Providers>
            <Shell>{children}</Shell>
        </Providers>
        </body>
        </html>
    );
}
