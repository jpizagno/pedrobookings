package de.booking.report;

import de.booking.model.Ausgaben;
import org.junit.Test;

import java.util.LinkedList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class WritePdfAusgabenTest {

    @Test
    public void generateReport() {
        List<Ausgaben> ausgaben = new LinkedList<>();

        Ausgaben ausgabe = new Ausgaben("monthJahr", 100f, 19.9f, 119.0f
                , 0.0f, 0.0f , 0.0f, 0.0f
                , 0.0f, 0.0f, 0.0f
                , 0.0f, 0.0f);

        ausgaben.add(ausgabe);

        WritePdfAusgaben writer = new WritePdfAusgaben();
        String url = writer.generateReport(ausgaben, "", "fileOutNameAusgaben.pdf", "title");

        assertThat(url, is("fileOutNameAusgaben.pdf") );
    }
}
