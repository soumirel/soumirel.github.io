buyBtn = document.querySelector('.buy-btn');
productName = document.querySelector('.info-item.name');

buyBtn.addEventListener('click', function() {
    localStorage.setItem('productName', productName.textContent);
    window.location.href = 'shop.html';
});
