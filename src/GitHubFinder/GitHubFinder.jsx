import { useEffect, useRef, useState } from 'react';
import './githubFinder.css';

const GitHubFinder = () => {
  const [profiles, setProfiles] = useState(null);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('NazSvn');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://api.github.com/users/${search}`);

      if (!response.ok) throw new Error('User not found');

      const data = await response.json();

      setProfiles(data);
    } catch (error) {
      setError(error.message);
      setProfiles(null); // clear profiles on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [search]);

  const handleSearch = () => {
    if (input.trim()) {
      setSearch(input.trim());
      setInput('');
    }
  };

  const handleKeydown = (e) => {
    if (!e) return;
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      setInput('');
      inputRef.current.blur();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString('en-us', {
      month: 'short',
    })} ${date.getFullYear()}`;
  };

  return (
    <>
      <div className='wrapper'>
        <div className='card-controller'>
          <input
            ref={inputRef}
            className='card-input'
            type='text'
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeydown}
            value={input}
            placeholder='Enter GitHub username here'
          />
          <button
            className='card-button'
            type='button'
            onClick={handleSearch}
            disabled={!input.trim()} //prevents to search even if the input is just white spaces.
          >
            Search Profile
          </button>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div className='error-message'>{error}</div>}

        {profiles && !error && (
          <div className='card-container'>
            <div className='card-header'>
              <img
                className='card-thumbnail'
                src={profiles.avatar_url}
                alt={`${profiles.login || profiles.name}'s profile avatar`}
              />
              <div className='card-user-name'>
                <span>
                  <a
                    href={profiles.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {profiles.login || profiles.name}
                  </a>
                </span>
              </div>
              <div className='card-creation-time'>
                <span className='card-creation-label'>Account created on:</span>{' '}
                <span>{formatDate(profiles.created_at)}</span>
              </div>
            </div>
            <div className='card-content'>
              <div className='card-content-box'>
                <span className='card-value'>{profiles.public_repos}</span>
                <span className='card-parameter'>Puclic repos</span>
              </div>

              <div className='card-content-box'>
                <span className='card-value'>{profiles.followers}</span>
                <span className='card-parameter'>Followers</span>
              </div>
              <div className='card-content-box'>
                <span className='card-value'>{profiles.following}</span>
                <span className='card-parameter'>Following</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GitHubFinder;
