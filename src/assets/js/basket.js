const TAX_RATIO = 0.1;
const SHIPPING_RATIO = 0.15;

const localeStringToNum = str => {
	return Number(str.replace(/\D/g, ''));
};

const updateCartCounter = () => {
	const itemsCount = document.querySelectorAll('.basket-item').length;
	const counterEl = document.querySelector('.cart-btn__counter');

	if (itemsCount === 0) {
		counterEl.classList.add('invisible-container');
	} else {
		counterEl.textContent = itemsCount.toString();
	}
};

const calculateTotal = () => {
	const itemElementsArr = [...document.querySelectorAll('.basket-item')];
	const subtotal = itemElementsArr
		.map(item => localeStringToNum(item.querySelector('.basket-item__price-value').textContent))
		.reduce((val, sum) => val + sum, 0);

	const tax = subtotal * TAX_RATIO;
	const shipping = subtotal * SHIPPING_RATIO;
	const total = subtotal + tax + shipping;

	const subTotalElement = document.querySelector('.basket-price__subtotal-value');
	const taxElement = document.querySelector('.basket-price__tax-value');
	const shippingElement = document.querySelector('.basket-price__shipping-value');
	const totalElement = document.querySelector('.basket-price__total-value');

	subTotalElement.textContent = subtotal.toLocaleString();
	taxElement.textContent = tax.toLocaleString();
	shippingElement.textContent = shipping.toLocaleString();
	totalElement.textContent = total.toLocaleString();
};

const handleQuantityChange = evt => {
	const basketItemElement = evt.currentTarget.closest('.basket-item');
	const buttonElement = evt.target.closest('button');
	const counterElement = basketItemElement.querySelector('.basket-item__quantity-number');
	const priceElement = basketItemElement.querySelector('.basket-item__price-value');

	let quantity = Number(counterElement.textContent);
	const price = localeStringToNum(priceElement.textContent) / quantity;

	if (buttonElement.classList.contains('basket-item__quantity-control_type_plus')) {
		quantity += 1;
	}

	if (
		buttonElement.classList.contains('basket-item__quantity-control_type_minus') &&
		quantity > 1
	) {
		quantity -= 1;
	}

	counterElement.textContent = quantity.toString();
	priceElement.textContent = (price * quantity).toLocaleString();

	calculateTotal();
};

const handleItemDelete = evt => {
	const item = evt.currentTarget.closest('.basket-item');
	item.remove();

	updateCartCounter();
	calculateTotal();
};

const buttons = document.querySelectorAll('.basket-item__quantity-control');
buttons.forEach(button => button.addEventListener('click', handleQuantityChange));

const deleteButtons = document.querySelectorAll('.basket__item__delete-button');
deleteButtons.forEach(button => button.addEventListener('click', handleItemDelete));

calculateTotal();
