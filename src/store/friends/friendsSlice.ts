import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Friend, FriendRequest } from "../../utils/types";
import { 
	acceptFriendRequestThunk, 
	cancelFriendRequestThunk, 
	createFriendRequestThunk, 
	fetchFriendRequestThunk, 
	fetchFriendsThunk, 
} from "./friendsThunk";

export interface FriendsState {
	friends: Friend[];
	friendRequests: FriendRequest[];
};

const initialState: FriendsState = {
	friends: [],
	friendRequests: [],
};

export const friendsSlice = createSlice({
	name: 'friends',
	initialState,
	reducers: {
		addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
			state.friendRequests.push(action.payload);
		},
		removeFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
			const { id } = action.payload;
			state.friendRequests = state.friendRequests.filter(
				(friendRequest) => friendRequest.id !== id
			);
		},
	},
	extraReducers: (builder) => 
		builder
			.addCase(fetchFriendsThunk.fulfilled, (state, action) => {
				console.log('fetchFriendsThunk.fulfilled');
				console.log(action.payload.data);
				state.friends = action.payload.data;
			})
			.addCase(fetchFriendRequestThunk.fulfilled, (state, action) => {
				console.log('fetchFriendRequestsThunk.fullfiled');
			})
			.addCase(createFriendRequestThunk.fulfilled, (state, action) => {
				console.log('fetchFriendRequestsThunk.fullfiled');
				state.friendRequests.push(action.payload.data);
			})
			.addCase(cancelFriendRequestThunk.fulfilled, (state, action) => {
				const { id } = action.payload.data;
				state.friendRequests = state.friendRequests.filter(
					(friendRequest) => friendRequest.id !== id
				);
			}).addCase(acceptFriendRequestThunk.fulfilled, (state, action) => {
				console.log('acceptFriendRequestThunk.fulfilled');
				const {
					friend,
					friendRequest: { id },
				} = action.payload.data;
				state.friendRequests = state.friendRequests.filter(
					(friendRequest) => friendRequest.id !== id
				);
			}),
});

export const { addFriendRequest, removeFriendRequest } = friendsSlice.actions; 
export default friendsSlice.reducer;
