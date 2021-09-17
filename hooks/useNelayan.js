import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useNelayan(rid) {
const { data: nelayan, mutate: mutateNelayan } = useSWR(`/api/get?q=get-nelayan&rid=${rid}`, fetchJson)

  const loadingNelayan = nelayan === undefined;

  return { nelayan, loadingNelayan, mutateNelayan }
}