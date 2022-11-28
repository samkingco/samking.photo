import Link from "next/link";
import { Nav } from "./Nav";
import { Title } from "./Typography";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <main className="layout">
      <Title>
        <Link href="/">Sam King</Link>
      </Title>
      <Nav />

      <section className="layout-section">{children}</section>
    </main>
  );
}
