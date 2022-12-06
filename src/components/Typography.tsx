import { styled } from "../../stitches.config";

type BaseTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  subdued?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
};

const variants = {
  subdued: {
    true: {
      color: "$subdued",
    },
  },
  uppercase: {
    true: {
      textTransform: "uppercase",
    },
  },
  lowercase: {
    true: {
      textTransform: "lowercase",
    },
  },
  noUnderline: {
    true: {
      "&, & a": {
        textDecoration: "none",
      },
    },
  },
};

export const Heading = styled("h2", {
  variants,
  fontFamily: "$sans",
  fontWeight: "normal",
  fontSize: "1.6rem",
});

export const Subheading = styled("h3", {
  variants,
  fontFamily: "$sans",
  fontWeight: "normal",
  fontSize: "1rem",
});

export const Body = styled("p", {
  variants,
  fontFamily: "$sans",
  fontWeight: "normal",
  fontSize: "1rem",
});

export const Mono = styled("p", {
  variants,
  fontFamily: "$mono",
  fontWeight: "normal",
  fontSize: "0.875rem",
});
