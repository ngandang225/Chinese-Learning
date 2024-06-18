import { useEffect, useState } from 'react';
import ga4Service from '../../services/ga4Service';
import './Footer.scss';
function Footer() {
  const [pageViews, setPageViews] = useState(0);

  useEffect(() => {
    ga4Service
      .getPageViews()
      .then((data) => {
        setPageViews(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div className="footer">Tổng truy cập: {pageViews}</div>;
}

export default Footer;
