import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  keywords: string[];
  faqs: { q: string; a: string }[];
  image?: string;
  draft: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
}

function normalize(data: Record<string, unknown>): PostFrontmatter {
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date,
    author: String(data.author ?? "Eli Newman"),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    faqs: Array.isArray(data.faqs)
      ? data.faqs.map((f) => ({ q: String((f as { q: unknown }).q), a: String((f as { a: unknown }).a) }))
      : [],
    image: typeof data.image === "string" ? data.image : undefined,
    draft: data.draft === true,
  };
}

async function readPostFile(filename: string): Promise<Post> {
  const raw = await fs.readFile(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: filename.replace(/\.mdx?$/, ""),
    frontmatter: normalize(data),
    body: content,
  };
}

export async function listPosts(): Promise<Post[]> {
  let filenames: string[];
  try {
    filenames = await fs.readdir(POSTS_DIR);
  } catch (err: unknown) {
    if (err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw err;
  }
  const posts = await Promise.all(
    filenames.filter((f) => /\.mdx?$/.test(f)).map(readPostFile),
  );
  return posts
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  for (const name of [`${slug}.mdx`, `${slug}.md`]) {
    try {
      return await readPostFile(name);
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") {
        continue;
      }
      throw err;
    }
  }
  return null;
}
