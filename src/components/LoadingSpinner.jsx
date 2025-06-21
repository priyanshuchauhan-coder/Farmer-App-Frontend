import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ size = 'md', variant = 'success', message = 'Loading...' }) => {
  const sizes = {
    sm: {
      spinnerSize: 'sm',
      textSize: 'small'
    },
    md: {
      spinnerSize: '',
      textSize: ''
    },
    lg: {
      spinnerSize: 'lg',
      textSize: 'h5'
    }
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className="text-center py-4">
      <Spinner 
        animation="border" 
        role="status" 
        variant={variant}
        size={currentSize.spinnerSize}
        className="me-2"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {currentSize.textSize === 'h5' ? (
        <h5 className="d-inline">{message}</h5>
      ) : currentSize.textSize === 'small' ? (
        <small className="d-inline">{message}</small>
      ) : (
        <span className="d-inline">{message}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;