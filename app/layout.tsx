/* Components */
import { Providers } from "@/lib/providers";

/* Instruments */
import "./styles/globals.css";
import LoginPage from "./components/Login/LoginPage";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="pt-br">
        <body>
          <section>
            <main>{props.children}</main>
          </section>
        </body>
      </html>
    </Providers>
  );
}

export const metadata = {
  title: "Dynamox",
};
