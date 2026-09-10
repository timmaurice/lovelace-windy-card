import { test as base, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/homeassistant';

/**
 * The browser starts from the signed-in state global setup captured, so no spec
 * spends time on the login form.
 *
 * `consoleErrors` collects only what Home Assistant's own page logged. The card
 * embeds Windy in a cross-origin iframe, and that document logs errors of its
 * own the moment the sandbox has no route to windy.com ("Failed to load lang
 * file as .json"). Those say nothing about the card, and letting them in would
 * make every spec depend on network access to a third party - so messages
 * raised outside our origin are dropped.
 */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() !== 'error') return;
      const from = message.location().url;
      if (from && !from.startsWith(BASE_URL) && !from.startsWith('http://localhost')) return;
      errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    await use(errors);
  },
});

export { expect };
