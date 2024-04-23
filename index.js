const form = document.getElementById('form');
const inputs = Array.from(document.querySelectorAll('input'));
const signatureContainer = document.getElementById('signature-container');
const signatureBody = document.querySelector('#signature-container tbody');
const copyButton = document.querySelector('#copy-signature');

const formData = new FormData(form);

// Dynamic table values --------------------
const table = {
	name: signatureBody.children[0].children[0],
	pronouns: signatureBody.children[0].children[0],
	position: signatureBody.children[0].children[0],
	email: signatureBody.children[1].children[0],
	phone: signatureBody.children[2].children[0],
};
// -----------------------------------------

// Give format to signature data values ----
function getFieldValueFormatted(inputName, value) {
	const name = formData.get('name') ? `<b>${formData.get('name')}</b>`: '';
	const pronouns = formData.get('pronouns') ? `&nbsp;(${formData.get('pronouns')})&nbsp;` : '';
	const position = formData.get('position') ? `&nbsp;<b>·</b>&nbsp;${formData.get('position')}`: '';
	const email = formData.get('email') ? `${formData.get('email')}@gincat.digital` : '';

	switch(inputName) {
		case 'name':
		case 'pronouns':
		case 'position':
			return `${name}${pronouns}${position}`;
		case 'email':
			return email;
		default:
			return value;
	}
}
// -----------------------------------------

// Update signature values -----------------
function onInput(event) {
	const { name, value } = event.target;
	formData.set(name, value);
	table[name].innerHTML = getFieldValueFormatted(name, value);
};

inputs.forEach((input) => {
	input.addEventListener('input', onInput);
})
// -----------------------------------------

// Copy signature to clipboard -------------
function copySignature() {
	const value = signatureContainer.innerHTML;
	
	function copy(event) {
		event.clipboardData.setData('text/html', value);
		event.clipboardData.setData('text/plain', value);
		event.preventDefault();
	}

	document.addEventListener('copy', copy);
	document.execCommand('copy');
	document.removeEventListener('copy', copy);
}

copyButton.addEventListener('click', copySignature);
// -----------------------------------------


// Enable copy signature button -------------
function enableButton() {
	console.log(formData.get('name'));
	if (formData.get('name') && formData.get('position') && formData.get('email')) {
		copyButton.disabled = false;
	} else {
		copyButton.disabled = true;
	}
}

form.addEventListener('input', enableButton);
// ------------------------------------------