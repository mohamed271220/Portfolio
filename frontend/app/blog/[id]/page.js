import { getBlogPost } from "@/api";
import Post from "@/components/Post";

export default async function BlogPostPage({ params }) {
    const id = params.id;
    const post = await getBlogPost(id);
    return (
        <div className="container mx-auto p-4 z-10">
            <Post post={post} />
        </div>
    );

}
