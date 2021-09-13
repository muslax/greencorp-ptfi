import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useConstants() {
  const { data: constants, mutate: mutateConstants } = useSWR("/api/get?q=get-constants", fetchJson)

  const loadingConstants = constants === undefined;

  return { constants, loadingConstants, mutateConstants }
}