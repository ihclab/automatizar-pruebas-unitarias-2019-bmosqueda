const fs = require('fs');

function stringToValidType(str) {
  if(str === 'null')
    return null;
  else if(str === 'undefined')
    return undefined;
  else if(!isNaN(str))
    return Number(str);
  else 
    return str;
}

fs.readFile('./CasosPrueba.txt', 'utf8', (error, data) => {
  if(error) {
    console.error('Hubo un error al leer los casos de prueba: ', error);
    return;
  }

  let tests = data.split('\r\n');
  let testsArr = [];

  tests.forEach(function(test) {
    let testInfo = test.split(':');

    if(testInfo.length !== 4) {
      //TODO: throw error
      console.log('Caso de prueba con formato incorrecto');
    }

    let info = {
      testId: testInfo[0],
      methodName: testInfo[1],
      params: [],
      correctResult: testInfo[3]
    };

    let params = testInfo[2].split(' ');
    params.forEach(function(param) {
      info.params.push(stringToValidType(param));  
    });

    testsArr.push(info);
  }); 

  console.log(testsArr);
});