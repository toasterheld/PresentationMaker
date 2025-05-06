document.getElementById("create-presentation").addEventListener("click", function () {
    const rawTopics = document.getElementById("topics").value.split("\n").filter(topic => topic.trim() !== "");
    if (!rawTopics.length) {
        alert("Bitte gib mindestens ein Thema ein.");
        return;
    }
    // Entferne führende Bindestriche und nachfolgende Leerzeichen, falls vorhanden
    const userTopics = rawTopics.map(topic => topic.trim().replace(/^-+\s*/, ''));
    
    const slides = [
        { type: "welcome", content: "<h2>Willkommen!</h2><p>Wir freuen uns, dich zu begrüßen.</p>" },
        { type: "checkin", content: "<h2>Check-in</h2><p>Wie fühlst du dich heute?</p>" },
        { type: "agenda", content: generateAgendaSlide(userTopics) },
        ...userTopics.map(topic => ({ type: "topic", content: `<h2>${topic}</h2>` })),
        { type: "checkout", content: "<h2>Check-out</h2><p>Was nimmst du aus dieser Präsentation mit?</p>" },
        { type: "farewell", content: "<h2>Verabschiedung</h2><p>Vielen Dank für deine Aufmerksamkeit!</p>" }
    ];

    let currentSlide = 0;

    const inputSection = document.getElementById("input-section");
    const presentationSection = document.getElementById("presentation-section");
    const slideContent = document.getElementById("slide-content");

    function renderSlide() {
        const slide = slides[currentSlide];
        slideContent.className = "slide " + slide.type;
        slideContent.innerHTML = slide.content;
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        // Keine farbliche Anpassung der Pfeile, da rein durch CSS gesteuert
    }

    function generateAgendaSlide(topics) {
        return `<div class="agenda-slide">
            <div class="agenda-left">
                <h2>Agenda</h2>
                <p>Für das heutige Treffen</p>
            </div>
            <div class="agenda-right">
                <ul>
                    ${topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
            </div>
        </div>`;
    }

    inputSection.style.display = "none";
    presentationSection.style.display = "flex";
    renderSlide();

    document.getElementById("prev-slide").addEventListener("click", function () {
        if (currentSlide > 0) {
            currentSlide--;
            renderSlide();
        }
    });

    document.getElementById("next-slide").addEventListener("click", function () {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            renderSlide();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (presentationSection.style.display !== "flex") return;
        if (e.key === "ArrowRight" || e.key === " " || e.code === "Space") {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                renderSlide();
            }
            e.preventDefault();
        } else if (e.key === "ArrowLeft") {
            if (currentSlide > 0) {
                currentSlide--;
                renderSlide();
            }
            e.preventDefault();
        }
    });
});