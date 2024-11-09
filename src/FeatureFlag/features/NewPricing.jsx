import '../featureFlag.css'

const NewPricing = () => {
  return (
    <>
      <div className='newPricing'>
        <h2 className='pricingTitle'>New Premium Pricing</h2>
        <div className='pricingGrid'>
          {['Basic', 'Pro', 'Enterprise'].map((plan) => (
            <div
              key={plan}
              className='pricingCard'
            >
              <h3 className='planName'>{plan}</h3>
              <p className='price'>
                $
                {plan === 'Basic' ? '9.99' : plan === 'Pro' ? '19.99' : '29.99'}
                <span className='priceMonth'>/month</span>
              </p>
              <ul className='featureList'>
                <li className='featureItem'>Feature 1</li>
                <li className='featureItem'>Feature 2</li>
                <li className='featureItem'>Feature 3</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewPricing;
