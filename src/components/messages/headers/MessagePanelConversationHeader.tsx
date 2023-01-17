import { FaPhoneAlt, FaVideo } from "react-icons/fa"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useDispatch, useSelector } from "react-redux"
import { selectConversationById } from "../../../store/conversationSlice"
import { AppDispatch, RootState } from "../../../store"
import { getRecipientFromConversation } from "../../../utils/helpers"
import { SenderEvents } from "../../../utils/constants"
import { initiateCallState, setActiveConversationId, setCaller, setIsCalling, setLocalStream, setReceiver } from "../../../store/call/callSlice"
import { SocketContext, socket } from "../../../utils/context/SocketContext"
import { 
   MessagePanelHeaderStyle,  
   MessagePanelHeaderIcons, 
} from "../../../utils/styles"
import { CallInitiatePayload, CallType } from "../../../utils/types"

export const MessagePanelConversationHeader = () => {
   const user = useContext(AuthContext).user!;
   const { id } = useParams();
   const socket = useContext(SocketContext);

   const dispatch = useDispatch<AppDispatch>();
   const conversation = useSelector((state: RootState) =>
      selectConversationById(state, parseInt(id!))
   );

   const recipient = getRecipientFromConversation(conversation, user);
   const buildCallPayloadParams = (
      stream: MediaStream,
      type: CallType
   ) : CallInitiatePayload | undefined => 
      conversation && {
         localStream: stream,
         caller: user,
         receiver: recipient!,
         isCalling: true,
         activeConversationId: conversation.id, 
         type,
      };

   const videoCallUser = async () => {
		if (!recipient) return console.log('Recipient undefined'); 
		socket.emit(SenderEvents.VOICE_CALL_INITIATE, {
			conversation: conversation!.id,
			recipienId: recipient.id,
		});
      const constraints = { video: false, audio: true };
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const payload = buildCallPayloadParams(stream, 'audio');
      if (!payload) throw new Error('Video Call Payload is undefined.');
		dispatch(initiateCallState(payload));
   };

   const voiceCallUser = async () => {
		if (!recipient) return console.log('Recipient undefined'); 
		socket.emit(SenderEvents.VOICE_CALL_INITIATE, {
			conversation: conversation!.id,
			recipienId: recipient.id,
		});
      const constraints = { video: false, audio: true };
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const payload = buildCallPayloadParams(stream, 'audio');
      if (!payload) throw new Error('Voice Call Payload is undefined.');
		dispatch(initiateCallState(payload));
   };

   return (
      <MessagePanelHeaderStyle>
         <div>
            <span>{recipient?.username || 'User'}</span>
         </div>
         <MessagePanelHeaderIcons>
            <FaPhoneAlt size={24} cursor="pointer" onClick={voiceCallUser} />
            <FaVideo size={30} cursor="pointer" onClick={videoCallUser} />
         </MessagePanelHeaderIcons>
      </MessagePanelHeaderStyle>
   );
};
