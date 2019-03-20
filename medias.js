module.exports = class Medias {
  /**
   * Calcula y regresa la media artimética
   * @param  {Arrray[int]} params Array de valores 
   * @return {double}             mediaAritmetica
   */
  static mediaAritmetica(params) { }

  /**
   * Calcula y regresa la raíz enésima = x^(1/n)
   * @param  {double} x Número base
   * @param  {int}    n Enésimo valor
   * @return {double}   raiz enésima
   */
  static raizEnesima(x, n) { }

  /**
   * Usa raizEnesima para calcular y regresar la media geométrica
   * @param  {Arrray[int]} params Array de valores 
   * @return {double}             mediaGeometrica
   */
  mediaGeometrica(params) { }

  /**
   * Este método no está implementado
   * @param  {Arrray[int]} params Array de valores 
   * @return {double}             mediaArmonica
   */
  static mediaArmonica(params) { 
    throw 'Method not implemented';
  }
};