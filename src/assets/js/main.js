const handleBurgerClick = () => {
	const sideMenu = document.querySelector('.side-menu');
	sideMenu.classList.toggle('side-menu__visible');
};

const burgerButton = document.querySelector('.burger-button');
burgerButton.addEventListener('click', handleBurgerClick);
