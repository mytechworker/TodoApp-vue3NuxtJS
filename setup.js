// Use import for ES modules
import { JSDOM } from 'jsdom';

// Create a virtual DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
});

// Expose the window object to the global scope
global.window = dom.window;

// Make properties of the window object available globally
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Vue requires the document body to be available
document.body = dom.window.document.body;

// Ensure Vue's nextTick works properly
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
