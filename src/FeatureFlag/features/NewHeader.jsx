import { FiShoppingCart } from 'react-icons/fi';
import '../featureFlag.css';

const NewHeader = () => {
  return (
    <>
      <header className='newHeader'>
        <div className='headerContent'>
          <h1 className='headerTitle'>SuperStore 2.0</h1>
          <nav className='nav'>
            <a
              href='#'
              className='navLink'
            >
              Products
            </a>
            <a
              href='#'
              className='navLink'
            >
              Categories
            </a>
            <FiShoppingCart size={24} />
          </nav>
        </div>
      </header>
    </>
  );
};

export default NewHeader;
