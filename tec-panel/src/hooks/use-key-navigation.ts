import { Dispatch, SetStateAction, useEffect } from "react"
import { Coordinate } from "server/types"

export function useKeyNavigation(coords: Coordinate[], selected: Coordinate | null, setSelected: Dispatch<SetStateAction<Coordinate | null>>) {
  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (selected === null) { return }
      if (e.code === 'Escape') {
        setSelected(null)
        return
      }
      if (e.code === 'ArrowUp') {
        const rowsWithPcInCol = coords
          .filter(({r, c}) => c === selected.c)
          .map(({r}) => r)
          .sort()

        const i = rowsWithPcInCol.findIndex(r => r === selected.r)
        if (i === -1) { return } // this should never happen but is a sanity check
        console.log(i, selected, rowsWithPcInCol)
        setSelected({ r: rowsWithPcInCol.at(i - 1)!, c: selected.c  })
        return
      }
      if (e.code === 'ArrowDown') {
        const rowsWithPcInCol = coords
          .filter(({r, c}) => c === selected.c)
          .map(({r}) => r)
          .sort()

        const i = rowsWithPcInCol.findIndex(r => r === selected.r)
        if (i === -1) { return } // this should never happen but is a sanity check
        setSelected({ r: rowsWithPcInCol[(i + 1) % rowsWithPcInCol.length], c: selected.c  })
        return
      }
      if (e.code === 'ArrowLeft') {
        const colsWithPcInRow = coords
          .filter(({r, c}) => r === selected.r)
          .map(({c}) => c)
          .sort()

        const i = colsWithPcInRow.findIndex(c => c === selected.c)
        if (i === -1) { return } // this should never happen but is a sanity check
        setSelected({ r: selected.r, c: colsWithPcInRow.at(i - 1)! })
        return
      }
      if (e.code === 'ArrowRight') {
        const colsWithPcInRow = coords
          .filter(({r, c}) => r === selected.r)
          .map(({c}) => c)
          .sort()

        const i = colsWithPcInRow.findIndex(c => c === selected.c)
        if (i === -1) { return } // this should never happen but is a sanity check
        setSelected({ r: selected.r, c: colsWithPcInRow[(i + 1) % colsWithPcInRow.length] })
        return
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [coords, selected, setSelected])
}