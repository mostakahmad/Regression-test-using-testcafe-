import { Selector } from 'testcafe';

fixture `Github Log In`
    .page `https://github.com`;

    const btn1 = Selector("a[href='/login']");
    const btn2 = Selector("input[name='commit']");
    const user = Selector("a[data-ga-click='Header, go to profile, text:Signed in as']");

test('Test 1', async t =>{
    await t
        .click(btn1)
        .typeText('#login_field', 'email') /// Here email will be replaced by user Email Address
        .typeText('#password', 'pass') /// & pass will be replaced by user Github password
        .click(btn2)
        .wait(5000);
});
