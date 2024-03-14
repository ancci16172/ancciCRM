// .section{
//     padding: .5rem 1rem;
//     padding-left: calc(12rem  + 1rem);
//     /* max-height: calc(100vh - 50px); */
// }

export function SectionContainer({ children ,className}) {
  return (
    <section className={"py-[.5rem] px-[1rem] pl-[13rem] " + className}>{children}</section>
  );
}
