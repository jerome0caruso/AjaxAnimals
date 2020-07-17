let counter = 1;
const animalDiv = document.getElementById("animal");
const button = document.getElementById("btn");


button.addEventListener("click", function () {
    const ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", `https://learnwebcode.github.io/json-example/animals-${counter}.json`);
    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            let ourData = JSON.parse(ourRequest.responseText);
            renderHtml(ourData);
        } else {
            console.log("do something")
        }

    }
    ourRequest.onerror = function () {
        console.log("do something")
    }
    ourRequest.send();
    counter++;
    if (counter > 3) {
        button.classList.add("hide");

    }

})
function renderHtml(data) {
    let htmlStr = "";
    const regex = /[,]/g;

    data.forEach((item, i) => {
        htmlStr += `
			<p>
			${item.name} is a ${item.species} that likes to eat
			${item.foods.likes.map((like, i) => {
            return like;
        })}
			and dislikes ${item.foods.dislikes.map((dislike, i) => {
            return dislike;
        })}
			</p>	
		`})

    animalDiv.insertAdjacentHTML("beforeend", htmlStr.replace(regex, " and "))
}