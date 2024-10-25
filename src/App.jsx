import Accordion from './Accordion/Accordian';
import './App.css';
import RandomColor from './ColorGenerator/RandomColor';
import ImageSlider from './ImageSlider/ImageSlider';
import StarRating from './StarRating/StarRating';

function App() {
  return (
    <>
      <Accordion />
      <StarRating />
      <RandomColor />
      <ImageSlider
        url={'https://picsum.photos/v2/list'}
        limit={'10'}
        page={'2'}
      />
    </>
  );
}

export default App;
