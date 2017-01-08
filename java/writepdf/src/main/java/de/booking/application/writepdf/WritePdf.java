package de.booking.application.writepdf;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.swing.JTable;

import org.hibernate.Session;

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

import de.booking.application.writepdf.model.Booking;

import org.hibernate.cfg.AnnotationConfiguration;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

/**
 * 
 * @author jim
 *
 * maven build with "mvn clean compile assembly:single"
 *
 */

public class WritePdf {

	private JTable bookingtable;

	public static void main(String[] args) {

		// assume Strings containg file, month, year
		String month_str = args[0];
		String year_str = args[1];
		String fileOutName = args[2];

		List<Booking>  bookings = getBookingsByMonthYear(new Integer(month_str),new Integer(year_str));

		String path = "/tmp/"; //"/Users/jim/Desktop/";

		float title_padding = 10.0f;

		//Document document = new Document();
		// Landscape mode:
		Document document = new Document(PageSize.LETTER.rotate());

		Booking myBooking = new Booking();
		Field[] fields = myBooking.getClass().getDeclaredFields();
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
			PdfPCell cell_title = new PdfPCell(new Paragraph("Julia's bookings for month "+month_str+" year "+year_str));
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
						if(col_i==12) {
							// removes HH:MM:SS from timestamp. 
							column_atthis_row = column_atthis_row.substring(0, 10);
						}
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

	}

	private static float getTotal( List<Booking> monthYearResults ) {
		float sum_total = 0;

		for (Booking myBooking : monthYearResults) {
			sum_total += myBooking.getTotal();
		}
		return sum_total;
	}

	public static List<Booking> getBookingsByMonthYear(int month, int year) {

		// get connection to Database
		AnnotationConfiguration configuration = new AnnotationConfiguration();
		configuration.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5InnoDBDialect");
		configuration.setProperty("hibernate.connection.driver_class","com.mysql.jdbc.Driver");
		configuration.setProperty("hibernate.connection.url", "jdbc:mysql://localhost:3306/bookings");
		configuration.setProperty("hibernate.connection.password", "root");
		configuration.setProperty("hibernate.connection.username", "root");       

		// get a session
		configuration.addAnnotatedClass(de.booking.application.writepdf.model.Booking.class);
		SessionFactory sessionFactory = configuration.buildSessionFactory();
		Session session = sessionFactory.openSession();       

		String columns = "kreuzfahrt, "
				+ "flug , "
				+ "hotel , "
				+ "versicherung , "
				+ "total , "
				+ "day_departure , "
				+ "month_departure , "
				+ "year_departure , "
				+ "first_name , "
				+ "surname , "
				+ "booking_number , "
				+ "storno , "
				+ "booking_date";

		String sSQL  = " SELECT * FROM Booking as bb " +
				" WHERE bb.month_departure="+String.valueOf(month)+"" +
				" AND bb.year_departure="+String.valueOf(year)+" " +
	            " AND storno=0";
		SQLQuery query = session.createSQLQuery(sSQL);
		query.addEntity(Booking.class);
		List myListTmp = query.list();

		List<Booking> bookingList = new ArrayList<Booking>();
		java.util.Iterator iterator = myListTmp.iterator();
		while (iterator.hasNext()) {
			Booking myBookingTmp =  (Booking) iterator.next();
			//Booking myBooking = new Booking();
			//myBooking.setKreuzfahrt( myBookingTmp.getKreuzfahrt());
			//bookingList.add(myBooking);
			bookingList.add(myBookingTmp);
		}

		return bookingList;
	}

}
