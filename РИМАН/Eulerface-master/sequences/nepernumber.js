function neperDef(n)
{
	return Math.pow((1+1/n),n);
}

//var RevFacSeq  = [1,1,0.5,0.16666, 0.04166, 0.00833, 0.00138, 0.00019, 0.00002];
var NepPartSum = [1, 2];


function fact(n)
{
	if(n == 1 || n == 0)
		return 1;
	return fact(n-1)*n;
}

function reversefactorial(n)
{
	if(n >= 12)
		return 0;
	else
		return 1/fact(n);
}


function neperSeries(n)
{
	if(NepPartSum.length >= n)
		return NepPartSum[n-1];
	else
	{
		NepPartSum.push(neperSeries(n-1)+reversefactorial(n-1));
		
		return NepPartSum[n-1];
	}
}