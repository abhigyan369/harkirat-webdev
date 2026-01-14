const courseData = [
    {
        id: 'week1',
        title: 'Week 1',
        description: '',
        topics: [
            'Web Dev _ Devops Orientation',
            'Basics of Javascript ',
            'HTML basic (Tags, Attributes)',
            'CSS  Basics'
        ]
    },
    {
        id: 'week2',
        title: 'Week 2',
        description: '',
        topics: [
            'Async JS',
            'Promises',
            ' Bash and Terminals',
            'Bash and Terminal (Advance)',
            'Installing Node.js',
            'Callback hell_ Rejects and async_await'
        ]
    },
    {
        id: 'week3',
        title: 'Week 3',
        description: 'DOM Basics & Advance',
        topics: [
            'DOM Basics',
            'DOM Advance'
        ]
    },
    {
        id: 'week4',
        title: 'Week 4',
        description: 'NodeJs | Bun | JS RUN-TIME',
        topics: [
            'NodeJs | Bun | JS RUN-TIME',
            'HTTPS SEVERS',
            'Express and HTTP server Postman',
            'Middleware.'
        ]
    },
    {
        id: 'week5',
        title: 'Week 5',
        description: 'Introduction to Node.js and servers.',
        topics: [
            'Headers Query params and Express',
            'Middlewares and cors.',
            'Git and Github',
            'Filter, Map, Arrow Functions',
            'Axios vs Fetch'
        ]
    },
     {
        id: 'week6',
        title: 'Week 6',
        description: '',
        topics: [
            'HTTP Deep dive',
            'Auth and connecting FE to BE',
            'JWT and Auth Recap',
            'Mongo Installation'
        ]
    },
    {
        id: 'week7',
        title: 'Week 7',
        description: '',
        topics: [
            'MongoDB',
            'Password,Zod Part 1.',
            'Pasword,Zod Part 2'
        ]
    },
    {
        id: 'week8',
        title: 'Week 8',
        description: '',
        topics: [
            'Backend Of Course Selling App',
            'Backend Of Course Selling App Part - 2.',
            ' Mongo Deep Dive'
        ]
    },
    {
        id: 'week9',
        title: 'Week 9',
        description: '',
        topics: [
            'React Basics',
            'React useState',
            'React from Basic',
            'React From Basic (Part2)'
        ]
    },
    {
        id: 'week10',
        title: 'Week 10',
        description: '',
        topics: [
            'React Part 2 (SPAs, Routing)',
            'React Part 3 (context Api,Rolling up the state)'
        ]
    },
    {
        id: 'week11',
        title: 'Week 11',
        description: '',
        topics: [
            'Custom Hooks',
            'Recoil',
            'Recoil Deep Dive',
        ]
    }
];

const STORAGE_KEY = 'course_progress_v1';

// State
let progressState = new Set(); // Stores indices of checked items like "weekId-topicIndex"

// DOM Elements
const courseContainer = document.getElementById('course-container');
const totalProgressBar = document.getElementById('total-progress-bar');
const totalProgressText = document.getElementById('total-progress-text');
const topicsCount = document.getElementById('topics-count');
const resetBtn = document.getElementById('reset-btn');

// Initialization
function init() {
    loadProgress();
    renderCourse();
    updateOverallProgress();
}

// Load from LocalStorage
function loadProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        progressState = new Set(JSON.parse(stored));
    }
    // Expand first week logic if needed/desired, or leave all collapsed
}

// Save to LocalStorage
function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...progressState]));
    updateOverallProgress();
}

// Reset Progress
resetBtn.addEventListener('click', () => {
    if(confirm('Are you sure you want to reset all progress?')) {
        progressState.clear();
        saveProgress();
        renderCourse(); // Re-render to clear checkboxes
    }
});

// Render the Course
function renderCourse() {
    courseContainer.innerHTML = '';

    courseData.forEach((week, weekIndex) => {
        const weekCard = document.createElement('div');
        weekCard.className = 'week-card bg-dark-800 rounded-xl border border-dark-700 overflow-hidden transition-all duration-300';
        
        // Calculate week progress
        const weekTotal = week.topics.length;
        const weekCompleted = week.topics.filter((_, idx) => progressState.has(`${week.id}-${idx}`)).length;
        const weekPercent = Math.round((weekCompleted / weekTotal) * 100);

        // Header Section (Clickable)
        const header = document.createElement('div');
        header.className = 'p-6 cursor-pointer flex items-center justify-between hover:bg-dark-700/50 transition-colors';
        header.onclick = () => toggleWeek(week.id);

        header.innerHTML = `
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                    <h2 class="text-xl font-semibold text-white">${week.title}</h2>
                    ${weekPercent === 100 ? '<span class="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium">Completed</span>' : ''}
                </div>
                <p class="text-sm text-gray-400">${week.description}</p>
                
                <!-- Week Progress Bar (Small) -->
                <div class="mt-3 flex items-center gap-3">
                     <div class="flex-1 bg-dark-600 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-blue-500 h-full rounded-full transition-all duration-300" style="width: ${weekPercent}%"></div>
                    </div>
                    <span class="text-xs text-gray-400 font-medium">${weekCompleted}/${weekTotal}</span>
                </div>
            </div>
            <div class="ml-4 text-gray-400 transform transition-transform duration-300" id="icon-${week.id}">
                <i class="ri-arrow-down-s-line text-2xl"></i>
            </div>
        `;

        // Content Section (Collapsible)
        const content = document.createElement('div');
        content.id = `content-${week.id}`;
        content.className = 'hidden bg-dark-900/30 border-t border-dark-700';
        
        const topicList = document.createElement('ul');
        topicList.className = 'p-4 space-y-3';

        week.topics.forEach((topic, topicIdx) => {
            const topicId = `${week.id}-${topicIdx}`;
            const isChecked = progressState.has(topicId);
            
            const li = document.createElement('li');
            li.className = 'group flex items-start gap-4 p-3 rounded-lg hover:bg-dark-700/30 transition-colors';
            
            li.innerHTML = `
                <div class="relative flex items-center">
                    <input type="checkbox" id="${topicId}" 
                        class="checkbox-ticker peer h-5 w-5 cursor-pointer appearance-none rounded border border-dark-600 bg-dark-800 checked:border-blue-500 checked:bg-blue-500 transition-all hover:border-blue-400"
                        ${isChecked ? 'checked' : ''}>
                    <i class="ri-check-line absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-sm font-bold"></i>
                </div>
                <label for="${topicId}" class="flex-1 cursor-pointer text-gray-300 text-sm md:text-base select-none transition-colors peer-checked:!text-gray-500 peer-checked:line-through group-hover:text-white">
                    ${topic}
                </label>
            `;
            
            // Event Listener for Checkbox
            const checkbox = li.querySelector('input');
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    progressState.add(topicId);
                    partyMode(e.target); // Optional fun effect
                } else {
                    progressState.delete(topicId);
                }
                saveProgress();
                // Re-render header to update progress bar without collapsing (hacky but works, or just update DOM)
                updateWeekHeaderUI(week.id, week.topics.length); 
            });

            topicList.appendChild(li);
        });

        content.appendChild(topicList);
        weekCard.appendChild(header);
        weekCard.appendChild(content);
        courseContainer.appendChild(weekCard);
    });
}

// Update just the header UI for a specific week (optimized re-render)
function updateWeekHeaderUI(weekId, totalTopics) {
    // Count completed
    const completedCount = Array.from({length: totalTopics}).filter((_, i) => progressState.has(`${weekId}-${i}`)).length;
    const percent = Math.round((completedCount / totalTopics) * 100);

    // Find elements - this assumes specific DOM structure in renderCourse
    // Ideally we would data-bind but vanilla JS is fine here
    // We will just re-render everything for simplicity in this MVP to avoid drift, 
    // BUT re-rendering closes the accordion. So let's stick to full re-render for now
    // and handle open state persistence if requested.
    // Actually, let's just update the overall bar to avoid closing accordions.
    // The weekly bar inside the header won't update dynamically unless we target it.
    // Let's grab the header elements relative to the changed input?
    // For MVP, re-rendering ONLY the progress bar of that card logic is better.
    
    // Finding the card logic:
    // This part is a bit tricky in pure Vanilla without IDs on every element.
    // Let's simply re-calculate overall progress, and accepting that 'week progress' 
    // might require a reload or we add IDs to the bars.
    
    // Let's add ID to the week progress elements in renderCourse:
    // We'll regenerate the whole app for simplicity or add specific IDs.
    // IMPROVEMENT: Let's simply re-call renderCourse? No that closes folders.
    // Let's add data-attributes to update.
    
    // NOTE: For this version, let's just live update the global, and maybe update the text locally.
    updateOverallProgress();

    // TARGETED UPDATE attempt
    const weekContent = document.getElementById(`content-${weekId}`);
    const weekCard = weekContent.parentElement;
    const progressBar = weekCard.querySelector('.bg-blue-500'); // The inner bar
    const progressText = weekCard.querySelector('.text-gray-400.font-medium'); // The text 3/5
    
    if (progressBar && progressText) {
        progressBar.style.width = `${percent}%`;
        progressText.innerText = `${completedCount}/${totalTopics}`;
    }
}


function toggleWeek(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

function updateOverallProgress() {
    // Flatten all topics
    let totalTopics = 0;
    courseData.forEach(w => totalTopics += w.topics.length);
    
    const completed = progressState.size;
    const percent = totalTopics === 0 ? 0 : Math.round((completed / totalTopics) * 100);
    
    totalProgressBar.style.width = `${percent}%`;
    totalProgressText.innerText = `${percent}%`;
    topicsCount.innerText = `${completed} / ${totalTopics} Topics Completed`;
}

// Confetti/Party effect placeholder (user didn't explicitly ask but good for "Bonus")
function partyMode(element) {
    // Could add simple CSS animation pop here
    element.parentElement.classList.add('scale-110');
    setTimeout(() => {
        element.parentElement.classList.remove('scale-110');
    }, 200);
}

// Start
init();
