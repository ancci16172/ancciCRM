
export  const checkContactObjectFromClipboard = (clipboardObject) => {
    if (!clipboardObject.length) {
      return alert(`No se logro detectar ningun dato en el portapapeles`);
    }

    //Tenga la propiedad telefono
    for (const contact of clipboardObject) {
      const { TELEFONO } = contact;
      if (!TELEFONO) {
        return alert(
          `Todas las filas deben tener la propiedad 'TELEFONO' completa.`
        );
      }

      if (!TELEFONO.match(/\d/g)) {
        return alert(`El telefono '${TELEFONO}' no contiene numeros.`);
      }
      if (TELEFONO.match(/\d/g).length != TELEFONO.length) {
        return alert(`El telefono '${TELEFONO}' no es un numero.`);
      }
    }
    return true;
  };
