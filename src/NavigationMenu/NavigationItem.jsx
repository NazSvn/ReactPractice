import PropTypes from 'prop-types';
import NavigationList from './NavigationList';
import { useState } from 'react';

const NavigationItem = ({ item }) => {
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

  const toggleChildren = (currentChildren) => {
    setDisplayCurrentChildren((prevState) => ({
      ...prevState,
      [currentChildren]: !prevState[currentChildren],
    }));
  };

  return (
    <li className='nav-li'>
      <div className='nav-item-label-container'>
        <p className='nav-item-label'>{item.label}</p>
        {item.children?.length && (
          <button
            onClick={() => toggleChildren(item.label)}
            className='item-label-button'
          >
            {displayCurrentChildren[item.label] ? '-' : '+'}
          </button>
        )}
      </div>
      {/* here im using conditional rendering with Optional chaining to simplify
      it. Could also be: item.children && item.children.length */}

      {item.children?.length && displayCurrentChildren[item.label] && (
        <NavigationList list={item.children} />
      )}
    </li>
  );
};

export default NavigationItem;

NavigationItem.propTypes = {
  item: PropTypes.object.isRequired,
};
