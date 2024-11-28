import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://192.168.3.55:8000/",
	headers: {
		"Content-Type": "application/json",
	},
});

export default apiClient;
