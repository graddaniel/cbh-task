const crypto = require("crypto");

function createHash (data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.createDeterministicPartitionKey = (input) => {
  if (!input) {
    return TRIVIAL_PARTITION_KEY;
  }

  const { partitionKey: inputPartitionKey } = input;
  if (!inputPartitionKey) {
    return createHash(JSON.stringify(input));
  }

  const partitionKeyCandidate = typeof inputPartitionKey !== "string"
    ? JSON.stringify(inputPartitionKey)
    : inputPartitionKey;

  if (partitionKeyCandidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(partitionKeyCandidate);
  }

  return partitionKeyCandidate;
};