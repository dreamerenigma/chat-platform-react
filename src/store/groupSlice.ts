import { 
	createAsyncThunk, 
	createSelector,
	createSlice, 
	PayloadAction
} from "@reduxjs/toolkit";
import { CreateGroupParams, Group, User } from "../utils/types";
import { 
	fetchGroups as fetchGroupsAPI, 
	createGroup as createGroupAPI 
} from "../utils/api";
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

export const createGroupThunk = createAsyncThunk('groups/create', 
	(params: CreateGroupParams) => createGroupAPI(params)
);

export const groupsSlice = createSlice({
	name: 'groups',
	initialState,
	reducers: {
		addGroup: (state, action: PayloadAction<Group>) => {
			console.log(`addGroup reducer: Adding ${action.payload.id} to state`);
			state.groups.unshift(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
			console.log(action.payload.data);
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

export const { addGroup } = groupsSlice.actions;

export default groupsSlice.reducer;