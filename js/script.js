const burgerSlide = () => {
    const burger = document.querySelector('.burger');
    const list = document.querySelector('.list');
    const listItems = document.querySelectorAll('.listItems');

    burger.addEventListener('click', () => {

        list.classList.toggle('list-active');
        listItems.forEach((link, index) => {

            if (link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `burgerList 0.5s ease forwards ${index / 7 + 1}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

}

burgerSlide();


    




