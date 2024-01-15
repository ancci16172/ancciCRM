import styles from "../AsideMp.module.css";

export function OptionsCheckBox({ children ,onChange,checked}) {
  return (
    <div className={styles["text--item"] + " flex px-7 mb-2"}>
      <input type="checkbox" className={styles["check--options"]} onChange={onChange} checked={checked} />
      <span className="text-xs pl-2">{children}</span>
    </div>
  );
}
