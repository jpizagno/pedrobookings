package de.bookingtest.app;

import java.io.IOException;

import org.hamcrest.CoreMatchers;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
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
		
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[placeholder='flug']"))).sendKeys("100");
 
		driver.findElement(By.cssSelector("[placeholder='firstName']")).sendKeys("firstNameTest");
		driver.findElement(By.cssSelector("[placeholder='storno']")).sendKeys("0");
		driver.findElement(By.cssSelector("[placeholder='total']")).sendKeys("0");
		driver.findElement(By.cssSelector("[placeholder='versicherung']")).sendKeys("-100");
		driver.findElement(By.cssSelector("[placeholder='yearDeparture']")).sendKeys("1900");
		driver.findElement(By.cssSelector("[placeholder='surname']")).sendKeys("surnameTest");
		driver.findElement(By.cssSelector("[placeholder='kreuzfahrt']")).sendKeys("-200");
		driver.findElement(By.cssSelector("[placeholder='hotel']")).sendKeys("-300");
		driver.findElement(By.cssSelector("[placeholder='comment']")).sendKeys("commentTest");
		driver.findElement(By.cssSelector("[placeholder='yyyy-MM-dd Booking Date']")).sendKeys("1900-01-01");
		driver.findElement(By.cssSelector("[placeholder='dayDeparture']")).sendKeys("31");
		driver.findElement(By.cssSelector("[placeholder='monthDeparture']")).sendKeys("12");
		driver.findElement(By.cssSelector("[placeholder='bookingNumber']")).sendKeys("TestBookingNumber");
		
		//driver.findElement(By.id("createEnd")).click(); 
		WebDriverWait wait1 = new WebDriverWait(driver, 5);
		WebElement element1 = wait1.until(ExpectedConditions.elementToBeClickable(By.id("createEnd") ) );
		element1.click();
		
		driver.navigate().refresh();
		
		String fullBodyText = driver.getPageSource();
	     
        Assert.assertThat(fullBodyText , CoreMatchers.containsString("TestBookingNumber") );
        
	}

}
