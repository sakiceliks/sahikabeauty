import BlogClientPage from "./BlogClientPage"

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

const BlogPage = () => {
  return <BlogClientPage />
}

export default BlogPage
