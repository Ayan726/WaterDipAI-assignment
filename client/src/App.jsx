import { useEffect, useState } from "react"
import Timeseries from "./components/Timeseries"
import useStore from "./store/store"
import ColumnChart from "./components/ColumnChart"
import Sparkline from "./components/Sparkline"
import "../dist/output.css"

const App = () => {
  const [from, setFrom] = useState("2015-07-01")
  const [to, setTo] = useState("2015-07-05")
  const [fix, setFix] = useState(false)
  const data = useStore(store => store.data)
  const setData = useStore(store => store.setData)
  const err = useStore(store => store.err)
  const setErr = useStore(store => store.setErr)
  const loader = useStore(store => store.loader)

  const fixNav = () => {
    if (window.scrollY >= 10) setFix(true)
    else setFix(false)
  }

  window.addEventListener("scroll", fixNav)

  useEffect(() => {
    setData(from, to)
  }, [])

  useEffect(() => {
    if (err) {
      alert(err)
      setTimeout(() => {
        setErr(null)
      }, 2000)
    }
    // console.log(data);
  }, [err])


  return (
    <main className="app font-pubsans">

      {/* background wrapper */}
      <div className="dashboard">
        <div className="topBaseGradients">
          <div className="gradient-red" />
          <div className="gradient-orange" />
          <div className="gradient-blue" />
        </div>
      </div>

      <header className="sticky top-0 h-[4.5rem] flex justify-end items-center z-20 text-white">
        <nav className={`${fix ? 'rounded-full mr-10' : 'w-full h-full flex items-center justify-end pr-10'} backdrop-blur-sm bg-gray-400 bg-opacity-20 transition-all duration-500 px-5 py-3 `}>
          <div className="flex items-center">
            <label className="font-semibold mr-3" htmlFor="from">From:</label>
            <input value={from} onChange={(e) => setFrom(e.target.value)} className="outline-none cursor-pointer rounded-md from-[#5dc9ff] to-blue-500 bg-gradient-to-tr text-white px-2 py-1 mr-3 text-sm text-center" type="date" id="from" name="from"></input>

            <label className="font-semibold mr-3" htmlFor="to">To:</label>
            <input value={to} onChange={(e) => setTo(e.target.value)} className="outline-none cursor-pointer rounded-md from-[#5dc9ff] to-blue-500 bg-gradient-to-tr text-white px-2 py-1 text-sm text-center" type="date" id="to" name="to"></input>

            <button onClick={() => {
              setData(from, to)
            }} className="btn">
              {
                loader ? <div className="border-2 border-white animate-spin h-5 w-5 rounded-full border-r-0 ml-6" />
                  : <span>Generate</span>
              }
            </button>
          </div>
        </nav>
      </header>
      <section className="w-full h-full grid grid-cols-2 gap-10 p-10 pt-24 z-10">

        {
          data ?
            <>
              <div className="backdrop-blur-md bg-black bg-opacity-60 p-5 rounded-md">
                <Timeseries />
              </div>
              <div className="backdrop-blur-md bg-black bg-opacity-60 p-5 rounded-md">
                <ColumnChart />
              </div>
              <div className="backdrop-blur-md bg-black bg-opacity-60 p-5 rounded-md">
                <Sparkline visitor="adults" />
              </div>
              <div className="backdrop-blur-md bg-black bg-opacity-60 p-5 rounded-md">
                <Sparkline visitor="children" />
              </div>
            </>
            : null
        }

      </section>
    </main>
  )
}

export default App
