import menu from './menu-data';
import NavigationList from './NavigationList';
import './menuStyles.css';

const NavigationMenu = () => {
  const data = menu;
  return (
    <>
      <div className='nav-menu-container'>
        <NavigationList list={data} />
      </div>
    </>
  );
};

export default NavigationMenu;
