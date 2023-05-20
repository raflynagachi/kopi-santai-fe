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
          <div className="d-flex flex-row align-items-center form-check">
            <input type="radio" name="rating" id="rating" className="form-check-input ms-4 me-1" value={1} />
            1
            <input type="radio" name="rating" id="rating" className="form-check-input ms-4 me-1" value={2} />
            2
            <input type="radio" name="rating" id="rating" className="form-check-input ms-4 me-1" value={3} />
            3
            <input type="radio" name="rating" id="rating" className="form-check-input ms-4 me-1" value={4} />
            4
            <input type="radio" name="rating" id="rating" className="form-check-input ms-4 me-1" value={5} />
            5
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
