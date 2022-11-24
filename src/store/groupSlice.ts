import {
	createAsyncThunk, 
	createSelector,
	createSlice, 
	PayloadAction
} from "@reduxjs/toolkit";
import { CreateGroupParams, Group, RemoveGroupRecipientParams } from "../utils/types";
import { 
	fetchGroups as fetchGroupsAPI, 
	createGroup as createGroupAPI,
	removeGroupRecipient as removeGroupRecipientAPI,
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

export const createGroupThunk = createAsyncThunk(
	'groups/create', 
	(params: CreateGroupParams) => createGroupAPI(params)
);

export const removeGroupRecipientThunk = createAsyncThunk(
	'groups/recipents/delete',
	(params: RemoveGroupRecipientParams) => removeGroupRecipientAPI(params)
);

export const groupsSlice = createSlice({
	name: 'groups',
	initialState,
	reducers: {
		addGroup: (state, action: PayloadAction<Group>) => {
			console.log(`addGroup reducer: Adding ${action.payload.id} to state`);
			state.groups.unshift(action.payload);
		},
		updateGroup: (state, action: PayloadAction<Group>) => {
			const updatedGroup = action.payload; 
			const existingGroup = state.groups.find((g) => g.id === updatedGroup.id);
			console.log('Original Group.users');
			console.log(existingGroup?.users);
			console.log('Updated Group.users');
			console.log(updatedGroup.users);
			const index = state.groups.findIndex((g) => g.id === updatedGroup.id);
			if (existingGroup) {
				state.groups[index] = updatedGroup;
				console.log('Updating Group....');
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
				console.log(action.payload.data);
				state.groups = action.payload.data;
				console.log(state.groups);
			})
			.addCase(removeGroupRecipientThunk.fulfilled, (state, action) => {
				const { data: updatedGroup } = action.payload;
				console.log('removeGroupRecipientThunk.filfilled');
				const existingGroup = state.groups.find(
					(g) => g.id === updatedGroup.id
				);
				const index = state.groups.findIndex((g) => g.id === updatedGroup.id);
				if (existingGroup) {
					state.groups[index] = updatedGroup;
					console.log('Updating Group....');
				}
			});
	},
});

const selectGroups = (state: RootState) => state.groups.groups;
const selectGroupId = (state: RootState, id: number) => id;

export const selectGroupById = createSelector(
	[selectGroups, selectGroupId],
	(groups, groupId) => groups.find((c) => c.id === groupId)
);

export const { 
	addGroup, 
	updateGroup,
} = groupsSlice.actions;

export default groupsSlice.reducer;
