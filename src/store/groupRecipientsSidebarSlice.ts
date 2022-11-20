import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../utils/types';

export interface GroupRecipientSidebarState {
	showSidebar: boolean;
	showUserContextMenu: boolean;
	selectedUser?: User;
}

const initialState: GroupRecipientSidebarState = {
	showSidebar: true,
	showUserContextMenu: false,
};

export const groupRecipientSidebarSlice = createSlice({
	name: 'groupRecipientSidebarSlice',
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.showSidebar = !state.showSidebar;
		},
		toggleContextMenu: (state, action: PayloadAction<boolean>) => {
			state.showUserContextMenu = action.payload;
		},
		setSelectedUser: (state, action: PayloadAction<User>) => {
			state.selectedUser = action.payload;
		},
	},
});

export const {
	setSelectedUser,
	toggleSidebar,
	toggleContextMenu,
} = groupRecipientSidebarSlice.actions;

export default groupRecipientSidebarSlice.reducer;
