import Accordion from './Accordion/Accordian';
import './App.css';
import RandomColor from './ColorGenerator/RandomColor';
import ImageSlider from './ImageSlider/ImageSlider';
import LoadMore from './LoadMore/LoadMore';
import NavigationMenu from './NavigationMenu/NavigationMenu';
import StarRating from './StarRating/StarRating';

 

function App() {
  return (
    <>
      {/* accorrdion element */}

      <Accordion />

      {/* Star Rating element */}

      <StarRating />

      {/* Color generator element */}

      <RandomColor />

      {/* Image slider element */}

      <ImageSlider
        url={'https://picsum.photos/v2/list'}         
      />

      {/* Load more element */}

      <LoadMore />

      {/* Navigation Menu */}

      <NavigationMenu />
    </>
  );
}

export default App;
