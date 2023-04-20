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
    },
    [actions.EDIT_HISTORY]: (state, action) => ({
      ...state,
      history: state.history.map(item => {
        if (item.id !== action.id) {
          return item;
        }

        return {
          ...item,
          value: parseInt(action.payload, 10)
        };
      })
    }),
    [actions.DELETE_HISTORY]: (state, action) => ({
      ...state,
      history: state.history.filter(history => history.id !== action.payload)
    })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
