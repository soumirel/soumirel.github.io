
canOverclockedButton = document.querySelector(".can-overclocked-button");
canOverclockedResult = document.querySelector(".can-overclocked-result");

canOverclockedButton.addEventListener("click", function() {
    let processor = document.getElementById("can-overclocked-input").value;
    if (processor != "") {
        displayResult(canOverclocked(processor))
    }
});

function canOverclocked(processor) {
    let vendor = processor.split(" ")[0];
    if (vendor == "Intel") {
        if (processor.slice(-1) == "K") {
            return 1;
        } else {
            return 0;
        }
    } else if (vendor == "AMD") {
        return 1;
    } else {
        return -1;
    }
}

function displayResult(result) {
    if (result == 1) {
        canOverclockedResult.innerHTML = "Ваш процессор можно разогнать";
    }
    else if (result == 0) {
        canOverclockedResult.innerHTML = "Ваш процессор нельзя разогнать";
    } else {
        canOverclockedResult.innerHTML = "Увы, мы не знаем, можно ли разогнать ваш процессор";
    }
    canOverclockedResult.style.display = "block";
}

