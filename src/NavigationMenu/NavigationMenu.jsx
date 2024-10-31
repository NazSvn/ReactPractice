import menu from './menu-data';
import NavigationList from './NavigationList';
import './menuStyles.css';

const NavigationMenu = () => {
  const data = menu;
  return (
    <>
      <div className='wrapper'>
        <div className='nav-menu-wrapper'>
          <div className='nav-menu-container'>
            <NavigationList list={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;
