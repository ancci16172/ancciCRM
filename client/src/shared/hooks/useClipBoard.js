


export function useClipBoard() {

  const getClipBoardText = async () => {
    try {
      const text = await navigator.clipboard.readText();

      return text;
    } catch (error) {
      console.log("No se pudo consultar el valor del portapapeles");
      console.error(error);
    }
  };

  const createObjectByClipboard = async () => {

    /*Formatter */
    const clipBoardData = (await getClipBoardText()).replaceAll("\r","").trim();
    const objectByClipboard = [];
    const rows = clipBoardData.split("\n");
    const clipBoardArray = rows.map(row => row.split("\t"));
    const headers = clipBoardArray[0].map(header => header.toUpperCase());
        

    //Por cada fila
    for(let i = 1; i < rows.length;i++){
        const auxObject = {};
        //Por cada columna
        for(let j = 0; j < clipBoardArray[i].length ; j++){
            auxObject[headers[j]] = clipBoardArray[i][j];
        }
        objectByClipboard.push(auxObject)
    }
    return objectByClipboard
  }






//   useEffect(() => {
//     fetchClipBoardData();
//   }, []);


  


  return {createObjectByClipboard}
}
