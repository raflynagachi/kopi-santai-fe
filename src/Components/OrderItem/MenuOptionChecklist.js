export default function MenuOptionChecklist({ menuOptions }) {
  return (
    <>
      {menuOptions.map((menuOpt) => (
        <div>
          <label htmlFor={menuOpt.typeMenuOption}>
            <input
              type="radio"
              value={menuOpt.name}
              id={menuOpt.typeMenuOption}
              name={menuOpt.typeMenuOption}
            />
            {` (${menuOpt.typeMenuOption}) - ${menuOpt.name}`}
          </label>
        </div>
      ))}
    </>
  );
}
