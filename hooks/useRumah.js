import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useRumah(rid) {
  const { data: rumah, mutate: mutateRumah } = useSWR(`/api/get?q=get-tanah-rumah&rid=${rid}`, fetchJson)

  const loadingRumah = rumah === undefined;

  return { rumah, loadingRumah, mutateRumah }
}