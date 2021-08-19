/* eslint-disable @typescript-eslint/no-unused-vars */
import {takeLatest, put, call, select} from 'redux-saga/effects';
import {TCreditCard} from '@types';

const GET_CREDIT_CARDS = '[creditCards] GET_CREDIT_CARDS';
const SET_CREDIT_CARDS = '[creditCards] SET_CREDIT_CARDS';
const RESET_CREDIT_CARDS = '[creditCards] RESET_CREDIT_CARDS';
const SET_SELECTED_CREDIT_CARDS = '[creditCards] SET_SELECTED_CREDIT_CARDS';

const initialstate: TCreditCard[] = [];

const filterDuplicatest = (newData: TCreditCard[]): Array<TCreditCard> => {
  const newMap = new Map();
  newData.forEach(i => {
    newMap.set(i.number, i);
  });
  return [...newMap].map(i => i[1] || null).filter(i => !!i);
};

export default (state = initialstate, action: any) => {
  //  return initialstate;
  switch (action.type) {
    case SET_CREDIT_CARDS:
      return filterDuplicatest([...state, {...action.data}]) || [];
    case SET_SELECTED_CREDIT_CARDS:
      return state.map((i: TCreditCard) => {
        const obj = {...i};
        if (i.number === action.number) {
          obj.selected = true;
        } else {
          obj.selected = false;
        }
        return obj;
      });
    case RESET_CREDIT_CARDS:
      return initialstate;
    default:
      return state;
  }
};

export const getCreditCards = () => ({type: GET_CREDIT_CARDS});
export const setCreditCards = (data: TCreditCard) => ({
  data,
  type: SET_CREDIT_CARDS,
});
export const setSelectedCreditCards = (number: string) => ({
  number,
  type: SET_SELECTED_CREDIT_CARDS,
});
export const resetCreditCards = () => ({type: RESET_CREDIT_CARDS});
