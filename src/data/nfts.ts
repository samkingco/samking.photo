import { BigNumber, ethers } from "ethers";

export const PROJECTS = {
  ROOTS: "ROOTS",
  ROOTS_EDITIONS: "ROOTS_EDITIONS",
  ICE64: "ICE64",
  DROPS: "DROPS",
} as const;

export type Project = typeof PROJECTS[keyof typeof PROJECTS];

export function projectLink(project: Project): string {
  if (project === "ROOTS") return "https://roots.samking.photo";
  if (project === "ROOTS_EDITIONS")
    return "https://roots.samking.photo/editions";
  if (project === "ICE64") return "https://ice64.com";
  if (project === "DROPS") return "https://drops.samking.studio";
  return "samking.photo";
}

export function projectTokenLink(project: Project, id: number): string {
  if (project === "ROOTS") return `https://roots.samking.photo/originals/${id}`;
  if (project === "ROOTS_EDITIONS")
    return `https://roots.samking.photo/editions/${id}`;
  if (project === "ICE64") return `https://ice64.com/photo/${id}`;
  if (project === "DROPS") return `https://drops.samking.studio/drops/${id}`;
  return "samking.photo";
}

export type Token = {
  project: Project;
  id: number;
  released: boolean;
  price: BigNumber;
  mintedCount?: number;
  editionSize?: number;
  soldOut: boolean;
  image: string;
  imageAspectRatio: number;
};

export const rootsTokens: Token[] = Array.from(
  { length: 40 },
  (v, i) => i + 1
).map((i) => {
  return {
    project: "ROOTS",
    id: i,
    released: true,
    price: ethers.utils.parseEther("0.1"),
    soldOut: true,
    image: `/nfts/roots/${i}.jpg`,
    imageAspectRatio: 1,
  };
});

export const rootsEditionsTokens: Token[] = Array.from(
  { length: 12 },
  (v, i) => i + 1
).map((i) => {
  return {
    project: "ROOTS_EDITIONS",
    id: i,
    released: i <= 4,
    price:
      i === 1
        ? ethers.utils.parseEther("0.08")
        : ethers.utils.parseEther("0.05"),
    editionSize: 20,
    soldOut: false,
    image: `/nfts/roots-editions/${i}.jpg`,
    imageAspectRatio: 4 / 5,
  };
});

export const ice64OriginalTokens: Token[] = Array.from(
  { length: 16 },
  (v, i) => i + 1
).map((i) => {
  return {
    project: "ICE64",
    id: i,
    released: true,
    price: ethers.utils.parseEther("0.32"),
    soldOut: false,
    image: `/nfts/ice64/${i}.jpg`,
    imageAspectRatio: 1,
  };
});

export const ice64EditionTokens: Token[] = Array.from(
  { length: 16 },
  (v, i) => i + 1
).map((i) => {
  return {
    project: "ICE64",
    id: 100 + i,
    released: true,
    price: ethers.utils.parseEther("0.04"),
    editionSize: 64,
    soldOut: false,
    image: `/nfts/ice64/${i}.svg`,
    imageAspectRatio: 1,
  };
});

export const dropsTokens: Token[] = Array.from(
  { length: 5 },
  (v, i) => i + 1
).map((i) => {
  return {
    project: "DROPS",
    id: i,
    released: true,
    price: ethers.utils.parseEther("0"),
    soldOut: false,
    image: `/nfts/drops/${i}.jpg`,
    imageAspectRatio: i == 4 ? 5 / 4 : 1,
  };
});
