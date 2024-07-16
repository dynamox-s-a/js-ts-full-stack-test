import axios from 'axios'

import type { SeriesData } from '../types/charts'
import { isSeriesDataArray } from '../utils/charts'


const chartsApi = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
})

export async function getCharts(): Promise<SeriesData[]> {
    try {
        const res = await chartsApi.get('/data')
        if (!isSeriesDataArray(res.data)) throw new Error('Invalid data format.')
        return res.data
    } catch (e) {
        throw e
    }
}
