// Utility functions for Playwright tests

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Add more shared utilities as needed
