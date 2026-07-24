import Tile from './Tile'
import { tiles } from '../data/tiles'

// Lays out tiles the way Apple does: full-width tiles stack, and consecutive
// half-width tiles pair up into a 2-column row (collapsing to 1 column on
// small screens via CSS).

export default function TileGrid() {
  const rows: (typeof tiles)[] = []
  let i = 0
  while (i < tiles.length) {
    const tile = tiles[i]
    if (tile.size === 'half' && tiles[i + 1]?.size === 'half') {
      rows.push([tile, tiles[i + 1]])
      i += 2
    } else {
      rows.push([tile])
      i += 1
    }
  }

  return (
    <main className="grid">
      {rows.map((row, idx) =>
        row.length === 2 ? (
          <div className="grid-row" key={idx}>
            <Tile tile={row[0]} />
            <Tile tile={row[1]} />
          </div>
        ) : (
          <Tile tile={row[0]} key={idx} />
        ),
      )}
    </main>
  )
}
