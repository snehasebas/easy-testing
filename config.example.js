// ─── Configuration Template ──────────────────────────────────────
// Copy this file to config.js and fill in your values.
// config.js is gitignored and will not be committed.

var CONFIG = {
  SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',

  SAVED_AGENTS: [
    { name: 'Agent Name', id: 'agent-id-here' },
  ],

  PORTKEY_ORG_IDS: {
    app: 'your-app-org-id',
    dev: 'your-dev-org-id',
  },

  KIBANA_CONFIG: {
    dev: { baseUrl: 'https://logging.dev.docketai.com', dataViewId: 'your-dev-data-view-id' },
    app: { baseUrl: 'https://logging.app.docketai.com', dataViewId: 'your-app-data-view-id' },
  },
};
