package de.booking.model;


import com.fasterxml.jackson.annotation.JsonProperty;

public class Ausgaben {

    @JsonProperty("month_jahr")
    private String monthJahr;

    @JsonProperty("einnahme_netto")
    private Float einnahmeNetto;

    @JsonProperty("einnahme_steuer")
    private Float einnahmeSteuer;

    @JsonProperty("einnahme_brutto")
    private Float einnahmeBrutto;

    @JsonProperty("ausgabe_telefon")
    private Float ausgabeTelefon;

    @JsonProperty("ausgabe_porto")
    private Float ausgabePorto;

    @JsonProperty("ausgabe_tui")
    private Float ausgabeTui;

    @JsonProperty("ausgabe_buero_material")
    private Float ausgabeBueroMaterial;

    @JsonProperty("ausgabe_sonstiges")
    private Float ausgabeSonstiges;

    @JsonProperty("ausgabe_kosten_netto")
    private Float ausgabeKostenNetto;

    @JsonProperty("ausgabe_umsatz_steuer")
    private Float ausgabeUmsatzSteuer;

    @JsonProperty("gesamt_kosten_brutto")
    private Float gesamtKostenBrutto;

    @JsonProperty("einnahme_nachkosten_netto")
    private Float einnahmeNachkostenNetto;

    // need empty constructor for Spring Bean mapping
    public Ausgaben(){};

    public Ausgaben(String monthJahr, Float einnahmeNetto, Float einnahmeSteuer, Float einnahmeBrutto
            , Float ausgabeTelefon, Float ausgabePorto, Float ausgabeTui, Float ausgabeBueroMaterial
            , Float ausgabeSonstiges, Float ausgabeKostenNetto, Float ausgabeUmsatzSteuer
            , Float gesamtKostenBrutto, Float einnahmeNachkostenNetto) {
        this.monthJahr = monthJahr;
        this.einnahmeNetto = einnahmeNetto;
        this.einnahmeSteuer = einnahmeSteuer;
        this.einnahmeBrutto = einnahmeBrutto;
        this.ausgabeTelefon = ausgabeTelefon;
        this.ausgabePorto = ausgabePorto;
        this.ausgabeTui = ausgabeTui;
        this.ausgabeBueroMaterial = ausgabeBueroMaterial;
        this.ausgabeSonstiges = ausgabeSonstiges;
        this.ausgabeKostenNetto = ausgabeKostenNetto;
        this.ausgabeUmsatzSteuer = ausgabeUmsatzSteuer;
        this.gesamtKostenBrutto = gesamtKostenBrutto;
        this.einnahmeNachkostenNetto = einnahmeNachkostenNetto;
    }


    public String getMonthJahr() {
        return monthJahr;
    }

    public void setMonthJahr(String monthJahr) {
        this.monthJahr = monthJahr;
    }

    public Float getEinnahmeNetto() {
        return einnahmeNetto;
    }

    public void setEinnahmeNetto(Float einnahmeNetto) {
        this.einnahmeNetto = einnahmeNetto;
    }

    public Float getEinnahmeSteuer() {
        return einnahmeSteuer;
    }

    public void setEinnahmeSteuer(Float einnahmeSteuer) {
        this.einnahmeSteuer = einnahmeSteuer;
    }

    public Float getEinnahmeBrutto() {
        return einnahmeBrutto;
    }

    public void setEinnahmeBrutto(Float einnahmeBrutto) {
        this.einnahmeBrutto = einnahmeBrutto;
    }

    public Float getAusgabeTelefon() {
        return ausgabeTelefon;
    }

    public void setAusgabeTelefon(Float ausgabeTelefon) {
        this.ausgabeTelefon = ausgabeTelefon;
    }

    public Float getAusgabePorto() {
        return ausgabePorto;
    }

    public void setAusgabePorto(Float ausgabePorto) {
        this.ausgabePorto = ausgabePorto;
    }

    public Float getAusgabeTui() {
        return ausgabeTui;
    }

    public void setAusgabeTui(Float ausgabeTui) {
        this.ausgabeTui = ausgabeTui;
    }

    public Float getAusgabeBueroMaterial() {
        return ausgabeBueroMaterial;
    }

    public void setAusgabeBueroMaterial(Float ausgabeBueroMaterial) {
        this.ausgabeBueroMaterial = ausgabeBueroMaterial;
    }

    public Float getAusgabeSonstiges() {
        return ausgabeSonstiges;
    }

    public void setAusgabeSonstiges(Float ausgabeSonstiges) {
        this.ausgabeSonstiges = ausgabeSonstiges;
    }

    public Float getAusgabeKostenNetto() {
        return ausgabeKostenNetto;
    }

    public void setAusgabeKostenNetto(Float ausgabeKostenNetto) {
        this.ausgabeKostenNetto = ausgabeKostenNetto;
    }

    public Float getAusgabeUmsatzSteuer() {
        return ausgabeUmsatzSteuer;
    }

    public void setAusgabeUmsatzSteuer(Float ausgabeUmsatzSteuer) {
        this.ausgabeUmsatzSteuer = ausgabeUmsatzSteuer;
    }

    public Float getGesamtKostenBrutto() {
        return gesamtKostenBrutto;
    }

    public void setGesamtKostenBrutto(Float gesamtKostenBrutto) {
        this.gesamtKostenBrutto = gesamtKostenBrutto;
    }

    public Float getEinnahmeNachkostenNetto() {
        return einnahmeNachkostenNetto;
    }

    public void setEinnahmeNachkostenNetto(Float einnahmeNachkostenNetto) {
        this.einnahmeNachkostenNetto = einnahmeNachkostenNetto;
    }
}
