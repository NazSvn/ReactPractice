import { useEffect, useState, useCallback, useRef } from 'react';

const AutoCompleteSearch = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();

      if (!response.ok) throw new Error('User not found');

      setUsers(data.users || []);
    } catch (error) {
      setError(error.message);
      setUsers([]);
      setSearch([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (input.trim()) {
        const filteredUsers = users.filter((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(input.toLowerCase().trim())
        );
        setSearch(filteredUsers);
      } else {
        setSearch([]);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [users, input]);

  const handleKeydown = (e) => {
    if (!e) return;
    if (e.key === 'Escape') {
      setInput('');
      inputRef.current.blur();
    }
  };

  return (
    <>
      <div>
        {loading && !error && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <div>
          <input
            ref={inputRef}
            type='text'
            placeholder='Search user'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeydown}
          />
        </div>
        {input && !search.length && !loading && (
          <div>Not matching user, please try again.</div>
        )}
        {search.map((user) => (
          <div key={user.id}>
            {user.firstName} {user.lastName}
          </div>
        ))}
        {/* <AutocompleteUserData users={users} /> */}
      </div>
    </>
  );
};

export default AutoCompleteSearch;
