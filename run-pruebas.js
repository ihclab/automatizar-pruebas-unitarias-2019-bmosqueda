const fs = require('fs');

fs.readFile('./CasosPrueba.txt', 'utf8', (error, data) => {
  if(error) {
    console.error('Hubo un error al leer los casos de prueba: ', error);
    return;
  }

  let tests = data.split('\r\n');

  tests.forEach(function(elem) {
    console.log(elem);
  }); 
});