import styled, { css } from "styled-components";

type Size = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary';

type  ButtonProps = Partial<{
	size: Size;
	variant: ButtonVariant;
	flex: boolean;
}>;

export const getButtonSizeStyle = (size?: Size) => {
	switch (size) {
		case 'sm':
			return css`
				padding: 10px 20px;
				font-size: 16px;
			`;
		case 'md':
			return css`
				padding: 14px 26px;
				font-size: 18px;
			`;
		case 'lg':
			return css`
				padding: 14px 26px;
				font-size: 16px;
			`;
		default:
			return css`
				padding: 12px 24px;
				font-size: 16px;
		`;
	}
};

export const getButttonVariantStyle = (variant?: ButtonVariant) => {
	const primary = css`
		background-color: #2b09ff;
		color: #fff;
		&:hover {
			cursor: pointer;
			background-color: #3415ff;
		}
		&:active {
			background-color: #3a1cff;
		}
		&:disabled {
			background-color: #4937bc7c;
			color: #878787a2;
			cursor: not-allowed;
		}
	`;
	const secondary = css`
		background-color: inherit;
		border: 1px solid #2b09ff;
		color: #fff;
	`;
	switch (variant) {
		case 'primary':
			return primary;
		case 'secondary':
			return secondary;
		default:
			return primary;
	}
};

export const Button = styled.button<ButtonProps>`
	outline: none;
	border: none;
	font-family: 'Inter';
	border-radius: 10px;
	font-weight: 500;
	transition: 250ms background-color ease;
	${({ size }) => getButtonSizeStyle(size)}
	${({ variant }) => getButttonVariantStyle(variant)}
	${({ flex }) => 
		flex && 
		css`
			display: flex;
			align-items: center;
			gap: 10px;
	`}
`;
