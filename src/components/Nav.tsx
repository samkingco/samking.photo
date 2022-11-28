import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mono } from "./Typography";

export function Nav() {
  const pathname = usePathname();
  let active = "journal";
  if (pathname && pathname.startsWith("/work")) {
    active = "work";
  }

  return (
    <nav className="layout-nav">
      <Mono as="span" subdued={active !== "journal"}>
        <Link href="/">Journal</Link>
      </Mono>
      <Mono as="span" subdued={active !== "work"}>
        <Link href="/work">Work</Link>
      </Mono>
    </nav>
  );
}
