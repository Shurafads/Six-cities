import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { useEffect } from 'react';
import { fetchFavoritesAction, fetchUserDataAction } from '../../store/api-action';

function App(): JSX.Element {

  const authStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
      dispatch(fetchUserDataAction());
    }
  }, [authStatus, dispatch]);

  return (
    <BrowserRouter>
      <HelmetProvider>
        <Routes>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute >
                <FavoritesScreen />
              </PrivateRoute >
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Main}
            element={
              <MainScreen/>
            }
          />
          <Route
            path={`${AppRoute.Property}/:id`}
            element={<RoomScreen />}
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
