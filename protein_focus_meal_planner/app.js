// Application data
const appData = {
    proteinSources: [
        {"name": "Red Lentils (1 cup cooked)", "protein": 18, "cost": 0.25, "proteinPerEuro": 72},
        {"name": "Black Beans (1 cup cooked)", "protein": 15, "cost": 0.30, "proteinPerEuro": 50},
        {"name": "Canned Tuna (85g)", "protein": 22, "cost": 0.60, "proteinPerEuro": 36.7},
        {"name": "Plant Protein Powder (30g)", "protein": 27, "cost": 0.80, "proteinPerEuro": 33.8},
        {"name": "Chickpeas (1 cup cooked)", "protein": 15, "cost": 0.45, "proteinPerEuro": 33.3},
        {"name": "Peanut Butter (2 tbsp)", "protein": 7.6, "cost": 0.25, "proteinPerEuro": 30.4},
        {"name": "Eggs (2 large)", "protein": 12.4, "cost": 0.62, "proteinPerEuro": 20},
        {"name": "Tofu (100g)", "protein": 15, "cost": 0.80, "proteinPerEuro": 18.8},
        {"name": "Greek Yogurt (200g)", "protein": 20.6, "cost": 1.20, "proteinPerEuro": 17.2},
        {"name": "Quinoa (1 cup cooked)", "protein": 8, "cost": 0.50, "proteinPerEuro": 16}
    ],
    weeklyMeals: {
        week1: {
            name: "Week 1 - High Protein Foundation",
            meals: {
                breakfast: {name: "Oat porridge with plant protein powder (30g) + almond slices + chia seeds", protein: 35, cost: 1.50},
                lunch: {name: "Red lentil curry with quinoa (1 cup each) + mixed vegetables", protein: 26, cost: 2.00},
                dinner: {name: "Tuna salad (85g tuna) with chickpeas (1 cup) + vegetables + olive oil", protein: 37, cost: 2.50},
                snack1: {name: "Greek yogurt (200g) with nuts", protein: 26, cost: 1.80},
                snack2: {name: "Peanut butter (2 tbsp) on whole grain toast + oat milk", protein: 9, cost: 0.80}
            },
            dailyTotal: {protein: 133, cost: 8.60}
        },
        week2: {
            name: "Week 2 - Plant Power",
            meals: {
                breakfast: {name: "Scrambled tofu (100g) with vegetables + whole grain toast + oat milk", protein: 18, cost: 1.30},
                lunch: {name: "Black bean and quinoa bowl (1 cup each) with avocado", protein: 23, cost: 2.20},
                dinner: {name: "Chickpea curry with rice + side salad", protein: 20, cost: 1.80},
                snack1: {name: "Cottage cheese (180g) with berries", protein: 24, cost: 2.00},
                snack2: {name: "Plant protein smoothie (30g powder) with banana and oat milk", protein: 28, cost: 1.50}
            },
            dailyTotal: {protein: 113, cost: 8.80}
        },
        week3: {
            name: "Week 3 - Balanced Mix",
            meals: {
                breakfast: {name: "Greek yogurt (200g) with granola and chia seeds", protein: 26, cost: 1.80},
                lunch: {name: "Lentil soup with bread + tuna salad (85g) on side", protein: 30, cost: 2.10},
                dinner: {name: "Tofu stir-fry (100g) with quinoa and vegetables", protein: 23, cost: 2.00},
                snack1: {name: "Hummus with vegetables + whole grain crackers", protein: 8, cost: 1.20},
                snack2: {name: "Almond butter smoothie with plant milk and protein powder", protein: 30, cost: 1.60}
            },
            dailyTotal: {protein: 117, cost: 8.70}
        },
        week4: {
            name: "Week 4 - Complete Nutrition",
            meals: {
                breakfast: {name: "Quinoa breakfast bowl with plant protein powder + nuts and seeds", protein: 35, cost: 1.90},
                lunch: {name: "Three-bean salad with quinoa and olive oil dressing", protein: 25, cost: 1.80},
                dinner: {name: "Egg curry (2 eggs) with lentils and rice", protein: 30, cost: 1.70},
                snack1: {name: "Protein smoothie bowl with Greek yogurt and seeds", protein: 26, cost: 2.00},
                snack2: {name: "Mixed nuts and seeds with plant milk", protein: 7, cost: 1.00}
            },
            dailyTotal: {protein: 123, cost: 8.40}
        }
    },
    shoppingLists: {
        week1: {
            proteins: [
                {item: "Plant protein powder (1kg)", cost: 25.00},
                {item: "Canned tuna (4 cans)", cost: 2.40},
                {item: "Greek yogurt (1.4kg)", cost: 8.40},
                {item: "Chickpeas (500g)", cost: 2.25},
                {item: "Red lentils (500g)", cost: 1.50}
            ],
            pantry: [
                {item: "Quinoa (500g)", cost: 4.50},
                {item: "Oats (1kg)", cost: 2.00},
                {item: "Peanut butter (1 jar)", cost: 4.00},
                {item: "Chia seeds (200g)", cost: 3.50},
                {item: "Almonds (200g)", cost: 4.00}
            ],
            fresh: [
                {item: "Oat milk (2L)", cost: 3.00},
                {item: "Whole grain bread", cost: 2.50},
                {item: "Mixed vegetables", cost: 8.00},
                {item: "Olive oil", cost: 5.00}
            ]
        },
        week2: {
            proteins: [
                {item: "Tofu (400g)", cost: 3.20},
                {item: "Black beans (500g)", cost: 1.50},
                {item: "Cottage cheese (900g)", cost: 8.00},
                {item: "Plant protein powder (1kg)", cost: 25.00},
                {item: "Quinoa (500g)", cost: 4.50}
            ],
            pantry: [
                {item: "Rice (2kg)", cost: 3.00},
                {item: "Whole grain bread", cost: 2.50},
                {item: "Chickpeas (500g)", cost: 2.25}
            ],
            fresh: [
                {item: "Oat milk (2L)", cost: 3.00},
                {item: "Avocado (4 pieces)", cost: 4.00},
                {item: "Mixed vegetables", cost: 8.00},
                {item: "Berries (500g)", cost: 5.00},
                {item: "Banana (1kg)", cost: 1.50}
            ]
        },
        week3: {
            proteins: [
                {item: "Greek yogurt (1.4kg)", cost: 8.40},
                {item: "Lentils (500g)", cost: 1.50},
                {item: "Canned tuna (4 cans)", cost: 2.40},
                {item: "Tofu (400g)", cost: 3.20},
                {item: "Plant protein powder (1kg)", cost: 25.00}
            ],
            pantry: [
                {item: "Granola (500g)", cost: 4.00},
                {item: "Chia seeds (200g)", cost: 3.50},
                {item: "Quinoa (500g)", cost: 4.50},
                {item: "Hummus (400g)", cost: 3.00},
                {item: "Almond butter (1 jar)", cost: 6.00}
            ],
            fresh: [
                {item: "Whole grain bread", cost: 2.50},
                {item: "Mixed vegetables", cost: 8.00},
                {item: "Crackers", cost: 2.00},
                {item: "Plant milk (2L)", cost: 3.00}
            ]
        },
        week4: {
            proteins: [
                {item: "Quinoa (500g)", cost: 4.50},
                {item: "Plant protein powder (1kg)", cost: 25.00},
                {item: "Mixed beans (1.5kg)", cost: 4.50},
                {item: "Eggs (12 pieces)", cost: 3.75},
                {item: "Lentils (500g)", cost: 1.50},
                {item: "Greek yogurt (1.4kg)", cost: 8.40}
            ],
            pantry: [
                {item: "Mixed nuts (500g)", cost: 8.00},
                {item: "Seeds mix (300g)", cost: 6.00},
                {item: "Rice (2kg)", cost: 3.00}
            ],
            fresh: [
                {item: "Plant milk (2L)", cost: 3.00},
                {item: "Olive oil", cost: 5.00},
                {item: "Mixed vegetables", cost: 8.00}
            ]
        }
    },
    proteinTargets: {
        weight: 75,
        minimum: 120,
        optimal: 150,
        maximum: 180
    }
};

// Application state
let currentProtein = 0;
let proteinLog = [];
let targetProtein = 150;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeWeekTabs();
    updateDashboard();
    updateProteinDisplay();
    setCurrentDate();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Week tab functionality
function initializeWeekTabs() {
    const weekButtons = document.querySelectorAll('.week-btn');
    const weekContents = document.querySelectorAll('.week-content');

    weekButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetWeek = button.getAttribute('data-week');
            
            // Remove active class from all week tabs and contents
            weekButtons.forEach(btn => btn.classList.remove('active'));
            weekContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked week tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetWeek).classList.add('active');
            
            // Update dashboard with selected week data
            updateDashboardForWeek(targetWeek);
        });
    });
}

// Update dashboard
function updateDashboard() {
    updateProteinProgress();
    updateDailyCost();
    updateCurrentWeek();
}

function updateDashboardForWeek(weekKey) {
    const weekData = appData.weeklyMeals[weekKey];
    if (weekData) {
        document.getElementById('daily-cost').textContent = weekData.dailyTotal.cost.toFixed(2);
        document.getElementById('current-week').textContent = weekKey.replace('week', '');
        
        // Estimate calories (rough calculation: protein * 4 + estimated carbs/fats)
        const estimatedCalories = Math.round(weekData.dailyTotal.protein * 4 + 1800);
        document.getElementById('daily-calories').textContent = estimatedCalories;
    }
}

function updateProteinProgress() {
    const percentage = Math.min((currentProtein / targetProtein) * 100, 100);
    const progressFill = document.getElementById('protein-progress-fill');
    const progressValue = document.getElementById('protein-percentage');
    const currentProteinEl = document.getElementById('current-protein');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressValue) {
        progressValue.textContent = Math.round(percentage) + '%';
    }
    
    if (currentProteinEl) {
        currentProteinEl.textContent = currentProtein;
    }
    
    // Update progress circle gradient
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        const degrees = (percentage / 100) * 360;
        progressCircle.style.background = `conic-gradient(var(--color-primary) ${degrees}deg, var(--color-secondary) ${degrees}deg)`;
    }
    
    updateProteinMeter();
    updateProteinStatus();
}

function updateProteinMeter() {
    const meterFill = document.getElementById('protein-meter');
    if (meterFill) {
        const percentage = Math.min((currentProtein / appData.proteinTargets.maximum) * 100, 100);
        meterFill.style.width = percentage + '%';
    }
}

function updateProteinStatus() {
    const statusEl = document.getElementById('protein-status');
    if (!statusEl) return;
    
    let status = '';
    let className = '';
    
    if (currentProtein >= appData.proteinTargets.optimal) {
        status = 'Excellent! Protein target achieved 🎯';
        className = 'status-good';
    } else if (currentProtein >= appData.proteinTargets.minimum) {
        status = 'Good progress! Close to optimal target 👍';
        className = 'status-close';
    } else if (currentProtein > 0) {
        status = 'Keep going! Add more protein sources 💪';
        className = 'status-low';
    } else {
        status = 'Add protein to start tracking';
        className = '';
    }
    
    statusEl.textContent = status;
    statusEl.className = 'protein-status ' + className;
}

function updateDailyCost() {
    // Default to week 1 cost
    document.getElementById('daily-cost').textContent = '8.60';
}

function updateCurrentWeek() {
    document.getElementById('current-week').textContent = '1';
}

function setCurrentDate() {
    const currentDateEl = document.getElementById('current-date');
    if (currentDateEl) {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        currentDateEl.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Protein tracking functions
function addProtein(amount, source) {
    currentProtein += amount;
    
    // Add to log
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    proteinLog.push({
        time: timeString,
        source: source,
        amount: amount
    });
    
    updateProteinDisplay();
    updateProteinLog();
    
    // Add visual feedback
    const progressValue = document.getElementById('protein-percentage');
    if (progressValue) {
        progressValue.classList.add('progress-update');
        setTimeout(() => {
            progressValue.classList.remove('progress-update');
        }, 300);
    }
}

function addQuickProtein(amount) {
    let source = '';
    if (amount === 27) source = 'Protein Powder';
    else if (amount === 12) source = 'Eggs';
    else source = 'Quick Add';
    
    addProtein(amount, source);
}

function updateProteinDisplay() {
    updateProteinProgress();
}

function updateProteinLog() {
    const logContainer = document.getElementById('protein-log');
    if (!logContainer) return;
    
    if (proteinLog.length === 0) {
        logContainer.innerHTML = '<p class="empty-log">No protein logged yet today</p>';
        return;
    }
    
    const logHTML = proteinLog.map(entry => `
        <div class="log-entry">
            <span>${entry.time} - ${entry.source}</span>
            <span class="protein-badge">+${entry.amount}g</span>
        </div>
    `).join('');
    
    logContainer.innerHTML = logHTML;
}

function clearProteinLog() {
    currentProtein = 0;
    proteinLog = [];
    updateProteinDisplay();
    updateProteinLog();
}

// Shopping list functionality
function generateShoppingList() {
    const selectedWeek = document.getElementById('week-select').value;
    const shoppingData = appData.shoppingLists[selectedWeek];
    
    if (!shoppingData) return;
    
    // Update proteins list
    updateShoppingCategory('proteins-list', 'proteins-cost', shoppingData.proteins);
    
    // Update pantry list
    updateShoppingCategory('pantry-list', 'pantry-cost', shoppingData.pantry);
    
    // Update fresh foods list
    updateShoppingCategory('fresh-list', 'fresh-cost', shoppingData.fresh);
}

function updateShoppingCategory(listId, costId, items) {
    const listEl = document.getElementById(listId);
    const costEl = document.getElementById(costId);
    
    if (!listEl || !costEl) return;
    
    const totalCost = items.reduce((sum, item) => sum + item.cost, 0);
    
    listEl.innerHTML = items.map(item => `
        <li>
            <span>${item.item}</span>
            <span>€${item.cost.toFixed(2)}</span>
        </li>
    `).join('');
    
    costEl.textContent = `€${totalCost.toFixed(2)}`;
}

// Initialize shopping list with default week
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        generateShoppingList();
    }, 100);
});

// Target adjustment (for future enhancement)
function adjustTarget(newTarget) {
    targetProtein = newTarget;
    document.getElementById('target-protein').textContent = newTarget;
    updateProteinDisplay();
}

// Utility functions
function formatCurrency(amount) {
    return '€' + amount.toFixed(2);
}

function formatProtein(amount) {
    return amount.toFixed(1) + 'g';
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add event listeners for responsive behavior
window.addEventListener('resize', debounce(() => {
    updateProteinDisplay();
}, 250));

// Export functions for global access
window.addProtein = addProtein;
window.addQuickProtein = addQuickProtein;
window.clearProteinLog = clearProteinLog;
window.generateShoppingList = generateShoppingList;
window.adjustTarget = adjustTarget;