import { test, expect } from '@playwright/test';

test('stats view opens', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('nav-stats').click();
  await expect(page.getByTestId('stats-panel')).toBeVisible();
});
