import React from 'react'
export default function PortfolioTable({items, onDelete}){
  return (
    <table className="portfolio-table">
      <thead><tr><th>Symbol</th><th>Qty</th><th>Buy Price</th><th>Actions</th></tr></thead>
      <tbody>
        {items.map(it=>(
          <tr key={it.id}>
            <td>{it.symbol}</td>
            <td>{it.quantity}</td>
            <td>{it.buy_price}</td>
            <td><button onClick={()=>onDelete(it.id)}>Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
