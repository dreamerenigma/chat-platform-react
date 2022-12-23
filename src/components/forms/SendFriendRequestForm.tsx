import { Dispatch, FC,  SetStateAction, useState } from "react";
import { useToast } from "../../utils/hooks/useToast";
import { 
	Button, 
	InputContainer,
	InputField,
	InputLabel, 
} from "../../utils/styles";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import styles from './index.module.scss';
import { createFriendRequestThunk } from "../../store/friends/friendsThunk";

type Props = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const SendFriendRequestForm: FC<Props> = ({ setShowModal }) => {
	const [email, setEmail] = useState('');
	const { success, error } = useToast({ theme: 'dark' });

	const dispatch = useDispatch<AppDispatch>();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createFriendRequestThunk(email))
			.unwrap()
			.then(() => {
				console.log('Success Friend Request');
				setShowModal(false);
				success('Friend Request Sent!');
			})
			.catch((err) => {
				console.log(err);
				error('Error sending friend request');
			});
	};

	return (
		<form className={styles.createConversationForm} onSubmit={onSubmit}>
			<InputContainer backgroundColor='#161616'>
				<InputLabel>Recipient</InputLabel>
				<InputField value={email} onChange={(e) => setEmail(e.target.value)} />
			</InputContainer>
			<Button style={{ margin: '10px 0' }} disabled={!email}>
				Send
			</Button>
		</form>
	);
};
