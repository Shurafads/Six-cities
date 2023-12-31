import { UserComment } from '../../types/user';
import { getRating } from '../../utils';
import dayjs from 'dayjs';


type ReviewProps = {
  review: UserComment;
}

function Review({review}: ReviewProps): JSX.Element {
  const {user, rating, comment, date} = review;

  const userRating = getRating(rating);
  const commentDateTime = dayjs(date).format('YYYY-MM-DD');
  const commentDate = dayjs(date).format('MMMM YYYY');

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: userRating}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={commentDateTime}>{commentDate}</time>
      </div>
    </li>
  );
}

export default Review;
