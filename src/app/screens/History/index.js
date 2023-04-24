import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UTButton from '@widergy/energy-ui/dist/components/UTButton';

import actionCreators from 'redux/history/actions';

import styles from './styles.module.scss';

function History({ dispatch, history }) {
  const [selected, setSelected] = React.useState();
  const validChars = /^[0-9()+*/.=-]$/;

  const handleEdit = item => setSelected(item);

  const handleDelete = id => dispatch(actionCreators.deleteHistory(id));

  const handleChange = () => {
    dispatch(actionCreators.editHistory(selected.value, selected.id));
    setSelected();
  };

  const handleCancel = () => setSelected();
  const handleOnChange = e => setSelected({ ...selected, value: e.target.value });

  const handleOnKeyDown = event => {
    if (!validChars.test(event.key) && event.keyCode !== 8) {
      event.preventDefault();
    }
  };

  return (
    <div className={styles.historyContainer}>
      <h2>Historial</h2>
      <ul className={styles.historyList}>
        {history?.map(item =>
          selected?.id === item.id ? (
            <li key={item.id} className={styles.historyCard}>
              <input
                type="text"
                value={selected.value}
                className={styles.cardText}
                onChange={e => handleOnChange(e)}
                onKeyDown={e => handleOnKeyDown(e)}
              />
              <div>
                <UTButton onPress={() => handleChange()}>Guardar</UTButton>
                <UTButton className={styles.deleteButton} onPress={() => handleCancel()}>
                  Cancelar
                </UTButton>
              </div>
            </li>
          ) : (
            <li key={item.id} className={styles.historyCard}>
              <p className={styles.cardText}>Resultado: {item.value}</p>
              <div>
                <UTButton onPress={() => handleEdit(item)}>Editar</UTButton>
                <UTButton className={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                  Eliminar
                </UTButton>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

History.propTypes = {
  history: PropTypes.arrayOf.isRequired
};

const mapStateToProps = store => ({
  history: store.calculator.history
});

export default connect(mapStateToProps)(History);
