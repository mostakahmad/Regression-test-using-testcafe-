import { Selector } from 'testcafe';
import { Role } from 'testcafe';
import { RequestLogger } from 'testcafe';

fixture `Github Log In`
    .page `https://github.com/login`;

    const logInBtn = Selector("a[href='/login']");
    const submitBtn = Selector("input[name='commit']");
    const createRepoBtn = Selector("a[data-ga-click='Hello World, click, Clicked new repository button - context:user']");
    const createRepoSubmitBtn = Selector("button[data-disable-with='Creating repository…']");
    const profileBtn = Selector("summary[aria-label='View profile and more']");
    const myRepoBtn = Selector("a[data-ga-click='Header, go to repositories, text:your repositories']");
    const repoBtn = Selector('a').withText('Testing-Repository-Creation');
    const repoBtn2 = Selector('a').withText('New-Testing-Repository-Creation');
    const settingBtn = Selector("a[href='/mostakahmad/Testing-Repository-Creation/settings']");
    const settingBtn2 = Selector("a[href='/mostakahmad/New-Testing-Repository-Creation/settings']");
    const renameBtn = Selector('button').withText('Rename');
    const deleteBtn = Selector("summary[role='button']").withText('Delete this repository');
    const textBox = Selector("input[aria-label='Type in the name of the repository to confirm that you want to delete this repository.']");
    const repoDltBtn = Selector("button[type='submit']").withText('I understand the consequences, delete this repository');


const logInGithub = Role('https://github.com/login', async t => {
    await t
        .typeText('#login_field', 'email') /// Here email will be replaced by user Email Address
        .typeText('#password', 'pass')            /// & pass will be replaced by user Github password
        .click(submitBtn);
}, { preserveUrl: true });

const logger = RequestLogger('https://github.com/login');

    

test
    .requestHooks(logger)
    ('Test 1', async t =>{
        await t
            .useRole(logInGithub);

            if( logger.requests[0].response.statusCode == 200 ){

                console.log('Log In Successfully!');

            }
            else{
                
                 console.log('Sorry!'); 
            }
            
       
});

test('Test 2', async t =>{
    await t
        .useRole(logInGithub)
        .click(createRepoBtn)
        .typeText('#repository_name', 'Testing Repository Creation')
        .typeText('#repository_description', 'This is a simple testing project. Tester is testing to create a new repostory.')
        .click(createRepoSubmitBtn)
        .wait(1000);

        console.log('Create Repository Successfully!');

    await t.wait(2000); 
});

test('Test 3', async t =>{
    await t
        .useRole(logInGithub)
        .click(profileBtn)
        .click(myRepoBtn)
        .click(repoBtn)
        .wait(1000)
        .click(settingBtn)
        .selectText('#rename-field').pressKey("delete")
        .wait(1000)
        .typeText('#rename-field', 'New Testing Repository Creation')
        .click(renameBtn)
        .wait(1000);

        console.log('Your Repository Updated Successfully!');

    await t.wait(2000);
});

test('Test 4', async t =>{
    await t
        .useRole(logInGithub)
        .click(profileBtn)
        .click(myRepoBtn)
        .click(repoBtn2)
        .wait(1000)
        .click(settingBtn2)
        .wait(1000)
        .click(deleteBtn)
        .wait(1000)
        .typeText(textBox, 'New-Testing-Repository-Creation')
        .click(repoDltBtn)
        .wait(1000);

        console.log('Repository Deleted Successfully!');

    await t.wait(2000);
});