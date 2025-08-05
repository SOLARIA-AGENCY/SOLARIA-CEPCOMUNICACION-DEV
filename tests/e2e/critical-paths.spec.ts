import { test, expect } from '@playwright/test';

test.describe('Critical User Paths - Staging', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('/');
  });

  test('Homepage loads correctly', async ({ page }) => {
    // Check that the page title is correct
    await expect(page).toHaveTitle(/CEP Formación/);
    
    // Check that main navigation is visible
    await expect(page.locator('nav')).toBeVisible();
    
    // Check that hero section is visible
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    
    // Check that cycle cards are loaded
    await expect(page.locator('[data-testid="ciclo-card"]').first()).toBeVisible();
  });

  test('Navigation works correctly', async ({ page }) => {
    // Test navigation to Formación page
    await page.click('text=Formación');
    await expect(page).toHaveURL(/.*formacion/);
    
    // Test navigation to Empleo page
    await page.click('text=Empleo');
    await expect(page).toHaveURL(/.*empleo/);
    
    // Test navigation to Contacto page
    await page.click('text=Contacto');
    await expect(page).toHaveURL(/.*contacto/);
  });

  test('Employment form modal opens and functions', async ({ page }) => {
    // Click on employment button
    await page.click('[data-testid="employment-button"]');
    
    // Check that modal is visible
    await expect(page.locator('[data-testid="employment-modal"]')).toBeVisible();
    
    // Fill out the form
    await page.fill('[data-testid="name-input"]', 'Test User');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="phone-input"]', '123456789');
    
    // Select a cycle
    await page.selectOption('[data-testid="cycle-select"]', { index: 1 });
    
    // Check that submit button is enabled
    await expect(page.locator('[data-testid="submit-button"]')).toBeEnabled();
  });

  test('Responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that mobile menu toggle is visible
    await expect(page.locator('[data-testid="mobile-menu-toggle"]')).toBeVisible();
    
    // Check that cycle cards stack properly on mobile
    const cycleCards = page.locator('[data-testid="ciclo-card"]');
    const firstCard = cycleCards.first();
    const secondCard = cycleCards.nth(1);
    
    const firstCardBox = await firstCard.boundingBox();
    const secondCardBox = await secondCard.boundingBox();
    
    // Cards should be stacked vertically (second card below first)
    if (firstCardBox && secondCardBox && firstCardBox.y !== undefined && firstCardBox.height !== undefined) {
      expect(secondCardBox.y).toBeGreaterThan(firstCardBox.y + firstCardBox.height);
    }
  });

  test('Performance metrics are acceptable', async ({ page }) => {
    // Start measuring performance
    const startTime = Date.now();
    
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for main content to load
    await page.waitForSelector('[data-testid="hero-section"]');
    await page.waitForSelector('[data-testid="ciclo-card"]');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check that images are loaded
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('src', /.+/);
    }
  });

  test('SEO meta tags are present', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    
    // Check Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    
    // Check canonical URL
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /.+/);
  });

  test('Error handling works correctly', async ({ page }) => {
    // Test 404 page
    const response = await page.goto('/non-existent-page');
    if (response) {
      expect(response.status()).toBe(404);
    }
    
    // Should show custom 404 page or redirect
    await expect(page.locator('body')).toContainText(/404|Not Found|Página no encontrada/i);
  });
});