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
    if (!data?.quotes?.length) return;

    const quoteId = Math.floor(Math.random() * data.quotes.length);
    setQuote(data.quotes[quoteId]);

    setShowingQuote(true);
  }, [data]);

  if (loading)
    return (
      <div className='wrapper'>
        <div style={loadingStyle()}>Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className='wrapper'>
        <div style={containerStyle()}>
          <div style={errorStyle()}>{error}</div>
          <button
            style={buttonStyle()}
            onClick={refetch}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!data)
    return (
      <div className='wrapper'>
        <div style={containerStyle()}>
          <div style={errorStyle()}>No data available</div>
          <button
            style={buttonStyle()}
            onClick={refetch}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className='wrapper'>
      {quote && showingQuote ? (
        <div
          ref={quoteRef}
          style={containerStyle()}
        >
          <div style={quoteContentStyle()}>
            <span style={quotationMarkStyle()}>"</span>
            <div style={quoteTextStyle()}>{quote.quote}</div>
            <div style={authorStyle()}>― {quote.author}</div>
          </div>
          <button
            style={buttonStyle()}
            onClick={showContent}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#2980b9';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#3498db';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get another quote
          </button>
        </div>
      ) : (
        <button
          style={buttonStyle()}
          onClick={showContent}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2980b9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#3498db';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Get a random quote
        </button>
      )}
    </div>
  );
};

const containerStyle = () => ({
  width: '90%',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '30px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  cursor: 'default',
  position: 'relative',
});

const quoteContentStyle = () => ({
  marginBottom: '24px',
  position: 'relative',
  padding: '20px 0',
});

const quoteTextStyle = () => ({
  fontSize: '24px',
  lineHeight: '1.5',
  color: '#2c3e50',
  fontStyle: 'italic',
  marginBottom: '16px',
  position: 'relative',
  paddingLeft: '24px',
});

const quotationMarkStyle = () => ({
  position: 'absolute',
  left: '-10px',
  top: '-10px',
  fontSize: '60px',
  color: '#e1e1e1',
  fontFamily: 'Georgia, serif',
});

const authorStyle = () => ({
  fontSize: '18px',
  color: '#7f8c8d',
  textAlign: 'right',
  fontWeight: '500',
});

const buttonStyle = () => ({
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '6px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out, transform 0.1s ease-in-out',
  ':hover': {
    backgroundColor: '#2980b9',
    transform: 'translateY(-2px)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

const loadingStyle = () => ({
  fontSize: '20px',
  color: '#7f8c8d',
  textAlign: 'center',
  padding: '20px',
});

const errorStyle = () => ({
  color: '#e74c3c',
  textAlign: 'center',
  padding: '20px',
  fontSize: '18px',
});

export default CustomHooks;
