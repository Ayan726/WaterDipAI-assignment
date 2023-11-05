import { create } from 'zustand'
import axios from "../libs/axios"

const useStore = create((set) => ({
  data: null,
  err: null,
  loader: false,
  setData: async (fromDate, toDate) => {
    try {
      set({ loader: true })
      const { data } = await axios.get('/api/v1/bookings', {
        params: {
          date: fromDate + "," + toDate
        }
      })
      set({ data: data.data.bookings, loader: false })

    } catch (err) {
      console.log(err);
      set({ err: err?.response?.data?.message || err.message, loader: false })
    }
  },
  setErr: (msg) => {
    set({ err: msg })
  }
}))

export default useStore