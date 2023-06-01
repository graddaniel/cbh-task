const { createDeterministicPartitionKey } = require("./dpk");


const STRING_OF_260_CHARACTERS = '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890';

const HASHES = {
  VARIANT_1: 'cc0211653c37993e9dee828cbfe2e209c56fd2b05c3bed5b5d5c1ddda9659c269b3e166e518907d14465162e02c3f66ca3790b7a19113ec9b1395b5f95a18711',
  VARIANT_2: '6519b947f197165e05ad92d46f9fe67c21c5251c4a4d4b99d01573b0891bf6e49d4c3544d7422c3cc16309076223e899fad9a94febaef885d77b35cde6179a0f',
  VARIANT_3: '4c8347dd7dd74558cc2b89b6129de4f2e1ca641ade56c4831b89f293ff70915c4467c8b25d359e84971cf4b0628ac43c03df15d55cef3df6201b9030e91b887a',
};

describe("createDeterministicPartitionKey", () => {
  describe("Returns SHA3-512 Hexadecimal hashed string of", () => {
    it(
      "'partitionKey', when input contains 'partitionKey'," +
      " which is a string longer than maximum length.", () => {
      const input = {
        partitionKey: STRING_OF_260_CHARACTERS,
      };

      const trivialKey = createDeterministicPartitionKey(input);

      expect(trivialKey).toBe(HASHES.VARIANT_1);
    });

    it(
      "stringified 'partitionKey', when input contains 'partitionKey'," +
      " which is not a string and it's stringification result is longer than maximum length.", () => {
      const input = {
        partitionKey: { data: STRING_OF_260_CHARACTERS }
      };

      const trivialKey = createDeterministicPartitionKey(input);

      expect(trivialKey).toBe(HASHES.VARIANT_2);
    });

    it("stringified input, when input doesn't contan 'partitionKey'.", () => {
      const input = { data: 'asdasdasd' };

      const trivialKey = createDeterministicPartitionKey(input);

      expect(trivialKey).toBe(HASHES.VARIANT_3);
    });
  });

  it(
    "Returns 'partitionKey' attribute of input, when input contains 'partitionKey'," +
    " which is a string not longer than maximum length.", () => {
    const input = { partitionKey: '1234567890' };

    const trivialKey = createDeterministicPartitionKey(input);

    expect(trivialKey).toBe(input.partitionKey);
  });

  it(
    "Returns stringified 'partitionKey' attribute of input, when input contains 'partitionKey'," +
    " which is not a string and its stringification result is not longer than maximum length.", () => {
    const input = { partitionKey: { data: '1234567890' } };

    const trivialKey = createDeterministicPartitionKey(input);

    expect(trivialKey).toBe('{"data":"1234567890"}');
  });

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = createDeterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});
