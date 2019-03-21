//Para imprimir con colores en la consola
const chalk = require('chalk');
const stringToValidType = require('./string-to-valid-type');
const round = require('./round');
const fs = require('fs');
const Medias = require('./medias.js');
//Para el método que no es estático
const medias = new Medias();

function getSpaces(num) {
  let spaces = '';
  for (var i = 0; i < num; i++)
    spaces += ' ';

  return spaces;
} 

function saveTestResult(tests) {
  let successNum = failuresNum = 0;

  tests.forEach(function(test) {
    let tmpStr = test.testId;
    let tmpStrConsole = test.testId;
    if(test.status < 0)
      tmpStr += '               ';
    else {
      tmpStr += test.status === 1 ? '    Éxito      ' : '   *Falla*     ';
    }
    tmpStr += test.methodName + getSpaces(21 - test.methodName.length) ;

    if(test.status < 0) {
      tmpStr += test.result;
    } else if(test.status == 1) {
      successNum++;
      tmpStr += 'Calculado = ' + test.result + getSpaces(12 - test.result.toString().length);
      
    } else {
      failuresNum++;
      tmpStr += 'Calculado = ' + test.result + getSpaces(12 - test.result.toString().length);
      tmpStr += 'Esperado = ' + test.correctResult + getSpaces(12 - test.correctResult.toString().length);
      
    }

    if(test.status < 0)
      console.log(tmpStr);
    else if(test.status == 1)
      console.log(chalk.green(tmpStr));
    else
      console.log(chalk.red(tmpStr));   
  });

  console.log('\n\n=========================== Fin de la prueba ======================================\n');
  console.log(chalk.green('                 Éxito = ' + successNum ), chalk.red('               Falla = ' + failuresNum + '\n\n'));
}

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

    try {
      //Métodos estáticos
      let fn = Medias[info.methodName];

      if(typeof fn !== 'function') //Métodos de la instancia
        fn = medias[info.methodName];

      if(typeof fn !== 'function')
        throw 'Método no existente';

      
      info.result = fn(info.params);
      
      info.status = info.result === info.correctResult ? 1 : 0;
    } catch(error) {
      info.status = -1; //Excepción
      //Validación para los métodos que generan una excepción o cuando el método no existe
      info.result = error;
    }
  }); 

  saveTestResult(tests);
});