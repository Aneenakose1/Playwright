const {test,expect}= require('@playwright/test'); //node.js import Playwright testing libraries to file

test.only('Browser Context playwright test',async ({browser})=>
{
  const context = await browser.newContext(); // no saved logins, no cookies, no history — completely clean.
  const page = await context.newPage();//opening a new tab
  await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  //css xpath
  const userName = page.locator('#username');
  await userName.fill("rahulshetty");
  
  const password = page.locator("[type='password']");
  await password.fill("Learning@830$3mK2");

  const signInBtn = page.locator("#signInBtn");
  await signInBtn.click();

  console.log((await page.locator("[style*='block;']").textContent()));
  await expect(page.locator("[style*='block;']")).toContainText("Incorrect");
  
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signInBtn.click();
  console.log(await page.locator(".card-body a").nth(0).textContent());
  const cardNames=page.locator(".card-body a"); 
const listCard =await cardNames.allTextContents();
  console.log(listCard);
  //console.log(await page.locator(".card-body a").nth(1).textContent());
}); 
 
test('page playwright test',async ({page})=>
{
  await page.goto("http://google.com");
  //get title - put assertion
 console.log(await page.title()); 
 await expect (page).toHaveTitle("Google");
}); 

// http://rahulshettyacademy.com/client/  -> another url for testing

test("Practise test on client page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to URL
  await page.goto("http://rahulshettyacademy.com/client");

  // Register Here
  await page.getByText("Register Here").click();

  // Fill form
  await page.locator("#firstName").fill("saii");
  await page.locator("#lastName").fill("pallavi");
  await page.locator("#userEmail").fill("saii@gmail.com");
  await page.locator("#userMobile").fill("9878765454");
    
  // Select dropdown
  await page.locator('select[formcontrolname="occupation"]').selectOption({ index: 1 });

  // Gender
  await page.locator("input[value='Female']").check();

  // Password
  await page.locator("#userPassword").fill("Password@123");
    await page.locator("#confirmPassword").fill("Password@123");

  // Checkbox
  await page.locator('input[formcontrolname="required"]').check();

  // Click Register
  await page.locator('#login').click();
    });
  
  // Login with registered credentials
  test ("Login with registered credentials", async ({ page }) => {
    await page.goto("http://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("saii@gmail.com");
    await page.locator('#userPassword').fill("Password@123");
    await page.locator('#login').click();

    //await page.waitForLoadState('networkidle');   OR 
    await page.locator(".card-body b").first().waitFor();
    // Get all product names
    const getAll = await page.locator('.card-body b').allTextContents();
    console.log(getAll);
});


    //learning about select dropdown
    test ("UI Controls", async ({page}) => {
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const userName=page.locator("#username");
      const signInButton=page.locator("#signInBtn");
      const dropdown=page.locator("select.form-control");
      const documentLink=page.locator("a[href*='documents-request']");
    await dropdown.selectOption("consult"); 
    await page.locator("input#usertype").last().click();
    await page.locator("#okayBtn").click();
    expect(page.locator("input#usertype").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText"); 
   // await page.pause();
});


test.only("@Child Windows handle", async ({ browser }) => {
  const context = await browser.newContext();  // lowercase context
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const userName = page.locator("#username");
  const documentLink = page.locator("a[href*='documents-request']");

  // Wait for the new page while clicking the link
  const [newPage]= await Promise.all([
    context.waitForEvent('page'),
    documentLink.click()
  ]);

  //await newPage.waitForLoadState();

  // Get text from the element with class "red"
  const text = await newPage.locator(".red").textContent();
  console.log(text);
  const arrayText = text.split("@");
  const domain= arrayText[1].split(" ")[0];
  //console.log(domain);
  await page.locator("#username").fill(domain);
   await console.log(await page.locator("#username").inputValue(domain));
     await page.pause();
});