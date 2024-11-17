import { notFound } from "next/navigation";
import Posts from "@/components/Posts";

export const metadata = {
  title: "Mohamed Magdy's Blog",
  description: "Read the latest blog posts from the team at Tailwind CSS",
};

async function fetchBlogPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  return res.json();
}

export default async function BlogPage() {
  let blogPosts;
  try {
    blogPosts = await fetchBlogPosts();
  } catch (error) {
    console.error('Error loading blog posts:', error);
    notFound();
  }

  if (!blogPosts) {
    notFound();
  }

  return (
    <div className="container flex flex-col gap-5 mx-auto p-4 z-10">
      <Posts blogPosts={blogPosts} />
    </div>
  );
}