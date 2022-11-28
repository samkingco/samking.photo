import Link from "next/link";
import { Nav } from "../components/Nav";
import { Title } from "../components/Typography";
import "./globals.css";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <main className="layout">
          <Title>
            <Link href="/">
              Sam King
              <br />
              Photo&mdash;
            </Link>
          </Title>
          <Nav />

          <section className="layout-section">{children}</section>
        </main>
      </body>
    </html>
  );
}
