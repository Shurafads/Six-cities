import { OfferType } from '../../types/offer';
import { getComponentIsBoolean, getRating } from '../../utils';
import Premium from '../premium-info/premium-info-card';

type FavoriteCardProp = {
  city: string;
  offersData: OfferType[];
};

function FavoriteCard({city, offersData}: FavoriteCardProp) {

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{city}</span>
          </a>
        </div>
      </div>

      <div className="favorites__places">
        {offersData.map((offer) => {

          const preiumComponent = getComponentIsBoolean(offer.isPremium, Premium());
          const offerRating = getRating(offer.rating);

          if (offer.city.name === city) {
            return (
              <article className="favorites__card place-card" key="">
                {preiumComponent}
                <div className="favorites__image-wrapper place-card__image-wrapper">
                  <a href="/">
                    <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image"/>
                  </a>
                </div>
                <div className="favorites__card-info place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;{offer.price}</b>
                      <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                      <svg className="place-card__bookmark-icon" width="18" height="19">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{width: offerRating}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="/">{offer.title}</a>
                  </h2>
                  <p className="place-card__type">{offer.type}</p>
                </div>
              </article>
            );
          }
          return null;
        })}
      </div>
    </li>
  );
}

export default FavoriteCard;