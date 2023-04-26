import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { TUserProcess } from '../../types/state';
import { toast } from 'react-toastify';

const initialState: TUserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown
};

export const userProcess = createSlice({
  name: NameSpace.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, () => {
        toast.error('Whoops, authorization error, please try again');
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
