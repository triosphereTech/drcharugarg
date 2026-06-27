import Link from "next/link";
import blogs from "@/components/blogs/data/BlogOne.json";

const Blogs = () => {
  return (
    <div>
      {blogs.map((blog) => (
        <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
          <h2>{blog.title}</h2>
        </Link>
      ))}
    </div>
  );
};

export default Blogs;