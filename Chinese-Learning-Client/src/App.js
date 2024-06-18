import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { privateRoutes, publicRoutes } from './routes/routes';

function App() {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = route.layout;
          if (!Layout) {
            Layout = React.Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            ></Route>
          );
        })}

        {privateRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = route.layout;
          if (!Layout) {
            Layout = React.Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                user.user ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Navigate to="/dang-nhap" replace />
                )
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
