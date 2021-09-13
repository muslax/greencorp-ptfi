import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useDaftarResponden() {
  const { data: daftarResponden, mutate: mutateDaftarResponden } =
  useSWR(`/api/get?q=get-daftar-responden`, fetchJson)

  const loadingDaftarResponden = daftarResponden === undefined;

  return { daftarResponden, loadingDaftarResponden, mutateDaftarResponden }
}