import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';

const QrCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [value, setValue] = useState('');
  const qrRef = useRef();

  const handleGenerateQr = () => {
    setValue(input);
    setInput('');
  };

  const handleDownload = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    img.src = url;
  };

  return (
    <>
      <div
        style={{
          height: '100dvh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
              type='text'
              placeholder='Enter text fo QR code'
              id='QrCodeGenerator'
              onChange={(e) => setInput(e.target.value)}
              value={input}
              style={{
                padding: '10px',
                width: '80%',
                borderRadius: '5px',
                fontSize: '1rem',
              }}
            />
            <button
              onClick={handleGenerateQr}
              style={{ width: '260px' }}
            >
              Generate Qr Code
            </button>
          </div>

          <div ref={qrRef}>
            <QRCode
              size={300}
              value={value || ' '}
            />
          </div>
          <button
            onClick={handleDownload}
            style={{ marginTop: '10px', padding: '10px 20px' }}
          >
            Download QR Code
          </button>
        </div>
      </div>
    </>
  );
};

export default QrCodeGenerator;
