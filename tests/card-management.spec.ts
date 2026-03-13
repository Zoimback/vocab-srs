import { test, expect } from '@playwright/test';

test('delete card button works', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('word-input').fill('tree');
  await page.getByTestId('translation-input').fill('arbol');
  await page.getByTestId('add-card-btn').click();
  await page.getByTestId('delete-card-btn').first().click();
  await expect(page.locator('text=tree')).toHaveCount(0);
});

test('edit card flow works', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('word-input').fill('book');
  await page.getByTestId('translation-input').fill('libro');
  await page.getByTestId('add-card-btn').click();

  await page.getByTestId('edit-card-btn').first().click();
  await page.getByTestId('edit-word-input').fill('books');
  await page.getByTestId('save-edit-btn').click();

  await expect(page.locator('text=books')).toBeVisible();
});
