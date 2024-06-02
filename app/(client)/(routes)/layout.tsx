import { Metadata } from "next";
import MenuBar from "../components/menu-bar/menu-bar";
import FooterBar from "../components/footer/footer-bar";
import "./globals.scss";
import { Container } from "@mui/material";
import Providers from "../utils/providers.util";

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
        <Providers>
        <MenuBar />
        <Container className="layout-container">
          {children}
        </Container>
        <FooterBar />
        </Providers>
      </body>
    </html>
  );
}
