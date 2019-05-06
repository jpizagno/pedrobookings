package de.booking.controller;

import de.booking.model.Ausgaben;
import de.booking.model.Response;
import de.booking.report.WritePdfAusgaben;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/")
public class AusgabenController {

    private Logger logger = LoggerFactory.getLogger(AusgabenController.class);

    @Value("${userDefined.localReportDirectory}")
    private String localReportDirectory;

    private String fileOutName;

    /**
     * Will Accept POST of list of Ausgaben.
     *
     *
     * @param ausgaben  JSON list of Ausgaben
     * @return Response with URL or PDF report
     */
    @PostMapping("/ausgaben")
    public Response getBookingsByMonthYear(@RequestBody List<Ausgaben> ausgaben) {
        logger.info("backend. posted ausgaben response = " + ausgaben);
        WritePdfAusgaben writer = new WritePdfAusgaben();
        fileOutName = "ausgaben.pdf";
        String title =  "Julia's Ausgaben" ;
        Response myResponse = new Response("reportUrl=" +writer.generateReport(ausgaben, localReportDirectory, fileOutName, title));
        logger.info("backend. processing ausgaben response = " + myResponse.getUrl());
        return myResponse;
    }

    /**
     * Displays Report, URL will show report at fileOutName in browser.
     *
     * @param response
     * @throws IOException
     */
    @RequestMapping("/reportausgaben")
    public void getFile(HttpServletResponse response) throws IOException {

        String path = localReportDirectory + fileOutName;

        File file = new File(path);
        FileInputStream inputStream = new FileInputStream(file);

        response.setContentType("application/pdf");
        response.setContentLength((int) file.length());
        response.setHeader("Content-Disposition", "inline;filename=\"" + fileOutName + "\"");

        FileCopyUtils.copy(inputStream, response.getOutputStream());
        logger.info("backend. file written to path="+path);
    }
}
