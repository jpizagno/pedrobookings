package de.bookingtest.app;

import java.util.concurrent.TimeUnit;

import org.hamcrest.CoreMatchers;
import org.junit.Assert;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


/**
 * 
 * Selenium Test for Website
 *
 */
public class MainSeleniumTests {
	
    private static String userName;
	private static String password;
	private static WebDriver driver;
	private static String baseURL;

	public static void main( String[] args )  {
        if(args.length  != 3) {
        	System.out.println(" ");
        	System.out.println("ERROR:  wrong number of arguments.  ");
        	System.out.println("    shell% java -jar file.jar <username> <password> <baseURL> ");
        	System.out.println("    shell% java -jar file.jar jim jimspassword http://localhost:8888/ ");
        	System.out.println(" ");
        	System.exit(1);
        }
        
        System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver");
        
        userName = args[0];
        password = args[1];
        baseURL = args[2];
        
        init_Browser();
        connectToBookingsSite();
        enterLoginInformation();
    }

	private static void init_Browser() {
        driver = new FirefoxDriver(); //  new ChromeDriver() ; //FirefoxDriver();
        driver.manage().timeouts().pageLoadTimeout(5, TimeUnit.SECONDS);
	}
	
	private static void connectToBookingsSite() {
		String URL = baseURL + "#";
        driver.get(URL);
	}
	
	private static void enterLoginInformation() {
		WebDriverWait waitStart = new WebDriverWait(driver, 10);
		waitStart.until(ExpectedConditions.visibilityOfAllElementsLocatedBy( By.name("username") ));
		
		/* Identify Element and take action with two lines of code */
        WebElement element_UserName = driver.findElement( By.name("username") );
        element_UserName.sendKeys(userName);
 
        /* Identify Element and take action with one line of code */
        driver.findElement(By.name("password")).sendKeys(password);
 
        driver.findElement(By.name("submit")).click(); 
        
        /* verify logged-in correctly */
        WebDriverWait waitEnd = new WebDriverWait(driver, 10);
        waitEnd.until(ExpectedConditions.visibilityOfAllElementsLocatedBy( By.className("navbar") ));
        
        String fullBodyText = driver.getPageSource();
     
        Assert.assertThat(fullBodyText , CoreMatchers.containsString("Logged in as:") );
    }
	
}
