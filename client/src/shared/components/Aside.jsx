import styles from "./Aside.module.css";

export function Aside({ children, title }) {
  return (
    <aside
      className={
        "w-44 fixed flex flex-col  border-r border-black border-solid left-0 " +
        styles.aside
      }
    >
      <h2 className="text-center text-2xl my-2 mb-2">{title}</h2>
      {children}
    </aside>
  );
}
