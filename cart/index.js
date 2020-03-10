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
    const remove = document.createElement('button');
    remove.appendChild(document.createTextNode('Очистить корзину'));
    remove.id = 'remove_button'
    remove.onclick = () => {
        while (holder.firstChild) {
            holder.removeChild(holder.firstChild);
        };
    };
    document.getElementById('cart_section').prepend(remove)  
})();