import { createTypes, completeTypes } from 'redux-recompose';

export const actions = createTypes(
  completeTypes([], ['ADD_HISTORY', 'EDIT_HISTORY', 'DELETE_HISTORY']),
  '@@HISTORY'
);

const actionCreators = {
  addHistory: value => dispatch => dispatch({ type: actions.ADD_HISTORY, payload: value }),
  editHistory: (value, id) => dispatch => dispatch({ type: actions.EDIT_HISTORY, payload: value, id }),
  deleteHistory: id => dispatch => dispatch({ type: actions.DELETE_HISTORY, payload: id })
};

export default actionCreators;
