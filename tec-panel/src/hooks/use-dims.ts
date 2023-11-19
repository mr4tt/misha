import { useState, useEffect } from "react"
import { listen_to_pc_layout_dimensions } from "server"
import { Dimensions } from "server/types"

export function useDims() {
  const [dims, setDims] = useState<Dimensions | null>(null)

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

  return dims
}