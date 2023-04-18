import { createTypes, completeTypes } from 'redux-recompose';

export const actions = createTypes(completeTypes([], ['ADD_HISTORY']), '@@HISTORY');

const actionCreators = {
  addHistory: value => dispatch => dispatch({ type: actions.ADD_HISTORY, payload: value })
};

export default actionCreators;
