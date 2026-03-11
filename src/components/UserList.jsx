import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='max-w-md mx-auto bg-cyan-50  mt-10'>
      <div>
        {users.map((user) => (
          <div key={user.id} className='py-3 text-center'>
            <p className='font-bold text-gray-800'>{user.name}</p>
            <p className='text-sm text-gray-500'>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
