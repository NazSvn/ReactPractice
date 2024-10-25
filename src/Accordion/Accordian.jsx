import { useState } from 'react';
import data from './data';

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [multiple, setMultiple] = useState([]);
  const [multipleSelection, setMultipleSelection] = useState(false);

  const toggleMultipleSelection = () => {
    setMultipleSelection((prev) => !prev);

    if (selected) {
      setMultiple((prev) => [...prev, selected]);
      setSelected(null);
    } else if (multipleSelection && multiple.length > 0) {
      setMultiple([]);
    }
  };

  const handleClick = (item) => {
    setSelected((prev) => (prev === item.id ? null : item.id));
  };

  const handleMultipleSelections = (item) => {
    setMultiple((prev) => {
      const index = prev.indexOf(item.id);

      if (index === -1) {
        return [...prev, item.id];
      } else {
        return prev.filter((id) => id !== item.id);
      }
    });
  };

  return (
    <>
      <div className='wrapper'>
        <button onClick={toggleMultipleSelection}>
          {multipleSelection ? 'Disable' : 'Enable'} multiple selection
        </button>

        <div
          className='accordion'
          style={accordionStyle()}
        >
          {data && data.length > 0 ? (
            data.map((item) => {
              return (
                <div
                  className='item'
                  key={item.id}
                >
                  <div
                    className='question'
                    style={questionStyle()}
                    onClick={() =>
                      multipleSelection
                        ? handleMultipleSelections(item)
                        : handleClick(item)
                    }
                  >
                    <h3>{item.question}</h3>
                  </div>

                  {(selected === item.id || multiple.includes(item.id)) && (
                    <div
                      className='answer'
                      style={{ padding: '10px' }}
                    >
                      <h4>{item.answer}</h4>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div>Not data found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accordion;

const accordionStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  width: '500px',
  gap: '5px',
  padding: '15px',
});

const questionStyle = () => ({
  backgroundColor: '#333131a1',
  height: '80px',
  alignContent: 'center',
  padding: '10px',
});
