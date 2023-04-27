import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import UTButton from '@widergy/energy-ui/dist/components/UTButton';
import { push } from 'connected-react-router';

import Calculator from 'app/components/Calculator';
import { HISTORY } from 'constants/routes';

import styles from './styles.module.scss';

const Home = ({ dispatch }) => {
  const goToHistory = useCallback(() => dispatch(push(HISTORY)), [dispatch]);

  return (
    <div className={styles.app}>
      <Calculator />
      <UTButton onPress={goToHistory}>Historial</UTButton>
    </div>
  );
};

export default connect()(Home);
