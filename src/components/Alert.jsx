import { useContext, useEffect } from 'react';
import AlertContext  from '../context/AlertContext';
import { Toast } from 'react-bootstrap';

function GlobalAlert() {
  const { alert, show, hideAlert } = useContext(AlertContext);

  useEffect(() => {
    if (alert && show) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, show, hideAlert]);

  if (!alert) return null;

  return (
    <Toast 
      show={show} 
      onClose={hideAlert}
      delay={3000} 
      autohide
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        minWidth: '250px',
        zIndex: 9999
      }}
    >
      <Toast.Header closeButton>
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body className={`text-${alert.type}`}>
        {alert.message}
      </Toast.Body>
    </Toast>
  );
}

export default GlobalAlert;