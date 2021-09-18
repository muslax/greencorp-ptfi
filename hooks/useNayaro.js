import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useNayaro(rid) {
const { data: nayaro, mutate: mutateNayaro } = useSWR(`/api/get?q=get-nayaro&rid=${rid}`, fetchJson)

  const loadingNayaro = nayaro === undefined;

  return { nayaro, loadingNayaro, mutateNayaro }
}