import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useDaftarTanaman(rid) {
  const { data: daftarTanaman, mutate: mutateDaftarTanaman } = useSWR(`/api/get?q=get-daftar-tanaman&rid=${rid}`, fetchJson)

  const loadingDaftarTanaman = daftarTanaman === undefined;

  return { daftarTanaman, loadingDaftarTanaman, mutateDaftarTanaman }
}