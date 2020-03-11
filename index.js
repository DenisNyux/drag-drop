(async () => {
    const goods = document.querySelectorAll('.products');
    const holder = document.querySelector('#cart');
    const raw_prices = await fetch('https://kodaktor.ru/cart_data.json').then(x => x.text());
    const prices = JSON.parse(raw_prices);
    console.log(prices);


    goods.forEach(element => {
        // Making it draggable
        element.setAttribute('draggable', true);                                                                                                                               
        element.addEventListener('dragstart', el => el.dataTransfer.setData('text/plain', el.target.id));
        // Adding price 
        const price = document.createElement('p');
        price.setAttribute('class', 'price');
        price.appendChild(document.createTextNode(prices[element.id] + '$'));
        element.appendChild(price);
    });
    // Making cart droppable
    holder.addEventListener('dragover', e => e.preventDefault());
    holder.addEventListener('drop', e => e.target.appendChild(document.getElementById(e.dataTransfer.getData('text/plain')).cloneNode(true)));
    // Making a removing button
    const remove_button = document.createElement('button');
    remove_button.appendChild(document.createTextNode('Очистить корзину'));
    remove_button.id = 'remove_button'
    remove_button.setAttribute('class', 'stats');
    remove_button.onclick = () => {
        while (holder.firstChild) {
            holder.removeChild(holder.firstChild);
        };
    };
    // Making a cost counter
    let cost = 0;
    console.log(goods)
    goods.forEach(el => {
        cost += Number(el.lastChild.textContent.slice(-1));
    })

    // Making a cost label
    const cost_label = document.createElement('label');
    cost_label.appendChild(document.createTextNode(`Cтоимость: ${cost}$`));
    cost_label.setAttribute('class', 'stats');
    // Making stats container
    const stats = document.createElement('div');
    stats.appendChild(remove_button);
    stats.appendChild(cost_label);
    document.getElementById('cart_section').prepend(stats);
})();