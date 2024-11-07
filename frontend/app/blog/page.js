import { getBlogPosts } from "@/api";
import Posts from "@/components/Posts";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Mohamed Magdy's Blog",
    description: "Read the latest blog posts from the team at Tailwind CSS",
}

export default async function BlogPage() {
    const blogPosts = await getBlogPosts();
    if (!blogPosts) {
        notFound();
    }
    return (
        <div className="container flex flex-col gap-5 mx-auto  p-4 z-10">
            <Posts blogPosts={blogPosts} />
        </div>
    );
};

