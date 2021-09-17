import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export default function useLintasAir(rid) {
const { data: lintasAir, mutate: mutateLintasAir } = useSWR(`/api/get?q=get-lintas-air&rid=${rid}`, fetchJson)

  const loadingLintasAir = lintasAir === undefined;

  return { lintasAir, loadingLintasAir, mutateLintasAir }
}