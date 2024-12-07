document.addEventListener("DOMContentLoaded", () => {
    const totalDays = 20;
    const checkboxesContainer = document.getElementById("checkboxes");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    // Load saved progress from localStorage
    function loadProgress() {
        for (let i = 1; i <= totalDays; i++) {
            const checkboxId = `day-${i}`;
            const isChecked = localStorage.getItem(checkboxId) === "true"; // Retrieve state
            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = checkboxId;
            checkbox.checked = isChecked; // Apply saved state
            checkbox.addEventListener("change", () => saveProgress(checkboxId, checkbox.checked));

            const label = document.createElement("label");
            label.htmlFor = checkboxId;
            label.innerText = `Day ${i}`;

            const wrapper = document.createElement("div");
            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            checkboxesContainer.appendChild(wrapper);
        }
        updateProgress(); // Update progress bar on load
    }

    // Save the state of a checkbox to localStorage
    function saveProgress(id, isChecked) {
        localStorage.setItem(id, isChecked);
        updateProgress();
    }

    // Update the progress bar and percentage text
    function updateProgress() {
        const checkedCount = document.querySelectorAll("input[type='checkbox']:checked").length;
        const progress = Math.round((checkedCount / totalDays) * 100);
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `${progress}% Complete`;
    }

    // Initialize the checkboxes and progress bar
    loadProgress();
});