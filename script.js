const tabsContainer = document.getElementById("tabs");
const cardContainer = document.getElementById("cardContainer");

const modal = document.getElementById("bioModal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalTitle = document.getElementById("modalTitle");
const modalBio = document.getElementById("modalBio");

const sections = [...new Set(leaders.map(x => x.section))];

function buildTabs() {
    sections.forEach((section, index) => {
        const btn = document.createElement("button");

        btn.className = "tab-btn";
        btn.textContent = section;

        if(index === 0) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            document
                .querySelectorAll(".tab-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            renderCards(section);
        });

        tabsContainer.appendChild(btn);
    });
}

function renderCards(section) {

    cardContainer.innerHTML = "";

    leaders
        .filter(x => x.section === section)
        .forEach(person => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `
                <img src="${person.image}" alt="${person.name}">
                <div class="card-body">
                    <h2>${person.name}</h2>
                    <h3>${person.title}</h3>
                    <button>View Bio</button>
                </div>
            `;

            card.querySelector("button")
                .addEventListener("click", () => {

                    modalImage.src = person.image;
                    modalName.textContent = person.name;
                    modalTitle.textContent = person.title;
                    modalBio.textContent = person.bio;

                    modal.classList.remove("hidden");
                });

            cardContainer.appendChild(card);
        });
}

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

window.addEventListener("click", e => {
    if(e.target === modal) {
        modal.classList.add("hidden");
    }
});

buildTabs();
renderCards(sections[0]);
