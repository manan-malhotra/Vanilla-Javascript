const nav = document.querySelector('#nav');
const toggle = document.querySelector('#toggle');
const opening = document.querySelector('#open');
const closing = document.querySelector('#close');
const modal = document.querySelector('#modal');
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('Confirm-password');
let errormsg = document.getElementsByClassName('small');

toggle.addEventListener('click', function() {
	nav.classList.toggle('navshow');
});

opening.addEventListener('click', function() {
	modal.classList.add('show');
	resetInput();
});

closing.addEventListener('click', function() {
	for (let i = 0; i < errormsg.length; i++) {
		errormsg[i].parentElement.className = 'form-control';
	}
	modal.classList.remove('show');
});
document.body.addEventListener('keyup', function(e) {
	if (e.key === 'Escape') {
		for (let i = 0; i < errormsg.length; i++) {
			errormsg[i].parentElement.className = 'form-control';
		}
		modal.classList.remove('show');
	}
});

window.addEventListener('click', (e) => {
	for (let i = 0; i < errormsg.length; i++) {
		errormsg[i].parentElement.className = 'form-control';
	}
	return e.target == modal ? modal.classList.remove('show') : false;
});

// Functions

function resetInput() {
	// username.value = '';
	arr = [ username, email, password, password2 ];
	arr.forEach(function(input) {
		input.value = '';
	});
}

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
