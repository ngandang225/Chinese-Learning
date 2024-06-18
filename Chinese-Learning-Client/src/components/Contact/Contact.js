import { Box, Link, Stack } from '@mui/material';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
import ForumIcon from '@mui/icons-material/Forum';
import './Contact.scss';
const zaloLogo = require('../../assets/images/logo-zalo.webp');
function Contact() {
  return (
    <div id="contact-wrapper">
      <Box className="phone-btn">
        <Link href="tel:0374 709 493" className="contact-link">
          <Box
            width="45px"
            height="45px"
            sx={{
              lineHeight: '35px',
              backgroundColor: '#f1052a',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '-2px 0px 8px -3px black',
            }}
          >
            <PhoneEnabledIcon
              sx={{
                fontSize: '28px',
                color: 'white',
              }}
            />
          </Box>
          <span className="contact-info">0374 709 493</span>
        </Link>
      </Box>
      <Box className="email-btn">
        <Link href="mailto:trungvanthuongthuong@gmail.com" className="contact-link">
          <Box
            width="45px"
            height="45px"
            sx={{
              backgroundColor: '#f57b06',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '-2px 0px 8px -3px black',
            }}
          >
            <EmailIcon
              sx={{
                fontSize: '28px',
                color: 'white',
              }}
            />
          </Box>
          <span className="contact-info">trungvanthuongthuong@gmail.com</span>
        </Link>
      </Box>
      <Box className="zalo-btn">
        <Link href="https://zalo.me/0374709493" className="contact-link">
          <Box height="45px" sx={{ padding: 0 }}>
            <img src={zaloLogo} alt="Zalo" className="zalo-logo" />
          </Box>
          <span className="contact-info">0374 709 493</span>
        </Link>
      </Box>
      <Box className="message-btn">
        <Link
          href="https://www.facebook.com/profile.php?id=61555635471801"
          className="contact-link"
        >
          <Box
            width="45px"
            height="45px"
            sx={{
              backgroundColor: '#2093e9',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '-2px 0px 8px -3px black',
            }}
          >
            <ForumIcon
              sx={{
                fontSize: '28px',
                color: 'white',
              }}
            />
          </Box>
          <span className="contact-info">Messenger Facebook</span>
        </Link>
      </Box>
    </div>
  );
}

export default Contact;
