# 🎭 Playwright Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Automation-green?style=for-the-badge&logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-Framework-blue?style=for-the-badge&logo=typescript)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

## 👨‍💻 Author

Marco Adán Vera Zboralski  
Senior QA Automation Engineer  

[LinkedIn](https://www.linkedin.com/in/marco-adan-vera/)

---

## 💡 Overview

This project demonstrates a scalable UI automation framework built with Playwright and TypeScript.

It follows real-world best practices such as Page Object Model (POM), multi-environment configuration, and reusable components to ensure maintainability and reliability.

---

## 🚀 Framework Design

This project follows a scalable and maintainable automation architecture:

- ✅ Page Object Model (POM)
- ✅ Separation of concerns (tests, pages, models, utils)
- ✅ Dynamic DOM handling to avoid fragile locators
- ✅ Multi-environment support (dev, qa, stage, prod)
- ✅ Reusable utility classes

---

## 📁 Project Structure

```
project-root/
├── config/              # Environment and test configuration
├── models/              # Data models and interfaces
├── pages/               # Page Object Model classes
├── tests/               # Test specifications
├── utils/               # Utility functions and helpers
├── test-results/        # Test execution artifacts
└── playwright-report/   # HTML report output
```

---

## 🧪 Test Strategy

- 🔄 End-to-End flows (login, checkout)
- 🎲 Dynamic product selection using randomization
- ✅ Validation across UI layers
- 📝 BDD-style comments (Given / When / Then)

---

## ⚙️ Features

- 🌐 Multi-environment execution
- 🎲 Randomized test execution
- 🔍 Product validation across pages
- 🛠️ Utilities for random data, waits, and calculations
- 🎬 Playwright features:
  - Video recording
  - Trace viewer
  - Screenshots on failure

---

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd playwright-automation-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## ▶️ Running Tests

### Basic Commands

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/saucedemo/login-page.spec.ts

# Run tests by name
npx playwright test -g "login"

# Run in headed mode (visible browser)
npx playwright test --headed

# Run with specific number of workers
npx playwright test --workers=4
```

### Debug Mode

```bash
# Run in debug mode
npx playwright test --debug

# Run with verbose output
npx playwright test --reporter=list
```

---

## 🌎 Running Tests by Environment

This framework supports multiple environments using the `ENV` variable.

**Available environments:**

- `dev` (default)
- `qa`
- `stage`
- `prod`

### Windows (Command Prompt)

```bash
# Set environment and run all tests
set ENV=qa && npx playwright test

# Set environment and run specific test name
set ENV=qa && npx playwright test -g "checkout"

# Set environment and run specific file
set ENV=qa && npx playwright test tests/saucedemo/login-page.spec.ts
```

### Windows (PowerShell)

```powershell
# Set environment and run tests
$env:ENV="qa"; npx playwright test

# Run specific test
$env:ENV="stage"; npx playwright test -g "checkout"
```

### Mac / Linux

```bash
# Run all tests in QA environment
ENV=qa npx playwright test

# Run specific test in staging
ENV=stage npx playwright test -g "checkout"

# Run specific file in production
ENV=prod npx playwright test tests/saucedemo/checkout.spec.ts
```

---

## 📦 NPM Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test:dev": "ENV=dev npx playwright test",
    "test:qa": "ENV=qa npx playwright test",
    "test:stage": "ENV=stage npx playwright test",
    "test:prod": "ENV=prod npx playwright test",
    "test:headed": "npx playwright test --headed",
    "test:report": "npx playwright show-report"
  }
}
```

### Using NPM Scripts

```bash
# Run QA tests
npm run test:qa

# Run specific test by name
npm run test:qa -- -g "checkout"

# Run in headed mode
npm run test:qa -- --headed

# View HTML report
npm run test:report
```

---

## 📊 Reports & Artifacts

### View HTML Report

```bash
npx playwright show-report
```

### Artifacts Location

```
test-results/
├── videos/      # .webm video recordings
├── traces/      # Playwright trace files
└── screenshots/ # Failure screenshots
```

### View Trace

```bash
# Open trace viewer
npx playwright show-trace test-results/traces/trace.zip
```

---

## 🔧 Configuration

### playwright.config.ts Example

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: currentEnv.baseURL,
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
```

---

## 🎯 Purpose

- 🧪 Demonstrate automation framework design
- 💻 Practice Playwright + TypeScript
- 📋 Showcase testing best practices
- 📂 Serve as a portfolio project

---

## 🤝 Contributing

Contributions are welcome! This project is intended to grow with additional real-world test scenarios.

### How to Contribute

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/new-test-scenario

# Commit your changes
git commit -m "Add new test scenario for checkout flow"

# Push to the branch
git push origin feature/new-test-scenario

# Open a Pull Request
```

**You can:**

- 🧪 Add new test flows
- 🔨 Improve existing tests
- ✅ Enhance validations
- 💡 Suggest improvements

---

## 🧠 Notes

- 🎯 Uses dynamic locators to avoid fragile selectors
- 🏗️ Focus on maintainability and scalability
- 🌐 Designed to simulate real-world automation scenarios
- 📚 Follows testing best practices and design patterns

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Contact

**Marco Adán Vera Zboralski**  
🔗 [LinkedIn](https://www.linkedin.com/in/marco-adan-vera/)
