import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConversationById } from "../api";

export function useConversationGuard() {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const controller = new AbortController();

	useEffect(() => {
		console.log('Fetching Conversation:', id);
		setLoading(true);
		getConversationById(parseInt(id!))
			.catch((err) => {
				console.log(err);
				setError(err);
			})
			.finally(() => setTimeout(() => setLoading(false), 3000));
		return () => {
			controller.abort();
		};
	}, [id]);

	return { loading, error };
}
