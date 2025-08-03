// src/utils/crypto.js

/**
 * Hashes a string using the SHA-256 algorithm.
 * @param {string} string The string to hash.
 * @returns {Promise<string>} The hexadecimal representation of the hash.
 */
export async function sha256(string) {
  const textAsBuffer = new TextEncoder().encode(string);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
