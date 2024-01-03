function Container({ children, className }) {
  return (
    <div className={`h-[calc(100vh-var(--nav-height))] py-10 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
