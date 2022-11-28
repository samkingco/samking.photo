import { Heading } from "../components/Typography";

export default function NotFound() {
  return (
    <Heading>
      404&mdash;
      <Heading as="span" subdued>
        Not found
      </Heading>
    </Heading>
  );
}
