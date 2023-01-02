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

export const slideUp = keyframes`
	from {
		transform: translate(-50%, 100%)
	}
	to {
		transform: translate(-50%, -20%)
	}
`;

export const slideDown = keyframes`
	from {
		transform: translate(-50%, -20%)
	}
	to {
		transform: translate(-50%, 100%)
	}
`;
