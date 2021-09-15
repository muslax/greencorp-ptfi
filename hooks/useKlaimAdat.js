import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useKlaimAdat(rid) {
const { data: klaim, mutate: mutateKlaim } = useSWR(`/api/get?q=get-klaim-adat&rid=${rid}`, fetchJson)

  const loadingKlaim = klaim === undefined;

  return { klaim, loadingKlaim, mutateKlaim }
}