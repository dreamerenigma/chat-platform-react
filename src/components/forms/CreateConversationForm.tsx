import { Dispatch, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { createConversationThunk } from "../../store/conversationSlice";
import { searchUsers } from "../../utils/api";
import { useDebounce } from "../../utils/hooks/useDebounce";
import { 
	Button, 
	InputContainer, 
	InputField, 
	InputLabel, 
	RecipientResultContainer, 
	RecipientResultItem, 
	TextField,
} from "../../utils/styles";
import { ConversationType, CreateConversationParams, User } from "../../utils/types";
import { SelectedRecipientPill } from "../recipients/SelectedRecipientPill";
import styles from './index.module.scss';

type Props = {
	setShowModal: Dispatch<React.SetStateAction<boolean>>;
	type: ConversationType;
};

export const CreateConversationForm: FC<Props> = ({ setShowModal, type }) => {
	const [query, setQuery] = useState('');
	const [email, setEmail] = useState('');
	const [userResults, setUserResults] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState<User>();
	const [searching, setSearching] = useState(false);
	const [message, setMessage] = useState('');
	
	const debouncedQuery = useDebounce(query, 1000);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		if (debouncedQuery) {
			setSearching(true);
			searchUsers(debouncedQuery)
				.then(({ data }) => {
					console.log(data);
					setUserResults(data);
				})
				.catch((err) => console.log(err))
				.finally(() => setSearching(false));
		}
	}, [debouncedQuery]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!selectedUser || !message) return;
		dispatch(createConversationThunk({ email: selectedUser?.email, message }))
			.unwrap()
			.then(({ data }) => {
				console.log(data);
				console.log('done');
				setShowModal(false);
				navigate(`/conversations/${data.id}`);
			})
			.catch((err) => console.log(err));
	};

	const handleUserSelect = (user: User) => {
		setSelectedUser(user);
		setUserResults([]);
		setQuery('');
	};

	return (
		<form className={styles.createConversationForm} onSubmit=
			{(e) => {}}>
			<section>
				<InputContainer backgroundColor='#161616'>
					<InputLabel>Recipient</InputLabel>
					{!selectedUser ? (
						<InputField onChange={(e) => setQuery(e.target.value)} />
					) : (
						<SelectedRecipientPill 
							user={selectedUser} 
							setSelectedUser={setSelectedUser}
						/>
					)}
				</InputContainer>
			</section>
			{!selectedUser && userResults.length > 0 && query && (
				<RecipientResultContainer>
					{userResults.map((user) => (
						<RecipientResultItem onClick={() => handleUserSelect(user)}>
							<span>{user.email}</span>
						</RecipientResultItem>
					))}
				</RecipientResultContainer>
			)}
			<section className={styles.message}>
				<InputContainer backgroundColor='#161616'>
					<InputLabel>Message (optional)</InputLabel>
					<TextField 
						value={message} 
						onChange={(e) => setMessage(e.target.value)}
					/>
				</InputContainer>
			</section>
			<Button>Create Conversation</Button>
		</form>
	);
};