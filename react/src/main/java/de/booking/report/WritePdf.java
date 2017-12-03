package de.booking.report;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.lang.reflect.Field;
import java.util.Arrays;
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

import de.booking.Booking;


public class WritePdf {

	/**
	 * Generates a Report, given these bookings.
	 * 
	 * @param bookings   A list of Bookings to include in the report
	 * @param fileOutName  The PDF file to write
	 * @param title To be printed on PDF. ex: "Julia's bookings for month "+month_str+" year "+year_str
	 * @return 0=Sucess, Fail!=0
	 */
	public String generateReport(List<Booking>  bookings, String fileOutName, String title) {
		if (bookings.size() == 0 ) {
			return "error_bookings_empty";
		}
		
		String path = ""; //"/Users/jim/Desktop/";

		float title_padding = 10.0f;

		//Document document = new Document();
		// Landscape mode:
		Document document = new Document(PageSize.LETTER.rotate());

		Field[] fields = bookings.get(0).getClass().getDeclaredFields();
		int num_columns = fields.length;

		/*
		 * We do not want to print the columns:  id(0), comment(13), updated_time(15).
		 * num_columns = num_columns - 3.
		 * 
		 * We want to rewrite "booking_number" as "Transactions-ID".
		 * 
		 */
		num_columns = num_columns - 3;
		// remove id,comment, updated_time from fields
		// better to recreate fields without these
		Field[] fields_tmp = new Field[num_columns];
		fields_tmp[0] = fields[1];
		Field[] tmp = Arrays.copyOfRange(fields, 2, 13);
		for (int i=0;i<tmp.length;i++){
			fields_tmp[i+1] = tmp[i];
		}
		fields_tmp[12] = fields[14];
		fields = fields_tmp;

		String[] columnTitles = new String[num_columns];
		for (int col_i=0; col_i<num_columns;col_i++){
			columnTitles[col_i] = fields[col_i].getName();
		}

		try {
			PdfWriter.getInstance(document, new FileOutputStream(path+fileOutName));
			document.open();
			PdfPTable table = new PdfPTable(num_columns);

			// set universal FONT:
			Font myFont = new Font(); // name & point size 
			myFont.setSize(6);

			// create title cell:
			PdfPCell cell_title = new PdfPCell(new Paragraph(title));
			cell_title.setColspan(num_columns);
			cell_title.setHorizontalAlignment(Element.ALIGN_CENTER);
			//cell_title.setBackgroundColor(new Color(128,200,128));
			cell_title.setPadding(title_padding);
			table.addCell(cell_title);

			// create total:
			float total4monthNyear = getTotal( bookings ) ;

			PdfPCell cell_total = new PdfPCell(new Paragraph("Julia's total:  "+String.valueOf(total4monthNyear)) );
			cell_total.setColspan(num_columns);
			cell_total.setHorizontalAlignment(Element.ALIGN_CENTER);
			//cell_total.setBackgroundColor(new Color(128,200,128));
			cell_total.setPadding(title_padding);
			table.addCell(cell_total);

			// add column titles:
			for (int col_i=0; col_i < columnTitles.length; col_i++) {
				Paragraph myP = new Paragraph();
				Chunk bar ;
				if (col_i==10) {
					// need smaller font here
					Font myFontSmaller = new Font(); // name & point size 
					myFontSmaller.setSize(5);
					bar = new Chunk("Transactions-ID", myFontSmaller );
				} else {
					bar = new Chunk(columnTitles[col_i], myFont ); 
				}
				myP.add( bar ); 
				table.addCell(myP);
			}

			// add columns
			// for each item just add cell:
			for(Booking myBookingtmp : bookings) {

				//Field[] fieldsLoop = myBookingtmp.getClass().getDeclaredFields();
				for (int col_i=0; col_i < fields.length; col_i++) {
					Paragraph myP = new Paragraph();
					fields[col_i].setAccessible(true);
					Object value;
					try {			
						value = fields[col_i].get(myBookingtmp);
						String column_atthis_row = " ";
						if (value != null) {
							column_atthis_row = value.toString();
						}
//						if(col_i==12) {
//							// removes HH:MM:SS from timestamp. 
//							column_atthis_row = column_atthis_row.substring(0, 10);
//						}
						Chunk bar = new Chunk(column_atthis_row, myFont ); 
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
	

	private static float getTotal( List<Booking> monthYearResults ) {
		float sum_total = 0;

		for (Booking myBooking : monthYearResults) {
			sum_total += myBooking.getTotal();
		}
		return sum_total;
	}
	
}
