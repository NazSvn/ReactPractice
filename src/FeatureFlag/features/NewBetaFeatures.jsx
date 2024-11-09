import '../featureFlag.css';

const NewBetaFeatures = () => {
  return (
    <>
      <div className='newProductGrid'>
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className='productCard'
          >
            <div className='productImage'></div>
            <h3 className='productTitle'>New Product Card {item}</h3>
            <p className='productDescription'>
              Enhanced product description with more details and features.
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewBetaFeatures;
