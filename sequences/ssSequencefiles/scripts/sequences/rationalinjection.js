function rationalInjection(n) {
  if (!rationalInjection.data) {
    rationalInjection.data = [-1, 1]
  }
  if (n > rationalInjection.data.length) {
    if (n % 2 == 0) {
      rationalInjection.data.push(rationalInjection.data[n / 2 - 1])
    } else {
      rationalInjection.data.push(
        rationalInjection.data[(n - 1) / 2 - 1] +
          rationalInjection.data[(n + 1) / 2 - 1],
      )
    }
  }
  return rationalInjection.data(n) / rationalInjection.data(n + 1)
}
