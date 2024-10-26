import { useEffect, useRef, useState } from 'react';
import './LoadMoreStyle.css';

const LIMIT = 10; // Products per fetch
const MAX_PRODUCTS = 50; // Total product limit

const LoadMore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [reachedProductsLimit, setReachedProductsLimit] = useState(false);

  const initialFetchDone = useRef(false);

  const fetchProducts = async (count) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${
          count === 0 ? 0 : count * LIMIT
        }`
      );
      const data = await response.json();

      if (data && data.products) {
        setItems((prev) => [...prev, ...data.products]);
      }
    } catch (error) {
      console.error({ 'Error fetching data.': error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchProducts(count);
      initialFetchDone.current = true;
    }
  }, [count]);

  useEffect(() => {
    if (items.length === MAX_PRODUCTS) {
      setReachedProductsLimit(true);
    }
  }, [items]);

  const handleLoadMore = () => {
    setCount((prev) => prev + 1);
    initialFetchDone.current = false;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='load-more-container'>
        <div className='load-more-product-container'>
          {items && items.length
            ? items.map((product) => (
                <div
                  key={product.id}
                  className='load-more-product'
                >
                  <div className='image-container'>
                    <img
                      className='product-image'
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </div>
                  <p className='load-more-product-name'>{product.title}</p>
                  <p className='load-more-product-description'>
                    {product.description}
                  </p>
                </div>
              ))
            : null}
        </div>
        <div>
          <button
            disabled={loading || reachedProductsLimit}
            onClick={handleLoadMore}
            className={`load-more-button ${
              reachedProductsLimit ? 'disabled' : ''
            }`}
          >
            {reachedProductsLimit ? 'No more products' : 'Load more'}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoadMore;
