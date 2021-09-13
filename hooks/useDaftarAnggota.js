import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useDaftarAnggota(id) {
  const { data: dfAnggota, mutate: mutateDfAnggota } = useSWR(`/api/get?q=get-daftar-anggota&id=${id}`, fetchJson)

  const loadingDfAnggota = dfAnggota === undefined;

  return { dfAnggota, loadingDfAnggota, mutateDfAnggota }
}