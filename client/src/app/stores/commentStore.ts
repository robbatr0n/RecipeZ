import { makeAutoObservable, runInAction } from 'mobx';
import { ChatComment } from '../models/comments';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { store } from './store';

export default class CommentStore {
	comments: ChatComment[] = [];
	hubConnection: HubConnection | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	createHubConnection = (recipeId: string) => {
		if (store.recipeStore.selectedRecipe) {
			this.hubConnection = new HubConnectionBuilder()
				.withUrl('http://localhost:5000/chat?recipeId=' + recipeId, {
					accessTokenFactory: () => store.userStore.user?.token as string,
				})
				.withAutomaticReconnect()
				.configureLogging(LogLevel.Information)
				.build();

			this.hubConnection.start().catch((error) => console.log('Error establishing connection: ', error));

			this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
				runInAction(() => {
					comments.forEach((comment) => {
						comment.createdAt = new Date(comment.createdAt);
					});
					this.comments = comments;
				});
			});

			this.hubConnection.on('ReceiveComment', (comment) => {
				runInAction(() => {
					comment.createdAt = new Date(comment.createdAt);
					this.comments.unshift(comment);
				});
			});
		}
	};

	stopHubConnection = () => {
		this.hubConnection?.stop().catch((error) => console.log('Error stopping connection: ', error));
	};

	clearComments = () => {
		this.comments = [];
		this.stopHubConnection();
	};

	addComment = async (values: { body: string; recipeId?: string }) => {
		values.recipeId = store.recipeStore.selectedRecipe?.id;
		try {
			await this.hubConnection?.invoke('SendComment', values);
		} catch (error) {
			console.log(error);
		}
	};
}
