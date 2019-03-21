const stringToValidType = require('./string-to-valid-type');
const round = require('./round');
const fs = require('fs');
const Medias = require('./medias.js');
//Para el método que no es estático
const medias = new Medias();

fs.readFile('./CasosPrueba.txt', 'utf8', (error, data) => {
  if(error) {
    console.error('Hubo un error al leer los casos de prueba: ', error);
    return;
  }

  //Separar cada caso de prueba del archivo
  let testsArr = data.split('\r\n');
  let tests = [];

  testsArr.forEach(function(test) {
    //Separar cada parámetro de cada caso de prueba
    let testInfo = test.split(':');

    if(testInfo.length !== 4) {
      /*
        Todos los casos de pruba deben matener le mismo formato,
        este error no sería de los datos que se tratan de meter 
        a las funciones para probarlas sino del caso de prueba en sí
       */
      throw 'Caso de prueba con formato incorrecto';
    }

    let info = {
      testId: testInfo[0],
      methodName: testInfo[1],
      params: [],
      correctResult: stringToValidType(testInfo[3])
    };

    let params = testInfo[2].split(' ');
    params.forEach(function(param) {
      info.params.push(stringToValidType(param));  
    });

    tests.push(info);

    //Evaluar cada caso mandando llamar al método
    if(typeof Medias[info.methodName] === 'function') { //Métodos estáticos
      info.result = Medias[info.methodName](info.params);
    } else if(typeof medias[info.methodName] === 'function') { //Métodos propios de la instancia
      info.result = medias[info.methodName](info.params);
    } else {
      info.result = info.methodName + ' Método no existente'
    }

    info.isSuccess = info.result === info.correctResult;
  }); 

  console.log(tests);
});