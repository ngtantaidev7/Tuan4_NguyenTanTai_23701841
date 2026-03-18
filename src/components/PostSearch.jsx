import { useState, useEffect, useMemo } from 'react';

const PostSearch = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Lỗi fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [posts, searchTerm]);

  return (
    <div className='max-w-2xl mx-auto p-6 mt-10 bg-white border rounded-2xl shadow-sm'>
      <h2 className='text-2xl font-black mb-6 text-center text-gray-800 italic uppercase'>
        Post Search Center
      </h2>

      {/* Ô tìm kiếm */}
      <input
        type='text'
        placeholder='Tìm kiếm tiêu đề bài viết...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full p-3 border-2 rounded-xl mb-6 outline-none focus:border-blue-500 transition-all'
      />

      {loading ? (
        <div className='text-center py-10 text-blue-500 animate-pulse'>
          Đang tải bài viết...
        </div>
      ) : (
        <div className='space-y-4 max-h-[500px] overflow-y-auto pr-2'>
          <p className='text-sm text-gray-500 italic'>
            Tìm thấy: {filteredPosts.length} kết quả
          </p>

          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className='p-4 border rounded-xl hover:bg-gray-50 transition-colors'
            >
              <h3 className='font-bold text-blue-700 capitalize mb-1'>
                {post.title}
              </h3>
              <p className='text-sm text-gray-600 line-clamp-2'>{post.body}</p>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <p className='text-center text-red-400 py-10'>
              Không tìm thấy bài viết nào phù hợp!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostSearch;
