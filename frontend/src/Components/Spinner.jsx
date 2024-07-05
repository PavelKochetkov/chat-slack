import React from 'react';

const Spinner = () => (
  <div
    className="spinner-border spinner-border-sm text-primary"
    role="status"
  >
    <span
      className="visually-hidden"
    >
      Загрузка...
    </span>
  </div>
);

export default Spinner;
