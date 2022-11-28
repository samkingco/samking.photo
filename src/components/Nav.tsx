import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { Mono } from "./Typography";

const Wrapper = styled.div<{ expanded?: boolean }>`
  display: flex;
  align-content: start;
  gap: 1em;
  text-align: right;
  margin-top: 1em;
`;

export function Nav() {
  const { pathname } = useRouter();
  let active = "journal";
  if (pathname.startsWith("/work")) {
    active = "work";
  }

  return (
    <Wrapper>
      <Mono as="span" subdued={active !== "journal"}>
        <Link href="/">Journal</Link>
      </Mono>
      <Mono as="span" subdued={active !== "work"}>
        <Link href="/work">Work</Link>
      </Mono>
    </Wrapper>
  );
}
