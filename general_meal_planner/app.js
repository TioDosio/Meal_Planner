class MealPlanner {
    constructor() {
        this.weeks = [];
        this.currentWeekIndex = 0;
        this.currentEditingCell = null;
        
        // Sample data from the provided JSON with 5 meal types
        this.sampleData = {
            "sampleWeeks": [
                {
                    "weekNumber": 1,
                }
            ]
        };
        
        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.updateWeekSelector();
        this.renderCurrentWeek();
    }

    loadData() {
        const savedData = localStorage.getItem('mealPlannerData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.weeks = data.weeks || [];
            this.currentWeekIndex = data.currentWeekIndex || 0;
        }
        
        // If no saved data, use sample data
        if (this.weeks.length === 0) {
            this.weeks = this.sampleData.sampleWeeks;
            this.saveData();
        }
    }

    saveData() {
        const data = {
            weeks: this.weeks,
            currentWeekIndex: this.currentWeekIndex
        };
        localStorage.setItem('mealPlannerData', JSON.stringify(data));
    }

    bindEvents() {
        // Week selector
        document.getElementById('weekSelector').addEventListener('change', (e) => {
            this.currentWeekIndex = parseInt(e.target.value);
            this.renderCurrentWeek();
            this.saveData();
        });

        // Control buttons
        document.getElementById('addWeekBtn').addEventListener('click', () => this.addNewWeek());
        document.getElementById('deleteWeekBtn').addEventListener('click', () => this.showDeleteWeekModal());
        document.getElementById('cleanWeekBtn').addEventListener('click', () => this.showCleanWeekModal());
        document.getElementById('generateListBtn').addEventListener('click', () => this.showShoppingList());
        document.getElementById('importBtn').addEventListener('click', () => this.showCsvImport());

        // Meal cells
        document.querySelectorAll('.meal-cell').forEach(cell => {
            cell.addEventListener('click', () => this.editMeal(cell));
            cell.setAttribute('tabindex', '0');
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.editMeal(cell);
                }
            });
        });

        // Modal events
        this.bindModalEvents();
        this.bindCsvImportEvents();
    }

    bindModalEvents() {
        // Edit meal modal
        document.getElementById('saveMealBtn').addEventListener('click', () => this.saveMeal());
        document.getElementById('cancelEditBtn').addEventListener('click', () => this.closeModal('editMealModal'));

        // Delete week modal
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.deleteCurrentWeek());
        document.getElementById('cancelDeleteBtn').addEventListener('click', () => this.closeModal('deleteWeekModal'));

        // Clean week modal
        document.getElementById('confirmCleanBtn').addEventListener('click', () => this.cleanCurrentWeek());
        document.getElementById('cancelCleanBtn').addEventListener('click', () => this.closeModal('cleanWeekModal'));

        // Shopping list modal
        document.getElementById('closeShoppingListBtn').addEventListener('click', () => this.closeModal('shoppingListModal'));
        document.getElementById('printShoppingListBtn').addEventListener('click', () => window.print());

        // Close modals when clicking backdrop or close button
        document.querySelectorAll('.modal').forEach(modal => {
            modal.querySelector('.modal__backdrop').addEventListener('click', () => this.closeModal(modal.id));
            modal.querySelector('.modal__close').addEventListener('click', () => this.closeModal(modal.id));
        });

        // Close modals with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    this.closeModal(openModal.id);
                }
            }
        });
    }

    bindCsvImportEvents() {
        const dropZone = document.getElementById('csvDropZone');
        const fileInput = document.getElementById('csvFileInput');

        dropZone.addEventListener('click', () => fileInput.click());
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleCsvFile(files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleCsvFile(e.target.files[0]);
            }
        });

        document.getElementById('cancelImportBtn').addEventListener('click', () => this.closeModal('csvImportModal'));
    }

    updateWeekSelector() {
        const selector = document.getElementById('weekSelector');
        selector.innerHTML = '';
        
        this.weeks.forEach((week, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Week ${week.weekNumber}`;
            if (index === this.currentWeekIndex) {
                option.selected = true;
            }
            selector.appendChild(option);
        });
    }

    renderCurrentWeek() {
        const currentWeek = this.weeks[this.currentWeekIndex];
        if (!currentWeek) return;

        document.getElementById('currentWeekTitle').textContent = `Week ${currentWeek.weekNumber}`;

        // Clear all cells first
        document.querySelectorAll('.meal-cell').forEach(cell => {
            cell.innerHTML = '';
            cell.classList.add('meal-cell--empty');
        });

        // Populate cells with meal data
        currentWeek.meals.forEach(meal => {
            const cell = document.querySelector(`[data-day="${meal.day}"][data-meal="${meal.mealType}"]`);
            if (cell) {
                cell.classList.remove('meal-cell--empty');
                cell.innerHTML = this.createMealContent(meal);
            }
        });
    }

    createMealContent(meal) {
        if (!meal.ingredients) return '';

        return `
            <div class="meal-content">
                <div class="meal-ingredients">${meal.ingredients}</div>
            </div>
        `;
    }

    editMeal(cell) {
        this.currentEditingCell = cell;
        const day = cell.dataset.day;
        const mealType = cell.dataset.meal;
        
        const currentWeek = this.weeks[this.currentWeekIndex];
        const existingMeal = currentWeek.meals.find(m => m.day === day && m.mealType === mealType);
        
        // Populate form
        document.getElementById('ingredients').value = existingMeal?.ingredients || '';
        
        // Update modal title
        document.getElementById('editMealTitle').textContent = `Edit ${day} ${mealType}`;
        
        this.showModal('editMealModal');
    }

    saveMeal() {
        if (!this.currentEditingCell) return;

        const day = this.currentEditingCell.dataset.day;
        const mealType = this.currentEditingCell.dataset.meal;
        const ingredients = document.getElementById('ingredients').value.trim();

        const currentWeek = this.weeks[this.currentWeekIndex];
        const existingMealIndex = currentWeek.meals.findIndex(m => m.day === day && m.mealType === mealType);

        if (ingredients) {
            const mealData = { day, mealType, ingredients };

            if (existingMealIndex >= 0) {
                currentWeek.meals[existingMealIndex] = mealData;
            } else {
                currentWeek.meals.push(mealData);
            }
        } else {
            // Remove meal if ingredients are empty
            if (existingMealIndex >= 0) {
                currentWeek.meals.splice(existingMealIndex, 1);
            }
        }

        this.saveData();
        this.renderCurrentWeek();
        this.closeModal('editMealModal');
    }

    addNewWeek() {
        const newWeekNumber = Math.max(...this.weeks.map(w => w.weekNumber)) + 1;
        const newWeek = {
            weekNumber: newWeekNumber,
            meals: []
        };
        
        this.weeks.push(newWeek);
        this.currentWeekIndex = this.weeks.length - 1;
        this.updateWeekSelector();
        this.renderCurrentWeek();
        this.saveData();
    }

    showDeleteWeekModal() {
        if (this.weeks.length === 1) {
            this.showErrorMessage('Cannot delete the last remaining week.');
            return;
        }

        const currentWeek = this.weeks[this.currentWeekIndex];
        document.getElementById('deleteWeekMessage').textContent = 
            `Are you sure you want to delete Week ${currentWeek.weekNumber}? This action cannot be undone.`;
        this.showModal('deleteWeekModal');
    }

    deleteCurrentWeek() {
        if (this.weeks.length === 1) return;

        this.weeks.splice(this.currentWeekIndex, 1);
        
        // Adjust current week index
        if (this.currentWeekIndex >= this.weeks.length) {
            this.currentWeekIndex = this.weeks.length - 1;
        }
        
        this.updateWeekSelector();
        this.renderCurrentWeek();
        this.saveData();
        this.closeModal('deleteWeekModal');
        this.showSuccessMessage('Week deleted successfully.');
    }

    showCleanWeekModal() {
        const currentWeek = this.weeks[this.currentWeekIndex];
        document.getElementById('cleanWeekMessage').textContent = 
            `Are you sure you want to clear all meals from Week ${currentWeek.weekNumber}? This will remove all ingredients and weights.`;
        this.showModal('cleanWeekModal');
    }

    cleanCurrentWeek() {
        const currentWeek = this.weeks[this.currentWeekIndex];
        currentWeek.meals = [];
        
        this.renderCurrentWeek();
        this.saveData();
        this.closeModal('cleanWeekModal');
        this.showSuccessMessage('Week cleaned successfully.');
    }

    showShoppingList() {
        const currentWeek = this.weeks[this.currentWeekIndex];
        const ingredientCounts = new Map();
        
        currentWeek.meals.forEach(meal => {
            if (meal.ingredients) {
                // Parse ingredients with weights
                const ingredientList = this.parseIngredients(meal.ingredients);
                ingredientList.forEach(ingredient => {
                    if (ingredientCounts.has(ingredient.name)) {
                        ingredientCounts.set(ingredient.name, 
                            ingredientCounts.get(ingredient.name) + ingredient.weight);
                    } else {
                        ingredientCounts.set(ingredient.name, ingredient.weight);
                    }
                });
            }
        });

        const shoppingListContent = document.getElementById('shoppingListContent');
        shoppingListContent.innerHTML = `
            <div class="shopping-list">
                <div class="shopping-category">
                    <h4>Shopping List for Week ${currentWeek.weekNumber}</h4>
                    <div class="shopping-items">
                        ${Array.from(ingredientCounts.entries()).map(([name, totalWeight]) => `
                            <div class="shopping-item">
                                <input type="checkbox" id="item-${name.replace(/\s+/g, '-')}" />
                                <label for="item-${name.replace(/\s+/g, '-')}">${name} (${totalWeight}g)</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        this.showModal('shoppingListModal');
    }

    parseIngredients(ingredientsString) {
        const ingredients = [];
        const items = ingredientsString.split(',');
        
        items.forEach(item => {
            const trimmed = item.trim();
            const match = trimmed.match(/^(.+?)\s*\((\d+)g\)$/);
            if (match) {
                ingredients.push({
                    name: match[1].trim(),
                    weight: parseInt(match[2])
                });
            } else {
                // Fallback for items without weight
                ingredients.push({
                    name: trimmed,
                    weight: 0
                });
            }
        });
        
        return ingredients;
    }

    showCsvImport() {
        this.showModal('csvImportModal');
    }

    handleCsvFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                this.parseCsvData(csv);
            } catch (error) {
                this.showErrorMessage('Error reading CSV file. Please check the format.');
            }
        };
        reader.readAsText(file);
    }

    parseCsvData(csvData) {
        const lines = csvData.trim().split('\n');
        if (lines.length < 2) {
            this.showErrorMessage('CSV file must contain at least a header and one data row.');
            return;
        }

        const headers = this.parseCsvLine(lines[0]);
        
        if (!this.validateCsvHeaders(headers)) {
            this.showErrorMessage('Invalid CSV format. Expected headers: Week,Day of the week,TypeOfMeal,Ingredients & Weights');
            return;
        }

        const weekMeals = new Map();

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const values = this.parseCsvLine(line);
            if (values.length < 4) continue;
            
            const [week, day, mealType, ingredients] = values;
            
            if (!this.isValidDay(day) || !this.isValidMealType(mealType)) {
                console.warn(`Skipping invalid row: ${line}`);
                continue;
            }

            const weekNumber = this.extractWeekNumber(week);
            if (!weekMeals.has(weekNumber)) {
                weekMeals.set(weekNumber, []);
            }

            weekMeals.get(weekNumber).push({
                day: day.trim(),
                mealType: mealType.trim(),
                ingredients: ingredients.trim()
            });
        }

        if (weekMeals.size === 0) {
            this.showErrorMessage('No valid meal data found in CSV file.');
            return;
        }

        this.importWeeksFromCsv(weekMeals);
    }

    parseCsvLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }

    validateCsvHeaders(headers) {
        const expectedHeaders = ['Week', 'Day of the week', 'TypeOfMeal', 'Ingredients & Weights'];
        return expectedHeaders.every((header, index) => 
            headers[index] && headers[index].trim().toLowerCase() === header.toLowerCase()
        );
    }

    isValidDay(day) {
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return validDays.includes(day.trim());
    }

    isValidMealType(mealType) {
        const validMealTypes = ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner'];
        return validMealTypes.includes(mealType.trim());
    }

    extractWeekNumber(weekString) {
        const match = weekString.match(/(\d+)/);
        return match ? parseInt(match[1]) : 1;
    }

    importWeeksFromCsv(weekMeals) {
        let importedCount = 0;

        for (const [weekNumber, meals] of weekMeals) {
            // Check if week already exists
            const existingWeekIndex = this.weeks.findIndex(w => w.weekNumber === weekNumber);
            
            if (existingWeekIndex >= 0) {
                // Update existing week
                this.weeks[existingWeekIndex].meals = meals;
            } else {
                // Create new week
                this.weeks.push({
                    weekNumber: weekNumber,
                    meals: meals
                });
            }
            importedCount += meals.length;
        }

        // Sort weeks by week number
        this.weeks.sort((a, b) => a.weekNumber - b.weekNumber);
        
        this.updateWeekSelector();
        this.renderCurrentWeek();
        this.saveData();
        this.closeModal('csvImportModal');
        this.showSuccessMessage(`Imported ${importedCount} meals successfully across ${weekMeals.size} week(s).`);
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus first focusable element in modal
        const modal = document.getElementById(modalId);
        const focusable = modal.querySelector('input, textarea, button');
        if (focusable) {
            setTimeout(() => focusable.focus(), 100);
        }
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
        document.body.style.overflow = '';
        this.currentEditingCell = null;
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        
        const container = document.querySelector('.container');
        container.insertBefore(messageDiv, container.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Initialize the meal planner when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MealPlanner();
});