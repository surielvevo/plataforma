import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { Investigation } from '../../types';

interface InvestigationState {
  items: Investigation[];
  loading: boolean;
  error: string | null;
}

interface InvestigationResponse {
  data: {
    investigaciones: Investigation[];
  };
}

interface ThunkAPI {
  rejectWithValue: (value: string) => string;
}

const initialState: InvestigationState = {
  items: [],
  loading: false,
  error: null
};

export const fetchInvestigations = createAsyncThunk<
  InvestigationResponse,
  void,
  { rejectValue: string }
>('investigations/fetchAll', async (_: void, { rejectWithValue }: ThunkAPI) => {
  try {
    const response: AxiosResponse<InvestigationResponse> = await axios.get('/api/investigaciones');
    return response.data;
  } catch (error) {
    return rejectWithValue('Error al cargar las investigaciones');
  }
});

const investigationSlice = createSlice({
  name: 'investigations',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<InvestigationState>) => {
    builder
      .addCase(fetchInvestigations.pending, (state: InvestigationState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestigations.fulfilled, (state: InvestigationState, action: PayloadAction<InvestigationResponse>) => {
        state.loading = false;
        state.items = action.payload.data.investigaciones;
      })
      .addCase(fetchInvestigations.rejected, (state: InvestigationState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      });
  }
});

export default investigationSlice.reducer; 