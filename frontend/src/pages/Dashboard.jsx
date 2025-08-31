import React, { useEffect, useState } from 'react'
import StockChart from '../components/StockChart'
import socket from '../lib/socket'
import API from '../lib/api'
import PortfolioTable from '../components/PortfolioTable'
import { useDispatch, useSelector } from 'react-redux'
import { portfolioActions } from '../store'

export default function Dashboard(){
  const [stream, setStream] = useState([])
  const [symbol, setSymbol] = useState("AAPL")
  const dispatch = useDispatch()
  const items = useSelector(s=>s.portfolio.items)

  useEffect(()=>{
    socket.on("connect", ()=> console.log("socket connected"))
    socket.on("price_update", (p)=>{
      setStream(prev => {
        const next = [...prev, p].slice(-200)
        return next
      })
    })
    return ()=> {
      socket.off("price_update")
      socket.off("connect")
    }
  },[])

  useEffect(()=> {
    // fetch portfolio if logged in (token stored in localStorage)
    const token = localStorage.getItem("token")
    if(token){
      API.get("/portfolio", { headers: { Authorization: "Bearer "+token } })
        .then(r=> dispatch(portfolioActions.setPortfolio(r.data)) )
        .catch(e=> console.log(e))
    }
  },[])

  const add = async () => {
    const token = localStorage.getItem("token")
    const symbol = prompt("Symbol (e.g. AAPL)")
    const qty = prompt("Quantity")
    const price = prompt("Buy price")
    if(!token) return alert("login first")
    const res = await API.post("/portfolio", { symbol, quantity: qty, buy_price: price }, { headers: { Authorization: "Bearer "+token } })
    if(res.data.id) {
      const list = await API.get("/portfolio", { headers: { Authorization: "Bearer "+token } })
      dispatch(portfolioActions.setPortfolio(list.data))
    }
  }

  const remove = async (id) => {
    const token = localStorage.getItem("token")
    await API.delete("/portfolio/"+id, { headers: { Authorization: "Bearer "+token } })
    dispatch(portfolioActions.removeItem(id))
  }

  return (
    <div>
      <h2>Live prices · {symbol}</h2>
      <StockChart symbol={symbol} priceStream={stream.filter(s=>s.symbol===symbol)} />
      <div className="portfolio-section">
        <h3>Your Portfolio</h3>
        <button onClick={add}>Add position</button>
        <PortfolioTable items={items} onDelete={remove} />
      </div>
    </div>
  )
}
