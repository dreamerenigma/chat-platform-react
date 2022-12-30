import { UseFormRegister } from "react-hook-form";
import {
	InputContainer,
	InputContainerHeader,
	InputError,
	InputField,
	InputLabel,
} from "../../../utils/styles";
import { CreateUserParams } from "../../../utils/types";
import { FC } from "react";
import { RegisterFormFieldProps } from "../../../utils/types/form";
import { checkUsernameExists } from "../../../utils/api";

export const PasswordField: FC<RegisterFormFieldProps> = ({
	register,
	errors,
}) => {
	return (
		<InputContainer>
			<InputContainerHeader>
				<InputLabel htmlFor="password">Password</InputLabel>
				<InputError>{errors.password?.message}</InputError>
			</InputContainerHeader>
			<InputField
				type="password"
				id="password"
				{...register('password', {
					required: 'Password is Required',
					minLength: {
						value: 3,
						message: 'Must be at least 8 characters'
					}, maxLength: {
						value: 32,
						message: 'Max characters is 32',
					},
				})}
			/>
		</InputContainer>
	);
}