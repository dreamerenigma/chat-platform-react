import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ConversationType } from '../utils/types';
import { getConversationMessages, getConversations } from '../utils/api';

export interface ConversationState {
	conversations: ConversationType[];
	loading: boolean;
}

const initialState: ConversationState = {
	conversations: [],
	loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
	'conversations/fetch',  
	async () => {
		return getConversations();
	}
);

export const fetchMessagesThunk = createAsyncThunk(
	'messages/fetch',
	async (id: number) => {
		return getConversationMessages(id);
	}
)

export const conversationsSlice = createSlice({
	name: 'conversations',
	initialState,
	reducers: {
		addConversation: (state, action: PayloadAction<ConversationType>) => {
			console.log('addConversation');
			// state.conversations.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
				state.conversations = action.payload.data;
				state.loading = false;
			})
			.addCase(fetchConversationsThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(fetchMessagesThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchMessagesThunk.fulfilled, (state, action) => {
				const { id, messages } = action.payload.data;
				const index = state.conversations.findIndex((c) => c.id === id);
				const conversation = state.conversations.find((c) => c.id === id);
				if (conversation) {
					conversation.messages = messages;
				}
				state.loading = false;
			})
			.addCase(fetchMessagesThunk.rejected, (state) => {
				state.loading = false;
		});
	},
});

// Action creators are generated for each case reducer function
export const { addConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;