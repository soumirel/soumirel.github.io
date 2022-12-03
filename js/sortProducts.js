
var boxes = document.querySelectorAll(".box");
var startPrices = [];
var sortedIndexes = [];

function intitializePrices() {
    for (i = 0; i < boxes.length; i++) 
    {
        let currentPrice = boxes[i].querySelector(".price").textContent;
        startPrices.push(parseInt(currentPrice.slice(0, -1)));
        sortedIndexes.push(i);
    }
    sortIndexes();
}

intitializePrices();

function sortIndexes() {
    for (i = 0; i < sortedIndexes.length; i++) 
    {
        for (j = 0; j < sortedIndexes.length; j++) 
        {
            if (startPrices[sortedIndexes[i]] < startPrices[sortedIndexes[j]]) 
            {
                let temp = sortedIndexes[i];
                sortedIndexes[i] = sortedIndexes[j];
                sortedIndexes[j] = temp;
            }
        }
    }
}

function applySort() {
    for (i = 0; i < boxes.length; i++) 
    {
        boxes[sortedIndexes[i]].style.order = i;
    }
}

function cancelSort() {
    for (i = 0; i < boxes.length; i++) 
    {
        boxes[sortedIndexes[i]].style.order = 0;
    }
}

var sortBtn = document.querySelector('.sort-btn');
sortBtn.addEventListener('click', () => {
    if (!sortBtn.classList.contains('active')) {
        sortBtn.classList.add('active');
        sortBtn.textContent = "Отменить";
        applySort();
    } else {
        sortBtn.classList.remove('active');
        sortBtn.textContent = "Сортировать";
        cancelSort();
    }
});