import { Dispatch, FC, SetStateAction, useState } from "react";
import {
	InputLabel,
	InputContainer,
	RecipientChipContainer,
	InputField
} from "../../utils/styles";

type Props = {
	setQuery: Dispatch<SetStateAction<string>>;
};

export const GroupRecipientsField: FC<Props> = ({ setQuery }) => {
	return (
		<section>
			<InputContainer backgroundColor='#161616'>
				<InputLabel>Recipient</InputLabel>
				<InputField onChange={(e) => setQuery(e.target.value)} />
			</InputContainer>
		</section>
	);
};
