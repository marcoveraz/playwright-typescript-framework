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
│── src/
│   ├── api/                 # API clients, services, payloads, and schemas
│   ├── config/              # Environment and framework configuration
│   ├── fixtures/            # Playwright fixtures and shared setup
│   ├── models/              # Data models and interfaces
│   ├── pages/               # Page Object Model classes
│   ├── utils/               # Utility functions and helpers
│
│── tests/
│   ├── ui/                  # UI test specifications
│   └── api/                 # API test specifications
│
│── test-results/            # Test execution artifacts
│── playwright-report/       # Playwright HTML reports
│── allure-results/          # Allure raw results
│── allure-report/           # Allure generated reports
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

Common scripts are defined in `package.json`.

Examples:

```bash
npm run test
npm run test:dev
npm run test:qa
npm run test:stage
npm run test:prod
npm run test:headed
npm run report:playwright
```

> Environment-specific scripts use `cross-env` to support Windows, macOS, Linux, and CI/CD environments.

## 📊 Reports & Artifacts

### View HTML Report

```bash
npx playwright show-report
```

### Artifacts Location

```
test-results/
├── videos/ # .webm video recordings
├── traces/ # Playwright trace files
└── screenshots/ # Failure screenshots
```

### View Trace

```bash
# Open trace viewer
npx playwright show-trace test-results/traces/trace.zip
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
