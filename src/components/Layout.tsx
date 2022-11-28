import { Nav } from "./Nav";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <main className="wrapper">
      <Nav />
      <hr />
      <section>{children}</section>
    </main>
  );
}
