import { test, expect } from '@playwright/test';

test('add card flow', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('word-input').fill('house');
  await page.getByTestId('translation-input').fill('casa');
  await page.getByTestId('add-card-btn').click();
  await expect(page.locator('text=house')).toBeVisible();
});
