import * as React from 'react';
import { Box } from '@mui/material';
import Background from '../../components/Background/Background';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SmallHeader from '../Header/SmallHeader/SmallHeader';
import './DefaultLayout.scss';
import Contact from '../../components/Contact/Contact';

function SmallLayout({ children }) {
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
    <div className="small-default-layout">
      {!isScrolled && window.innerWidth > 600 ? (
        <div className="small-layout-header">
          <SmallHeader />
        </div>
      ) : !isScrolled && window.innerWidth < 600 ? (
        <div className="small-layout-header">
          <Header />
        </div>
      ) : (
        <div style={{ display: 'none' }}>
          <SmallHeader />
        </div>
      )}
      <Background />
      {/* <div className="contact-wrapper">
        <Box className="contact">
          <Contact />
        </Box>
      </div> */}
      <div
        className="body-wrapper"
        style={{
          position: 'relative',
          margin: '0 120px ',
        }}
      >
        <div className="body-container">
          <div className="content-container">{children}</div>
          <Footer />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default SmallLayout;
