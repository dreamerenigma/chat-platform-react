import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { MessageInput, MessageInputContainer } from "../../utils/styles";
import { CirclePlusFill, FaceHappy } from 'akar-icons';
// import Picker, { IEmojiData } from 'emoji-picker-react';
import styles from './index.module.scss';
import { BaseEmoji } from "emoji-mart";

type Props = {
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
	placeholderName: string;
	sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
	sendTypingStatus: () => void;
};

export const MessageInputField: FC<Props> = ({ 
	content,
	placeholderName,
	setContent,
	sendMessage,
	sendTypingStatus,
}) => {
	const ARROW_KEYS = new Set([
		'ArrowUp', 
		'ArrowDown', 
		'ArrowRight', 
		'ArrowLeft'
	]);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [cursorPosition, setCursorPosition] = useState(-1);
	const updateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.selectionStart);
		setCursorPosition(e.target.selectionStart!);
		setContent(e.target.value);
	};

	const onEmojiSelect = (data: BaseEmoji) => {
		console.log(`Inserting in position: ${cursorPosition}`);
		setContent(
			(prev) =>
				prev.slice(0, cursorPosition) + data.native + prev.slice(cursorPosition)
		);
	};

	return (
		<>
			<MessageInputContainer>
				<CirclePlusFill size={30} color="#797979" />
				<form onSubmit={sendMessage} className={styles.form}>
					{cursorPosition}
					<MessageInput 
						value={content}
						onChange={updateContent}
						onKeyDown={(e) => {
							sendTypingStatus();
							if (e.target instanceof HTMLInputElement) {
								if (ARROW_KEYS.has(e.key)) 
									setCursorPosition(e.target.selectionStart! - 1);
							}
						}}
						placeholder={`Send a message to ${placeholderName}`}
						maxLength={4000}
						onMouseUp={(e) => {
							console.log(e.target instanceof HTMLInputElement);
							if (e.target instanceof HTMLInputElement) {
								console.log(e.target.selectionStart);
								setCursorPosition(e.target.selectionStart!);
							}
						}}
					/>
				</form>
				<FaceHappy 
					size={30} 
					color="#fff"
					onClick={() => {
						setShowEmojiPicker(!showEmojiPicker);
					}}
				/>
				{showEmojiPicker && (
					<div 
						style={{
							position: 'absolute',
							right: 50,
							bottom: 150,
						}}
					>
						<Picker 
							showPreview={false} 
							showSkinTones={false} 
							theme="dark"
							onSelect={onEmojiSelect}
						/>
					</div>
				)}
			</MessageInputContainer>
		</>
	);
};