package de.booking.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.booking.model.Response;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {BeansTestConfig.class})
@WebAppConfiguration
@TestPropertySource(properties = {
	    "userDefined.localReportDirectory=src/test/resources/",
	})
public class BookingControllerTest {

	private MockMvc mockMvc;
	
	@Autowired
	private BookingController bookingController;

	private ObjectMapper mapper;
	
	@Before
	public void setUp() {
	    // mapper is used to map JSON string response to a POJ class
	    mapper = new ObjectMapper();
	    
	    bookingController.setFileOutName("report_11_1900.pdf");
		
	    mockMvc = MockMvcBuilders.standaloneSetup(bookingController).build();
	}

	@Test
	public void getBookingsByMonthYear() throws Exception {
		String yearDeparture = "1900";
		String monthDeparture =  "12";
		MvcResult result = mockMvc.perform(get("/reportyearmonth?month=" + monthDeparture + "&year=" + yearDeparture)).andExpect(status().isOk()).andReturn();

		Response response = mapper.readValue(result.getResponse().getContentAsString(), Response.class);

	    assertThat(response.getUrl(), is("reportUrl=report_12_1900.pdf"));
	}
	
	/**
	 * This will at least test that "userDefined.localReportDirectory" are set and setFileOutName are properly set.
	 * 
	 * @throws IOException
	 */
	@Test
	public void getFile() throws IOException {
		HttpServletResponse response = mock(HttpServletResponse.class);
		ServletOutputStream servletOutputStream = mock(ServletOutputStream.class);
		when(response.getOutputStream()).thenReturn(servletOutputStream);
		
		bookingController.getFile(response);
	}

}
