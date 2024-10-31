import Accordion from './Accordion/Accordian';
import './App.css';
import RandomColor from './ColorGenerator/RandomColor';
import TabsTest from './CustomTabs/TabsTest';
import ImageSlider from './ImageSlider/ImageSlider';
import LightDarkTheme from './LightDarkTheme/LightDarkTheme';
import LoadMore from './LoadMore/LoadMore';
import Modaltest from './Modal/ModalTest';
import NavigationMenu from './NavigationMenu/NavigationMenu';
import QrCodeGenerator from './QrCodeGenerator/QrCodeGenerator';
import ScrollProgress from './ScrollProgress/ScrollProgress';
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
      <ImageSlider url={'https://picsum.photos/v2/list'} />

      {/* Load more element */}
      <LoadMore />

      {/* Navigation Menu */}
      <NavigationMenu />

      {/* Qr code generator */}
      <QrCodeGenerator />

      {/* Light and dark theme */}
      <LightDarkTheme />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Tabs  */}
      <TabsTest />

      {/* Modal  */}
      <Modaltest />
    </>
  );
}

export default App;
