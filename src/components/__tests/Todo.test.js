import { test, expect } from 'vitest';
import { createApp } from 'vue';
import TodoApp from '../TodoApp.vue'

test('Add a new task', async () => {
  // Create a Vue app with the TodoApp component
  const app = createApp(TodoApp);
  const container = document.createElement('div');
  document.body.appendChild(container);

  const instance = app.mount(container);

  // Find the input field and "Add Task" button
  const inputField = container.querySelector('input[placeholder="Add a new task and Press Enter"]');
  const addButton = container.querySelector('[id=btnAdd]');

  // Type a task in the input field
  inputField.value = 'New Task1';
  inputField.dispatchEvent(new Event('input'));

  // Assert that a new task has been added
  expect(instance.newTask).toBe('New Task1'); // Input field should be cleared
  expect(instance.tasks).toHaveLength(0); // One task should be added
  
  // Click the "Add Task" button
  addButton.click();
  // Cleanup
  app.unmount();
  document.body.removeChild(container);
});
