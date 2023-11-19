import { useState, useEffect, useMemo } from "react"
import { listen_to_inactive_pcs } from "server"
import { Coordinate, PcId } from "server/types"

export function useInactivePcs(pccoords: Record<string, Coordinate>) {
  const [inactivePcs, setInactivePcs] = useState<Record<PcId, Coordinate>>({})

  const inactivePcRcs = useMemo<Record<number, Record<number, PcId>>>(() => {
    let o: Record<number, Record<number, PcId>> = {}
    for (const id in inactivePcs) {
      if (!pccoords[id]) { continue }
      const { r, c } = pccoords[id]
      if (!o.hasOwnProperty(r)) { o[r] = {} }
      o[r][c] = id
    }
    return o
  }, [pccoords, inactivePcs])

  useEffect(() => {
    const unsub = listen_to_inactive_pcs(ids => {
      let o: Record<PcId, Coordinate> = {}
      for (const id in ids) {
        if (!pccoords[id]) { continue }
        o[id] = pccoords[id]
      }
      setInactivePcs(o)
    })

    return unsub
  }, [pccoords])

  return [inactivePcs, inactivePcRcs] as const
}