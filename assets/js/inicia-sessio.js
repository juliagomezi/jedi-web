var url = "https://json-users.herokuapp.com/users";

var users = [];

var usernameInput;
var passwordInput;

const getUsers = async () => {
    try {
        users = (await axios.get(`${url}`)).data;
    }
	catch (error) {
        console.log(err);
    }
} 

const logInButton = () => {

	$(".alert").remove();

	usernameInput = $('#user-input-log-in').val();
	passwordInput = $('#password-input-log-in').val();
	
	if (users.find(user => user.username === usernameInput && user.password === passwordInput)) {
		console.log("LOGGED IN SUCCESSFULLY");
		$("#form-login").first().append(`<div class="alert alert-success" role="alert">S'ha iniciat sessió correctament.</div>`);
	}
	else {
		console.log("LOG IN FAILED");
		$("#form-login").first().append(`<div class="alert alert-danger" role="alert">L'usuari o la contrasenya són incorrectes.</div>`);
	}
}

const createAccountButton = async () => {

	$(".alert").remove();

	usernameInput = $('#user-input-create-account').val();
	passwordInput = $('#password-input-create-account').val();

	if (users.find(user => user.username === usernameInput)) {
		console.log("USERNAME ALREADY EXISTS");
		$("#form-create-account").first().append(`<div class="alert alert-danger" role="alert">El nom d'usuari ja existeix, escull-ne un altre.</div>`);
	}
	else {
		try {
			const res = (await axios.post(`${url}`, {username: `${usernameInput}`, password: `${passwordInput}`}));
			getUsers();

			console.log("USER CREATED SUCCESSFULLY");
			$("#form-create-account").first().append(`<div class="alert alert-success" role="alert">L'usuari ha estat creat correctament.</div>`);
		}
		catch (error) {
			console.log(err);
		}
	}
}


$(window).on('load', function() {

	getUsers();

	$('#log-in-button').on('click', function(e) {
		console.log ("LOG IN BUTTON CLICKED");

		e.preventDefault();
		logInButton();
	})

	$('#create-account-button').on('click', function(e) {
		console.log ("CREATE ACCOUNT BUTTON CLICKED");

		e.preventDefault();
		createAccountButton();
	})

});