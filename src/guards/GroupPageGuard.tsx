import { FC } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useConversationGuard } from "../utils/hooks/useConversationGuard";

export const GroupPageGuard: FC<React.PropsWithChildren> = ({ children }) => {
	const location = useLocation();
	const { loading, error } = useConversationGuard();
	if (loading) return <div>loading group</div>;
	return error ? (
		<Navigate to="/groups" state={{ from: location }} replace />
	) : (
		<>{children}</>
	);
};
