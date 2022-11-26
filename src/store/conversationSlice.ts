import { 
	createAsyncThunk, 
	createSelector, 
	createSlice,
} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Conversation, CreateConversationParams, Points } from '../utils/types';
import { getConversations, postNewConversation } from '../utils/api';
import { RootState } from '.';

export interface ConversationState {
	conversations: Conversation[];
	loading: boolean;
	showConversationContextMenu: boolean;
	selectedConversationContextMenu?: Conversation;
	points: Points;
}

const initialState: ConversationState = {
	conversations: [],
	loading: false,
	showConversationContextMenu: false,
	points: { x: 0, y: 0 },
};

export const fetchConversationsThunk = createAsyncThunk(
	'conversations/fetch',  
	async () => {
		return getConversations();
	}
);

export const createConversationThunk = createAsyncThunk(
	'conversations/create',
	async (data: CreateConversationParams) => {
		return postNewConversation(data);
	}
);

export const conversationsSlice = createSlice({
	name: 'conversations',
	initialState,
	reducers: {
		addConversation: (state, action: PayloadAction<Conversation>) => {
			console.log('addConversation');
			state.conversations.unshift(action.payload);
		},
		updateConversation: (state, action: PayloadAction<Conversation>) => {
			console.log('Inside updateConversations');
			const conversation = action.payload;
			const index = state.conversations.findIndex(
				(c) => c.id === conversation.id
			);
			state.conversations.splice(index, 1);
			state.conversations.unshift(conversation);
		},
		toggleContextMenu: (state, action: PayloadAction<boolean>) => {
			state.showConversationContextMenu = action.payload;
		},
		setSelectedConversation: (state, action: PayloadAction<Conversation>) => {
			state.selectedConversationContextMenu = action.payload;
		},
		setContextMenuLocation: (state, action: PayloadAction<Points>) => {
			state.points = action.payload;
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
		.addCase(createConversationThunk.fulfilled, (state, action) => {
			console.log('Fulfilled');
			console.log(action.payload.data);
			state.conversations.unshift(action.payload.data);
		});
	},
});

const selectConversations = (state: RootState) => 
	state.conversation.conversations;
const selectConversationId = (state: RootState, id: number) => id;

export const selectConversationById = createSelector(
	[selectConversations, selectConversationId],
	(conversation, conversationId) => 
		conversation.find((c) => c.id === conversationId)
);

// Action creators are generated for each case reducer function
export const { 
	addConversation, 
	updateConversation,
	toggleContextMenu,
	setContextMenuLocation,
	setSelectedConversation,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
