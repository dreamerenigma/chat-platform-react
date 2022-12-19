import { AiOutlineUserAdd } from "react-icons/ai";
import { friendsNavbarItems } from "../../utils/constants";
import { FriendsNavbar, FriendsNavbarItem } from "../../utils/styles/friends";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../utils/styles/button";
import { useState } from "react";
import { CreateFriendRequestModal } from "../modals/CreateFriendRequestModal";

export const FriendPageNavbar = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			{showModal && <CreateFriendRequestModal setShowModal={setShowModal} />}
			<FriendsNavbar>
				<div className="navLinks">
					{friendsNavbarItems.map((item) => (
						<FriendsNavbarItem 
							key={item.id} 
							active={pathname === item.pathname}
							onClick={() => navigate(item.pathname)}
						>
							{item.label}
						</FriendsNavbarItem>
					))}
				</div>
				<Button 
					size="sm" 
					flex={true} 
					variant="primary" 
					onClick={() => setShowModal(true)}
				>
					<AiOutlineUserAdd size={24}/>
					<span>Add Friend</span>
				</Button>
			</FriendsNavbar>
		</>
	);
};