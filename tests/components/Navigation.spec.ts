import { test, expect } from '@playwright/test';

test.describe('Navigation Component', () => {
    test.beforeEach(async ({ page }) => {
        // Visit your app's local development URL
        await page.goto('http://localhost:5173'); // Change this to your app's URL
    });

    test('should change language on select', async ({ page }) => {
        // Select the language dropdown
        const languageDropdown = page.locator('.language-dropdown');

        // Select French language
        await languageDropdown.selectOption('fr');
        await expect(page.locator('.subtitle')).toHaveText('Téléchargez un message et une image pour générer votre fichier PDF.');

    });
});
