import { Metadata } from "next";
import MenuBar from "../components/menu-bar/menu-bar";
import FooterBar from "../components/footer/footer-bar";
import "./globals.scss";
import { Container } from "@mui/material";

export const metadata: Metadata = {
  title: "Private Teacher App",
  description: "Private teacher app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <script
          src="https://www.google.com/recaptcha/api.js?render=6LfAjcYeAAAAAJTxnTgx_JVndCSmQgU1gqzEIwoL"
          defer
        /> */}
        {/* <Providers environments={environments}> */}
        <MenuBar />
        <Container className="layout-container">
          {children}
        </Container>
        <FooterBar />
        {/* </Providers> */}
      </body>
    </html>
  );
}
