import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import { Offer } from '../types/offer';
import { ApiRoute } from '../const';
import AuthData from '../types/auth-data';
import LoginData from '../types/login-data';
import { dropToken, saveToken } from '../services/token';
import { UserComment } from '../types/user';

const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Offers);

    return data;
  },
);

const fetchFavoritesAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Favorite);

    return data;
  },
);

const sendFavoritesAction = createAsyncThunk<Offer, {id: number; isFavorite: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendFavorites',
  async ({id, isFavorite}, {dispatch, extra: api}) => {
    const {data} = await api.post<Offer>(`favorite/${id}/${isFavorite}`);

    return data;
  },
);

const fetchOfferAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, {extra: api}) => {

    const {data} = await api.get<Offer>(`/hotels/${offerId}`);

    return data;
  },
);

const fetchNearbyOffersAction = createAsyncThunk<Offer[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`/hotels/${offerId}/nearby`);

    return data;
  },
);

const fetchCommentsAction = createAsyncThunk<UserComment[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCommentsAction',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<UserComment[]>(`/comments/${offerId}`);

    return data;
  },
);

const sendReviewAction = createAsyncThunk<UserComment[], {
  hotelId: number;
  comment: string;
  rating: number;
  cleanForm: () => void;
    },
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'data/sendReview',
    async ({hotelId, comment, rating, cleanForm}, {dispatch, extra: api}) => {
      const {data: review} = await api.post<UserComment[]>(`/comments/${hotelId}`, {comment, rating});
      cleanForm();
      return review;
    },
    );

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(ApiRoute.Login);
  },
);

const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<LoginData>(ApiRoute.Login, {email, password});
    saveToken(token);
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);

const fetchUserDataAction = createAsyncThunk<LoginData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchUserData',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<LoginData>(ApiRoute.Login);

    return data;
  }
);

export {
  fetchOffersAction,
  fetchFavoritesAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  sendReviewAction,
  fetchUserDataAction,
  sendFavoritesAction
};
