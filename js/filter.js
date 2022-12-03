

var submitBtn = document.querySelector('.submit-filter-btn');
submitBtn.addEventListener('click', applyFilter);

const inputs = document.querySelectorAll('input[type=number]');
Array.from(inputs).forEach(input => {
    const min = +input.min;
    const max = +input.max;

    input.addEventListener('input', (e) => {
        const value = +input.value;
        if (value > max) { input.value = max }
        else if (value < min) { input.value = min }
    });
});


var boxes = document.querySelectorAll(".box");

function applyFilter() {
    min = document.getElementById('start').value;
    max = document.getElementById('end').value;
    for (i = 0; i < boxes.length; i++) 
    {
        let currentPrice = boxes[i].querySelector(".price").textContent;
        currentPrice = parseInt(currentPrice.slice(0, -1));
        if (currentPrice < min || currentPrice > max) {
            boxes[i].style.display = "none";
        } else {
            boxes[i].style.display = "flex";
        }
    }
}


