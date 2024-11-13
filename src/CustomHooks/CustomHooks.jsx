import { useRef, useState, useCallback } from 'react';
import useFetch from './useFetch';
import useOutsideClick from './useOutsideClick';

const CustomHooks = () => {
  const { data, loading, error, refetch } = useFetch(
    'https://dummyjson.com/quotes?limit=0&skip=0'
  );
  const [quote, setQuote] = useState(null);
  const [showingQuote, setShowingQuote] = useState(false);
  const quoteRef = useRef();

  const handleOutsideClick = useCallback(() => {
    setShowingQuote(false);
  }, []);

  useOutsideClick(quoteRef, handleOutsideClick, showingQuote);

  const showContent = useCallback(() => {
    if(!data?.quotes?.length) return;

    const quoteId = Math.floor(Math.random() * data.quotes.length);
    setQuote(data.quotes[quoteId]);

    setShowingQuote(true);
  }, [data]);

  if (loading)
    return (
      <div className='wrapper'>
        <div>Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className='wrapper'>
        <div>{error}</div>
        <button onClick={refetch}>Retry</button>
      </div>
    );

  if (!data)
    return (
      <div className='wrapper'>
        <div>No data available</div>
        <button onClick={refetch}>Retry</button>
      </div>
    );

  return (
    <>
      <div className='wrapper'>
        <div>
          {quote && showingQuote ? (
            <div
              ref={quoteRef}
              style={{
                width: '50%',
                margin: '0 auto 20px',
                cursor: 'pointer',
              }}
            >
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ padding: '10px' }}>{quote.quote}</div>
                  <div>{quote.author}</div>
                </div>
                <button onClick={showContent}>Get a random quote</button>
              </div>
            </div>
          ) : (
            <button onClick={showContent}>Get a random quote</button>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomHooks;
