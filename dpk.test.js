const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns SHA3-512 Hexadecimal hashed string of 'partitionKey', when input contains 'partitionKey', which is a string longer than maximum length.", () => {});

  it("Returns SHA3-512 Hexadecimal hashed string of stringified 'partitionKey', when input contains 'partitionKey', which is not a string and it's stringification result is longer than maximum length.", () => {});

  it("Returns 'partitionKey' attribute of input, when input contains 'partitionKey', which is a string not longer than maximum length.", () => {});

  it("Returns stringified 'partitionKey' attribute of input, when input contains 'partitionKey', which is not a string and its stringification result is not longer than maximum length.", () => {});

  it("Returns SHA3-512 Hexadecimal hashed string of stringified input, when input doesn't contan 'partitionKey'.", () => {});

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});
