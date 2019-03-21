/**
 * Regresa el valor redondeado a el número de decimales especificado
 * @param  {Number} num       Número a redondear
 * @param  {int}    decimals  Decimales de precisión
 * @return {float}            Número redondeado
 */
module.exports = function (num, decimals = 4) {
  return parseFloat(parseFloat(num).toFixed(decimals)) || 0.0000;
};