import _sodium from 'libsodium-wrappers';

export type PairingDataInit = {
  pairingId: string;
  encPair: _sodium.KeyPair;
  signPair: _sodium.KeyPair;
};

/**
 * Generates a random pairing id.
 * @returns The pairing id.
 */
async function randomId() {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
  await _sodium.ready;
  for (let i = 0; i < 19; i++) {
    result += characters[_sodium.randombytes_uniform(characters.length)];
  }
  return result;
}

/**
 * Generates a qr code.
 * @returns The qr code.
 */
export async function init() {
  try {
    const pairingId = await randomId();

    await _sodium.ready;
    const encPair = _sodium.crypto_box_keypair();
    const signPair = _sodium.crypto_sign_keypair();

    const qr = JSON.stringify({
      pairingId,
      webEncPublicKey: _sodium.to_hex(encPair.publicKey),
      signPublicKey: _sodium.to_hex(signPair.publicKey),
    });

    return qr;
  } catch (error: any) {
    throw new Error((error as Error).message);
  }
}
