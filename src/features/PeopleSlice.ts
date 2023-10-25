import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../types/Person';
import { getPeople } from '../services/peopleService';

export const peopleAsync = createAsyncThunk('people/get', (params: {limit: number; offset: number}) => {
  return getPeople(params.limit, params.offset);
});

type PeopleState = {
  people: Person[];
  selectedPerson: Person | null;
  loading: boolean;
  error: string;
  limit: number,
  offset: number,
  currentPage: number,
};

const initialState: PeopleState = {
  people: [],
  selectedPerson: null,
  loading: false,
  error: '',
  limit: 10,
  offset: 0,
  currentPage: 1,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Person[]>) => {
      state.people = action.payload;
    },
    add: (state, action: PayloadAction<Person>) => {
      state.people.push(action.payload);
    },
    remove: (state, action: PayloadAction<Person>) => {
      state.people = state.people.filter(user => user !== action.payload);
    },
    clear: (state) => {
      state.people = [];
    },
    selectedPerson: (state, action: PayloadAction<Person | null>) => {
      state.selectedPerson = action.payload;
    },
    updatePerson:(state, action: PayloadAction<Person>) => {
      state.people = state.people.map(person => {
        if (person.id === action.payload.id) {
          return action.payload
        }

        return person;
      })
    },
    updatePagination: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    nextPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    previousPage: (state) => {
      state.currentPage = state.currentPage - 1;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(peopleAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(peopleAsync.fulfilled, (state, action) => {
      state.people = action.payload;
      state.loading = false;
    });

    builder.addCase(peopleAsync.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default peopleSlice.reducer;
export const { actions } = peopleSlice;