import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useKesmas(rid) {
const { data: kesmas, mutate: mutateKesmas } = useSWR(`/api/get?q=get-kesmas&rid=${rid}`, fetchJson)

  const loadingKesmas = kesmas === undefined;

  return { kesmas, loadingKesmas, mutateKesmas }
}