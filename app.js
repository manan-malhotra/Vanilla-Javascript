const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('Confirm-password');

// Functions
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
}

function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Email is invalid');
	}
}

function checkRequired(inputArr) {
	inputArr.forEach(function(input) {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} cannot be empty`);
		} else {
			showSuccess(input);
		}
	});
}

function checkLength(input, min, max) {
	if (input.value.length < min && input.value.length != 0) {
		showError(input, `${getFieldName(input)}  must be at least ${min} characters`);
	} else if (input.value.length > max) {
		showError(input, `${getFieldName(input)}  cannot be more than ${max} characters`);
	}
}
function checkPasswords() {
	if (password.value !== password2.value) {
		showError(password2, 'Passwords do not match');
	}
}
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// Event Listeners
form.addEventListener('submit', function(e) {
	e.preventDefault();
	checkRequired([ username, email, password, password2 ]);
	checkLength(username, 5, 12);
	checkLength(password, 6, 20);
	checkEmail(email);
	checkPasswords();
});
