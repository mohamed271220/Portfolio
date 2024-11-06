import { getBlogPosts } from "@/api";
import Posts from "@/components/Posts";
export default async function BlogPage() {
    const blogPosts = await getBlogPosts();

    console.log(blogPosts);
    
    return (
        <div className="container flex flex-col gap-5 mx-auto  p-4 z-10">
            <Posts blogPosts={blogPosts} />
        </div>
    );
};

