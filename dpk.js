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

  let candidate;
  const { partitionKey } = input;
  if (partitionKey) {
    candidate = partitionKey;

    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    const data = JSON.stringify(input);
    candidate = createHash(data);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }

  return candidate;
};