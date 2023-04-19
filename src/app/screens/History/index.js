import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actionCreators from 'redux/history/actions';

import styles from './styles.module.scss';

function History({ dispatch, history }) {
  const [selected, setSelected] = React.useState();

  const handleEdit = item => {
    setSelected(item);
  };

  const handleDelete = id => {
    dispatch(actionCreators.deleteHistory(id));
  };

  const handleChange = () => {
    dispatch(actionCreators.editHistory(selected.value, selected.id));
    setSelected();
  };

  return (
    <div className={styles.historyContainer}>
      <h2>Historial</h2>
      <ul className={styles.historyList}>
        {history?.map(item =>
          selected?.id === item.id ? (
            <>
              <input
                type="text"
                value={selected.value}
                className={styles.input}
                onChange={e => setSelected({ ...selected, value: e.target.value })}
              />
              <button type="button" onClick={() => handleChange()}>
                Guardar
              </button>
            </>
          ) : (
            <li key={item.id} className={styles.historyCard}>
              <p className={styles.cardText}>Resultado: {item.value}</p>
              <button type="button" onClick={() => handleEdit(item)}>
                Editar
              </button>
              <button type="button" onClick={() => handleDelete(item.id)}>
                Eliminar
              </button>
              {/* <button type="button"> Borrar </button> */}
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
