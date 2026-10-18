/**
 * Payment and Approval Storage Helper for BhumiVerify
 * Tracks 1500 Tk digital banking verification fee approvals for parcel searches.
 */

const PAID_PARCELS_KEY = 'bhumiverify_paid_parcels';

export function isParcelPaid(parcelId: string): boolean {
  try {
    const list: string[] = JSON.parse(sessionStorage.getItem(PAID_PARCELS_KEY) || '[]');
    return list.includes(parcelId);
  } catch {
    return false;
  }
}

export function markParcelPaid(parcelId: string, txnId: string): void {
  try {
    const list: string[] = JSON.parse(sessionStorage.getItem(PAID_PARCELS_KEY) || '[]');
    if (!list.includes(parcelId)) {
      list.push(parcelId);
      sessionStorage.setItem(PAID_PARCELS_KEY, JSON.stringify(list));
    }
    sessionStorage.setItem(`bhumiverify_txn_${parcelId}`, txnId);
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export function getParcelTxnId(parcelId: string): string {
  try {
    return sessionStorage.getItem(`bhumiverify_txn_${parcelId}`) || 'TXN-DB-884920';
  } catch {
    return 'TXN-DB-884920';
  }
}
