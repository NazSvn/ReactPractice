import NavigationItem from './NavigationItem';
import PropTypes from 'prop-types';

const NavigationList = ({ list = [] }) => {
  return (
    <ul className='nav-ul'>
      {list && list.length
        ? list.map((listItem, i) => (
            <NavigationItem
              key={i}
              item={listItem}
            />
          ))
        : null}
    </ul>
  );
};

export default NavigationList;

NavigationList.propTypes = {
  list: PropTypes.array.isRequired,
};
