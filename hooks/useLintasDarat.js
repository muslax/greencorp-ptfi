import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useLintasDarat(rid) {
const { data: lintasDarat, mutate: mutateLintasDarat } = useSWR(`/api/get?q=get-lintas-darat&rid=${rid}`, fetchJson)

  const loadingLintasDarat = lintasDarat === undefined;

  return { lintasDarat, loadingLintasDarat, mutateLintasDarat }
}