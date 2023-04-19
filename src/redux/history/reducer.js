import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  history: [
    { id: 1, value: 234, date: '19/04 14:30' },
    { id: 2, value: 21111, date: '19/04 14:30' },
    { id: 3, value: 234324, date: '19/04 14:30' }
  ]
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
