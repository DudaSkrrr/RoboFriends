import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    searchField: '',
    loading: false,
    robots: []
};

export const fetchRobots = createAsyncThunk(
    'searchField/fetchRobots',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        return data;
    }
);

const searchFieldSlice = createSlice({
    name: 'searchField',
    initialState,
    reducers: {
        setSearchField: (state, action) => {
            state.searchField = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRobots.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRobots.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchRobots.fulfilled, (state, action) => {
                state.loading = false;
                state.robots = action.payload;
            });
    }
});

export const { setSearchField } = searchFieldSlice.actions;

export default searchFieldSlice.reducer;
