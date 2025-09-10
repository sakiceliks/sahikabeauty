// components/Admin/BlogTable.js
export default function BlogTable({ posts, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Başlık</th>
              <th className="px-6 py-4 text-left">Kategori</th>
              <th className="px-6 py-4 text-left">Yazar</th>
              <th className="px-6 py-4 text-left">Tarih</th>
              <th className="px-6 py-4 text-left">Görüntülenme</th>
              <th className="px-6 py-4 text-left">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                <td className="px-6 py-4">{post.id}</td>
                <td className="px-6 py-4 font-semibold">{post.title}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-600 px-2 py-1 rounded text-xs">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4">{post.author}</td>
                <td className="px-6 py-4">{post.date}</td>
                <td className="px-6 py-4">{post.views}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(post)}
                      className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => onDelete(post.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {posts.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Hiç blog yazısı bulunamadı
        </div>
      )}
    </div>
  );
}