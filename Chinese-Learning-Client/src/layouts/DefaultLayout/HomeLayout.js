import * as React from 'react';
import { Box } from '@mui/material';
import Background from '../../components/Background/Background';
import Footer from '../Footer/Footer';
import SmallHeader from '../Header/SmallHeader/SmallHeader';
import Header from '../Header/Header';
import './DefaultLayout.scss';
import Contact from '../../components/Contact/Contact';

function HomeLayout({ children }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="default-layout">
      {isScrolled && window.innerWidth > 500 ? <SmallHeader /> : <Header />}
      <Background />
      <div className="contact-wrapper">
        <Box className="contact">
          <Contact />
        </Box>
      </div>
      <div
        className="home-body-wrapper"
        style={{
          position: 'relative',
          margin: '0 120px',
        }}
      >
        <div className="body-container-top">
          <div className="content-container">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
