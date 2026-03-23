/**
 * Lightweight reactive pub/sub store for cross-component state management.
 * Prevents brittle DOM-to-DOM coupling.
 */

const state = {
  activeTab: 'direct_si',
  activeChannel: 'bb',          // for indirect detection tab
  experiments: {},               // id → { visible: bool, highlighted: bool }
  hoveredExperiment: null,       // experiment id or null
};

const listeners = new Map();     // key → Set<callback>

/**
 * Subscribe to state changes for a given key.
 * @param {string} key - state property name (or '*' for all)
 * @param {function} callback - receives (newValue, key)
 * @returns {function} unsubscribe function
 */
export function subscribe(key, callback) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key).add(callback);
  return () => listeners.get(key).delete(callback);
}

function notify(key) {
  const value = state[key];
  if (listeners.has(key)) {
    listeners.get(key).forEach(cb => cb(value, key));
  }
  if (listeners.has('*')) {
    listeners.get('*').forEach(cb => cb(value, key));
  }
}

export function getState() {
  return state;
}

/**
 * Dispatch an action to update state.
 * @param {string} action - action type
 * @param {*} payload
 */
export function dispatch(action, payload) {
  switch (action) {
    case 'SET_TAB':
      state.activeTab = payload;
      notify('activeTab');
      break;

    case 'SET_CHANNEL':
      state.activeChannel = payload;
      notify('activeChannel');
      break;

    case 'INIT_EXPERIMENTS':
      // payload: array of experiment objects
      state.experiments = {};
      payload.forEach(exp => {
        state.experiments[exp.id] = { visible: true, highlighted: false };
      });
      notify('experiments');
      break;

    case 'TOGGLE_EXPERIMENT':
      if (state.experiments[payload]) {
        state.experiments[payload].visible = !state.experiments[payload].visible;
        notify('experiments');
      }
      break;

    case 'HIGHLIGHT_EXPERIMENT':
      // Clear previous highlight
      Object.values(state.experiments).forEach(e => e.highlighted = false);
      if (payload && state.experiments[payload]) {
        state.experiments[payload].highlighted = true;
      }
      state.hoveredExperiment = payload;
      notify('experiments');
      notify('hoveredExperiment');
      break;

    case 'CLEAR_HIGHLIGHT':
      Object.values(state.experiments).forEach(e => e.highlighted = false);
      state.hoveredExperiment = null;
      notify('experiments');
      notify('hoveredExperiment');
      break;

    default:
      console.warn(`Unknown action: ${action}`);
  }
}
