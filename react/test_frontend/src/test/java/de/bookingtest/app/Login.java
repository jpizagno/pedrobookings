package de.bookingtest.app;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Login {
	
	private Properties prop = new Properties();
	private InputStream input = null;
	
    private String userName;
	private String password;
	private WebDriver driver;
	private String baseURL;
	
	public WebDriver login() throws IOException {
		input = new FileInputStream("src/test/resources/properties_test");

		// load a properties file
		prop.load(input);

        System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver");
        
        userName = prop.getProperty("userName");
        password = prop.getProperty("password");
        baseURL = prop.getProperty("baseURL");
        
        driver = new FirefoxDriver(); //  new ChromeDriver() ; //FirefoxDriver();
        driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
        
        String URL = baseURL + "#";
        driver.get(URL);
        
		WebDriverWait waitStart = new WebDriverWait(driver, 10);
		waitStart.until(ExpectedConditions.visibilityOfAllElementsLocatedBy( By.name("username") ));
		
		/* Identify Element and take action with two lines of code */
        WebElement element_UserName = driver.findElement( By.name("username") );
        element_UserName.sendKeys(userName);
 
        /* Identify Element and take action with one line of code */
        driver.findElement(By.name("password")).sendKeys(password);
 
        driver.findElement(By.name("submit")).click(); 
        
        return driver;
	}
	
	public void close() {
		driver.close();
	}

}
