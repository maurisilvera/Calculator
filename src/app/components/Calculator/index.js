import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as math from 'mathjs';

import actionCreators from 'redux/history/actions';

import styles from './styles.module.scss';

const Calculator = ({ dispatch }) => {
  const [expression, setExpression] = useState('');
  const validChars = /^[0-9()+*/.=-]$/;

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
      dispatch(actionCreators.addHistory({ value: math.evaluate(exp) }));
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
      case 67:
        setExpression('');
        break;
      default:
        if (event.key.match(validChars)) {
          setExpression(expression + event.key);
          break;
        }
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
        disabled
        value={expression}
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
