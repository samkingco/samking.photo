import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { Mono, subdued } from "./Typography";

const Wrapper = styled.div<{ expanded?: boolean }>`
  display: flex;
  align-content: start;
  gap: 1em;
  text-align: right;
  margin-top: 1em;
`;

const NavLink = styled(Link)`
  ${subdued};
`;

export function Nav() {
  const { pathname } = useRouter();
  let active = "journal";
  if (pathname.startsWith("/work")) {
    active = "work";
  }

  return (
    <Wrapper>
      <NavLink href="/" subdued={active !== "journal"}>
        <Mono as="span">Journal</Mono>
      </NavLink>
      <NavLink href="/work" subdued={active !== "work"}>
        <Mono as="span">Work</Mono>
      </NavLink>
    </Wrapper>
  );
}
