import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { Group } from "../utils/types";
import { fetchGroups as fetchGroupsAPI } from "../utils/api";
import { RootState } from ".";

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

const selectGroups = (state: RootState) => state.groups.groups;
const selectGroupId = (state: RootState, id: number) => id;

export const selectGroupById = createSelector(
	[selectGroups, selectGroupId],
	(groups, groupId) => groups.find((c) => c.id === groupId)
);

export const {} = groupsSlice.actions;

export default groupsSlice.reducer;