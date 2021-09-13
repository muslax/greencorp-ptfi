import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useMyResponden(id) {
  const { data: daftar, mutate: mutateDaftar } = useSWR(`/api/get?q=my-responden`, fetchJson)

  const loadingDaftar = daftar === undefined;

  return { daftar, loadingDaftar, mutateDaftar }
}