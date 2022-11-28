import styled from "@emotion/styled";
import Link from "next/link";
import { Nav } from "./Nav";
import { Title } from "./Typography";

const Section = styled.section`
  margin-top: 4em;
`;

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <main className="wrapper">
      <Title>
        <Link href="/">
          Sam King
          <br />
          Photo&mdash;
        </Link>
      </Title>
      <Nav />

      <Section>{children}</Section>
    </main>
  );
}
