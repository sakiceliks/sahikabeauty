
import BlogClientPage from "./BlogClientPage";

// Server-side data fetching
async function fetchBlogPosts() {
  try {
    const res = await fetch("https://sultanbeyliguzellikmerkezi.com.tr/api/blog", {
      cache: "no-store", // Ensure fresh data for SSR
    });
    if (!res.ok) throw new Error("Failed to fetch blog posts");
    return await res.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export const metadata = {
  title: "Blog - Sultanbeyli Güzellik Merkezi | Güzellik İpuçları ve Rehberler",
  description:
    "Sultanbeyli güzellik merkezi blog sayfası. Güzellik ipuçları, cilt bakımı rehberleri, epilasyon bilgileri ve uzman tavsiyeleri.",
  keywords:
    "sultanbeyli güzellik merkezi blog, güzellik ipuçları, cilt bakımı rehberi, epilasyon bilgileri, sultanbeyli blog",
  openGraph: {
    title: "Blog - Sultanbeyli Güzellik Merkezi",
    description: "Güzellik, bakım ve sağlık hakkında güncel bilgiler, ipuçları ve uzman görüşleri.",
    type: "website",
    locale: "tr_TR",
  },
}
export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts();

  return <BlogClientPage blogPosts={blogPosts} />;
}