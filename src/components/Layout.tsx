import Link from "next/link";
import { usePathname } from "next/navigation";
import { styled } from "../../stitches.config";
import { Body, Mono } from "./Typography";

const Main = styled("main", {
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "6em $space$4 12vw",
  "@md": {
    padding: "6em 8vw 12vw",
  },
});

const Header = styled("header", {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  padding: "$space$4",
  display: "grid",
  gridTemplateColumns: "1fr max-content",
  alignItems: "baseline",
  mixBlendMode: "difference",
});

const Nav = styled("nav", {
  display: "flex",
  alignContent: "flex-start",
  gap: "1em",
  textAlign: "right",
});

const Content = styled("section", {
  paddingTop: "4em",
});

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  let active = "journal";
  if (pathname && pathname.startsWith("/about")) {
    active = "about";
  }

  return (
    <Main>
      <Header>
        <Body as="h1" noUnderline>
          <Link href="/">Sam King</Link>
        </Body>
        <Nav>
          <Mono as="span" subdued={active !== "journal"}>
            <Link href="/">Journal</Link>
          </Mono>
          <Mono as="span" subdued={active !== "about"}>
            <Link href="/about">About</Link>
          </Mono>
        </Nav>
      </Header>
      <Content>{children}</Content>
    </Main>
  );
}
