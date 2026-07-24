import { useState } from 'react'
import type { Tile as TileData } from '../data/tiles'

// A single marketing tile. Renders the copy block at the top and the product
// image below. If the remote Apple CDN image fails to load, we fall back to
// the tile's gradient background so the layout never looks broken.

export default function Tile({ tile }: { tile: TileData }) {
  const [imgOk, setImgOk] = useState(true)

  return (
    <section
      className={`tile tile--${tile.size} tile--${tile.theme}`}
      // Always paint the gradient as the base layer (matching Apple's tiles);
      // the product image sits on top and covers it once loaded. This keeps
      // dark-theme copy readable even before the image loads or if it fails.
      style={{ background: tile.gradient }}
    >
      <div className="tile-copy">
        {tile.eyebrow &&
          (tile.eyebrowLogo ? (
            <h2 className="tile-eyebrow tile-eyebrow--logo">{tile.eyebrow}</h2>
          ) : (
            <p className="tile-eyebrow">{tile.eyebrow}</p>
          ))}
        <h3 className="tile-headline">{tile.headline}</h3>
        {tile.subheadline && <p className="tile-sub">{tile.subheadline}</p>}
        <div className="tile-ctas">
          {tile.ctas.map((cta, i) => (
            <a
              key={cta.label}
              className={`tile-cta ${i === 0 ? 'tile-cta--primary' : 'tile-cta--secondary'}`}
              href={cta.href}
            >
              {cta.label}
              <span className="tile-cta-chevron" aria-hidden="true">
                ›
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className={`tile-media tile-media--${tile.imagePosition ?? 'center'}`}>
        <img
          src={tile.image}
          alt={tile.imageAlt}
          loading="lazy"
          onError={() => setImgOk(false)}
          style={{ opacity: imgOk ? 1 : 0 }}
        />
      </div>
    </section>
  )
}
