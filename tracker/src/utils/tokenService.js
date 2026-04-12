let accessToken = null;

export const setAccessToken = (token) => {
	accessToken = token;
	console.log("Access token set:", token);
}

export const getAccessToken = () => {
	return accessToken;
}

export const clearAccessToken = () => {
	accessToken = null;
}

