// E2E ENCRYPT
export async function encrypt(text, key) {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );

  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(cipher))
  };
}

export async function decrypt(payload, key) {
  const iv = new Uint8Array(payload.iv);
  const data = new Uint8Array(payload.data);

  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return new TextDecoder().decode(plain);
}

export async function createKey() {
  return crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt","decrypt"]
  );
}
