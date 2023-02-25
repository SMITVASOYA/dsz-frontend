const { createSlice } = require('@reduxjs/toolkit');

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {},
    reducers: {
        setInputFilter(state, action) {
            state.Input = action.payload;
        },
        setCInputFilter(state, action) {
            state.CInput = action.payload;
        },
        setHrInputFilter(state, action) {
            state.HrInput = action.payload;
        },
        setSortFilterType(state, action) {
            state.SortType = action.payload;
        },
        setCSortFilterType(state, action) {
            state.CSortType = action.payload;
        },
        setHrSortFilterType(state, action) {
            state.HrSortType = action.payload;
        }
    }
})

export const { setInputFilter, setCInputFilter, setSortFilterType, setCSortFilterType, setHrInputFilter, setHrSortFilterType } = filtersSlice.actions;
export default filtersSlice.reducer;