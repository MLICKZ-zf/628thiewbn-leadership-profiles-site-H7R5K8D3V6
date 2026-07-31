const tabsContainer = document.getElementById("tabs");
const cardContainer = document.getElementById("cardContainer");

const modal = document.getElementById("bioModal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalTitle = document.getElementById("modalTitle");
const modalBio = document.getElementById("modalBio");

const sections = [...new Set(leaders.map(x => x.section))];

let activeSectionIndex = 0;

function activateTab(index) {
    // Prevent navigation beyond the first or last tab
    if (index < 0 || index >= sections.length) {
        return;
    }

    activeSectionIndex = index;

    const tabButtons = document.querySelectorAll(".tab-btn");

    tabButtons.forEach(button => {
        button.classList.remove("active");
    });

    const activeButton = tabButtons[activeSectionIndex];

    activeButton.classList.add("active");

    renderCards(sections[activeSectionIndex]);

    // Keep the selected tab visible in the horizontal navigation
    activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
    });
}

function buildTabs() {
    sections.forEach((section, index) => {
        const btn = document.createElement("button");

        btn.className = "tab-btn";
        btn.textContent = section;

        if(index === 0) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            activateTab(index);
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

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const minimumSwipeDistance = 50;

cardContainer.addEventListener(
    "touchstart",
    event => {
        const touch = event.changedTouches[0];

        touchStartX = touch.screenX;
        touchStartY = touch.screenY;
    },
    { passive: true }
);

cardContainer.addEventListener(
    "touchend",
    event => {
        const touch = event.changedTouches[0];

        touchEndX = touch.screenX;
        touchEndY = touch.screenY;

        handleSwipe();
    },
    { passive: true }
);

function handleSwipe() {
    const horizontalDistance = touchEndX - touchStartX;
    const verticalDistance = touchEndY - touchStartY;

    // Ignore short movements
    if (Math.abs(horizontalDistance) < minimumSwipeDistance) {
        return;
    }

    // Ignore mostly vertical movement so normal page scrolling still works
    if (Math.abs(verticalDistance) > Math.abs(horizontalDistance)) {
        return;
    }

    if (horizontalDistance < 0) {
        // Swipe left: move to the next tab
        activateTab(activeSectionIndex + 1);
    } else {
        // Swipe right: move to the previous tab
        activateTab(activeSectionIndex - 1);
    }
}

buildTabs();
activateTab(0);
