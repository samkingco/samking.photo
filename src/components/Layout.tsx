import Link from "next/link";
import { Nav } from "./Nav";
import { Body } from "./Typography";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <main className="layout">
      <header className="layout-header">
        <Body as="h1">
          <Link href="/" className="no-underline">
            Sam King
          </Link>
        </Body>

        <Nav />
      </header>

      <section className="layout-section">{children}</section>
    </main>
  );
}
