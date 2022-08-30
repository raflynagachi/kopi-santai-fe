import FormWrapper from '../Form/FormWrapper';

export default function ReviewForm({ menuItem, handleSubmit }) {
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          Menu Name
          <input value={menuItem.id} type="text" className="form-control" id="menuID" hidden readOnly />
          <input defaultValue={menuItem.name} type="text" style={{ backgroundColor: '#ccc' }} className="form-control" id="menuName" readOnly />
        </div>
        <br />
        <div className="form-group">
          Rating
          <div className="d-flex flex-row align-items-center">
            <input defaultValue={5} type="number" step={0.01} className="form-control" id="rating" min={1} max={5} required />
          </div>
        </div>
        <br />
        <div className="form-group">
          Description
          <textarea type="text" className="form-control" id="description" placeholder="write a review here..." />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </FormWrapper>
  );
}
