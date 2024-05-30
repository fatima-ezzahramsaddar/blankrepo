import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';
describe('My Login application', () => {

    before(async () => {
       await LoginPage.open(); 
    });

    it('should login with valid credentials', async () => {
        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining('You logged into a secure area!');
        await expect(SecurePage.flashAlert).toMatchSnapshot('flashAlert');
    });

    afterEach(async () => {
    browser.closeWindow();
    });
        it('should display an error message', async () => {
            await LoginPage.open();
            await LoginPage.login('', 'SuperSecretPassword!');
            await expect(LoginPage.errorMessage).toBeExisting();
            await expect(LoginPage.errorMessage).toHaveTextContaining('Username is required');
            await expect(LoginPage.errorMessage).toMatchSnapshot('emptyUsernameError');
        });
    
        it('should not navigate to secure page', async () => {
            await LoginPage.open();
            await LoginPage.login('', 'SuperSecretPassword!');
            await expect(SecurePage.flashAlert).not.toBeExisting();
        });
    
        it('should not store any cookies', async () => {
            await LoginPage.open();
            await LoginPage.login('', 'SuperSecretPassword!');
            const cookies = await browser.getCookies();
            await expect(cookies).toHaveLength(0);
        });
    
        it('should not log any events', async () => {
            await LoginPage.open();
            await LoginPage.login('', 'SuperSecretPassword!');
            const logs = await browser.getLogs('browser'); // Corrected method name
            await expect(logs).toHaveLength(0);
        });
    
        it('should not send any network requests', async () => {
            await LoginPage.open();
            await LoginPage.login('', 'SuperSecretPassword!');
            const networkRequests = await browser.getNetworkConditions();
            await expect(networkRequests).toHaveLength(0);

             });
    });
