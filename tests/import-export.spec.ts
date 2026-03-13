import { test, expect } from '@playwright/test';

test('export control is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('export-btn')).toBeVisible();
  await expect(page.getByTestId('import-input')).toBeVisible();
});

test('invalid import shows feedback', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('import-input').setInputFiles({
    name: 'invalid.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{invalid json', 'utf-8'),
  });

  await expect(page.getByTestId('import-status')).toContainText('No se pudo importar el archivo');
});

test('csv import loads english and translation columns', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('import-input').setInputFiles({
    name: 'cards.csv',
    mimeType: 'text/csv',
    buffer: Buffer.from('english,translation\nbook,libro\nwater,agua', 'utf-8'),
  });

  await expect(page.getByTestId('import-status')).toContainText('Importacion completada');
  await expect(page.locator('text=book')).toBeVisible();
  await expect(page.locator('text=water')).toBeVisible();
});
