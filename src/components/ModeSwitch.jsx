import { useId } from "react"

const ModeSwitch = ({
  className = "",
  defaultChecked = false,
  checked,
  onChange,
}) => {
  const id = useId()
  const wrapperClass = ["mode-switch", className].filter(Boolean).join(" ")
  const inputProps = {
    id,
    type: "checkbox",
    className: "mode-switch__input",
    onChange,
    "aria-label": "Toggle theme",
  }

  if (typeof checked === "boolean") {
    inputProps.checked = checked
  } else {
    inputProps.defaultChecked = defaultChecked
  }

  return (
    <div className={wrapperClass}>
      <div className="mode-switch__container">
        <input {...inputProps} />
        <label htmlFor={id} className="mode-switch__label" />
      </div>
    </div>
  )
}

export default ModeSwitch
