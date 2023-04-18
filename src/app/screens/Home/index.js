import React from 'react';
import { connect } from 'react-redux';
import UTButton from '@widergy/energy-ui/dist/components/UTButton';
import { push } from 'connected-react-router';
import * as math from 'mathjs';

import actionCreators from 'redux/history/actions';
import { HISTORY } from 'constants/routes';

import styles from './styles.module.scss';

function Calculator({ dispatch }) {
  const [expression, setExpression] = React.useState('');
  const goToHistory = React.useCallback(() => dispatch(push(HISTORY)), [dispatch]);

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

  const resolve = exp => {
    const date = new Date();
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const hour = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);

    const formatedDate = `${day}/${month} ${hour}:${minutes}`;
    // setHistory([...history, { date: formatedDate, result: math.evaluate(exp) }]);
    dispatch(actionCreators.addHistory({ value: math.evaluate(exp), date: formatedDate }));
    setExpression(math.evaluate(exp).toString());
  };

  return (
    <div className={styles.app}>
      <div className={styles.calculator}>
        <input
          type="text"
          className={styles.input}
          value={expression}
          onChange={e => setExpression(e.target.value)}
        />
        <div className={styles.buttons}>
          <div className={styles.row}>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler('C')}>
              C
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler('(')}>
              (
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler(')')}>
              )
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler('Back')}>
              ←
            </button>
          </div>
          <div className={styles.row}>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler(8)}>
              8
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler(7)}>
              7
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler(9)}>
              9
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler('+')}>
              +
            </button>
          </div>
          <div className={styles.row}>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler(4)}>
              4
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler(5)}>
              5
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler(6)}>
              6
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler('-')}>
              -
            </button>
          </div>
          <div className={styles.row}>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler(1)}>
              1
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler(2)}>
              2
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler(3)}>
              3
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler('*')}>
              *
            </button>
          </div>
          <div className={styles.row}>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler('0')}>
              0
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler('.')}>
              .
            </button>
            <button type="button" className={styles.calcButton} onClick={() => onClickHandler('/')}>
              /
            </button>
            <button type="button" className={styles.calcButton} onClick={() => resolve(expression)}>
              =
            </button>
          </div>
        </div>
      </div>
      <UTButton onPress={goToHistory}>Historial</UTButton>
    </div>
  );
}

export default connect()(Calculator);
