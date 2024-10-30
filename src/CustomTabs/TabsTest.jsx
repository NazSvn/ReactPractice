import RandomColor from '../ColorGenerator/RandomColor';
import ImageSlider from '../ImageSlider/ImageSlider';
import LightDarkTheme from '../LightDarkTheme/LightDarkTheme';
import Tabs from './Tabs';

const TabsTest = () => {
  const tabs = [
    {
      label: 'Tab 1',
      content: <ImageSlider url={'https://picsum.photos/v2/list'} />,
    },
    {
      label: 'Tab 2',
      content: <LightDarkTheme />,
    },
    {
      label: 'Tab 3',
      content: <RandomColor />,
    },
  ];

  return <Tabs tabsContent={tabs} />;
};
export default TabsTest;
