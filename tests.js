function centsToDollars(cents) {
  return cents / 100;
}

function calculateTax(amount, taxRate) {
  return amount * taxRate;
}

function test(description, testFunction) {
  try {
    testFunction();
    document.getElementById("results").innerHTML += `<div class="pass">✓ ${description}</div>`;
  } catch (error) {
    document.getElementById("results").innerHTML += `<div class="fail">✗ ${description}: ${error.message}</div>`;
  }
}

function expect(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, but got ${actual}`);
  }
}

test("converts 100 cents to 1 dollar", () => {
  expect(centsToDollars(100), 1);
});

test("converts 25 cents to 0.25 dollars", () => {
  expect(centsToDollars(25), 0.25);
});

test("calculates tax for 100 with 10% rate", () => {
  expect(calculateTax(100, 0.1), 10);
});

test("handles zero amount with tax rate", () => {
  expect(calculateTax(0, 0.1), 0);
});
