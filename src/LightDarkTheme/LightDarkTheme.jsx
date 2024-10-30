import useThemeToggle from './useThemeToggle';
import './lightDarkMode.css';
const LightDarkTheme = () => {
  const [theme, setTheme] = useThemeToggle('theme', 'dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <div
        className='light-dark-mode-wrapper'
        data-theme={theme}
      >
        <div className='light-dark-mode-container'>
          <p className='light-dark-mode-text'>Hi there!</p>
          <button
            className='light-dark-mode'
            onClick={toggleTheme}
          >
            Switch to {theme === 'light' ? 'dark' : 'light'} Theme
          </button>
        </div>
      </div>
    </>
  );
};

export default LightDarkTheme;
