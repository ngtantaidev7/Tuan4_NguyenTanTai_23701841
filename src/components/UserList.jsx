import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, isLoading] = useState(true);
  const [error, isError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Không thể lấy dữ liệu');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        isError(err.message);
        console.error('Lỗi khi lấy dữ liệu:', err);
      } finally {
        isLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='max-w-md mx-auto bg-cyan-50 mt-10 p-5 rounded-lg border'>
      <h2 className='text-center font-bold mb-4 uppercase'>User List</h2>

      {loading ? (
        <div className='text-blue-500 font-bold text-center'>Loading...</div>
      ) : error ? (
        <div className='text-red-500 text-center font-bold italic'>
          Error: {error}
        </div>
      ) : (
        <div className=''>
          {users.map((user) => (
            <div key={user.id} className='py-3 text-center hover:bg-white'>
              <p className='font-bold text-gray-800'>{user.name}</p>
              <p className='text-sm text-gray-500'>{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
