import { createTypes, completeTypes } from 'redux-recompose';

import CharactersService from 'services/ExpressionsService';

export const actions = createTypes(
  completeTypes(
    ['GET_EXPRESSIONS', 'POST_EXPRESSIONS', 'PUT_EXPRESSIONS', 'DELETE_EXPRESSIONS'],
    ['ADD_HISTORY', 'EDIT_HISTORY', 'DELETE_HISTORY']
  ),
  '@@HISTORY'
);

const privateActionCreators = {
  getExpressionsSuccess: payload => ({
    type: actions.GET_EXPRESSIONS_SUCCESS,
    target: 'history',
    payload
  }),
  getExpressionsFailure: payload => ({
    type: actions.GET_EXPRESSIONS_FAILURE,
    target: 'history',
    payload
  }),
  postExpressionsSuccess: payload => ({
    type: actions.POST_EXPRESSIONS_SUCCESS,
    target: 'calculatorMessage',
    payload
  }),
  postExpressionsFailure: payload => ({
    type: actions.POST_EXPRESSIONS_FAILURE,
    target: 'calculatorMessage',
    payload
  }),
  putExpressionsSuccess: payload => ({
    type: actions.PUT_EXPRESSIONS_SUCCESS,
    target: 'historyMessage',
    payload
  }),
  putExpressionsFailure: payload => ({
    type: actions.PUT_EXPRESSIONS_FAILURE,
    target: 'historyMessage',
    payload
  }),
  deleteExpressionsSuccess: payload => ({
    type: actions.DELETE_EXPRESSIONS_SUCCESS,
    target: 'historyMessage',
    payload
  }),
  deleteExpressionsFailure: payload => ({
    type: actions.DELETE_EXPRESSIONS_FAILURE,
    target: 'historyMessage',
    payload
  })
};

const actionCreators = {
  getExpressions: () => async dispatch => {
    dispatch({ type: actions.GET_EXPRESSIONS, target: 'serviceMessages' });
    const response = await CharactersService.getExpressions();
    if (response.error) {
      dispatch(privateActionCreators.getExpressionsFailure(response.error));
    }
    dispatch(privateActionCreators.getExpressionsSuccess(response.data));
  },
  postExpressions: value => async dispatch => {
    dispatch({ type: actions.POST_EXPRESSIONS, target: 'serviceMessages' });
    dispatch({ type: actions.ADD_HISTORY, payload: value });
    const response = await CharactersService.postExpressions();
    if (response.error) {
      dispatch(privateActionCreators.postExpressionsFailure(response.error));
    }
    dispatch(privateActionCreators.postExpressionsSuccess(response.data));
    alert(response.data.message);
  },
  putExpressions: (value, id) => async dispatch => {
    dispatch({ type: actions.PUT_EXPRESSIONS, target: 'serviceMessages' });
    dispatch({ type: actions.EDIT_HISTORY, payload: value, id });
    const response = await CharactersService.putExpressions();
    if (response.error) {
      dispatch(privateActionCreators.putExpressionsFailure(response.error));
    }
    dispatch(privateActionCreators.putExpressionsSuccess(response.data));
    alert(response.data.message);
  },
  deleteExpressions: id => async dispatch => {
    dispatch({ type: actions.DELETE_EXPRESSIONS, target: 'serviceMessages' });
    dispatch({ type: actions.DELETE_HISTORY, payload: id });
    const response = await CharactersService.deleteExpressions();
    if (response.error) {
      dispatch(privateActionCreators.deleteExpressionsFailure(response.error));
    }
    dispatch(privateActionCreators.deleteExpressionsSuccess(response.data));
    alert(response.data.message);
  }
};

export default actionCreators;
