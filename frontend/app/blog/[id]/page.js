import { getBlogPost } from "@/api";
import Post from "@/components/Post";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const id = params.id;
    const post = await getBlogPost(id);
    if (!post) {
        notFound();
    }
    return {
        title: post.title,
        description: "Read the latest blog posts.",
    };
}

export default async function BlogPostPage({ params }) {
    const id = params.id;
    const post = await getBlogPost(id);
    if (!post) {
        notFound();
    }
    return (
        <div className="container mx-auto p-4 z-10">
            <Post post={post} />
        </div>
    );

}
