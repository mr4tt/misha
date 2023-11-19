'use client';

import { cl } from '@/utils/cl';
import { range } from '@/utils/range';
import { useEffect, useMemo, useState } from 'react'
import { listen_to_pc_layout_pcs, listen_to_pc_layout_dimensions, listen_to_inactive_pcs, listen_to_active_sessions } from 'server'
import { PcId, type Dimensions, Coordinate } from 'server/types'

export default function Home() {
  const [dims, setDims] = useState<Dimensions | null>(null)
  // maps pc id to its coordinates
  const [pccoords, setPccoords] = useState<Record<PcId, Coordinate>>({})
  const [inactivePcs, setInactivePcs] = useState<Set<PcId>>(new Set())
  const [occupiedPcs, setOccupiedPcs] = useState<Set<PcId>>(new Set())

  const pcRcs = useMemo<Record<number, Record<number, true>>>(() => {
    let o: Record<number, Record<number, true>> = {}
    for (const { r, c } of Object.values(pccoords)) {
      if (!o.hasOwnProperty(r)) { o[r] = {} }
      o[r][c] = true
    }
    return o
  }, [pccoords])

  const inactivePcRcs = useMemo<Record<number, Record<number, true>>>(() => {
    let o: Record<number, Record<number, true>> = {}
    for (const id of inactivePcs) {
      if (!pccoords[id]) { continue }
      const { r, c } = pccoords[id]
      if (!o.hasOwnProperty(r)) { o[r] = {} }
      o[r][c] = true
    }
    return o
  }, [pccoords, inactivePcs])

  const occupiedPcRcs = useMemo<Record<number, Record<number, true>>>(() => {
    let o: Record<number, Record<number, true>> = {}
    for (const id of occupiedPcs) {
      if (!pccoords[id]) { continue }
      const { r, c } = pccoords[id]
      if (!o.hasOwnProperty(r)) { o[r] = {} }
      o[r][c] = true
    }
    return o
  }, [pccoords, occupiedPcs])

  useEffect(() => {
    const unsub = listen_to_pc_layout_dimensions((raw_dims) => {
      if (typeof raw_dims?.rows !== 'number' || typeof raw_dims?.cols !== 'number') {
        setDims(null)
      } else {
        setDims(raw_dims)
      }
    })
 
    return unsub
  }, [])

  useEffect(() => {
    const unsub = listen_to_pc_layout_pcs(pcs => {
      if (!pcs) { setPccoords({}); return }
      const coords = Object.values(pcs)
        .filter(coord =>
          !!coord
          && Number.isInteger(coord.r) && 0 <= coord.r
          && Number.isInteger(coord.c) && 0 <= coord.c
        )
      const o: Record<number, Record<number, true>> = {}
      for (const { r, c } of coords) {
        if (!o.hasOwnProperty(r)) { o[r] = {} }
        o[r][c] = true
      }
      setPccoords(pcs)
    })
    return unsub
  }, [])

  useEffect(() => {
    const unsub = listen_to_inactive_pcs(ids => {
      setInactivePcs(new Set(Object.keys(ids)))
    })

    return unsub
  }, [])

  useEffect(() => {
    const unsub = listen_to_active_sessions(sessions => {
      setOccupiedPcs(new Set(Object.keys(sessions)))
    })

    return unsub
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-16">
      <h1 className="prose prose-2xl font-bold">TEC PC Availability</h1>
      {/* <button onClick={seed}>DS:KLFJSDFKDS</button> */}
      <div className="grow w-full flex flex-col items-center justify-center gap-2">
        {dims !== null && (
          <div className="flex items-center justify-center gap-8">
            <LegendKey fill="fill-green-500" label="available" />
            <LegendKey fill="fill-red-500" label="occupied" />
            <LegendKey fill="fill-slate-700" label="out of service" />
          </div>
        )}
        <div className="grow w-full flex items-center justify-center overflow-hidden border rounded-xl border-solid border-tec-blue">
          {dims === null ? <span className="font-mono text-xl">Internal Error</span> : (
            <>
              <ul role="grid" className="grow self-stretch flex flex-col items-stretch">
                <li className="flex items-center justify-center p-2 bg-tec-blue text-white">Garage</li>
                {range(dims.rows).map(r => (
                  <li key={r} className={`grow`}>
                    <ul role="row" className="h-full grow flex items-stretch">
                      {range(dims.cols).map(c => (
                        <li key={c} role="gridcell" className={cl(
                          'grow', 'border-solid',
                          !pcRcs?.[r]?.[c] && 'border border-slate',
                          resolveCellColor(!!inactivePcRcs?.[r]?.[c], !!occupiedPcRcs?.[r]?.[c], !!pcRcs?.[r]?.[c]),
                        )} />
                      ))}
                    </ul>
                  </li>
                ))}
                <li className="flex items-center justify-center p-2 bg-tec-blue text-white">Cafe</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

type LegendKeyProps = { fill: string, label: string }
function LegendKey({ fill, label }: LegendKeyProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg width="1em" height="1em" viewBox="0 0 1 1"><rect className={fill} width="1" height="1" /></svg>
      <span>- {label}</span>
    </div>
  )
}

function resolveCellColor(inactive: boolean, occupied: boolean, hasPc: boolean) {
  if (inactive) { return 'bg-slate-700' }
  if (occupied) { return 'bg-red-500' }
  if (hasPc) { return 'bg-green-500' }
  return ''
}