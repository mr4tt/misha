'use client';

import { range } from '@/utils/range';
import { useEffect, useState } from 'react'
import { listen_to_pc_layout_pcs, listen_to_pc_layout_dimensions } from 'server'
import { type Dimensions, Coordinate } from 'server/types'

export default function Home() {
  const [dims, setDims] = useState<Dimensions | null>(null)
  const [pclayouts, setPclayouts] = useState<Coordinate[]>([])

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
      if (dims === null) { return }
      // here we don't need to save the actual specifics of which pc is occupied or by who.
      // so we just throw all the valid coordinates we see into an array
      const coords = Object.values(pcs)
        .filter(coord =>
          !!coord
          && Number.isInteger(coord.r) && 0 <= coord.r && coord.r < dims.rows
          && Number.isInteger(coord.c) && 0 <= coord.c && coord.c < dims.cols
        )
      setPclayouts(coords)
    })
    return unsub
  }, [dims])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-16">
      <h1 className="prose prose-2xl font-bold">TEC PC Availability</h1>
      <div className="grow w-full flex items-center justify-center overflow-hidden border rounded-xl border-solid border-black">
        {dims === null ? <span className="font-mono text-xl">Internal Error</span> : (
          <>
            {/* TODO WIP: add grid */}
            {range(dims.rows).map(r => (
              <ul>
                {range(dims.cols).map(c => (
                  <li>
                  </li>
                ))}
              </ul>
            ))}
          </>
        )}
      </div>
    </main>
  )
}
