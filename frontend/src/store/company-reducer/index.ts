import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListCompanyB2BPaired } from 'constants/company';

interface ICompanyInitState {
  listCompanyB2BPaired: IListCompanyB2BPaired[];
}

const initialState: ICompanyInitState = {
  listCompanyB2BPaired: [],
};

const authSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    storeSetListCompanyB2BPaired: (state: ICompanyInitState, { payload }: PayloadAction<IListCompanyB2BPaired[]>) => {
      state.listCompanyB2BPaired = payload;
    },
  },
});

export const { storeSetListCompanyB2BPaired } = authSlice.actions;

export default authSlice.reducer;
