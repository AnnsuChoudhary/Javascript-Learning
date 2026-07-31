describe('Money conversion', function () {
  it('converts 100 cents to 1 dollar', function () {
    expect(centsToDollars(100)).toBe(1);
  });

  it('converts 25 cents to 0.25 dollars', function () {
    expect(centsToDollars(25)).toBe(0.25);
  });
});

describe('Tax calculation', function () {
  it('calculates 10% tax on 100', function () {
    expect(calculateTax(100, 0.1)).toBe(10);
  });

  it('returns 0 tax for zero amount', function () {
    expect(calculateTax(0, 0.1)).toBe(0);
  });
});
