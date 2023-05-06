import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import CardList from '../../components/card-list/card-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Navigation from '../../components/navigation/navigation';
import PremiumInfo from '../../components/premium-info/premium-info';
import ReviewList from '../../components/review-list/review-list';
import UserStatus from '../../components/user-status/user-status';
import { useAppDispatch, useAppSelector } from '../../store';
import { getRating } from '../../utils';
import { fetchCommentsAction, fetchNearbyOffersAction, fetchOfferAction, sendFavoritesAction } from '../../store/api-action';
import { AppRoute, AuthorizationStatus } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { getCurrentOffer, getIsLoadingRoomStatus } from '../../store/offers-data/offers-data-selectors';
import { getCommentsData } from '../../store/review-data/review-data-selectors';
import { changeCurrentOffer } from '../../store/offers-data/offers-data';
import UserReviewForm from '../../components/user-review-form/user-review-form';

function RoomScreen(): JSX.Element {

  const params = useParams();

  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const buttonFavoriteRef = useRef<HTMLButtonElement | null>(null);

  const authStatus = useAppSelector(getAuthorizationStatus);
  const currentStateOffer = useAppSelector(getCurrentOffer);
  const commentsList = useAppSelector(getCommentsData);
  const isLoading = useAppSelector(getIsLoadingRoomStatus);

  useEffect(() => {
    dispatch(fetchOfferAction(Number(params.id)));
    dispatch(fetchNearbyOffersAction(Number(params.id)));
    dispatch(fetchCommentsAction(Number(params.id)));
  }, [params.id, authStatus, dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!currentStateOffer) {
    return <Navigate to={'*'}/>;
  }

  const {description, host, title, images, isPremium, rating, isFavorite, type, bedrooms, maxAdults, price, goods} = currentStateOffer;

  const getFavoriteClassName = () => isFavorite ? 'property__bookmark-button property__bookmark-button--active button' : 'property__bookmark-button button';
  const getAdultsTitle = (adultsCount: number): string => adultsCount <= 1 ? `Max ${adultsCount} adult` : `Max ${adultsCount} adults`;
  const getBedroomsTitle = (bedroomsCount: number): string => bedroomsCount <= 1 ? `${bedroomsCount} bedroom` : `${bedroomsCount} bedrooms`;

  const handleFavoriteClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      return redirect(AppRoute.Login);
    }

    const data = {
      id: Number(params.id),
      isFavorite: 0
    };

    dispatch(changeCurrentOffer(!isFavorite));

    if (buttonFavoriteRef.current?.classList.contains('property__bookmark-button--active')) {
      dispatch(sendFavoritesAction(data));
    }
    else {
      data.isFavorite = 1;
      dispatch(sendFavoritesAction(data));
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Navigation />
          </div>
        </div>
      </header>

      <Helmet>
        <title>6 cities: property</title>
      </Helmet>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(-6).map((image) => <div className="property__image-wrapper" key={image}><img className="property__image" src={image} alt="Photo studio"/></div>)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <PremiumInfo className="property__mark"/>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={getFavoriteClassName()} type="button" onClick={handleFavoriteClick} ref={buttonFavoriteRef}>
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRating(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {getBedroomsTitle(bedrooms)}
                </li>
                <li className="property__feature property__feature--adults">
                  {getAdultsTitle(maxAdults)}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => <li className="property__inside-item" key={good}>{good}</li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {host.isPro && UserStatus()}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsList.length}</span></h2>
                <ReviewList />
                {authStatus === AuthorizationStatus.Auth && <UserReviewForm offerId={Number(params.id)}/>}
              </section>
            </div>
          </div>
          <Map className={'property__map map'} height={'579px'}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardList className={'near-places__list places__list'} cardClassName={'near-places'}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomScreen;
