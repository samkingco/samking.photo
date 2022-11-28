import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import withMargin, { WithMarginProp } from "./withMargin";

interface BaseTextProps extends WithMarginProp {
  isLoading?: boolean;
  subdued?: boolean;
  size?: "small" | "large";
  uppercase?: boolean;
}

const baseTextStyles = css`
  margin: 0;
`;

export const subdued = (p: BaseTextProps) =>
  p.subdued &&
  css`
    color: var(--subdued);
  `;

const uppercase = (p: BaseTextProps) =>
  p.uppercase &&
  css`
    text-transform: uppercase;
  `;

const ellipsis = keyframes`
  to {
    width: 0.8em;
  }
`;

const loading = (p: BaseTextProps) =>
  p.isLoading &&
  css`
    &:after {
      overflow: hidden;
      display: inline-block;
      vertical-align: bottom;
      animation: ${ellipsis} steps(4, end) 900ms infinite;
      content: "\\2026"; /* ascii code for the ellipsis character */
      width: 0;
    }
  `;

const titleStyles = css`
  font-size: 2em;
  font-family: var(--font-heading);
  font-weight: normal;
  line-height: 1;

  a {
    text-decoration: none;
    cursor: pointer;
    color: inherit;
    &:hover {
      opacity: 0.64;
    }
  }
`;

export const Title = styled.h1<BaseTextProps>`
  ${baseTextStyles};
  ${titleStyles};
  ${subdued};
  ${withMargin};
`;

const headingStyles = css`
  font-size: 1.6em;
  font-family: var(--font-sans);
  font-weight: normal;
`;

export const Heading = styled.h2<BaseTextProps>`
  ${baseTextStyles};
  ${headingStyles};
  ${subdued};
  ${withMargin};
`;

const subheadingStyles = css`
  font-family: var(--font-sans);
  font-weight: normal;
  font-size: 1em;
`;

export const Subheading = styled.h3<BaseTextProps>`
  ${baseTextStyles};
  ${subheadingStyles};
  ${subdued};
  ${withMargin};
`;

const bodyStyles = css`
  font-family: var(--font-sans);
  font-size: 1em;
`;

export const Body = styled.p<BaseTextProps>`
  ${baseTextStyles};
  ${bodyStyles};
  ${subdued};
  ${(p) => {
    switch (p.size) {
      case "small":
        return css`
          font-size: 0.75rem;
        `;
      case "large":
        return css`
          font-size: 1.6rem;
        `;
      default:
        break;
    }
  }}
  ${withMargin};
`;

const monoStyles = css`
  font-family: var(--font-mono);
  font-size: 0.875em;
`;

export const Mono = styled.p<BaseTextProps>`
  ${baseTextStyles};
  ${monoStyles};
  ${subdued};
  ${loading};
  ${uppercase};
  ${(p) => {
    switch (p.size) {
      case "small":
        return css`
          font-size: 0.7em;
        `;
      default:
        break;
    }
  }}
  ${withMargin};
`;
