import FormWrapper from '../Form/FormWrapper';

export default function EditProfile({ user, handleSubmitUserEdit }) {
  return (
    <FormWrapper title="Edit Profile">
      <form onSubmit={handleSubmitUserEdit}>
        <div className="form-group">
          Name
          <input defaultValue={user.fullName} type="text" className="form-control" id="fullName" />
        </div>
        <br />
        <div className="form-group">
          Email
          <input defaultValue={user.email} type="text" className="form-control" id="email" />
        </div>
        <br />
        <div className="form-group">
          Password
          <input defaultValue={user.password} type="text" className="form-control" id="password" />
        </div>
        <br />
        <div className="form-group">
          Phone
          <input defaultValue={user.phone} type="text" className="form-control" id="phone" />
        </div>
        <br />
        <div className="form-group">
          Address
          <input defaultValue={user.address} type="text" className="form-control" id="address" />
        </div>
        <br />
        <div className="form-group">
          Profile Picture
          <input defaultValue={user.profilePicture} type="text" className="form-control" id="profilePicture" />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </FormWrapper>
  );
}
