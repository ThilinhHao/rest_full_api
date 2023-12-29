import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'rootStore';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
