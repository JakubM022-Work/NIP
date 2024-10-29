import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

export default defineConfig({
  workers: 1,
  use: {
    // Domyślne opcje dla wszystkich testów
    trace: 'retain-on-failure', // Zapisz ślad przy pierwszym nieudanym teście (retry)
    // Możesz zmienić to na 'retain-on-failure', jeśli chcesz ślady tylko przy ostatecznych niepowodzeniach
    // trace: 'retain-on-failure',
  },
  retries: 2, // Zdefiniuj liczbę ponownych prób dla testów
  reporter: [['list'], ['json', { outputFile: 'results.json' }]],
  projects: [
    /* Test against desktop browsers */
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ]
});
