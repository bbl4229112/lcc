package edu.zju.cims201.GOF.hibernate.pojo;

import java.util.Date;


/**
 * OwlWedlog generated by MyEclipse Persistence Tools
 */

public class OwlWedlog  {


	 private Long id;
     private String username;
     public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	private String userEmail;
     private String owlfilename;
     private Date timesample;
     private String operationtype;
     private String operationobject;
     private String timestr;
     


    public String getTimestr() {
		return timestr;
	}

	public void setTimestr(String timestr) {
		this.timestr = timestr;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


    public String getOwlfilename() {
        return this.owlfilename;
    }
    
    public void setOwlfilename(String owlfilename) {
        this.owlfilename = owlfilename;
    }

    public Date getTimesample() {
        return this.timesample;
    }
    
    public void setTimesample(Date timesample) {
        this.timesample = timesample;
    }

    public String getOperationtype() {
        return this.operationtype;
    }
    
    public void setOperationtype(String operationtype) {
        this.operationtype = operationtype;
    }

    public String getOperationobject() {
        return this.operationobject;
    }
    
    public void setOperationobject(String operationobject) {
        this.operationobject = operationobject;
    }
   








}