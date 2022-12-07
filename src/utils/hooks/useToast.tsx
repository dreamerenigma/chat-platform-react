import { toast, ToastOptions } from 'react-toastify';

export function useToast(defaultOptions: ToastOptions<{}> = { theme: 'dark' }) {
	const success = (data: string) =>
		toast(data, { ...defaultOptions, type: 'success' });

	const error = (data: string) => 
		toast(data, { ...defaultOptions, type: 'error' });

	return { success, error };
}
