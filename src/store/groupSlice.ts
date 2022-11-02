import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Group } from "../utils/types";
import { fetchGroups as fetchGroupsAPI } from "../utils/api";

export interface GroupState {
	groups: Group[];
};

const initialState: GroupState = {
	groups: [],
};

export const fetchGroupsThunk = createAsyncThunk('groups/fetch', () => {
	return fetchGroupsAPI();
});

export const groupsSlice = createSlice({
	name: 'groups',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
			state.groups = action.payload.data;
			console.log(state.groups);
		});
	},
});

export const {} = groupsSlice.actions;

export default groupsSlice.reducer;