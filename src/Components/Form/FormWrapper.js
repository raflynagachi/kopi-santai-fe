export default function FormWrapper({ children, title }) {
  return (
    <div className="d-flex flex-column w-75 justify-content-center mx-auto">
      <h5 className="mt-4 text-center">{title}</h5>
      <div className="justify-content-center">
        {children}
      </div>
    </div>
  );
}
