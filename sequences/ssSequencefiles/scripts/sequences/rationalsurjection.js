/*function rationalSurjection(n)
{
	var denominator = Math.ceil((Math.sqrt(1+8*n)-1)/2)+1;
	var numerator = n - (denominator-1)*(denominator-2)/2;
	return numerator/denominator;
}*/

function rationalSurjection(n) {
  if (!(rationalSurjection.denominators && rationalSurjection.numerators)) {
    //проверка на непустоту статических переменных и стартовая инициализация
    rationalSurjection.denominator = 1
    rationalSurjection.numerator = 1
    rationalSurjection.length = 1
  }
  if (rationalSurjection.length < n - 1) {
    //проверка предварительных вычислений
    rationalSurjection(n - 1)
  }
  if (rationalSurjection.length < n) {
    //вычисление по индукции
    rationalSurjection.numerator =
      (rationalSurjection.numerator + 1) % rationalSurjection.denominator
    if (!rationalSurjection.numerator) {
      rationalSurjection.numerator++
      rationalSurjection.denominator++
    }
  }
  //console.log(rationalSurjection.numerators[-1]/rationalSurjection.denominators[-1]);
  return rationalSurjection.numerator / rationalSurjection.denominator
}
