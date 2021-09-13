// useDaftarAset
import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useDaftarAset(rid) {
  const { data: daftar, mutate: mutateDaftar } = useSWR(`/api/get?q=get-daftar-aset&rid=${rid}`, fetchJson)

  const loadingDaftar = daftar === undefined;

  return { daftar, loadingDaftar, mutateDaftar }
}