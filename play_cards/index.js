(() => {
    /* GameMenu */
    const createGameMenu = () => {
        const gameSection = document.querySelector('.game-secion__container');
        gameSection.innerHTML = '';

        const formCard = document.createElement('form');
        formCard.setAttribute('action', '#');
        formCard.classList.add('form')

        const labelCard = document.createElement('label');
        labelCard.setAttribute('for', 'card');
        labelCard.classList.add('form__label')
        labelCard.textContent = 'Количество карточек по вертикали/горизонтали ';

        const inputCard = document.createElement('input');
        inputCard.setAttribute('name', 'input');
        inputCard.setAttribute('id', 'card');
        inputCard.setAttribute('type', 'number');
        inputCard.classList.add('form__input');


        gameSection.append(formCard);
        formCard.append(labelCard);
        formCard.append(inputCard);

        const button = document.createElement('button');
        button.classList.add('game-menu__numberCard-btn');
        button.textContent = 'Начать игру';

        let numberCard;

        inputCard.addEventListener('input', () => {
            numberCard = inputCard.value;
            console.log(numberCard);
        })

        button.addEventListener('click', () => {
            if (numberCard >= 2 && numberCard <= 10 && (numberCard % 2 == 0)) {
                numberCard = inputCard.value;
                startGame(Math.pow(+numberCard, 2));
            } else {
                numberCard = 4;
                startGame(Math.pow(numberCard, 2));
            }
        })

        gameSection.append(button)
    }

    /* gameStart */

    const startGame = (numberCard) => {
        let seconds = 1;
        const inputSeconds = document.createElement('input');
        inputSeconds.classList.add('seconds')

        const makeIteration = () => {
            console.clear();
            inputSeconds.value = seconds;
            if (seconds == 60) {
                createGameMenu()
            }
            if (seconds < 60) {
                seconds += 1;
                setTimeout(makeIteration, 1000);
            }

        };
        setTimeout(makeIteration, 1000);

        let firstCard = null;
        let secondCard = null;

        const gameSection = document.querySelector('.game-secion__container');
        gameSection.innerHTML = '';

        const gameTable = document.createElement('div');
        gameTable.classList.add('game-table');
        gameTable.style.height = (Number(`${Math.pow(numberCard, 0.5)}`) * 100) + 'px';
        gameTable.style.width = (Number(`${Math.pow(numberCard, 0.5)}`) * 100) + 'px';

        const restartBtn = document.createElement('button');
        restartBtn.textContent = "Сыграть еще раз";
        restartBtn.classList.add('restart-btn');

        const cardsIcons = createIconsArray(numberCard);
        const duplicateCardsIcons = duplicateArray(cardsIcons);

        shuffle(duplicateCardsIcons);
        duplicateCardsIcons.forEach(icon => gameTable.append(createGameCard('question-circle', icon, numberCard)));

        gameSection.append(gameTable, restartBtn, inputSeconds);

        const cards = document.querySelectorAll('.game-card');
        restartBtn.addEventListener('click', createGameMenu);

        cards.forEach((card, index) => card.addEventListener('click', () => {
            if (!card.classList.contains('successfully')) {
                card.classList.add('flip');
            }

            if (firstCard == null) {
                firstCard = index;
            } else {
                if (index != firstCard) {
                    secondCard = index;
                }
            }

            if (firstCard != null && secondCard != null && firstCard != secondCard) {
                if (cards[firstCard].firstElementChild.textContent === cards[secondCard].firstElementChild.textContent) {
                    setTimeout(() => {
                        cards[firstCard].classList.add('successfully');
                        cards[secondCard].classList.add('successfully');

                        firstCard = null;
                        secondCard = null;
                    }, 500);
                } else {
                    setTimeout(() => {
                        cards[firstCard].classList.remove('flip');
                        cards[secondCard].classList.remove('flip');

                        firstCard = null;
                        secondCard = null;
                    }, 500);
                }
            }

        }))
    }

    /* gameCard */

    const createGameCard = (defaultIcon, flippendCardIcon, numberCard) => {
        const card = document.createElement('div');
        card.classList.add('game-card');

        const notFlippendCard = document.createElement('i');
        const flippendCard = document.createElement('i');

        notFlippendCard.classList.add('fa', `fa-${defaultIcon}`);
        flippendCard.textContent = flippendCardIcon;

        card.append(flippendCard, notFlippendCard);
        let widthCard = `calc((100% - (${Math.pow(numberCard, 0.5) - 1} * 5px)) / (${Math.pow(numberCard, 0.5)}))`;
        card.style.width = widthCard;

        return card
    }

    /* utils */

    const shuffle = (array) => {
        let currentIndex = array.length;

        while (currentIndex != 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array
    }

    const duplicateArray = (array) => array.reduce((res, current) => res.concat([current, current]), []);

    const createIconsArray = (initialCount) => {
        let cardsIcons = [];
        for (let i = 1; i <= initialCount; i++) {
            cardsIcons.push(i)
        }
        console.log(cardsIcons)
        return cardsIcons.slice(0, cardsIcons.length / 2)
    }

    window.createGameMenu = createGameMenu;
})()