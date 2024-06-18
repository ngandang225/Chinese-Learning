import React, { useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import './SmallHeader.scss';
import MenuIcon from '@mui/icons-material/Menu';
function SmallHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredListening, setIsHoveredListening] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [menuClicked, setMenuClicked] = useState(false);
  const [skillClicked, setSkillCliked] = useState(false);
  const [listeningClicked, setListeningCliked] = useState(false);

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
    <div className="small-header-container">
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
        {/* Mobile page */}
        <div className="mobile-menu">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '6.8rem',
              marginLeft: '2rem',
            }}
          >
            <Box
              onClick={() => {
                setMenuClicked(!menuClicked);
                console.log(menuClicked);
              }}
              className="menu"
              sx={{
                position: 'absolute',
                right: 0,
                padding: '12px',
              }}
            >
              <MenuIcon
                style={{
                  color: 'black',
                  fontSize: '4.4rem',
                  border: '1px solid #000',
                  borderRadius: '0.8rem',
                  marginTop: '1rem',
                }}
              />
            </Box>
          </div>
          {menuClicked && (
            <ul className="mobile-nav-bar">
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
                <Link onClick={() => setSkillCliked(!skillClicked)}>Kỹ năng 技能</Link>
                {skillClicked && (
                  <Grid
                    container
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      marginTop: '0.4rem',
                      backgroundColor: '#ffee58',
                      zIndex: 1000,
                      listStyle: 'none',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Grid
                      item
                      xs={4}
                      className="skill-item"
                      sx={{
                        backgroundColor:
                          selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                      }}
                      onClick={() => setSelectedPage(1)}
                      onMouseEnter={handleMouseEnterListening}
                      onMouseLeave={handleMouseLeaveListening}
                    >
                      <Link
                        style={{ borderBottom: 'none' }}
                        onClick={() => setListeningCliked(!listeningClicked)}
                      >
                        Nghe 听
                      </Link>
                      {listeningClicked && (
                        <ul
                          className="listening-list"
                          onMouseEnter={handleMouseEnterListening}
                          onMouseLeave={handleMouseLeaveListening}
                          style={{
                            position: 'absolute',
                            backgroundColor: '#fff59d',
                            width: '200px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                            listStyle: 'none',
                            left: '130px',
                            top: '44px',
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
                    </Grid>
                    <Grid
                      item
                      xs={4}
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
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      className="skill-item"
                      sx={{
                        backgroundColor:
                          selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                      }}
                      onClick={() => setSelectedPage(1)}
                    >
                      <Link to={'#'} style={{ borderBottom: 'none' }}>
                        Đọc hiểu<br></br>阅读
                      </Link>
                    </Grid>
                    <Grid
                      item
                      xs={4}
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
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      className="skill-item"
                      sx={{
                        backgroundColor:
                          selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                      }}
                      onClick={() => setSelectedPage(1)}
                    >
                      <Link to={'#'} style={{ borderBottom: 'none' }}>
                        Luyện âm<br></br>声音练习
                      </Link>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      className="skill-item"
                      sx={{
                        backgroundColor:
                          selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                      }}
                      onClick={() => setSelectedPage(1)}
                    >
                      <Link to={'#'} style={{ borderBottom: 'none' }}>
                        Ngữ pháp<br></br>语法
                      </Link>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      className="skill-item"
                      sx={{
                        backgroundColor:
                          selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                      }}
                      onClick={() => setSelectedPage(1)}
                    >
                      <Link to={'#'} style={{ borderBottom: 'none' }}>
                        Từ vựng<br></br>词汇
                      </Link>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      className="skill-item"
                      sx={{
                        backgroundColor:
                          selectedPage === 2 ? 'rgba(240, 245, 255, 0.1)' : 'inherit',
                      }}
                      onClick={() => setSelectedPage(1)}
                    >
                      <Link to={'#'} style={{ borderBottom: 'none' }}>
                        Tài liệu<br></br>资料
                      </Link>
                    </Grid>
                    <Grid
                      item
                      xs={4}
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
                    </Grid>
                  </Grid>
                )}
              </li>
              <li className="nav-content">
                <Link to={'#'}>Học trực tuyến 线上学习</Link>
              </li>
              <li className="nav-content">
                <Link to={'#'}>Liên hệ 联系信息</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SmallHeader;
