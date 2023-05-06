import Logo from '../../components/logo/logo';
import Navigation from '../../components/navigation/navigation';
import { Helmet } from 'react-helmet-async';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../store';
import LoadingScreen from '../loading-screen/loading-screen';
import { getIsLoadingOffersStatus, getOffersListCopy } from '../../store/offers-data/offers-data-selectors';
import CitiesBoard from '../../components/cities-board/cities-board';

function MainScreen(): JSX.Element {

  const offersList = useAppSelector(getOffersListCopy);
  // const authStatus = useAppSelector(getAuthorizationStatus);
  const isLoading = useAppSelector(getIsLoadingOffersStatus);

  const isOffers = offersList.length >= 1;

  const getPageEmptyClassName = !isOffers ? ' page__main--index-empty' : '';

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Navigation />
          </div>
        </div>
      </header>

      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <main className={`page__main page__main--index ${getPageEmptyClassName}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        {<CitiesBoard />}
      </main>
    </div>
  );
}

export default MainScreen;
