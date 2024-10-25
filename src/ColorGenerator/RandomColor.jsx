import { useState } from 'react';

const HEX_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

const colorUtility = (length) => Math.floor(Math.random() * length);

const RandomColor = () => {
  const [colorType, setColorType] = useState('hex');
  const [bgColor, setBgColor] = useState('#000000');

  const generateHexColor = () => {
    let hexColor = '#';

    for (let i = 0; i < 6; i++) {
      hexColor += HEX_VALUES[colorUtility(HEX_VALUES.length)];
    }
    setBgColor(hexColor);
  };

  const generateRgbColor = () => {
    const r = colorUtility(256);
    const g = colorUtility(256);
    const b = colorUtility(256);

    setBgColor(`rgb(${r}, ${g}, ${b})`);
  };

  return (
    <>
      <div style={{ ...wrapperStyle(bgColor) }}>
        <div>
          <button onClick={() => setColorType('hex')}>Get Hex Color</button>
          <button onClick={() => setColorType('rgb')}>Get rgb Color</button>
          <button
            onClick={colorType === 'hex' ? generateHexColor : generateRgbColor}
          >
            Randomize color
          </button>
        </div>
        <div
          className='colorDisplay'
          style={{ ...colorDisplayStyle(bgColor) }}
        >
          <h1>{colorType === 'hex' ? 'Hex Color' : 'RGB Color'}</h1>
          <h2 style={{ fontSize: '4rem' }}>{bgColor}</h2>
        </div>
      </div>
    </>
  );
};

const wrapperStyle = (bgColor) => ({
  height: '100vh',
  width: '100vw',
  background: bgColor,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const colorDisplayStyle = (bgColor) => ({
  color:
    bgColor === '#000000' || bgColor === 'rgb(0,0,0)' ? '#ffffff' : '#000000',
  margin: 'auto',
  textAlign: 'center',
});

export default RandomColor;
