package de.booking.model;

public class Response {
	private String url;
	
	// dummy constructor so Jackson can convert JSon to POJO class
	public Response() {}
	
	public Response(String url) {
		this.url = url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUrl() {
		return this.url;
	}
}
