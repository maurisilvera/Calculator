import api from 'config/api';

export default {
  getExpressions: () => api.get('/expressions'),
  postExpressions: () => api.post('/expressions'),
  putExpressions: () => api.put('/expressions'),
  deleteExpressions: () => api.delete('/expressions')
};
