import styles from "./checkBox.module.css";



export function OptionsCheckBox({ children ,onChange,checked}) {
  return (
    <div className={"text-[0.8rem] flex mb-2"}>
      <input type="checkbox" className={styles["check--options"] + " cursor-pointer"} onChange={onChange} checked={checked} />
      <span className="text-xs pl-2">{children}</span>
    </div>
  );
}
