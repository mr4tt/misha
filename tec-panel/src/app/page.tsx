'use client';

import { useKeyNavigation } from '@/hooks/use-key-navigation';
import { useDims } from '@/hooks/use-dims';
import { useInactivePcs } from '@/hooks/use-inactive-pcs';
import { useOccupiedPcs } from '@/hooks/use-occupied-pcs';
import { usePcCoords } from '@/hooks/use-pc-coords';
import { cl } from '@/utils/cl';
import { range } from '@/utils/range';
import { useMemo, useState } from 'react';
import { Coordinate, PcId } from 'server/types';
import { end_all_sessions } from 'server';
import { mark_pc_inactive } from 'server';
import { mark_pc_no_longer_inactive } from 'server';
import { end_session } from 'server';
import { mark_all_pcs_inactive } from 'server';
import { mark_all_pcs_no_longer_inactive } from 'server';

export default function Home() {
  const dims = useDims()
  const [pccoords, pcRcs] = usePcCoords()
  const [inactivePcs, inactivePcRcs] = useInactivePcs(pccoords)
  const [occupiedPcs, occupiedPcRcs] = useOccupiedPcs(pccoords)

  const [selectedRc, setSelectedRc] = useState<Coordinate | null>(null)

  const coordsList = useMemo(() => Object.values(pccoords), [pccoords])
  useKeyNavigation(coordsList, selectedRc, setSelectedRc)

  const selectedPcId = useMemo(() => {
    if (selectedRc === null) { return null }
    const id = pcRcs?.[selectedRc.r]?.[selectedRc.c]
    return id ?? null
  }, [pcRcs, selectedRc])

  const selectedPcState: PcState | null = useMemo(() => {
    if (selectedRc === null) { return null }
    const { r, c } = selectedRc
    const hasPc = pcRcs?.[r]?.hasOwnProperty?.(c)
    const isInactive = inactivePcRcs?.[r]?.hasOwnProperty?.(c)
    const isOccupied = occupiedPcRcs?.[r]?.hasOwnProperty?.(c)
    const pcState = resolvePcState(hasPc, isInactive, isOccupied)
    return pcState
  }, [selectedRc, pcRcs, inactivePcRcs, occupiedPcRcs])

  const selectedOccupiedPcStartTime = useMemo(() => {
    if (selectedPcState !== 'occupied' || selectedPcId === null) { return null }
    const startTime = occupiedPcs[selectedPcId]?.start_time
    const d = new Date(startTime)
    return d
  }, [selectedPcState, selectedPcId, occupiedPcs])

  const minutesSinceSelectedOccupiedPcStartTime = useMemo(() => {
    if (selectedOccupiedPcStartTime === null) { return null }
    return minutesSinceNow(selectedOccupiedPcStartTime.getTime())
  }, [selectedOccupiedPcStartTime])

  const headerLabel = useMemo(() => { 
    if (selectedPcState === null) { return <><span>Select a cell,</span><span>or choose an action</span></> }
    return `${selectedPcId} - ${displayPcState(selectedPcState)}`
  }, [selectedPcState, selectedPcId])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-16">
      <h1 className="prose prose-2xl font-bold">TEC Admin Dashboard</h1>
      <div className="grow w-full flex flex-col items-center justify-center gap-2">
        <div className="grow w-full flex items-center justify-center">
            {dims === null ? (
              <div className="self-stretch grow w-full flex items-center justify-center overflow-hidden border rounded-xl border-solid border-tec-blue">
                <span className="font-mono text-xl">Internal Error</span>
              </div>
            ): (
              <div className="self-stretch grow w-full flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-8">
                  <LegendKey fill="fill-green-500" label="available" />
                  <LegendKey fill="fill-red-500" label="occupied" />
                  <LegendKey fill="fill-yellow-500" label="occupied and over time" />
                  <LegendKey fill="fill-slate-700" label="out of service" />
                </div>
                <div className="self-stretch grow w-full flex items-center justify-center overflow-hidden border rounded-xl border-solid border-tec-blue">
                  <ul role="grid" className="grow self-stretch flex flex-col items-stretch">
                    <li className="flex items-center justify-center p-2 bg-tec-blue text-white">Garage</li>
                    {range(dims.rows).map(r => (
                      <li key={r} className="grow">
                        <ul role="row" className="h-full grow flex items-stretch">
                          {range(dims.cols).map(c => {
                            const hasPc = pcRcs?.[r]?.hasOwnProperty?.(c)
                            const isInactive = inactivePcRcs?.[r]?.hasOwnProperty?.(c)
                            const isOccupied = occupiedPcRcs?.[r]?.hasOwnProperty?.(c)
                            const pcState = resolvePcState(hasPc, isInactive, isOccupied)
                            const isClickable = pcState !== null
                            const isSelected = isSelectedRc(selectedRc, r, c)
                            return (
                              <li key={c} role="gridcell"
                                className={cl(
                                  'grow', 'border-solid',
                                  !hasPc && 'border border-slate',
                                  isSelected && 'ring-4 ring-inset ring-black',
                                  resolveCellColor(isInactive, isOccupied, hasPc, occupiedPcs?.[pcRcs?.[r]?.[c]]?.start_time),
                                  isClickable && "hover:cursor-pointer",
                                )}
                                onClick={!isClickable ? undefined : () => {
                                  if (isSelected) { setSelectedRc(null); return }
                                  setSelectedRc({ r, c })
                                }}
                              />
                            )
                          })}
                        </ul>
                      </li>
                    ))}
                    <li className="flex items-center justify-center p-2 bg-tec-blue text-white">Cafe</li>
                  </ul>
                </div>
              </div>
            )}
          {dims !== null && (
            <div className="min-w-[18rem] self-stretch p-8 flex flex-col items-center gap-8">
              <h2 className="whitespace-nowrap flex flex-col items-center">{headerLabel}</h2>
              <ul className="flex flex-col items-center justify-center gap-4">
                {selectedRc === null ? (<>
                  {/* TODO - add option to rearrange layout */}
                  <li><button className="rounded bg-red-500 text-white p-2" onClick={end_all_sessions}>Force free all occupied PCs</button></li>
                  <li><button className="rounded bg-slate-700 text-white p-2" onClick={mark_all_pcs_inactive}>Mark all PCs out of service</button></li>
                  <li><button className="rounded bg-green-500 text-white p-2" onClick={mark_all_pcs_no_longer_inactive}>Mark all PCs back in service</button></li>
                </>) : selectedPcState === 'available' ? (<>
                  <li><button className="rounded bg-slate-700 text-white p-2" onClick={() => mark_pc_inactive(selectedPcId)}>Mark out of service</button></li>
                </>) : selectedPcState === 'inactive' ? (<>
                  <li><button className="rounded bg-green-500 text-white p-2" onClick={() => mark_pc_no_longer_inactive(selectedPcId)}>Mark back in service</button></li>
                </>) : selectedPcState === 'occupied' ? (<>
                  <li className="flex flex-col items-center justify-center">
                    <span>id: {occupiedPcs[selectedPcId!].user}</span>
                    {selectedOccupiedPcStartTime && (
                      <span>
                        start time: {selectedOccupiedPcStartTime.toLocaleDateString()}
                        <span className={cl(isOverTime(minutesSinceSelectedOccupiedPcStartTime) && 'text-red-500 font-bold')}> ({minutesSinceSelectedOccupiedPcStartTime} minutes ago)</span></span>
                    )}
                  </li>
                  <li><button className="rounded bg-red-500 text-white p-2" onClick={() => end_session(selectedPcId)}>Free this PC</button></li>
                </>) : null}
              </ul>
            </div>
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

function resolveCellColor(inactive: boolean, occupied: boolean, hasPc: boolean, start_time?: number) {
  if (inactive) { return 'bg-slate-700' }
  if (occupied) {
    if (start_time != null && isOverTime(minutesSinceNow(start_time))) {
      return 'bg-yellow-500'
    }
    return 'bg-red-500'
  }
  if (hasPc) { return 'bg-green-500' }
  return ''
}

type PcState = 'inactive' | 'occupied' | 'available'
function resolvePcState(hasPc: boolean, inactive: boolean, occupied: boolean): PcState | null {
  return !hasPc ? null
    : inactive ? 'inactive'
      : occupied ? 'occupied'
        : 'available'
}

function displayPcState(pcState: PcState) {
  return {
    inactive: 'Out of service',
    occupied: 'Occupied',
    available: 'Open',
  }[pcState]
}

function isSelectedRc(selected: Coordinate | null, r: number, c: number) {
  if (selected === null) { return false }
  return selected.r === r && selected.c === c
}

function minutesSinceNow(n: number) {
  return Math.round((Date.now() - n) / 60 / 1000)
}

function isOverTime(minutes: number | null) {
  return minutes !== null && minutes >= 120
}