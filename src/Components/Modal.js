export default function Modal({
  children, title, show, setShow,
}) {
  const showModal = show ? { display: 'block' } : { display: 'none' };

  return (
    <div className="modal" style={showModal} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{ title }</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setShow(false);
              }}
            />
          </div>
          <div className="modal-body">
            { children }
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setShow(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
