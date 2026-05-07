import { test as base } from './pages.fixture';
import { currentEnv } from '../../config/saucedemo/env';

type AuthFixtures = {
  loggedInUser: void;
};

export const test = base.extend<AuthFixtures>({
  loggedInUser: async ({ loginPage }, use) => {
    await loginPage.loginPageFlow(
      currentEnv.baseURL,
      currentEnv.username,
      currentEnv.password,
    );

    await use();
  },
});

export const expect = test.expect;
