import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className='progress-bar-container'
        style={barContainerStyle()}
      >
        <div
          className='progress-bar'
          style={barStyle(scrollProgress)}
        ></div>
      </div>
    </>
  );
};

export default ScrollProgress;

const barContainerStyle = () => ({
  backgroundColor: '#242424',
  width: '100dvw',
  position: 'fixed',
  top: '0',
  left: '0',
  height: '20px',
});

const barStyle = (scrollProgress) => ({
  backgroundColor: '#1a1a1a',
  height: '20px',
  zIndex: '3',
  width: `${scrollProgress}%`,
  transition: 'width 0.1s ease-in-out',
});
