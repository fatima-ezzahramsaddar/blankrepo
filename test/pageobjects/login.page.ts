import { $ } from '@wdio/globals';
import Page from './page.js';

class LoginPage extends Page {
    private errorMessageLocator = $('div.error-message');

    public get errorMessage() {
        return this.errorMessageLocator;
    }

    public get inputUsername() {
        return $('#username');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get btnSubmit () {
        return $('button[type="submit"]');
    }
  
    public async login(username: string, password: string) {
        await (await this.inputUsername).waitForDisplayed();
        await this.inputUsername.setValue(username);
        await (await this.inputPassword).waitForDisplayed();
        await this.inputPassword.setValue(password);
        await (await this.btnSubmit).waitForClickable();
        await this.btnSubmit.click();

    }

    public open () {
        return super.open('login');
    }
}

export default new LoginPage();
