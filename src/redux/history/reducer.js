import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  history: []
};

const reducerDescription = {
  primaryActions: [actions.ADD_HISTORY],
  override: {
    [actions.ADD_HISTORY]: (state, action) => {
      const newHistory = state.history.concat(action.payload);
      return Immutable.merge(state, { history: newHistory });
    }
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
