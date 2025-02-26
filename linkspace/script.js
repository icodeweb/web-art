let links = document.querySelectorAll("a");
console.log(links.length);

let getRandomIndex = () => {
    return Math.floor(Math.random() * links.length);
};

let interval;
let shuffel = false;

document.addEventListener("keypress", (e) => {
    if (e.key === "s" && !shuffel) {
        shuffel = true;
        interval = setInterval(() => {
            let index = getRandomIndex();
            document.body.innerHTML = '';
            document.body.appendChild(links[index]);
        }, 1000);
    }

    if (e.key === "z" && shuffel) {
        clearInterval(interval); // Stop the interval
        shuffel = false; // Reset shuffle state
        location.reload(); // Uncomment if you want to reload
    }
});