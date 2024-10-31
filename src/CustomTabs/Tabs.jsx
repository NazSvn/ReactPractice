import { useState } from 'react';
import PropTypes from 'prop-types';
import './tabs.css';

const Tabs = ({ tabsContent }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleClick = (i) => {
    setCurrentTabIndex(i);
  };

  if (!tabsContent || !tabsContent.length)
    return <div>No content available.</div>;

  return (
    <>
      <div className='wrapper'>
        <div className='tabs-header'>
          {tabsContent.map((tabItem, i) => (
            <div
              key={tabItem.label}
              onClick={() => handleClick(i)}
              className={`tab-label ${i === currentTabIndex ? 'active' : ''}`}
            >
              {tabItem.label}
            </div>
          ))}
        </div>
        <div className='tab-content'>
          {tabsContent[currentTabIndex].content}
        </div>
      </div>
    </>
  );
};
export default Tabs;

Tabs.propTypes = {
  tabsContent: PropTypes.array.isRequired,
};
