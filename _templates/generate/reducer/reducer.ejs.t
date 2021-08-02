---
to: src/reducers/<%=h.changeCase.camelCase(name)%>.ts
---
import {takeLatest, put, call, select} from 'redux-saga/effects';
import {setLoader} from './_global';
import {Alert} from 'react-native';
import i18next from 'i18next';
import {httpGet, httpPost, navigate} from '@services';
import {urls} from '@constants';

const GET_<%=h.changeCase.constant(name)%> = '[<%=h.changeCase.camelCase(name)%>] GET_<%=h.changeCase.constant(name)%>';
const SET_<%=h.changeCase.constant(name)%> = '[<%=h.changeCase.camelCase(name)%>] SET_<%=h.changeCase.constant(name)%>';
const RESET_<%=h.changeCase.constant(name)%> = '[<%=h.changeCase.camelCase(name)%>] RESET_<%=h.changeCase.constant(name)%>';

const initialstate = {};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_<%=h.changeCase.constant(name)%>:
      return Object.assign({}, {...state, data: action.data});
    case RESET_<%=h.changeCase.constant(name)%>:
      return initialstate;
    default:
      return state;
  }
};

export const get<%=h.changeCase.pascal(name)%> = () => ({type: GET_<%=h.changeCase.constant(name)%>});
export const set<%=h.changeCase.pascal(name)%> = (data: any) => ({data, type: SET_<%=h.changeCase.constant(name)%>});
export const reset<%=h.changeCase.pascal(name)%> = () => ({type: RESET_<%=h.changeCase.constant(name)%>});

export function* watch<%=h.changeCase.pascal(name)%>() {
  yield takeLatest(GET_<%=h.changeCase.constant(name)%>, get<%=h.changeCase.pascal(name)%>Async);
}

export function* get<%=h.changeCase.pascal(name)%>Async() {
  // const { accessToken } = yield select(state => state.profile)
  yield put(setLoader(true));
  try {
	const body = yield call(() => httpGet(urls.url));
    yield put(setLoader(false));
    if (body.data) {
      yield put(set<%=h.changeCase.pascal(name)%>(body.data));
      // navigate('Route');
    }
  } catch (e) {
	   yield put(setLoader(false));
    if (e.status === 418) {
      Alert.alert('', i18next.t('Перевірте підключення до Інтернету або спробуйте пізніше'));
    }
    console.log(e, 'get<%=h.changeCase.pascal(name)%>Async ERROR');
  }
}
