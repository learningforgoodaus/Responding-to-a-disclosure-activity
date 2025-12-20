// script.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const scenarioTextElement = document.getElementById('scenario-text');
    const monologueElement = document.getElementById('monologue-text');
    const choicesContainer = document.getElementById('choices-container');
    const progressBar = document.getElementById('progress-bar');
    const trustValueElement = document.getElementById('trust-value');
    const trustIndicator = document.getElementById('trust-indicator');
    const avatarContainer = document.getElementById('avatar-container');

    // State management
    let currentNodeId = 'start';
    let trustScore = 50; // Neutral starting point (0-100)

    function updateTrustDisplay(score) {
        let label = "Neutral";
        let colorVar = "--trust-med"; // default purple

        if (score >= 70) {
            label = "High";
            colorVar = "--trust-high"; // green
        } else if (score <= 30) {
            label = "Testing Patience";
            colorVar = "--trust-low"; // grey
        } else if (score < 50) {
            label = "Uncertain";
        }

        trustValueElement.textContent = label;
        trustIndicator.style.color = `var(${colorVar})`;
    }

    function renderNode(nodeId) {
        const node = scenarioData[nodeId];

        if (!node) {
            console.error(`Node not found: ${nodeId}`);
            return;
        }

        // 1. Update Progress Bar
        const progress = node.progress || 0;
        progressBar.style.width = `${progress}%`;

        // 2. Clear previous content & Trigger Animations via CSS (Re-insertion approach)
        // To re-trigger CSS animations, we can clear and re-add or toggle classes. 
        // Here we just update text which will animate due to CSS 'animation' properties if we reset DOM slightly.
        // A simple way is to remove animation class and add it back, but our CSS binds animation to elements.
        // We will just replace content which is simple and works for this prototype.

        monologueElement.textContent = node.monologue || "";

        if (node.avatar && node.avatar.length > 2) {
            // Assume it's an icon name if length > 2 (e.g. "face")
            const avatarContainer = document.getElementById('avatar-container');
            avatarContainer.innerHTML = `<div class="avatar material-symbols-outlined">${node.avatar}</div>`;
        } else {
            // Standard letter avatar
            const avatarContainer = document.getElementById('avatar-container');
            avatarContainer.innerHTML = `<div class="avatar">${node.avatar || "S"}</div>`;
        }

        scenarioTextElement.textContent = node.text;

        // Reset animations by cloning node trick or just letting text update? 
        // Text update won't re-trigger animation on existing element.
        // Let's force re-flow.
        monologueElement.style.animation = 'none';
        monologueElement.offsetHeight; /* trigger reflow */
        monologueElement.style.animation = null;

        scenarioTextElement.style.animation = 'none';
        scenarioTextElement.offsetHeight; /* trigger reflow */
        scenarioTextElement.style.animation = null;

        // 3. Render Choices
        choicesContainer.innerHTML = '';
        node.choices.forEach(choice => {
            const button = document.createElement('div'); // Using div for complex styling, but button is better for semantic. 
            // Let's use button for accessibility, styled as div.
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;

            if (choice.isRestart) {
                btn.classList.add('restart');
            }

            btn.addEventListener('click', () => {
                handleChoice(choice);
            });

            choicesContainer.appendChild(btn);
        });
    }

    function handleChoice(choice) {
        // Update Trust
        if (choice.trustChange) {
            trustScore += choice.trustChange;
            // Clamp score 0-100
            trustScore = Math.max(0, Math.min(100, trustScore));
            updateTrustDisplay(trustScore);
        }

        // Reset state on restart
        if (choice.isRestart) {
            trustScore = 50;
            updateTrustDisplay(trustScore);
        }

        transitionToNode(choice.target);
    }

    function transitionToNode(targetNodeId) {
        currentNodeId = targetNodeId;
        renderNode(currentNodeId);
    }

    // Initialize
    renderNode('start');
    updateTrustDisplay(trustScore);
});
