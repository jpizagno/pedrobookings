package testpackage;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


/**
 * Hello world!
 *
 */
public class MainSeleniumTests {
	
    private static String userName;
	private static String password;
	private static FirefoxDriver driver;

	public static void main( String[] args )  {
        if(args.length  != 2) {
        	System.out.println(" ");
        	System.out.println("ERROR:  wrong number or arguments.  ");
        	System.out.println("    shell% java -jar file.jar <username> <password>");
        	System.out.println(" ");
        	System.exit(1);
        }

        userName = args[0];
        password = args[1];
        
        init_Browser();
        connectToBookingsSite();
        clickOnLogin();
        login();
        
    }

	private static void init_Browser() {
		//TODO:  add support for other browsers
        driver = new FirefoxDriver();
        driver.manage().timeouts().pageLoadTimeout(30, TimeUnit.SECONDS);
	}
	
	private static void connectToBookingsSite() {
		String URL = "http://localhost/~jpizagno/bookingbootstrap/index.php";
        driver.get(URL);
	}

	private static void clickOnLogin() {
		driver.findElement(By.id("loginbutton")).click();
	}
	
	private static void login() {
		WebDriverWait waitStart = new WebDriverWait(driver, 10);
		waitStart.until(ExpectedConditions.visibilityOfAllElementsLocatedBy( By.id("inputUser")));
		
		/* Identify Element and take action with two lines of code */
        WebElement element_UserName = driver.findElement( By.id("inputUser") );
        element_UserName.sendKeys(userName);
 
        /* Identify Element and take action with one line of code */
        driver.findElement(By.id("inputPassword")).sendKeys(password);
 
        driver.findElement(By.id("submitUsernamePassword")).click(); // .submit();
 
        // click Ok on alert:
        WebDriverWait waitAlert = new WebDriverWait(driver, 10);
        Alert alert = waitAlert.until(ExpectedConditions.alertIsPresent());
        alert.accept();
        
        /* verify logged-in correctly */
        WebDriverWait waitEnd = new WebDriverWait(driver, 10);
        waitEnd.until(ExpectedConditions.visibilityOfAllElementsLocatedBy( By.id("loginMessage")));
        
        String fullBodyText = driver.findElement( By.id("loginMessage") ).getText();
        Assert.assertEquals(fullBodyText , "You are logged in.");
       
    }
	
}
