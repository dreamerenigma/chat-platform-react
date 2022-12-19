import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
	fetchFriendRequests as fetchFriendRequestsAPI,
	fetchFriends as fetchFriendsAPI 
} from "../../utils/api";

export const fetchFriendsThunk = createAsyncThunk('friends/fetch', () => 
	fetchFriendsAPI()
);

export const fetchFriendRequestThunk = createAsyncThunk(
	'friend/request/fetch', 
	() => fetchFriendRequestsAPI()
);