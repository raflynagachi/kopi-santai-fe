import FormWrapper from '../Form/FormWrapper';

export default function DeliveryForm({ delivery, handleSubmit }) {
  const statusOptions = ['ON PROCESS', 'ON DELIVERY', 'DELIVERED'];

  return (
    <FormWrapper title="Edit Profile">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input value={delivery.id} type="text" className="form-control" id="id" readOnly />
        </div>
        <br />
        <div className="form-group">
          Status
          <select className="form-select" id="status" defaultValue={delivery.status}>
            {statusOptions.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </FormWrapper>
  );
}
