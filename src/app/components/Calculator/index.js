import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as math from 'mathjs';
import { v4 as uuidv4 } from 'uuid';

import actionCreators from 'redux/history/actions';

import styles from './styles.module.scss';

const Calculator = ({ dispatch }) => {
  const [expression, setExpression] = useState('');

  const validateExpression = exp => {
    try {
      math.evaluate(exp);
      return true;
    } catch (error) {
      return false;
    }
  };

  const resolve = exp => {
    if (validateExpression(exp)) {
      const date = new Date();
      const day = `0${date.getDate()}`.slice(-2);
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const hour = `0${date.getHours()}`.slice(-2);
      const minutes = `0${date.getMinutes()}`.slice(-2);

      const formatedDate = `${day}/${month} ${hour}:${minutes}`;
      dispatch(actionCreators.addHistory({ id: uuidv4(), value: math.evaluate(exp), date: formatedDate }));
      setExpression(math.evaluate(exp).toString());
    }
  };

  const onKeyDownHandler = event => {
    switch (event.keyCode) {
      case 8:
        setExpression(expression.slice(0, -1));
        break;
      case 13:
        resolve(expression);
        break;
      case 187:
        resolve(expression);
        break;
      case 16:
        setExpression(expression);
        break;
      case 17:
        setExpression(expression);
        break;
      default:
        setExpression(expression + event.key);
        break;
    }
  };

  const onClickHandler = value => {
    switch (value) {
      case 'Back':
        setExpression(expression.slice(0, -1));
        break;
      case 'C':
        setExpression('');
        break;
      default:
        setExpression(expression + value);
    }
  };

  const calcButtons = ['C', '(', ')', 'Back', 7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, '.', '/', '='];

  return (
    <div
      className={styles.calculator}
      role="option"
      onKeyDown={event => onKeyDownHandler(event)}
      tabIndex={-1}
      aria-selected
    >
      <input
        type="text"
        className={styles.input}
        value={expression}
        disabled
        onChange={e => setExpression(e.target.value)}
      />
      <div className={styles.buttons}>
        {calcButtons.map(button => (
          <button
            type="button"
            className={styles.calcButton}
            onClick={() => (button === '=' ? resolve(expression) : onClickHandler(button))}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default connect()(Calculator);
