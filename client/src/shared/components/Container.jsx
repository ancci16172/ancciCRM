function Container({ children, className }) {
  return (
    <div className={`${className} mt-[var(--nav-height)]`}>
      {children}
    </div>
  );
}

export default Container;
