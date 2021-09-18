import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useConstants(section) {
  let url = "/api/get?q=get-constants";
  if (section) {
    url = `/api/get?q=get-section-constants&section=${section}`
  }
  const { data: constants, mutate: mutateConstants } = useSWR(url, fetchJson)

  const loadingConstants = constants === undefined;

  return { constants, loadingConstants, mutateConstants }
}