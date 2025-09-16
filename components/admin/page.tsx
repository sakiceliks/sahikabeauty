import { BlogPostsManager } from "@/components/blog-posts-manager"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Blog Yönetim Paneli</h1>
          <p className="text-muted-foreground mt-2">Blog yazılarınızı yönetin</p>
        </div>
        <BlogPostsManager />
      </div>
    </div>
  )
}
