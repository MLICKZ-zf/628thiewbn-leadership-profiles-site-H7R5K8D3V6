const homeView = document.getElementById("homeView");
const directoryView = document.getElementById("directoryView");

const sectionContainer = document.getElementById("sectionContainer");
const sectionHeading = document.getElementById("sectionHeading");
const cardContainer = document.getElementById("cardContainer");
const backToHome = document.getElementById("backToHome");

const modal = document.getElementById("bioModal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalTitle = document.getElementById("modalTitle");
const modalBio = document.getElementById("modalBio");

const sections = [...new Set(leaders.map(person => person.section))];


/*
    Build the table of contents on the landing page.
*/
function buildSectionDirectory() {
    sectionContainer.innerHTML = "";

    sections.forEach(section => {
        const sectionButton = document.createElement("button");

        sectionButton.type = "button";
        sectionButton.className = "section-button";

        const leaderCount = leaders.filter(
            person => person.section === section
        ).length;

        sectionButton.innerHTML = `
            <span class="section-name">${section}</span>
            <span class="section-count">
                ${leaderCount} ${leaderCount === 1 ? "Leader" : "Leaders"}
            </span>
            <span class="section-arrow" aria-hidden="true">&rsaquo;</span>
        `;

        sectionButton.addEventListener("click", () => {
            showSection(section);
        });

        sectionContainer.appendChild(sectionButton);
    });
}


/*
    Hide the landing page and show the selected section.
*/
function showSection(section) {
    sectionHeading.textContent = section;

    renderCards(section);

    homeView.classList.add("hidden");
    directoryView.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/*
    Return to the table-of-contents landing page.
*/
function showHome() {
    directoryView.classList.add("hidden");
    homeView.classList.remove("hidden");

    cardContainer.innerHTML = "";
    sectionHeading.textContent = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/*
    Render every leader belonging to the selected section.
*/
function renderCards(section) {
    cardContainer.innerHTML = "";

    const sectionLeaders = leaders.filter(
        person => person.section === section
    );

    sectionLeaders.forEach(person => {
        const card = document.createElement("article");

        card.className = "card";

        card.innerHTML = `
            <img
                src="${person.image}"
                alt="Portrait of ${person.name}"
            >

            <div class="card-body">
                <h2>${person.name}</h2>
                <h3>${person.title}</h3>

                <button type="button">
                    View Bio
                </button>
            </div>
        `;

        const bioButton = card.querySelector("button");

        bioButton.addEventListener("click", () => {
            openBiography(person);
        });

        cardContainer.appendChild(card);
    });
}


/*
    Populate and open the biography modal.
*/
function openBiography(person) {
    modalImage.src = person.image;
    modalImage.alt = `Portrait of ${person.name}`;

    modalName.textContent = person.name;
    modalTitle.textContent = person.title;
    modalBio.textContent = person.bio;

    modal.classList.remove("hidden");
}


/*
    Close the biography modal.
*/
function closeBiography() {
    modal.classList.add("hidden");
}


backToHome.addEventListener("click", showHome);

closeModal.addEventListener("click", closeBiography);

window.addEventListener("click", event => {
    if (event.target === modal) {
        closeBiography();
    }
});

window.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
        closeBiography();
    }
});


buildSectionDirectory();
