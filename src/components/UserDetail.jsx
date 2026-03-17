import { useState, useEffect } from 'react';

const UserDetail = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || userId < 1 || userId > 10) {
      setUser(null);
      setError(userId ? 'Vui lòng nhập ID từ 1 đến 10' : null);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        );
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className='max-w-md mx-auto bg-white p-6 mt-10 border rounded-xl shadow-sm'>
      <h2 className='font-bold mb-4 uppercase text-center text-blue-600'>
        Tra cứu User
      </h2>

      <input
        type='number'
        placeholder='Nhập ID (1-10)...'
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className='w-full p-2 border rounded mb-5 outline-none focus:border-blue-400 text-center'
      />

      {loading ? (
        <div className='text-center text-gray-500'>Đang tìm...</div>
      ) : error ? (
        <div className='text-red-500 text-center italic'>{error}</div>
      ) : user ? (
        <div className='p-4 bg-blue-50 rounded-lg'>
          <p className='font-bold text-lg text-gray-800 border-b pb-1 mb-2'>
            {user.name}
          </p>
          <p className='text-sm text-gray-600'> Phone: {user.phone}</p>
          <p className='text-sm text-blue-500 underline'>
              Website: {user.website}
          </p>
        </div>
      ) : (
        <p className='text-center text-gray-400 text-sm'>
          Nhập ID để xem thông tin chi tiết
        </p>
      )}
    </div>
  );
};

export default UserDetail;
