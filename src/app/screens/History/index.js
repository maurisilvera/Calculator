import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

const History = ({ history }) => (
  <div className={styles.historyContainer}>
    <h2>Historial</h2>
    <ul className={styles.historyList}>
      {history.map(item => (
        <li className={styles.historyCard}>
          Fecha: {item.date} <br />
          Resultado: {item.value}
        </li>
      ))}
    </ul>
  </div>
);

History.propTypes = {
  history: PropTypes.arrayOf.isRequired
};

const mapStateToProps = store => ({
  history: store.calculator.history
});

export default connect(mapStateToProps)(History);
