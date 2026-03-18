import { useState, useEffect } from 'react';

const TodoCRUD = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://jsonplaceholder.typicode.com/todos';

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}?_limit=5`);
        if (!res.ok) throw new Error('Không thể tải danh sách từ máy chủ');
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo = { title: input, completed: false };
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) throw new Error('Lỗi khi lưu dữ liệu mới');
      const savedTodo = await res.json();

      setTodos([savedTodo, ...todos]);
      setInput('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const originalTodos = [...todos];
    setTodos(todos.filter((t) => t.id !== id));

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Xóa thất bại trên hệ thống');
    } catch (err) {
      setError(err.message);
      setTodos(originalTodos);
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 mt-10 bg-white border rounded-2xl shadow-sm'>
      <h2 className='text-xl font-bold text-center mb-6 uppercase'>
        Quản lý Todo (CRUD)
      </h2>

      <form onSubmit={handleAdd} className='flex gap-2 mb-4'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Nhập việc cần làm...'
          className='flex-1 p-2 border rounded-lg outline-none focus:border-blue-500'
          disabled={submitting}
        />
        <button
          type='submit'
          disabled={submitting || !input.trim()}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg font-bold disabled:bg-gray-300'
        >
          {submitting ? '...' : 'Thêm'}
        </button>
      </form>

      {error && (
        <p className='text-red-500 text-xs text-center mb-4 italic font-medium'>
          {error}
        </p>
      )}

      {loading ? (
        <div className='text-center py-5 text-gray-400'>
          Đang tải dữ liệu...
        </div>
      ) : (
        <ul className='space-y-2'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className='flex justify-between items-center p-3 bg-gray-50 border rounded-lg'
            >
              <span className='text-gray-700'>{todo.title}</span>
              <button
                onClick={() => handleDelete(todo.id)}
                className='text-red-500 hover:text-red-700 font-bold text-sm'
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoCRUD;
