import * as Pairing from './functions/pairing';

/**
 * Generates a pairing QR string.
 * @returns The pairing QR string.
 */
export async function initPairing() {
  const qr = await Pairing.init();
  return qr;
}
