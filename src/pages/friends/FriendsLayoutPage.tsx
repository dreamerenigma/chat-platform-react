import { Outlet, useLocation } from "react-router-dom";
import { 
	FriendsNavbar,
	FriendsPageStyle, 
} from "../../utils/styles/friends";
import { FriendsPage } from "./FriendsPage";
import { FriendPageNavbar } from "../../components/navbar/FriendsPageNavbar";

export const FriendsLayoutPage  = () => {
	const { pathname } = useLocation();
	return(
		<FriendsPageStyle>
			<FriendPageNavbar />
			{pathname === '/friends' && <FriendsPage />}
			<Outlet />
		</FriendsPageStyle>
	);
};
