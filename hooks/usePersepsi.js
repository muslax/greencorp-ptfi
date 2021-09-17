import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function usePersepsi(rid) {
const { data: persepsi, mutate: mutatePersepsi } = useSWR(`/api/get?q=get-persepsi&rid=${rid}`, fetchJson)

  const loadingPersepsi = persepsi === undefined;

  return { persepsi, loadingPersepsi, mutatePersepsi }
}