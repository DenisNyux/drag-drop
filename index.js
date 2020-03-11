(async () => {
    const goods = document.querySelectorAll('.products');
    const holder = document.querySelector('#cart');
    // Extracting prices
    const raw_prices = await fetch('https://kodaktor.ru/cart_data.json').then(x => x.text());
    const prices = JSON.parse(raw_prices);

    // Making products draggable
    goods.forEach(element => {
        element.setAttribute('draggable', true);                                                                                                                               
        element.addEventListener('dragstart', el => el.dataTransfer.setData('text/plain', el.target.id));
        // Adding price 
        const price = document.createElement('p');
        price.setAttribute('class', 'price');
        price.appendChild(document.createTextNode(prices[element.id] + '$'));
        element.appendChild(price);
    });

    // Declaring budget variable & it`s label
    let budget = 500;
    const budget_label = document.createElement('label');
    budget_label.setAttribute('class', 'stats');
    budget_label.appendChild(document.createTextNode(`Баланс: ${budget}$`));

    // Making product to drop & price to change
    holder.addEventListener('dragover', e => e.preventDefault());
    holder.addEventListener('drop', (e) => {
        const dragging_element = document.getElementById(e.dataTransfer.getData('text/plain')).cloneNode(true);        
        const price = Number(dragging_element.lastChild.textContent.slice(0, -1));
        if (budget >= 0 && price <= budget) {
            budget -= price;
            budget_label.firstChild.textContent = `Баланс: ${budget}$`;
            e.target.appendChild(dragging_element);
        } else {
            alert('Деньги кончились!')
        }
    });

    // Removing button
    const remove_button = document.createElement('button');
    remove_button.appendChild(document.createTextNode('Очистить корзину'));
    remove_button.id = 'remove_button'
    remove_button.setAttribute('class', 'stats');
    remove_button.onclick = () => {
        while (holder.firstChild) {
            holder.removeChild(holder.firstChild);
        };
        budget = 500;
        budget_label.firstChild.textContent = `Баланс: ${budget}$`;
    };
    // Container with a button & price label
    const stats = document.createElement('div');
    stats.appendChild(remove_button);
    stats.appendChild(budget_label);
    // Applying stats container to body
    document.getElementById('cart_section').prepend(stats);
})();