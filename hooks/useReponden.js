import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useResponden(id) {
  const { data: responden, mutate: mutateResponden } = useSWR(`/api/get?q=get-responden&id=${id}`, fetchJson)

  const loadingResponden = responden === undefined;

  return { responden, loadingResponden, mutateResponden }
}