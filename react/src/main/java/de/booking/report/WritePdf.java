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

	int widthCells;

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

		// filter out Storno Bookings
		List<Booking> bookings = filterStorno(bookingsIn);

		float title_padding = 10.0f;

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

			// since we have an extra column for "Num" increase Table size:
			widthCells = fieldsFiltered.size() + 1;

			PdfPTable table = new PdfPTable(widthCells);

			// set universal FONT:
			Font myFont = new Font(); // name & point size 
			myFont.setSize(6);

			// create title cell:
			addTitleCell(title, title_padding, table);

			// create total:
			addTotalCell(bookings, title_padding, table);

			Font myFontSmaller = new Font(); // name & point size 
			myFontSmaller.setSize(5);
			
			// add column titles:
			Paragraph myP = new Paragraph();
			myP.add( new Chunk("Num", myFont ) );
			table.addCell(myP);
			for(Field field : fieldsFiltered) {
				myP = new Paragraph();
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
			int row_i = 1;
			for(Booking myBookingtmp : bookings) {
				// add Num column, or row counter
				row_i = addNumCell(table, myFont, row_i);

				for (int col_i=0; col_i < fieldsFiltered.size(); col_i++) {
					myP = new Paragraph();
					Object value;
					try {
						fieldsFiltered.get(col_i).setAccessible(true);
						if (fieldsFiltered.get(col_i).getName().equalsIgnoreCase("bookingdate")) {
							SimpleDateFormat dt1 = new SimpleDateFormat("dd/MM/YYYY");
							Date date = (Date) fieldsFiltered.get(col_i).get(myBookingtmp);
							value = dt1.format(date);
						} else {
							value = fieldsFiltered.get(col_i).get(myBookingtmp);
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
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		
		return fileOutName;
	}

	/**
	 * Add Title Cell for Month, spanning entire row
	 *
	 * @param title
	 * @param title_padding
	 * @param table
	 */
	private void addTitleCell(String title, float title_padding, PdfPTable table) {
		PdfPCell cell_title = new PdfPCell(new Paragraph(title));
		cell_title.setColspan(widthCells);
		cell_title.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell_title.setPadding(title_padding);
		table.addCell(cell_title);
	}

	/**
	 * Add Total in a single row
	 *
	 * @param bookings
	 * @param title_padding
	 * @param table
	 */
	private void addTotalCell(List<Booking> bookings, float title_padding, PdfPTable table) {
		PdfPCell cell_total = new PdfPCell(new Paragraph("Julia's total:  "+String.valueOf(getTotal( bookings ))) );
		cell_total.setColspan(widthCells);
		cell_total.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell_total.setPadding(title_padding);
		table.addCell(cell_total);
	}

	/**
	 * Adds row_i to the table, using this font
	 *
	 * @param table
	 * @param myFont
	 * @param row_i
	 * @return
	 */
	private int addNumCell(PdfPTable table, Font myFont, int row_i) {
		Paragraph myP;
		Chunk bar = new Chunk(""+row_i, myFont);
		myP = new Paragraph();
		myP.add( bar );
		table.addCell(myP);
		row_i++;
		return row_i;
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
