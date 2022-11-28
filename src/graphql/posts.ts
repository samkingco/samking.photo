import { format } from "date-fns";
import { graphQlClient } from "./client";
import { graphql } from "./gql";

export interface Post {
  id: string;
  posted: string;
  year: string;
  month: string;
  day: string;
  title: string;
  slug: string;
  images: PostImage[];
}

export interface PostImage {
  id: string;
  title: string;
  slug: string;
  captured: string;
  url: string;
  width: number;
  height: number;
}

const postsQueryDocument = graphql(/* GraphQL */ `
  query Posts {
    posts {
      id
      posted: createdAt
      title
      slug
      images {
        id
        title
        slug
        captured: date
        source {
          id
          url
          width
          height
        }
      }
    }
  }
`);

export async function getPostsForYear(year: string) {
  const allPosts = await getAllPosts();
  return allPosts.filter((p) => p.year === year);
}

export async function getPostsForMonth(year: string, month: string) {
  const allPosts = await getAllPosts();
  return allPosts.filter((p) => p.month === month && p.year === year);
}

export async function getPostsForDay(year: string, month: string, day: string) {
  const allPosts = await getAllPosts();
  return allPosts.filter(
    (p) => p.day === day && p.month === month && p.year === year
  );
}

export async function getPost(slug: string) {
  const allPosts = await getAllPosts();
  return allPosts.find((p) => p.slug === slug);
}

export async function getAllPosts(): Promise<Post[]> {
  const postsQuery = await graphQlClient.request(postsQueryDocument);

  if (!postsQuery) {
    return [];
  }

  const posts: Post[] = postsQuery.posts.map((post, postIndex) => {
    const posted = new Date(post.posted);

    const images: PostImage[] = [];
    post.images.forEach((image, index) => {
      const postImage: PostImage = {
        id: image.id,
        title: image.title || "Untitled",
        slug: `${index + 1}`,
        captured: format(new Date(image.captured), "dd/MM/yyyy"),
        url: image.source?.url ?? "",
        width: image.source?.width ?? 0,
        height: image.source?.height ?? 0,
      };
      images.push(postImage);
    });

    const p: Post = {
      id: post.id,
      posted: format(posted, "dd/MM/yyyy"),
      year: format(posted, "yyyy"),
      month: format(posted, "MM"),
      day: format(posted, "dd"),
      title: post.title ?? "",
      slug: post.slug ?? `${postIndex + 1}`,
      images,
    };

    return p;
  });

  return posts;
}
