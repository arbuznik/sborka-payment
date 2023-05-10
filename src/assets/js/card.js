const cardNumberInputs = document.querySelectorAll('.card-number-input');

const handleCardNumberInput = evt => {
	evt.preventDefault();

	if (/\d/.test(evt.key) && evt.target.value.length !== 4) {
		evt.target.value += evt.key;
	}

	if (evt.key === 'Backspace') {
		evt.target.value = evt.target.value.slice(0, -1);
	}

	const inputNumber = Number(evt.target.id.slice(-1));

	if (evt.key === 'Backspace' && evt.target.value.length === 0 && inputNumber !== 1) {
		document.getElementById(`card-number-chunk-${inputNumber - 1}`).focus();
	}

	if (evt.target.value.length === 4 && inputNumber !== 4) {
		document.getElementById(`card-number-chunk-${inputNumber + 1}`).focus();
	}

	if (evt.key === 'Tab' && inputNumber !== 4) {
		document.getElementById(`card-number-chunk-${inputNumber + 1}`).focus();
	}

	if (
		(evt.key === 'Tab' && inputNumber === 4) ||
		(evt.target.value.length === 4 && inputNumber === 4)
	) {
		document.getElementById('expire-date-chunk-1').focus();
	}
};

cardNumberInputs.forEach(input => {
	input.addEventListener('keydown', handleCardNumberInput);
});
