import { useState, useEffect, useMemo } from "react"
import { listen_to_active_sessions } from "server"
import { Coordinate, PcId, Session } from "server/types"

export function useOccupiedPcs(pccoords: Record<string, Coordinate>) {
  const [occupiedPcs, setOccupiedPcs] = useState<Record<PcId, Session>>({})

  const occupiedPcRcs = useMemo<Record<number, Record<number, PcId>>>(() => {
    let o: Record<number, Record<number, PcId>> = {}
    for (const id in occupiedPcs) {
      if (!pccoords[id]) { continue }
      const { r, c } = pccoords[id]
      if (!o.hasOwnProperty(r)) { o[r] = {} }
      o[r][c] = id
    }
    return o
  }, [pccoords, occupiedPcs])

  useEffect(() => {
    const unsub = listen_to_active_sessions(sessions => {
      setOccupiedPcs(sessions)
    })

    return unsub
  }, [])

  return [occupiedPcs, occupiedPcRcs] as const
}