// AES-128-CTR setup
const method = 'AES-CTR';
const keyString = '4_V3ry_W1ld_W3st_K3y';

// Convert key string to CryptoKey
async function getKey() {
  const enc = new TextEncoder();
  const rawKey = enc.encode(keyString).slice(0, 16); // AES-128 requires 16 bytes
  return await crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: method },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt function
async function encryptAchievement(plainText) {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(16)); // 16-byte IV for AES-CTR

  const enc = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: method, counter: iv, length: 64 }, // counter length usually 64 bits
    key,
    enc.encode(plainText)
  );

  // Combine IV + ciphertext
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  // Base64 encode
  return encodeURIComponent(btoa(String.fromCharCode(...combined)));
}

// Decrypt function
async function decryptAchievement(base64Input) {
  const key = await getKey();
  const combined = Uint8Array.from(atob(decodeURIComponent(base64Input)), c => c.charCodeAt(0));

  const iv = combined.slice(0, 16);
  const encrypted = combined.slice(16);

  const decrypted = await crypto.subtle.decrypt(
    { name: method, counter: iv, length: 64 },
    key,
    encrypted
  );

  const dec = new TextDecoder();
  return dec.decode(decrypted);
}

// Example usage
/* (async () => {
  const encrypted = await encryptAchievement("Secret Achievement!");
  console.log("Encrypted:", encrypted);

  const decrypted = await decryptAchievement(encrypted);
  console.log("Decrypted:", decrypted);
})(); */