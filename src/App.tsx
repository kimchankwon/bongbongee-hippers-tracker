import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../convex/_generated/api'
import type { Id } from '../convex/_generated/dataModel'

type Status = 'available' | 'interested' | 'sold'

const STATUS_LABEL: Record<Status, string> = {
  available: 'Available',
  interested: 'Interested',
  sold: 'Sold',
}

export default function App() {
  const hippers = useQuery(api.hippers.list) ?? []
  const stats = useQuery(api.hippers.stats) ?? { total: 0, available: 0, interested: 0, sold: 0 }
  const addHipper = useMutation(api.hippers.add)
  const updateStatus = useMutation(api.hippers.updateStatus)

  const [buyerName, setBuyerName] = useState('')
  const [selectedId, setSelectedId] = useState<Id<'hippers'> | null>(null)

  const handleClick = async (id: Id<'hippers'>, current: Status) => {
    if (current === 'available') {
      await updateStatus({ id, status: 'interested' })
    } else if (current === 'interested') {
      const name = prompt('Buyer name?')
      if (name) await updateStatus({ id, status: 'sold', buyerName: name })
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!buyerName.trim()) return
    await addHipper({ buyerName: buyerName.trim() })
    setBuyerName('')
  }

  return (
    <div>
      <div className="header">
        <h1>BONGBONGEE HIPPERS</h1>
        <p>Group Order Tracker · Rose Quartz & Serenity</p>
      </div>

      <div className="stats">
        <div className="stat-card rose">
          <div className="num">{stats.total}</div>
          <div className="label">Total</div>
        </div>
        <div className="stat-card serenity">
          <div className="num">{stats.available}</div>
          <div className="label">Available</div>
        </div>
        <div className="stat-card">
          <div className="num">{stats.interested}</div>
          <div className="label">Interested</div>
        </div>
        <div className="stat-card">
          <div className="num">{stats.sold}</div>
          <div className="label">Sold</div>
        </div>
      </div>

      <div className="grid">
        {hippers.map((h) => (
          <div
            key={h._id}
            className={`hipper-card ${h.status}`}
            onClick={() => handleClick(h._id, h.status)}
          >
            <div className="id">#{h.number}</div>
            <span className={`status ${h.status}`}>{STATUS_LABEL[h.status]}</span>
            {h.buyerName && <div className="buyer">{h.buyerName}</div>}
          </div>
        ))}
      </div>

      <div className="form">
        <h2>Add a HIPPER</h2>
        <form onSubmit={handleAdd}>
          <label>Label / note (optional)</label>
          <input
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            placeholder="e.g. Gyaru Ver. #3"
          />
          <button type="submit">Add HIPPER</button>
        </form>
      </div>

      <p className="note">
        Based on SEVENTEEN BONGBONGEE Japan Original Merch · HIPPERS BONGBONGEE (Random 8 out of 12)
      </p>
    </div>
  )
}
