package de.bookingtest.app;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.hamcrest.CoreMatchers;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.By.ById;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class CreateBookingTest extends Login {
	
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
	public void createBooking() {
		driver.findElement(By.id("createStart")).click(); 
		driver.manage().timeouts().pageLoadTimeout(1, TimeUnit.SECONDS);
		
		//WebDriverWait waitStart = new WebDriverWait(driver, 10);
		//waitStart.until(ExpectedConditions.visibilityOfAllElementsLocatedBy( By.id("flug") ));
		
		driver.findElement(By.id("flug")).sendKeys("100");
		driver.findElement(By.id("firstname")).sendKeys("firstNameTest");
		driver.findElement(By.id("storno")).sendKeys("0");
		//driver.findElement(By.cssSelector("[placeholder='total']")).sendKeys("0");
		driver.findElement(By.id("versicherung")).sendKeys("-100");
		driver.findElement(By.id("yearDeparture")).sendKeys("1900");
		driver.findElement(By.id("surname")).sendKeys("surnameTest");
		driver.findElement(By.id("kreuzfahrt")).sendKeys("-200");
		driver.findElement(By.id("hotel")).sendKeys("-300");
		//driver.findElement(By.cssSelector("[placeholder='comment']")).sendKeys("commentTest");
		driver.findElement(By.id("bookingdate")).sendKeys("1900-01-01");
		driver.findElement(By.id("dayDeparture")).sendKeys("31");
		driver.findElement(By.id("monthDeparture")).sendKeys("12");
		driver.findElement(By.id("bookingnumber")).sendKeys("TestBookingNumber");

		WebDriverWait wait1 = new WebDriverWait(driver, 5);
		WebElement element1 = wait1.until(ExpectedConditions.elementToBeClickable(By.id("createEnd") ) );
		element1.click();
		
		driver.navigate().refresh();
		
		String fullBodyText = driver.getPageSource();
	     
        Assert.assertThat(fullBodyText , CoreMatchers.containsString("TestBookingNumber") );
        
	}

}
