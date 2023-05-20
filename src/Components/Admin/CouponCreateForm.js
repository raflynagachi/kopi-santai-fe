import FormWrapper from '../Form/FormWrapper';

export default function CouponCreateForm({ handleSubmit }) {
  return (
    <FormWrapper title="Create Coupon">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          Name
          <input type="text" className="form-control" id="name" required />
        </div>
        <br />
        <div className="form-group">
          Amount
          <input defaultValue={0} type="number" step={0.01} className="form-control" id="amount" required min={1} max={100} />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </FormWrapper>
  );
}
