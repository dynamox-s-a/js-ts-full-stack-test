import { ReactNode, useCallback, useLayoutEffect, useState } from 'react'
import { HomeContext } from './HomeContext'
import { useNavigate } from 'react-router-dom'
import { MachineProps } from '../../Machine/types'
import axios, { AxiosError } from 'axios'
import { InputErrorControlType } from '../../User/types'
import { PointProps } from '../../Point/types'

export function HomeContextProvider ({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [machines, setMachines] = useState<MachineProps[]>([])
  const [points, setPoints] = useState<PointProps[]>([])

  const [openSnackbar, setOpenSnackbar] = useState<InputErrorControlType>({  
    visible: false,
    message: ''
  })

  const getMachinesList = useCallback(async () => {
    try {
      setLoading(true)
      const resp: { data: MachineProps[] } = await axios.get(`http://localhost:3000/machine/`)
      const foundedMachines = resp.data
      if (foundedMachines) setMachines(foundedMachines)
    } catch (error) {
      const err = error as AxiosError<{ error: { detail: string } }>
      setOpenSnackbar({
        visible: true,
        message: `Erro! ${err?.response?.data?.error?.detail}`,
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const getPointsList = useCallback(async () => {
    try {
      setLoading(true)
      const resp: { data: PointProps[] } = await axios.get(`http://localhost:3000/point/`)
      const foundedPoints = resp.data
      if (foundedPoints) setPoints(foundedPoints)
    } catch (error) {
      const err = error as AxiosError<{ error: { detail: string } }>
      setOpenSnackbar({
        visible: true,
        message: `Erro! ${err?.response?.data?.error?.detail}`,
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const onEditMachine = useCallback((machineId?: number) => {
    navigate(`/machines/edit/${machineId}`)
  }, [navigate])

  const onDeleteMachine = useCallback((machineId?: number) => {
  console.log("🚀 ~ onDelete ~ idMachine:", machineId)
  }, [])

  const onEditPoint = useCallback((pointId?: number) => {
    navigate(`/points/edit/${pointId}`)
  }, [navigate])

  const onDeletePoint = useCallback((pointId?: number) => {
  console.log("🚀 ~ onDelete ~ idMachine:", pointId)
  }, [])

  useLayoutEffect(() => {
    getMachinesList()
    getPointsList()
  }, [getMachinesList, getPointsList])

  return (
    <HomeContext.Provider
      value={{
        machines,
        points,
        loading,
        onEditMachine,
        onDeleteMachine,
        onEditPoint,
        onDeletePoint
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
