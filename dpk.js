const crypto = require("crypto");

function createHash (data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.createDeterministicPartitionKey = (input) => {
  let candidate;

  if (input) {
    if (input.partitionKey) {
      candidate = input.partitionKey;
    } else {
      const data = JSON.stringify(input);
      candidate = createHash(data);
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }

  return candidate;
};