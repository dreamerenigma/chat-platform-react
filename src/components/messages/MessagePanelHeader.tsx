import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { selectType } from "../../store/selectedSlice";
import { MessagePanelConversationHeader } from "./headers/MessagePanelConversationHeader";
import { MessagePanelGroupHeader } from "./headers/MessagePanelGroupHeader";
import { ConversationVideoCall } from "../conversation/ConversationVideoCall";
import { ConversationAudioCall } from "../conversation/ConversationAudioCall";

export const MessagePanelHeader = () => {
	const { id: routeId } = useParams();
	const { isCalling, isCallInProgress, activeConversationId, callType } = 
		useSelector((state: RootState) => state.call);
	const type = useSelector(selectType);
	
	const showCallPanel = isCalling || isCallInProgress;
	const isRouteActive = activeConversationId === parseInt(routeId!);
	console.log(isRouteActive);
	console.log(callType === 'video');
	console.log(callType);
	if (!showCallPanel)
		return type === 'private' ? (
			<MessagePanelConversationHeader />
		) : (
			<MessagePanelGroupHeader />
		);
		
	return isRouteActive && callType === 'video' ? (
		<ConversationVideoCall />
	) : (
		<ConversationAudioCall />
	);
};
