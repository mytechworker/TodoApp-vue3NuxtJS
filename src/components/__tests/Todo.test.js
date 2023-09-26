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
  inputField.value = 'Task create from Test Case';
  inputField.dispatchEvent(new Event('input'));

  // One task should be added in list
  expect(instance.tasks).toHaveLength(0); 
  
  // Click the "Add Task" button
  addButton.click();

  // Cleanup
  app.unmount();
  document.body.removeChild(container);
});
