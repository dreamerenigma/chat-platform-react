import { 
	createAsyncThunk, 
	createSelector, 
	createSlice, 
	PayloadAction 
} from "@reduxjs/toolkit";
import { Group, GroupMessage, GroupMessageEventPayload } from "../utils/types";
import { fetchGroupMessages, fetchGroups as fetchGroupsAPI } from "../utils/api";
import { RootState } from ".";

export interface GroupMessagesState {
	messages: GroupMessage[];
};

const initialState: GroupMessagesState  = {
	messages: [],
};

export const fetchGroupsMessagesThunk = createAsyncThunk('groupMessages/fetch', 
	(id: number) => fetchGroupMessagesAPI(id)
);

export const groupMessageSlice = createSlice({
	name: 'groupMessages',
	initialState,
	reducers: {
		addGroupMessage: (
			state,
			action: PayloadAction<GroupMessageEventPayload>
		) => {
			const { group, message } = action.payload;
			const groupMessage = state.messages.find((gm) => gm.id === group.id);
			groupMessage?.messages.unshift(message);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchGroupMessagesAPI.fulfilled, (state, action) => {
			const { id } = action.payload.data;
			console.log('fetchGroupMEssagesThunk.fulfilled');
			console.log(action.payload.data);
			const index = state.messages.findIndex((gm) => gm.id === id);
			const exists = state.messages.find((gm) => gm.id === id);
			exists
				? (state.messages[index] = action.payload.data)
				: state.messages.push(action.payload);
		});
	},
});

const selectGroupMessage = (state: RootState) => state.groups.groups;
const selectGroupMessageId = (state: RootState, id: number) => id;

export const selectGroupById = createSelector(
	[selectGroupMessage, selectGroupMessageId],
	(groups, groupId) => groups.find((c) => c.id === groupId)
);

export const {} = groupMessageSlice.actions;

export default groupMessageSlice.reducer;