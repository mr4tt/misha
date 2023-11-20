import { useState, useEffect, useMemo } from "react"
import { listen_to_pc_layout_pcs } from "server"
import { Coordinate, PcId } from "server/types"

export function usePcCoords() {
  const [pccoords, setPccoords] = useState<Record<PcId, Coordinate>>({})

  useEffect(() => {
    const unsub = listen_to_pc_layout_pcs(pcs => {
      if (!pcs) { setPccoords({}); return }
      setPccoords(pcs)
    })
    return unsub
  }, [])

  const pcRcs = useMemo<Record<number, Record<number, PcId>>>(() => {
    let o: Record<number, Record<number, PcId>> = {}
    for (const [id, { r, c }] of Object.entries(pccoords)) {
      if (!o.hasOwnProperty(r)) { o[r] = {} }
      o[r][c] = id
    }
    return o
  }, [pccoords])

  return [pccoords, pcRcs] as const
}