const round = require('./round');

module.exports = (function() {
 /**
   * Forma de "simular" método privados
   * No se puede declarar static porque las instancias no podría acceder a él
   * Calcula y regresa la raíz enésima = x^(1/n)
   * @param  {double} x Número base
   * @param  {int}    n Enésimo valor
   * @return {double}   raiz enésima
   */
  function raizEnesima(x, n) { 
    return round(Math.pow(x, 1 / n));
  }

  return class Medias {
    /**
     * Calcula y regresa la media artimética
     * @param  {Arrray[int]} params Array de valores 
     * @return {double}             mediaAritmetica
     */
    static mediaAritmetica(params) { 
      let total = 0;
      params.forEach(function(elem) {
        if(!isNaN(elem)) {
          total += Number(elem);
        }
      });

      return round(total / params.length);
    }

    /**
     * Usa raizEnesima para calcular y regresar la media geométrica
     * @param  {Arrray[int]} params Array de valores 
     * @return {double}             mediaGeometrica
     */
    mediaGeometrica(params) { 
      let sum = 0;
      params.forEach(function(elem) {
        sum += Number(elem);
      });

      return raizEnesima(sum, params.length);
    }

    /**
     * Este método no está implementado
     * @param  {Arrray[int]} params Array de valores 
     * @return {double}             mediaArmonica
     */
    static mediaArmonica(params) { 
      throw 'Method not implemented';
    }
  }
})();