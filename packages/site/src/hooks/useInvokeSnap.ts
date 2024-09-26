import { defaultSnapOrigin } from '../config';
import { useRequest } from './useRequest';

export type InvokeSnapParams = {
  method: string;
  params?: Record<string, unknown>;
};

/**
 * Utility hook to wrap the `wallet_invokeSnap` method.
 *
 * @param snapId - The Snap ID to invoke. Defaults to the snap ID specified in the
 * config.
 * @returns The invokeSnap wrapper method.
 */
export function useInvokeSnap(snapId = defaultSnapOrigin) {
  const request = useRequest();

  // eslint-disable-next-line jsdoc/require-jsdoc
  async function invokeSnap<SnapResponse>({
    method,
    params,
  }: InvokeSnapParams) {
    const response = request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: params ? { method, params } : { method },
      },
    });
    const result = await response;

    return { response: result as SnapResponse };
  }
  return invokeSnap;
}
