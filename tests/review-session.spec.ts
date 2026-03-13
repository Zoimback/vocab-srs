import { test, expect } from '@playwright/test';

test('review buttons and flip work', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('word-input').fill('apple');
  await page.getByTestId('translation-input').fill('manzana');
  await page.getByTestId('add-card-btn').click();

  await page.getByTestId('start-review').click();
  await page.getByTestId('flip-btn').click();
  await expect(page.getByTestId('flashcard')).toBeVisible();

  await page.getByTestId('rate-good').click();
});

test('keyboard shortcuts work in review session', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('word-input').fill('orange');
  await page.getByTestId('translation-input').fill('naranja');
  await page.getByTestId('add-card-btn').click();

  await page.getByTestId('start-review').click();
  await page.keyboard.press('Space');
  await expect(page.locator('text=naranja')).toBeVisible();

  await page.keyboard.press('3');
  await expect(page.locator('text=No hay tarjetas pendientes.')).toBeVisible();
});

test('can restart review after finishing queue', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('word-input').fill('sun');
  await page.getByTestId('translation-input').fill('sol');
  await page.getByTestId('add-card-btn').click();

  await page.getByTestId('start-review').click();
  await page.getByTestId('rate-good').click();
  await expect(page.getByTestId('restart-review-btn')).toBeVisible();

  await page.getByTestId('restart-review-btn').click();
  await expect(page.getByTestId('flashcard')).toBeVisible();
});
