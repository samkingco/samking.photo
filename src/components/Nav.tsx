import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

const Wrapper = styled.div``;

const Navigation = styled.nav``;

// const paths = new Map<string, string>()
//   .set("/posts", "Journal")
//   .set("/posts/tags", "By Tag")
//   .set("/work", "Work")
//   .set("/prints", "Prints")
//   .set("/about", "About");

export function Nav() {
  const { pathname } = useRouter();

  let activeLink = "Journal";
  if (pathname.startsWith("/posts/tags")) {
    activeLink = "By Tag";
  } else if (pathname.startsWith("/work")) {
    activeLink = "Work";
  } else if (pathname.startsWith("/prints")) {
    activeLink = "Prints";
  } else if (pathname.startsWith("/about")) {
    activeLink = "About";
  }

  return (
    <Wrapper>
      <h1>Sam King&mdash;{activeLink}</h1>
      <Navigation>
        <div>
          <Link href="/">Journal</Link>
          <Link href="/posts/tags">By Tag</Link>
        </div>
        <div>
          <Link href="/work">Work</Link>
          <Link href="/prints">Prints</Link>
          <Link href="/about">About</Link>
        </div>
      </Navigation>
    </Wrapper>
  );
}
