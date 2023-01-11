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
  "& > *": {
    zIndex: 1,
  },
  "&:after": {
    content: "",
    display: "block",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    background:
      "linear-gradient(to bottom, rgb($backgroundAlpha) 20%, transparent 100%);",
    height: "8rem",
    zIndex: 0,
    pointerEvents: "none",
  },
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

const ACTIVE_LINKS = {
  "/": "work",
  "/journal": "journal",
  "/about": "about",
} as const;

type ActivePath = keyof typeof ACTIVE_LINKS;
type ActiveLink = typeof ACTIVE_LINKS[keyof typeof ACTIVE_LINKS];

function getActiveLink(pathname: string | null): ActiveLink {
  const fallback: ActiveLink = "work";
  if (!pathname) return fallback;
  if (pathname.startsWith("/journal")) return "journal";
  if (pathname.startsWith("/about")) return "about";
  return fallback;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  let active = getActiveLink(pathname);

  return (
    <Main>
      <Header>
        <Body as="h1" noUnderline>
          <Link href="/">Sam King</Link>
        </Body>
        <Nav>
          <Mono as="span" subdued={active !== "work"}>
            <Link href="/">Work</Link>
          </Mono>
          <Mono as="span" subdued={active !== "journal"}>
            <Link href="/journal">Journal</Link>
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
