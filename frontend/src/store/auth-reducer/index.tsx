import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthInitState {
  accessToken: string;
  type: number;
  authInfo?: any;
  companyIdLeague: number | null;
}

const initialState: IAuthInitState = {
  accessToken: '',
  type: 0,
  authInfo: null,
  companyIdLeague: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeSetToken: (state: IAuthInitState, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
    storeSetUserType: (state: IAuthInitState, { payload }: PayloadAction<number>) => {
      state.type = payload;
    },
    storeSetAuth: (state: IAuthInitState, { payload }: PayloadAction<any>) => {
      state.authInfo = payload;
    },
    storeSetCompanyIdLeague: (state: IAuthInitState, { payload }: PayloadAction<number | null>) => {
      state.companyIdLeague = payload;
    },
  },
});

export const { storeSetToken, storeSetUserType, storeSetAuth, storeSetCompanyIdLeague } = authSlice.actions;

export default authSlice.reducer;
