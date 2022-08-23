export default function FormWrapper({ children, title }) {
  return (
    <div className="d-flex flex-column w-25 justify-content-center mx-auto">
      <h1 className="mt-4 text-center">{title}</h1>
      <div className="justify-content-center">
        {children}
      </div>
    </div>
  );
}
