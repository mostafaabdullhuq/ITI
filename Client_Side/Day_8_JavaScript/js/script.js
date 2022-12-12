let cardsContainer = document.querySelector(".cards-container");

window.addEventListener("load", function () {
    fetch("https://reqres.in/api/users?page=1")
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse.data)
        .then((usersData) => {
            return usersData.map((user) => {
                return {
                    id: user.id,
                    name: user.first_name + " " + user.last_name,
                    email: user.email,
                    avatar: user.avatar,
                };
            });
        })
        .then((usersList) => {
            usersList.forEach((user) => {
                let userCard = document.createElement("div"),
                    cardImg = document.createElement("img"),
                    cardBody = document.createElement("div"),
                    cardTitle = document.createElement("h5"),
                    cardList = document.createElement("ul"),
                    cardListItem1 = document.createElement("li");
                cardListItem2 = document.createElement("li");
                userCard.classList.add("card", "col-3", "me-3", "mb-3");
                cardImg.src = user.avatar;
                cardImg.alt = user.name;
                cardImg.classList.add("card-img-top");
                cardBody.classList.add("card-body");
                cardTitle.textContent = user.name;
                cardTitle.classList.add("card-title");
                cardList.classList.add("list-group", "list-group-flush");
                cardListItem1.textContent = `Email: ${user.email}`;
                cardListItem1.classList.add("list-group-item");
                cardList.appendChild(cardListItem1);
                cardListItem2.textContent = `ID: ${user.id}`;
                cardListItem2.classList.add("list-group-item");
                cardList.appendChild(cardListItem2);
                cardBody.appendChild(cardTitle);
                userCard.appendChild(cardImg);
                userCard.appendChild(cardBody);
                userCard.appendChild(cardList);
                cardsContainer.appendChild(userCard);
            });
        })
        .catch((e) => {
            cardsContainer.textContent = "We cannot process your request right now, Please try again later.";
        });
});
