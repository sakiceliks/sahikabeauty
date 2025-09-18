// Blog sayfasının sunucu tarafı işlemleri
import BlogClientPage from "./BlogClientPage";

// Blog yazılarını API'den çeken fonksiyon
async function fetchBlogPosts() {
  try {
    const response = await fetch("https://sultanbeyliguzellikmerkezi.com.tr/api/blog", {
      cache: "no-store", // Her zaman güncel veri çekmek için önbelleği devre dışı bırak
    });

    if (!response.ok) {
      throw new Error("Blog yazıları çekilemedi");
    }

    const data = await response.json();
        console.log('data',data);

    return data;
  } catch (error) {
    console.error("Blog yazıları çekilirken hata oluştu:", error);
    return { success: false, data: [], count: 0 }; // Hata durumunda boş veri döndür
  }
}

// Sayfanın meta verileri (SEO için)
export const metadata = {
  title: "Blog - Sultanbeyli Güzellik Merkezi | İpuçları ve Rehberler",
  description:
    "Sultanbeyli Güzellik Merkezi’nin blog sayfasında güzellik, cilt bakımı ve epilasyon hakkında en güncel rehberler, ipuçları ve uzman tavsiyeleri.",
  keywords:
    "sultanbeyli güzellik merkezi, güzellik blogu, cilt bakımı, lazer epilasyon, güzellik ipuçları",
  openGraph: {
    title: "Blog - Sultanbeyli Güzellik Merkezi",
    description: "Güzellik, cilt bakımı ve sağlıkla ilgili güncel bilgiler ve uzman önerileri.",
    type: "website",
    locale: "tr_TR",
    url: "https://sultanbeyliguzellikmerkezi.com.tr/blog",
    site_name: "Şahika Beauty",
  },
};

// Ana blog sayfası bileşeni
export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts();

  return <BlogClientPage blogPosts={blogPosts} />;
}