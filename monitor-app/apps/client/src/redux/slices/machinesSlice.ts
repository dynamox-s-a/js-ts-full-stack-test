import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Machine } from 'types/machine'

export interface MachinesState {
  machines: Machine[]
  machine: Machine
  status: string
  error: string | undefined
}

type FetchErrorResponseProps = {
  message: string
}

export const getMachines = createAsyncThunk('machines/getMachines', async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/machine')
  if (!response.ok) {
    const apiError: FetchErrorResponseProps = await response.json()
    const { message } = apiError
    throw new Error(`${message}`)
  }
  const machines = response.json()
  return machines
})

export const getMachineById = createAsyncThunk('machines/getMachineById', async (id: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/machine?id=' + id)
  if (!response.ok) {
    const apiError: FetchErrorResponseProps = await response.json()
    const { message } = apiError
    throw new Error(`${message}`)
  }
  const machine = response.json()
  return machine
})

export const createMachine = createAsyncThunk(
  'machines/createMachine',
  async ({ name, type }: Machine) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, type })
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/machine', options)
    if (!response.ok) {
      const apiError: FetchErrorResponseProps = await response.json()
      const { message } = apiError
      throw new Error(`${message}`)
    }
    const machine = response.json()
    return machine
  }
)

export const updateMachine = createAsyncThunk(
  'machines/updateMachine',
  async ({ id, name, type }: Machine) => {
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, name, type })
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/machine', options)
    if (!response.ok) {
      const apiError: FetchErrorResponseProps = await response.json()
      const { message } = apiError
      throw new Error(`${message}`)
    }
    const machine = response.json()
    return machine
  }
)

export const deleteMachine = createAsyncThunk('machines/deleteMachine', async (id: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/machine?id=' + id, {
    method: 'DELETE'
  })
  if (!response.ok) {
    const apiError: FetchErrorResponseProps = await response.json()
    const { message } = apiError
    throw new Error(`${message}`)
  }
  return response.json()
})

const initialState: MachinesState = {
  machines: [],
  machine: { id: '', name: '', type: '' },
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: undefined
}

export const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    resetError(state, action) {
      state.error = undefined
      state.status = 'succeeded'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMachines.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getMachines.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.machines = action.payload
      })
      .addCase(getMachines.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getMachineById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getMachineById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.machine = action.payload
      })
      .addCase(getMachineById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createMachine.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createMachine.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.machines.push(action.payload)
      })
      .addCase(createMachine.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateMachine.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateMachine.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.machines = state.machines.map((machine) =>
          machine.id === action.payload.id ? (machine = action.payload) : machine
        )
        state.machine = initialState.machine
      })
      .addCase(updateMachine.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteMachine.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteMachine.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.machines = state.machines.filter((machine) => machine.id !== action.meta.arg)
        state.machine = initialState.machine
      })
      .addCase(deleteMachine.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { resetError } = machinesSlice.actions

export default machinesSlice.reducer