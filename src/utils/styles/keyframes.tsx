import { keyframes } from "styled-components";

export const fadeInUpwards = keyframes`
	from {
		opacity: 0;
		transformY: translate(20%);
	}
	to {
		opacity: 1;
		transformY: translate(0%);
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