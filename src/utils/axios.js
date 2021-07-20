import axios from "axios";
//import appConfig from "constants/config";
export const AXIOS = function (
	path,
	method = "GET",
	data = {},
	option = null,
	overrideDomain
) {
	let url = "https://api.themoviedb.org/3" + path;
	let config = {
		method,
		url,
		data,
		timeout: 2 * 60 * 1000,
	};
	if (option && option.onUploadProgress)
		config.onUploadProgress = option.onUploadProgress;
	return new Promise((resolve, reject) => {
		axios(config)
			.then((resp) => {
				const { data } = resp;
				resolve(data);
			})
			.catch((err) => {
				console.log("[err when call call api]", err);
				reject(err.response ? err.response.data : err);
			});
	});
};
