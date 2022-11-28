import { cva } from "class-variance-authority";

interface BaseTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  isLoading?: boolean;
  subdued?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  size?: "small" | "large";
}

const textVariants = (base: string[]) =>
  cva(base, {
    variants: {
      isLoading: {
        true: "loading-text",
      },
      subdued: {
        true: "subdued",
      },
      uppercase: {
        true: "uppercase",
      },
      lowercase: {
        true: "lowercase",
      },
      size: {
        small: "small",
        large: "large",
      },
    },
  });

export const Title = ({ className, children, as, ...props }: BaseTextProps) => {
  const Tag = as || "h1";
  return (
    <Tag className={textVariants(["title", className || ""])(props)}>
      {children}
    </Tag>
  );
};

export const Heading = ({
  className,
  children,
  as,
  ...props
}: BaseTextProps) => {
  const Tag = as || "h2";
  return (
    <Tag className={textVariants(["heading", className || ""])(props)}>
      {children}
    </Tag>
  );
};

export const Subheading = ({
  className,
  children,
  as,
  ...props
}: BaseTextProps) => {
  const Tag = as || "h3";
  return (
    <Tag className={textVariants(["subheading", className || ""])(props)}>
      {children}
    </Tag>
  );
};

export const Body = ({ className, children, as, ...props }: BaseTextProps) => {
  const Tag = as || "p";
  return (
    <Tag className={textVariants(["body-text", className || ""])(props)}>
      {children}
    </Tag>
  );
};

export const Mono = ({ className, children, as, ...props }: BaseTextProps) => {
  const Tag = as || "p";
  return (
    <Tag className={textVariants(["mono-text", className || ""])(props)}>
      {children}
    </Tag>
  );
};
