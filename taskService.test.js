// taskService.test.js
const { 
    addTask, 
    deleteTask, 
    updateTaskStatus, 
    clearCompletedTasks, 
    getTaskById 
} = require('./taskService');

describe('Task Service Unit Tests', () => {
    let mockTasks;

    // Har test se pehle fresh data setup hoga (Test Data)
    beforeEach(() => {
        mockTasks = [
            { id: 1, title: 'Learn Next.js', priority: 'High', completed: false },
            { id: 2, title: 'Fix Auth Bug', priority: 'Medium', completed: true },
            { id: 3, title: 'Write Lab Assignment', priority: 'High', completed: false }
        ];
    });

    // ==========================================
    // 1. Tests for addTask()
    // ==========================================
    describe('addTask', () => {
        it('should successfully add a valid task (Normal Case)', () => {
            const result = addTask(mockTasks, 'Setup CI/CD Pipeline', 'High');
            expect(result.id).toBe(4);
            expect(mockTasks.length).toBe(4);
        });

        it('should use default priority if not provided (Edge Case)', () => {
            const result = addTask(mockTasks, 'Review PR');
            expect(result.priority).toBe('Medium');
        });

        it('should throw an error for empty or invalid title (Invalid Case)', () => {
            expect(() => addTask(mockTasks, '')).toThrow("Task title cannot be empty");
            expect(() => addTask(mockTasks, '   ')).toThrow("Task title cannot be empty");
        });
    });

    // ==========================================
    // 2. Tests for deleteTask()
    // ==========================================
    describe('deleteTask', () => {
        it('should delete a task by a valid ID (Normal Case)', () => {
            const updatedTasks = deleteTask(mockTasks, 2);
            expect(updatedTasks.length).toBe(2);
            expect(updatedTasks.find(t => t.id === 2)).toBeUndefined();
        });

        it('should throw an error if the task ID does not exist (Invalid Case)', () => {
            expect(() => deleteTask(mockTasks, 99)).toThrow("Task not found");
        });
    });

    // ==========================================
    // 3. Tests for updateTaskStatus()
    // ==========================================
    describe('updateTaskStatus', () => {
        it('should update completion status successfully (Normal Case)', () => {
            const updated = updateTaskStatus(mockTasks, 1, true);
            expect(updated.completed).toBe(true);
        });

        it('should throw an error if updating a non-existent task (Invalid Case)', () => {
            expect(() => updateTaskStatus(mockTasks, 50, true)).toThrow("Task not found");
        });
    });

    // ==========================================
    // 4. Tests for clearCompletedTasks()
    // ==========================================
    describe('clearCompletedTasks', () => {
        it('should remove all completed tasks from the list (Normal Case)', () => {
            const activeTasks = clearCompletedTasks(mockTasks);
            expect(activeTasks.length).toBe(2);
            expect(activeTasks.every(t => !t.completed)).toBe(true);
        });
    });

    // ==========================================
    // 5. Tests for Refactored getTaskById()
    // ==========================================
    describe('getTaskById (Refactored)', () => {
        it('should return the correct task for a valid existing ID (Normal Case)', () => {
            const task = getTaskById(mockTasks, 1);
            expect(task.title).toBe('Learn Next.js');
        });

        it('should throw an error if the ID format is invalid (Invalid Case)', () => {
            expect(() => getTaskById(mockTasks, 'abc')).toThrow("Invalid ID provided");
            expect(() => getTaskById(mockTasks, -5)).toThrow("Invalid ID provided");
        });

        it('should throw a specific error if task is not found (Edge Case)', () => {
            expect(() => getTaskById(mockTasks, 10)).toThrow("Task with the given ID does not exist");
        });
    });
});