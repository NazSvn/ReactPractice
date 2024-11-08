import Accordion from './Accordion/Accordian';
import './App.css';
import AutoCompleteSearch from './AutoCompleteSearch/AutoCompleteSearch';
import RandomColor from './ColorGenerator/RandomColor';
import TabsTest from './CustomTabs/TabsTest';
import FeatureFlagProvider from './FeatureFlag/contextFlag/ContextFlag';
import FeatureFlag from './FeatureFlag/FeatureFlag';
import GitHubFinder from './GitHubFinder/GitHubFinder';
import ImageSlider from './ImageSlider/ImageSlider';
import LightDarkTheme from './LightDarkTheme/LightDarkTheme';
import LoadMore from './LoadMore/LoadMore';
import Modaltest from './Modal/ModalTest';
import NavigationMenu from './NavigationMenu/NavigationMenu';
import QrCodeGenerator from './QrCodeGenerator/QrCodeGenerator';
import ScrollProgress from './ScrollProgress/ScrollProgress';
import StarRating from './StarRating/StarRating';
import TicTacToe from './TicTacToe/TicTacToe';

function App() {
  return (
    <>
      {/* accorrdion element */}
      {/* <Accordion /> */}

      {/* Star Rating element */}
      {/* <StarRating /> */}

      {/* Color generator element */}
      {/* <RandomColor /> */}

      {/* Image slider element */}
      {/* <ImageSlider url={'https://picsum.photos/v2/list'} /> */}

      {/* Load more element */}
      {/* <LoadMore /> */}

      {/* Navigation Menu */}
      {/* <NavigationMenu /> */}

      {/* Qr code generator */}
      {/* <QrCodeGenerator /> */}

      {/* Light and dark theme */}
      {/* <LightDarkTheme /> */}

      {/* Scroll progress bar */}
      {/* <ScrollProgress /> */}

      {/* Tabs  */}
      {/* <TabsTest /> */}

      {/* Modal  */}
      {/* <Modaltest /> */}

      {/* GitHub finder */}
      {/* <GitHubFinder />   */}

      {/* Autocomplete search */}
      {/* <AutoCompleteSearch /> */}

      {/* Tic Tac Toe */}
      {/* <TicTacToe  /> */}

      {/* Feature flags */}
       <FeatureFlagProvider>
        <FeatureFlag />
       </FeatureFlagProvider>
    </>
  );
}

export default App;
