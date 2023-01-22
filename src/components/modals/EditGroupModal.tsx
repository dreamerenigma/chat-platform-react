import { createRef } from "react";
import { setShowEditGroupModal } from "../../store/groupSlice";
import { useKeydown } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { DivMouseEvent } from "../../utils/types";
import { MdClose } from "react-icons/md";
import { ModalContainer, ModalHeader, ModalContentBody } from ".";
import { OverlayStyle } from "../../utils/styles";
import { EditGroupForm } from "../forms/EditGroupForm";

export const EditGroupModal = () => {
	const ref = createRef<HTMLDivElement>();
   const dispatch = useDispatch<AppDispatch>();
	const handleOverlayClick = (e: DivMouseEvent) =>
      ref.current &&
      ref.current === e.target &&
      dispatch(setShowEditGroupModal(false));

   useKeydown(
      (e) => e.key === 'Escape' && dispatch(setShowEditGroupModal(false))
   );

	return (
		<OverlayStyle ref={ref} onClick={handleOverlayClick}>
			<ModalContainer>
				<ModalHeader>
					<h2>Edit Group</h2>
					<MdClose 
                  size={32} 
                  onClick={() => dispatch(setShowEditGroupModal(false))}
               />
				</ModalHeader>
				<ModalContentBody>
					<EditGroupForm />
				</ModalContentBody>
			</ModalContainer>
		</OverlayStyle>
	);
};
