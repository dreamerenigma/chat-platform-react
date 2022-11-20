import { useState } from "react";
import { 
	Button, 
	InputContainer,
	InputField,
	InputLabel, 
} from "../../utils/styles";
import styles from './index.module.scss';

export const GroupRecipientAddForm = () => {
	const [query, setQuery] = useState('');

	const onSubbmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}

	return (
		<form className={styles.createConversationForm}>
			<InputContainer backgroundColor='#161616'>
				<InputLabel>Recipient</InputLabel>
				<InputField onChange={(e) => setQuery(e.target.value)} />
			</InputContainer>
			<Button style={{ margin: '10px 0' }} disabled={!query}>
				Add Recipient
			</Button>
		</form>
	);
};
