package de.booking.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.booking.model.Booking;
import de.booking.model.Response;
import de.booking.report.WritePdf;
import de.booking.repository.BookingRepository;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/")
@PreAuthorize("hasRole('ROLE_MANAGER')")
public class BookingController {

	@Autowired
	public BookingRepository bookingRepository;

	@Value("${userDefined.localReportDirectory}")
	private String localReportDirectory;

	private String fileOutName;

	/**
	 * Generate Report for given month and year.
	 * 
	 * example curl:
	 * curl --cookie cookies "localhost:8092/reportyearmonth?month=12&year=1900"
	 * 
	 * @param month
	 * @param year
	 * @return
	 */
	@RequestMapping(value="/reportyearmonth")
	public Response getBookingsByMonthYear(@RequestParam(value="month", required=true) Integer month
			, @RequestParam(value="year", required=true) Integer year) {

		List<Booking> bookings = bookingRepository.findByMonthDepartureAndYearDeparture(month, year);

		WritePdf writer = new WritePdf();
		fileOutName = "report_" + month + "_" + year + ".pdf";
		String title =  "Julia's bookings for month "+month+" year "+year ;
		Response myResponse = new Response("reportUrl=" +writer.generateReport(bookings, localReportDirectory, fileOutName, title));
		System.out.println(" response = " + myResponse.getUrl());
		return myResponse;
	}

	/**
	 * Displays Report URL will show report at fileOutName in browser.
	 * 
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/report")
	public void getFile(HttpServletResponse response) throws IOException {

		String path = localReportDirectory + fileOutName;

		File file = new File(path);
		FileInputStream inputStream = new FileInputStream(file);

		response.setContentType("application/pdf");
		response.setContentLength((int) file.length());
		response.setHeader("Content-Disposition", "inline;filename=\"" + fileOutName + "\"");

		FileCopyUtils.copy(inputStream, response.getOutputStream());

	}

	/**
	 * Getter implemented for testing
	 * 
	 * @param fileOutName
	 */
	public void setFileOutName(String fileOutName) {
		this.fileOutName = fileOutName;
	}

}
