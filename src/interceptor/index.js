import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const accessToken = cookies.get('adminAccessToken');

export const API_URL = '/';

const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

$api.interceptors.request.use((config) => {
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	}

	return new Promise((resolve) => {
		const interval = setInterval(() => {
			const newAccessToken = cookies.get('adminAccessToken');
			if (newAccessToken) {
				clearInterval(interval);
				config.headers.Authorization = `Bearer ${newAccessToken}`;
				resolve(config);
			}
		}, 100);
	});
});

$api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			error.config &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get(
					`http://216.250.11.9:5005/api/admin/auth/refresh`,
					{
						withCredentials: true,
					}
				);
				if (error.response.config.headers) {
					error.response.config.headers.Authorization =
						response.data.accessToken;
				}

				cookies.set('adminAccessToken', response.data.accessToken);
				return $api.request(originalRequest);
			} catch (e) {
				console.log('НЕ АВТОРИЗОВАН');
			}
		}
		throw error;
	}
);

export default $api;
