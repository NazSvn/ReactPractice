import { useEffect, useState, useCallback, useRef } from 'react';
import './AutocompleteSearch.css';
import ContactCard from './ContactCard';

const AutoCompleteSearch = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef();
  const suggestionsRef = useRef();
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
        setSelectedIndex(-1);
      } else {
        setSearch([]);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [users, input]);

  const handleKeydown = (e) => {
    switch (e.key) {
      case 'Escape':
        setInput('');
        setSearch([]);
        inputRef.current?.blur();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < search.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
        break;
      case 'Enter':
        if (selectedIndex >= 0 && search[selectedIndex]) {
          const selected = search[selectedIndex];
          setSelectedUser(selected);
          setInput('');
          setSearch([]);
          setSelectedIndex(-1);
          inputRef.current?.blur();
        }
        break;
    }
  };

  const handleSearchClick = (user) => {
    setSelectedUser(user);
    setInput('');
    setSelectedIndex(-1);
  };

  return (
    <>
      <div className='autocomplete-wrapper'>
        <div className='autocomplete-input-wrapper'>
          <input
            ref={inputRef}
            type='text'
            placeholder='Search user'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeydown}
            aria-label='Search users'
            aria-expanded={search.length > 0}
            aria-autocomplete='list'
            className='autocomplete-input'
          />
        </div>

        {search.length > 0 && (
          <ul
            ref={suggestionsRef}
            id='suggestions-list'
            role='listbox'
            className='user-list-wrapper'
          >
            {search.map((user, i) => (
              <li
                key={user.id}
                role='option'
                aria-selected={i === selectedIndex}
                onClick={() => handleSearchClick(user)}
                className={`user-list ${
                  selectedIndex === i ? 'user-list selected' : ''
                }`}
              >
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        )}
        {input && !search.length && !loading && (
          <div className='autocomplete-not-user'>
            Not matching user, please try again.
          </div>
        )}
        {selectedUser.id && !loading && !input && (
          <div className='autocomplete-card-wrapper'>
            <ContactCard user={selectedUser} />
          </div>
        )}
        <div className='autocomplete-loading-error-wrapper'>
          {loading && !error && (
            <div className='autocomplete-loading'>Loading...</div>
          )}
          {error && <div className='autocomplete-error'>{error}</div>}
        </div>
      </div>
    </>
  );
};

export default AutoCompleteSearch;
