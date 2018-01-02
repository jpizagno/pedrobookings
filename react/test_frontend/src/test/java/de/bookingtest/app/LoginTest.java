package de.bookingtest.app;

import java.io.IOException;

import org.hamcrest.CoreMatchers;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


/**
 * 
 * Selenium Test for Website
 *
 */
public class LoginTest extends Login {

	private WebDriver driver;

	@Before
	public void Setup() throws IOException  {
		driver = login();
    }
	
	@After
	public void tearDown() {
		close();
	}

	@Test
	public void loggedInTest() {
        /* verify logged-in correctly */
        WebDriverWait waitEnd = new WebDriverWait(driver, 10);
        waitEnd.until(ExpectedConditions.visibilityOfAllElementsLocatedBy( By.className("navbar") ));
        
        String fullBodyText = driver.getPageSource();
     
        Assert.assertThat(fullBodyText , CoreMatchers.containsString("Logged in as:") );
    }
	
}
