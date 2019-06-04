package de.booking.report;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import de.booking.model.Ausgaben;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class WritePdfAusgaben {

    private int widthCells;

    private Logger logger = LoggerFactory.getLogger(WritePdfAusgaben.class);

    /**
     * Will generate a report for the input Ausgaben list.
     *
     * @param ausgabens
     * @param path
     * @param fileOutName
     * @param title
     * @return
     */
    public String generateReport(List<Ausgaben> ausgabens, String path, String fileOutName, String title) {
        logger.info("creating report with path="+path+" fileOutName="+fileOutName+" number of input bookings="+ausgabens.size());
        if (ausgabens.size() == 0 ) {
            return "error_ausgabens_empty";
        }

        float title_padding = 10.0f;

        // Landscape mode:
        Document document = new Document(PageSize.LETTER.rotate());

        Field[] fieldsFull = ausgabens.get(0).getClass().getDeclaredFields();

        // filter out field name "id"
        List<Field> fields = new ArrayList<Field>();
        for (Field field : fieldsFull) {
            if(field.getName().equalsIgnoreCase("id") == false) {
                fields.add(field);
            }
        }

        try {
            PdfWriter.getInstance(document, new FileOutputStream(path+fileOutName));
            document.open();

            // define the number of cells
            widthCells = fields.size();

            PdfPTable table = new PdfPTable(widthCells);

            // set universal FONT:
            Font myFont = new Font(); // name & point size
            myFont.setSize(6);

            // create title cell:
            addTitleCell(title, title_padding, table);

            Font myFontSmaller = new Font(); // name & point size
            myFontSmaller.setSize(5);

            // add column titles:
            for(Field field : fields) {
                Paragraph myP = new Paragraph();
                Chunk bar;
                if (field.getName().equalsIgnoreCase("monthJahr")) {
                    bar = new Chunk("Month-Year", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("einnahmeNetto")) {
                    bar = new Chunk("Einnahme Netto", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("einnahmeSteuer")) {
                    bar = new Chunk("Einnahme Steuer", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("einnahmeBrutto")) {
                    bar = new Chunk("Einnahme Brutto", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("ausgabeTelefon")) {
                    bar = new Chunk("Ausgabe Telefon", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("ausgabePorto")) {
                    bar = new Chunk("Ausgabe Porto", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("ausgabeTui")) {
                    bar = new Chunk("Ausgabe Tui", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("ausgabeBueroMaterial")) {
                    bar = new Chunk("Ausgabe Buero Material", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("ausgabeSonstiges")) {
                    bar = new Chunk("Ausgabe Sonstiges", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("ausgabeKostenNetto")) {
                    bar = new Chunk("Ausgabe Kosten Netto", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("ausgabeUmsatzSteuer")) {
                    bar = new Chunk("Ausgabe Umsatz Steuer", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("gesamtKostenBrutto")) {
                    bar = new Chunk("Gesamt Kosten Brutto", myFontSmaller );
                } else if (field.getName().equalsIgnoreCase("einnahmeNachkostenNetto")) {
                    bar = new Chunk("Einnahme Nachkosten Netto", myFontSmaller );
                } else {
                    bar = new Chunk(field.getName(), myFont );
                }
                myP.add( bar );
                table.addCell(myP);
            }

            // add columns
            // for each item just add cell:
            for(Ausgaben ausgaben : ausgabens) {

                for (Field field : fields) {
                    Paragraph myP = new Paragraph();
                    Object value;
                    try {
                        field.setAccessible(true);
                        value = field.get(ausgaben);
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

        logger.info("finished creating report with path="+path+" fileOutName="+fileOutName);
        return fileOutName;
    }

    /**
     * Add Title Cell spanning entire row
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

}
