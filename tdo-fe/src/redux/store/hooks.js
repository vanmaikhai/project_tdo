import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// @ts-ignore
import { RootState, AppDispatch } from './index.js';

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
