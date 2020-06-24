var PrimeSeq = [1,1];

function primeSeq(n)
{
	if(n > PrimeSeq.length)
	{
		if(n % 2 == 0)
		{
			PrimeSeq.push(PrimeSeq[n/2-1]);
		}
		else
		{
			PrimeSeq.push(PrimeSeq[(n-1)/2-1] + PrimeSeq[(n+1)/2-1]);
		}
	}
	return PrimeSeq[n-1];
}

function rationalInjection(n)
{
	return primeSeq(n)/primeSeq(n+1);
}