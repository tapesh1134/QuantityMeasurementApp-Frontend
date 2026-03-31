import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Global config (important for cookies / JWT)
axios.defaults.withCredentials = true;

const API_BASE = '/api/quantities';

/* =========================================================
   PERFORM CALCULATION
   ========================================================= */
export const performCalculation = createAsyncThunk(
  'quantity/calculate',
  async (_, { getState, rejectWithValue }) => {
    const { operation, q1, q2, targetUnit } = getState().quantity;

    try {
      let response;
      const payload = { q1, q2 };

      switch (operation) {

        case 'EQUALITY':
          response = await axios.post(`${API_BASE}/equality`, payload);
          break;

        case 'CONVERSION':
          response = await axios.post(
            `${API_BASE}/convert?targetUnit=${targetUnit}`,
            q1
          );
          break;

        case 'ADDITION':
          response = await axios.post(
            `${API_BASE}/add?targetUnit=${targetUnit}`,
            payload
          );
          break;

        case 'SUBTRACTION':
          response = await axios.post(
            `${API_BASE}/subtract?targetUnit=${targetUnit}`,
            payload
          );
          break;

        case 'DIVISION':
          response = await axios.post(`${API_BASE}/divide`, payload);
          break;

        default:
          return rejectWithValue("Invalid Operation");
      }

      return {
        data: response.data.data,
        message: response.data.message
      };

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Server Error"
      );
    }
  }
);

/* =========================================================
   FETCH HISTORY
   ========================================================= */
export const fetchHistory = createAsyncThunk(
  'quantity/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/history`);
      return response.data.data.reverse();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch history"
      );
    }
  }
);

/* =========================================================
   SLICE
   ========================================================= */
const quantitySlice = createSlice({
  name: 'quantity',
  initialState: {
    operation: 'EQUALITY',
    category: 'LENGTH',

    q1: { value: 0, unit: 'FEET' },
    q2: { value: 0, unit: 'INCH' },

    targetUnit: 'FEET',

    result: null,
    message: '',
    error: null,

    loading: false,
    history: [],
    historyLoading: false,

    units: {
      LENGTH: ['FEET', 'INCH', 'YARD', 'CENTIMETER'],
      VOLUME: ['LITRE', 'GALLON', 'MILLILITRE'],
      WEIGHT: ['KILOGRAM', 'GRAM', 'TONNE'],
      TEMPERATURE: ['CELSIUS', 'FAHRENHEIT']
    }
  },

  reducers: {
    setOperation: (state, action) => {
      state.operation = action.payload;
      state.result = null;
      state.error = null;
    },

    setCategory: (state, action) => {
      state.category = action.payload;

      // 1. Reset operation if switching to TEMPERATURE while on an invalid op
      const forbiddenTempOps = ['ADDITION', 'SUBTRACTION', 'DIVISION'];
      if (action.payload === 'TEMPERATURE' && forbiddenTempOps.includes(state.operation)) {
        state.operation = 'EQUALITY';
      }

      // 2. Update units as before
      const defaultUnit = state.units[action.payload][0];
      state.q1.unit = defaultUnit;
      state.q2.unit = state.units[action.payload][1] || defaultUnit;
      state.targetUnit = defaultUnit;
      state.result = null; // Clear previous result when category changes
    },

    updateQ1: (state, action) => {
      state.q1 = { ...state.q1, ...action.payload };
    },

    updateQ2: (state, action) => {
      state.q2 = { ...state.q2, ...action.payload };
    },

    setTargetUnit: (state, action) => {
      state.targetUnit = action.payload;
    },

    // ✅ Fixed swap logic
    swapUnits: (state) => {
      const temp = state.q1.unit;
      state.q1.unit = state.q2.unit;
      state.q2.unit = temp;
    },

    clearAll: (state) => {
      state.q1.value = 0;
      state.q2.value = 0;
      state.result = null;
      state.message = '';
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      /* ===== HISTORY ===== */
      .addCase(fetchHistory.pending, (state) => {
        state.historyLoading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.error = action.payload;
      })

      /* ===== CALCULATION ===== */
      .addCase(performCalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performCalculation.fulfilled, (state, action) => {
        state.loading = false;

        state.result = action.payload.data;
        state.message = action.payload.message;

        // ✅ Keep history consistent with backend structure
        state.history.unshift(action.payload.data);
      })
      .addCase(performCalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

/* =========================================================
   EXPORTS
   ========================================================= */
export const {
  setOperation,
  setCategory,
  updateQ1,
  updateQ2,
  setTargetUnit,
  swapUnits,
  clearAll
} = quantitySlice.actions;

export default quantitySlice.reducer;