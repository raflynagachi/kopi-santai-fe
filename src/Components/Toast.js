export default function Toast({ show, setShow, message }) {
  const showToast = show ? 'show' : '';

  return (
    <div className="toast-container position-absolute top-1 end-0 p-3">
      <div className={`toast ${showToast}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <span className="rounded me-2 bg-blue" />
          <strong className="me-auto">Notification</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            onClick={() => {
              setShow(false);
            }}
            aria-label="Close"
          />
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
}
