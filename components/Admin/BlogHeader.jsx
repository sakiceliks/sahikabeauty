// components/Admin/BlogHeader.js
export default function BlogHeader({ onAddNew }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Blog Yönetim Paneli</h1>
      <button
        onClick={onAddNew}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
      >
        Yeni Blog Yazısı Ekle
      </button>
    </div>
  );
}
