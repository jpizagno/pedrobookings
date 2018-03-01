package de.booking.report;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import de.booking.model.Booking;


public class WritePdf {

	/**
	 * Generates a Report, given these bookings.
	 * 
	 * @param bookings   A list of Bookings to include in the report
	 * @param fileOutName  The PDF file to write
	 * @param title To be printed on PDF. ex: "Julia's bookings for month "+month_str+" year "+year_str
	 * @return 0=Sucess, Fail!=0
	 */
	public String generateReport(List<Booking>  bookingsIn, String path, String fileOutName, String title) {
		if (bookingsIn.size() == 0 ) {
			return "error_bookings_empty";
		}
		
		System.out.println("starting to write to " + path + fileOutName);

		// filter out Storno Bookings
		List<Booking> bookings = filterStorno(bookingsIn);

		float title_padding = 10.0f;

		//Document document = new Document();
		// Landscape mode:
		Document document = new Document(PageSize.LETTER.rotate());

		Field[] fields = bookings.get(0).getClass().getDeclaredFields();

		// remove id,comment, manager, version from fields for report
		List<Field> fieldsFiltered = new LinkedList<>();
		for (int col_i=0 ; col_i<fields.length ; col_i++){
			if( !fields[col_i].getName().toLowerCase().equals("id") 
					&& !fields[col_i].getName().toLowerCase().equals("comment")
					&& !fields[col_i].getName().toLowerCase().equals("manager")
					&& !fields[col_i].getName().toLowerCase().equals("version") 
					&& !fields[col_i].getName().toLowerCase().equals("storno"))
				fieldsFiltered.add(fields[col_i]);
		}

		try {
			PdfWriter.getInstance(document, new FileOutputStream(path+fileOutName));
			document.open();
			PdfPTable table = new PdfPTable(fieldsFiltered.size());

			// set universal FONT:
			Font myFont = new Font(); // name & point size 
			myFont.setSize(6);

			// create title cell:
			PdfPCell cell_title = new PdfPCell(new Paragraph(title));
			cell_title.setColspan(fieldsFiltered.size());
			cell_title.setHorizontalAlignment(Element.ALIGN_CENTER);
			//cell_title.setBackgroundColor(new Color(128,200,128));
			cell_title.setPadding(title_padding);
			table.addCell(cell_title);

			// create total:
			PdfPCell cell_total = new PdfPCell(new Paragraph("Julia's total:  "+String.valueOf(getTotal( bookings ))) );

			cell_total.setColspan(fieldsFiltered.size());
			cell_total.setHorizontalAlignment(Element.ALIGN_CENTER);
			//cell_total.setBackgroundColor(new Color(128,200,128));
			cell_total.setPadding(title_padding);
			table.addCell(cell_total);

			Font myFontSmaller = new Font(); // name & point size 
			myFontSmaller.setSize(5);
			
			// add column titles:
			for(Field field : fieldsFiltered) {
				Paragraph myP = new Paragraph();
				Chunk bar;
				if (field.getName().equalsIgnoreCase("daydeparture")) {
					bar = new Chunk("Day Departure", myFontSmaller ); 
				} else if (field.getName().equalsIgnoreCase("monthdeparture")) {
					bar = new Chunk("Month Departure", myFontSmaller ); 
				} else if (field.getName().equalsIgnoreCase("yeardeparture")) {
					bar = new Chunk("Year Departure", myFontSmaller ); 
				} else if (field.getName().equalsIgnoreCase("firstname")) {
					bar = new Chunk("First Name", myFontSmaller ); 
				} else if (field.getName().equalsIgnoreCase("bookingnumber")) {
					bar = new Chunk("Booking Number", myFontSmaller ); 
				} else if (field.getName().equalsIgnoreCase("bookingdate")) {
					bar = new Chunk("Booking Date", myFontSmaller ); 
				} else {
					bar = new Chunk(field.getName(), myFont ); 
				}
				myP.add( bar ); 
				table.addCell(myP);
			}

			// add columns
			// for each item just add cell:
			for(Booking myBookingtmp : bookings) {

				//Field[] fieldsLoop = myBookingtmp.getClass().getDeclaredFields();
				for (int col_i=0; col_i < fieldsFiltered.size(); col_i++) {
					Paragraph myP = new Paragraph();
					Object value;
					try {			
						fieldsFiltered.get(col_i).setAccessible(true);
						if ( fieldsFiltered.get(col_i).getName().equalsIgnoreCase("bookingdate")) {
							SimpleDateFormat dt1 = new SimpleDateFormat("dd/MM/YYYY");
							Date date = (Date) fieldsFiltered.get(col_i).get(myBookingtmp) ;
							value = dt1.format(date  );
						} else {
							value =  fieldsFiltered.get(col_i).get(myBookingtmp); 
						}
						Chunk bar = new Chunk(value.toString(), myFont);  
						myP.add( bar ); 
						table.addCell(myP);
					} catch (IllegalArgumentException e) { 
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					}
				}
			}

			// close all:
			document.add(table);
			document.close();
			System.out.println("finished to write to " + path + fileOutName);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		
		return fileOutName;
	}
	

	/**
	 * Filters out bookings with storno=1.  
	 * 
	 * @param bookingsIn to be filters
	 * @return a List of Booking with storno=0
	 */
	private List<Booking> filterStorno(List<Booking> bookingsIn) {
		List<Booking> bookings = new LinkedList<>();
		for (Booking booking: bookingsIn) {
			if (booking.getStorno() == 0) {
				bookings.add(booking);
			}
		}
		return bookings;
	}


	private static float getTotal( List<Booking> monthYearResults ) {
		float sum_total = 0;

		for (Booking myBooking : monthYearResults) {
			sum_total += myBooking.getTotal();
		}
		return sum_total;
	}
	
}
