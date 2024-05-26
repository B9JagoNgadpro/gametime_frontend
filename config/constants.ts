// Riwayat
export const RIWAYAT_BASE_URL = process.env.NEXT_PUBLIC_RIWAYAT_BASE_URL;

export const RIWAYAT_CREATE = `${RIWAYAT_BASE_URL}/create`;
export const RIWAYAT_GET_PEMBELI = (userEmail: String) => { return `${RIWAYAT_BASE_URL}/get/${userEmail}` };
export const RIWAYAT_GET_PENJUAL = (userEmail: String) => { return `${RIWAYAT_BASE_URL}/get-penjual/${userEmail}` };