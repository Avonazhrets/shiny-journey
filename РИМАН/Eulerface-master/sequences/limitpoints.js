
function limitedPoints(n)
{
	var denominator = Math.ceil((Math.sqrt(1+8*n)-1)/2)+1;
	var numerator = n - (denominator-1)*(denominator-2)/2;
	return(1/numerator - 1/denominator);
}