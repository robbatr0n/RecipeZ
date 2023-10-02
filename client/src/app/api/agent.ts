import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { Recipe } from '../models/recipe';
import { router } from '../router/routes';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';
import { Profile } from '../models/profile';
import { PaginatedResult } from '../models/pagination';

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
	const token = store.commonStore.token;
	if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axios.interceptors.response.use(
	async (response) => {
		await sleep(1000);
		const pagination = response.headers['pagination'];
		if (pagination) {
			response.data = new PaginatedResult(response.data, JSON.parse(pagination));
			return response as AxiosResponse<PaginatedResult<unknown>>;
		}
		return response;
	},
	(error: AxiosError) => {
		const { data, status, config } = error.response as AxiosResponse;
		switch (status) {
			case 400:
				if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
					router.navigate('/not-found');
				}
				if (data.errors) {
					const modalStateErrors = [];
					for (const key in data.errors) {
						if (data.errors[key]) {
							modalStateErrors.push(data.errors[key]);
						}
					}

					throw modalStateErrors.flat();
				} else {
					toast.error(data);
				}
				break;
			case 401:
				toast.error('unauthorised');
				break;
			case 403:
				toast.error('forbidden');
				break;
			case 404:
				router.navigate('/not-found');
				break;
			case 500:
				store.commonStore.setServerError(data);
				router.navigate('/server-error');
				break;
		}

		return Promise.reject(error);
	}
);

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Recipes = {
	list: (params: URLSearchParams) => axios.get<PaginatedResult<Recipe[]>>('/recipes', { params }).then(responseBody),
	details: (id: string) => requests.get<Recipe>(`/recipes/${id}`),
	create: (recipe: Recipe) => axios.post<Recipe>(`/recipes/`, recipe),
	update: (recipe: Recipe) => axios.put<Recipe>(`/recipes/${recipe.id}`, recipe),
	delete: (id: string) => axios.delete<void>(`/recipes/${id}`),
};

const Account = {
	current: () => requests.get<User>('/account'),
	login: (user: UserFormValues) => requests.post<User>('/account/login', user),
	register: (user: UserFormValues) => requests.post<User>('/account/register', user),
};

const Profiles = {
	get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
};

const agent = {
	Recipes,
	Account,
	Profiles,
};

export default agent;
