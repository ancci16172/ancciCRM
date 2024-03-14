import { useEffect, useRef, useState } from "react";

/*ref = useRef del contenedor donde se puede ordenar */
export const useJQueryOrder = (setToOrderNewData) => {
  const orderContainerRef = useRef(null);

  // const [orderedIds, setOrderedIds] = useState([]);

  //El seter que recibe por paramentro es el Set del useState de el array de elementos
  //El cual estoy ordenando en la interfaz,
  //Una vez reordenados y se ejecute el onUpdate, los elementos se ordenan con la posicion final que quedo en
  //tengan dentro del contender orderContainerRef
  const orderArray = (order) => {
    setToOrderNewData(      (prevData) => {

      const messagesResultOnOrder = order.map((index) => prevData[index]);

      return messagesResultOnOrder;
    });
  };

  useEffect(() => {
    if (!orderContainerRef.current) return;

    const onUpdate = (event, ui) => {
      const children = [...orderContainerRef.current.childNodes];
      
      const childrenOrderedId = children.map((child) =>
        parseInt(child.getAttribute("sortid"))
      );

      orderArray(childrenOrderedId);
    };

    $(orderContainerRef.current).sortable({
      update: onUpdate,
    });
  }, []);

  return {  orderContainerRef };
};
