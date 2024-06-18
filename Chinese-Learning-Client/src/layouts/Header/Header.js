import { IconButton, InputBase, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import OutsideClickHandler from 'react-outside-click-handler';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Header.scss';
import slugUrl from '../../utils/slugUrl';

function Header() {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredListening, setIsHoveredListening] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [menuClicked, setMenuClicked] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const siblingRef1 = useRef(null);
  const siblingRef2 = useRef(null);

  const navigate = useNavigate();

  const handleSearchFocus = () => {
    navigate('/search');
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        siblingRef1.current &&
        !siblingRef1.current.contains(event.target) &&
        siblingRef2.current &&
        !siblingRef2.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    // Perform search when the input changes
    performSearch(value);
  };

  const handleSiblingClick = (e) => {
    setShowResults(true);
    performSearch(e.target.value);
  };

  const performSearch = (value) => {
    fetch(`${process.env.REACT_APP_API_URL}/topics/search?q=${encodeURIComponent(value)}`)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        if (!data) setSearchResults([]);
        else
          setSearchResults(
            data.map((item) => ({
              ...item,
              bookId: { ...item.bookId, slug: slugUrl(item.bookId.name) },
            })),
          );
      })
      .catch((error) => {
        console.log('Error searching topics:', error);
      });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnterListening = () => {
    setIsHoveredListening(true);
  };

  const handleMouseLeaveListening = () => {
    setIsHoveredListening(false);
  };

  return (
    <div>
      {/* PC */}
      <div className="header-container">
        {/* logo */}
        <div className="logo">
          <Link to={'/'} onClick={() => setSelectedPage(null)}>
            <img
              src={logo}
              alt="trungvanthuongthuong"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Link>
        </div>

        {/* search + pages */}
        <div className="right-site">
          {/* search */}
          <div className="search-bar">
            <InputBase
              className="search-input"
              placeholder="Tìm chủ đề của bạn..."
              value={searchTerm}
              onChange={handleInputChange}
              ref={siblingRef1}
              onClick={handleSiblingClick}
              sx={{
                minWidth: '310px',
                backgroundColor: '#fffde7',
                color: '#000',
                height: '36px',
                borderRadius: '8px',
                fontSize: '1.4rem',
                pl: '15px',
                pr: '30px',
              }}
            />
            <IconButton
              sx={{
                p: '4px',
                ml: '-40px',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SearchIcon sx={{ fontSize: '2rem' }} />
            </IconButton>

            <ul
              ref={siblingRef2}
              className="search-result"
              onClick={handleSiblingClick}
              style={{
                display: showResults ? 'flex' : 'none',
              }}
            >
              {showResults && searchResults?.length <= 0 ? (
                <div style={{ padding: '8px', textAlign: 'center' }}>
                  Không tìm thấy topic nào !
                </div>
              ) : (
                searchResults?.map((topic) => (
                  <div key={topic.id}>
                    <Link
                      to={`/nghe/so-cap/${topic.bookId.slug}-b${topic.bookId.id}?t=${topic.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <li>
                        <img
                          src={topic.bookId.image}
                          alt={topic.bookId.name}
                          style={{ width: '24px', height: '32px' }}
                        />

                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '12px',
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography variant="body1">
                            {topic.bookId.name.split(',').join(' - ')}
                          </Typography>
                          <Typography variant="h6">
                            <b>{topic.name}</b>
                          </Typography>
                        </div>
                      </li>
                    </Link>
                    <Divider />
                  </div>
                ))
              )}
            </ul>
          </div>

          <ul className="nav-bar">
            <li
              className="nav-content"
              sx={{
                backgroundColor: selectedPage === 1 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
              }}
              onClick={() => setSelectedPage(1)}
            >
              <Link to={'#'}>Giới thiệu 简介</Link>
            </li>
            <li className="nav-content" style={{ position: 'relative' }}>
              <Link
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`skill-nav ${isHovered ? 'background-hover' : ''}`}
              >
                Kỹ năng 技能
              </Link>
              {isHovered && (
                <ul
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    marginTop: '0.8rem',
                    position: 'absolute',
                    backgroundColor: '#ffee58',
                    width: '260px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    padding: 0,
                    listStyle: 'none',
                  }}
                >
                  <li
                    className="skill-item"
                    sx={{
                      backgroundColor: selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                    }}
                    onClick={() => setSelectedPage(1)}
                    onMouseEnter={handleMouseEnterListening}
                    onMouseLeave={handleMouseLeaveListening}
                  >
                    <Link style={{ borderBottom: 'none' }}>Nghe 听</Link>
                    {isHoveredListening && (
                      <ul
                        className="listening-list"
                        onMouseEnter={handleMouseEnterListening}
                        onMouseLeave={handleMouseLeaveListening}
                        style={{
                          position: 'absolute',
                          backgroundColor: '#fff59d',
                          width: '220px',
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                          zIndex: 1000,
                          listStyle: 'none',
                          left: '260px',
                          top: '0',
                        }}
                      >
                        <li
                          className="listening-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 1 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link
                            to={'/nghe/so-cap'}
                            style={{
                              borderBottom: 'none',
                              display: 'block',
                              padding: '1.2rem',
                            }}
                          >
                            Sơ cấp 初级
                          </Link>
                        </li>
                        <li
                          className="listening-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 1 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link
                            to={'#'}
                            style={{
                              borderBottom: 'none',
                              display: 'block',
                              padding: '1.2rem',
                            }}
                          >
                            Trung cấp 中级
                          </Link>
                        </li>
                        <li
                          className="listening-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 1 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link
                            to={'#'}
                            style={{
                              borderBottom: 'none',
                              display: 'block',
                              padding: '1.2rem',
                            }}
                          >
                            Cao cấp 高级
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li
                    className="skill-item"
                    sx={{
                      backgroundColor: selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                    }}
                    onClick={() => setSelectedPage(1)}
                  >
                    <Link to={'#'} style={{ borderBottom: 'none' }}>
                      Nói 说
                    </Link>
                  </li>
                  <li
                    className="skill-item"
                    sx={{
                      backgroundColor: selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                    }}
                    onClick={() => setSelectedPage(1)}
                  >
                    <Link to={'#'} style={{ borderBottom: 'none' }}>
                      Đọc hiểu 阅读
                    </Link>
                  </li>
                  <li
                    className="skill-item"
                    sx={{
                      backgroundColor: selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                    }}
                    onClick={() => setSelectedPage(1)}
                  >
                    <Link to={'#'} style={{ borderBottom: 'none' }}>
                      Viết 写
                    </Link>
                  </li>
                  <li
                    className="skill-item"
                    sx={{
                      backgroundColor: selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                    }}
                    onClick={() => setSelectedPage(1)}
                  >
                    <Link to={'#'} style={{ borderBottom: 'none' }}>
                      Luyện âm 声音练习
                    </Link>
                  </li>
                  <li
                    className="skill-item"
                    sx={{
                      backgroundColor: selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                    }}
                    onClick={() => setSelectedPage(1)}
                  >
                    <Link to={'#'} style={{ borderBottom: 'none' }}>
                      Ngữ pháp 语法
                    </Link>
                  </li>
                  <li
                    className="skill-item"
                    sx={{
                      backgroundColor: selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                    }}
                    onClick={() => setSelectedPage(1)}
                  >
                    <Link to={'#'} style={{ borderBottom: 'none' }}>
                      Từ vựng 词汇
                    </Link>
                  </li>
                  <li
                    className="skill-item"
                    sx={{
                      backgroundColor: selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                    }}
                    onClick={() => setSelectedPage(1)}
                  >
                    <Link to={'#'} style={{ borderBottom: 'none' }}>
                      Tài liệu 资料
                    </Link>
                  </li>
                  <li
                    className="skill-item"
                    sx={{
                      backgroundColor: selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                    }}
                    onClick={() => setSelectedPage(1)}
                  >
                    <Link to={'#'} style={{ borderBottom: 'none' }}>
                      Vui học tiếng Trung 快乐学韩语
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-content">
              <Link to={'#'}>Học trực tuyến 线上学习</Link>
            </li>
            <li className="nav-content">
              <Link to={'#'}>Liên hệ 联系信息</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile */}
      <div className="mobile-header-container">
        {/* logo */}
        <div className="logo">
          <Link to={'/'} onClick={() => setSelectedPage(null)}>
            <img
              src={logo}
              alt="trungvanthuongthuong"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Link>
        </div>

        {/* search + pages */}
        {/* <div className="right-site"> */}
        {/* search */}
        <div className="search-bar">
          <InputBase
            className="search-input"
            placeholder="Tìm chủ đề của bạn..."
            value={searchTerm}
            onChange={handleInputChange}
            ref={siblingRef1}
            onClick={handleSiblingClick}
            onFocus={handleSearchFocus}
            sx={{
              width: '100%',
              backgroundColor: '#fffde7',
              color: '#000',
              height: '36px',
              borderRadius: '8px',
              fontSize: '1.4rem',
              pl: '15px',
              pr: '30px',
              minWidth: '220px',
            }}
          />
          <IconButton
            sx={{
              p: '4px',
              ml: '-40px',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SearchIcon sx={{ fontSize: '2rem' }} />
          </IconButton>

          {/* <ul
            ref={siblingRef2}
            className="search-result"
            onClick={handleSiblingClick}
            style={{
              display: showResults ? 'flex' : 'none',
            }}
          >
            {showResults && searchResults?.length <= 0 ? (
              <div style={{ padding: '8px', textAlign: 'center' }}>Không tìm thấy topic nào !</div>
            ) : (
              searchResults?.map((topic) => (
                <div key={topic.id}>
                  <Link
                    to={`/nghe/so-cap/${topic.bookId.id}?t=${topic.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <li>
                      <img
                        src={topic.bookId.image}
                        alt={topic.bookId.name}
                        style={{ width: '24px', height: '32px' }}
                      />

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginLeft: '12px',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Typography variant="body1">
                          {topic.bookId.name.split(',').join(' - ')}
                        </Typography>
                        <Typography variant="h6">
                          <b>{topic.name}</b>
                        </Typography>
                      </div>
                    </li>
                  </Link>
                  <Divider />
                </div>
              ))
            )}
          </ul> */}
        </div>
        <div
          style={{
            padding: '0.4rem',
            border: '1px solid #000',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '0.4rem',
            height: '36px',
          }}
          onClick={() => setMenuClicked(!menuClicked)}
        >
          <MenuIcon sx={{ fontSize: '2.6rem' }} />
        </div>

        {!!menuClicked && (
          <div
            style={{
              position: 'fixed',
              top: '7.1rem',
              left: 0,
              width: '100%',
              height: '90%',
              overflow: 'scroll',
            }}
          >
            <OutsideClickHandler
              onOutsideClick={(e) => {
                e.stopPropagation();
                setMenuClicked(false);
              }}
            >
              <ul className="nav-bar">
                <li
                  className="nav-content"
                  sx={{
                    backgroundColor: selectedPage === 1 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                  }}
                  onClick={() => setSelectedPage(1)}
                >
                  <Link to={'#'}>Giới thiệu 简介</Link>
                </li>
                <li className="nav-content" style={{ position: 'relative' }}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      Kỹ năng 技能
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          listStyle: 'none',
                        }}
                      >
                        <li
                          className="skill-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                          onMouseEnter={handleMouseEnterListening}
                          onMouseLeave={handleMouseLeaveListening}
                        >
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              Nghe 听
                            </AccordionSummary>
                            <AccordionDetails>
                              <ul
                                className="listening-list"
                                onMouseEnter={handleMouseEnterListening}
                                onMouseLeave={handleMouseLeaveListening}
                                style={{
                                  listStyle: 'none',
                                }}
                              >
                                <li
                                  className="listening-item"
                                  sx={{
                                    backgroundColor:
                                      selectedPage === 1 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                                  }}
                                  onClick={() => setSelectedPage(1)}
                                >
                                  <Link
                                    to={'/nghe/so-cap'}
                                    style={{
                                      borderBottom: 'none',
                                      display: 'block',
                                      padding: '0.8rem',
                                    }}
                                  >
                                    Sơ cấp 初级
                                  </Link>
                                </li>
                                <li
                                  className="listening-item"
                                  sx={{
                                    backgroundColor:
                                      selectedPage === 1 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                                  }}
                                  onClick={() => setSelectedPage(1)}
                                >
                                  <Link
                                    to={'#'}
                                    style={{
                                      borderBottom: 'none',
                                      display: 'block',
                                      padding: '0.8rem',
                                    }}
                                  >
                                    Trung cấp 中级
                                  </Link>
                                </li>
                                <li
                                  className="listening-item"
                                  sx={{
                                    backgroundColor:
                                      selectedPage === 1 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                                  }}
                                  onClick={() => setSelectedPage(1)}
                                >
                                  <Link
                                    to={'#'}
                                    style={{
                                      borderBottom: 'none',
                                      display: 'block',
                                      padding: '0.8rem',
                                    }}
                                  >
                                    Cao cấp 高级
                                  </Link>
                                </li>
                              </ul>
                            </AccordionDetails>
                          </Accordion>
                          {/* <Link style={{ borderBottom: 'none' }}>Nghe 听</Link>
                          {isHoveredListening && (
                            
                          )} */}
                        </li>
                        <li
                          className="skill-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link to={'#'} style={{ borderBottom: 'none' }}>
                            Nói 说
                          </Link>
                        </li>
                        <li
                          className="skill-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link to={'#'} style={{ borderBottom: 'none' }}>
                            Đọc hiểu 阅读
                          </Link>
                        </li>
                        <li
                          className="skill-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link to={'#'} style={{ borderBottom: 'none' }}>
                            Viết 写
                          </Link>
                        </li>
                        <li
                          className="skill-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link to={'#'} style={{ borderBottom: 'none' }}>
                            Luyện âm 声音练习
                          </Link>
                        </li>
                        <li
                          className="skill-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link to={'#'} style={{ borderBottom: 'none' }}>
                            Ngữ pháp 语法
                          </Link>
                        </li>
                        <li
                          className="skill-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link to={'#'} style={{ borderBottom: 'none' }}>
                            Từ vựng 词汇
                          </Link>
                        </li>
                        <li
                          className="skill-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link to={'#'} style={{ borderBottom: 'none' }}>
                            Tài liệu 资料
                          </Link>
                        </li>
                        <li
                          className="skill-item"
                          sx={{
                            backgroundColor:
                              selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                          }}
                          onClick={() => setSelectedPage(1)}
                        >
                          <Link to={'#'} style={{ borderBottom: 'none' }}>
                            Vui học tiếng Trung 快乐学韩语
                          </Link>
                        </li>
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>
                <li className="nav-content">
                  <Link to={'#'}>Học trực tuyến 线上学习</Link>
                </li>
                <li className="nav-content">
                  <Link to={'#'}>Liên hệ 联系信息</Link>
                </li>
              </ul>
            </OutsideClickHandler>
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Header;
