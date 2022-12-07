import { keyframes } from "styled-components";

export const fadeInUpwards = keyframes`
	from {
		opacity: 0;
		transformY: translateY(20%);
	}
	to {
		opacity: 1;
		transformY: translateY(0%);
	}
`;

export const slideRightToLeft = keyframes`
	from {
		transform: translateX(20%);
	}
	to {
		transform: translateX(0%);
	}
`;