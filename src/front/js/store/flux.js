const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		userList: [],
	  },
	  actions: {
		getMessage: () => {
		  console.log("Mensaje obtenido");
		},
		register: async (formData) => {
		  try {
			const response = await fetch(
			  "https://studious-eureka-jj5w65w7459rhpvw9-3001.app.github.dev/api/register",
			  {
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
				  "Content-type": "application/json",
				},
			  }
			);
			let data = await response.json();
			return data;
		  } catch (e) {
			console.error("Error in registration:", e);
		  }
		},
		login: async (loginForm) => {
		  try {
			const response = await fetch(
			  "https://studious-eureka-jj5w65w7459rhpvw9-3001.app.github.dev/api/login",
			  {
				method: "POST",
				body: JSON.stringify(loginForm),
				headers: {
				  "Content-type": "application/json",
				},
			  }
			);
			const data = await response.json();
  
			if (response.ok) {
			  localStorage.setItem("token", data.access_token);
			  localStorage.setItem("first_name", data.first_name);
			  localStorage.setItem("email", data.email);
			}
			return response;
		  } catch (e) {
			console.error(e);
		  }
		},
		getList: async () => {
		  const token = localStorage.getItem("token");
		  if (!token) {
			alert("first login to get token");
			return;
		  }
		  try {
			const response = await fetch(
			  "https://studious-eureka-jj5w65w7459rhpvw9-3001.app.github.dev/api/users",
			  {
				headers: {
				  Authorization: `Bearer ${token}`,
				},
			  }
			);
			const result = await response.json();
  
			if (result.msg === "Token has expired") {
			  getActions().logout();
			}
  
			if (result.User_list) {
			  setStore({ ...getStore(), userList: result.User_list });
			}
		  } catch (e) {
			console.error(e);
		  }
		},
		logout: () => {
		  localStorage.removeItem("token");
		  localStorage.removeItem("first_name");
		  localStorage.removeItem("email");
		},
	  },
	};
  };
  
  export default getState;