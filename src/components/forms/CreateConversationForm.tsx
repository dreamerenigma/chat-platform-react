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
import styles from './index.module.scss';

type Props = {
	setShowModal: Dispatch<React.SetStateAction<boolean>>;
	type: ConversationType;
};

export const CreateConversationForm: FC<Props> = ({ setShowModal, type }) => {
	const { 
		handleSubmit, 
		formState: { errors }, 
	} = useForm<CreateConversationParams>({});

	const [query, setQuery] = useState('');
	const [email, setEmail] = useState('');
	const [userResults, setUserResults] = useState<User[]>([]);
	const [message, setMessage] = useState('');
	const [searching, setSearching] = useState(false);
	
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

	const onSubmit = (data: CreateConversationParams) => {
		console.log(data);
		dispatch(createConversationThunk(data))
			.unwrap()
			.then(({ data }) => {
				console.log(data);
				console.log('done');
				setShowModal(false);
				navigate(`/conversations/${data.id}`);
			})
			.catch((err) => console.log(err));
	};

	return (
		<form 
			className={styles.createConversationForm}
			onSubmit={handleSubmit(onSubmit)}
		>
			<section>
				<InputContainer backgroundColor='#161616'>
					<InputLabel>Recipient</InputLabel>
					<InputField onChange={(e) => setQuery(e.target.value)} />
				</InputContainer>
			</section>
			{!searching && userResults.length > 0 && query && (
				<RecipientResultContainer>
					{userResults.map((user) => (
						<RecipientResultItem>
							<span>{user.email}</span>
						</RecipientResultItem>
					))}
				</RecipientResultContainer>
			)}
			<section className={styles.message}>
				<InputContainer backgroundColor='#161616'>
					<InputLabel>Message (optional)</InputLabel>
					<TextField />
				</InputContainer>
			</section>
			<Button>Create Conversation</Button>
		</form>
	);
};