package com.doj.spring4.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class HelloSpring4Controller {

	@RequestMapping("/user")
	public ModelAndView user() {
		String message = "visog-job-portal-ui";
		return new ModelAndView("main/user");
	}

	@RequestMapping("/userreg")
	public ModelAndView userreg() {
		String message = "visog-job-portal-ui";
		return new ModelAndView("users_Registration");
	}

	@RequestMapping("/hello")
	public ModelAndView sayHello() {
		String message = "visog-job-portal-ui";
		return new ModelAndView("hello2");
	}

	@RequestMapping("/reg")
	public ModelAndView reg() {
		String message = "visog-job-portal-ui";
		return new ModelAndView("transaction/users_Registration");
	}

	@RequestMapping("/registration")
	public ModelAndView say() {
		String message = "visog-job-portal-ui";
		return new ModelAndView("master/registration");
	}

	@RequestMapping(value = "/roles", method = RequestMethod.GET)
	public String roles() {
		String message = "visog-job-portal-ui";
		return "master/roles";
	}

	@RequestMapping(value = "/gender", method = RequestMethod.GET)
	public String gender() {
		String message = "visog-job-portal-ui";
		return "master/gender";
	}

	@RequestMapping(value = "/country", method = RequestMethod.GET)
	public String country() {
		String message = "visog-job-portal-ui";

		return "master/country";
	}

	@RequestMapping(value = "/state", method = RequestMethod.GET)
	public String state() {
		String message = "visog-job-portal-ui";
		return "master/state";
	}

	@RequestMapping(value = "/city", method = RequestMethod.GET)
	public String city() {
		String message = "visog-job-portal-ui";
		return "master/city";
	}

	@RequestMapping(value = "/addresstype", method = RequestMethod.GET)
	public String addresstype() {
		String message = "visog-job-portal-ui";
		return "master/address_Type";
	}

	@RequestMapping(value = "/courses", method = RequestMethod.GET)
	public String courses() {
		String message = "visog-job-portal-ui";
		return "master/courses";
	}

	@RequestMapping(value = "/specialization", method = RequestMethod.GET)
	public String specialization() {
		String message = "visog-job-portal-ui";
		return "master/specialization";
	}
	
	@RequestMapping(value = "/university", method = RequestMethod.GET)
	public String university() {
		String message = "visog-job-portal-ui";
		return "master/university";
	}

	@RequestMapping(value = "/educationtype", method = RequestMethod.GET)
	public String educationtype() {
		String message = "visog-job-portal-ui";
		return "master/education_Type";
	}

	@RequestMapping(value = "/languages", method = RequestMethod.GET)
	public String languages() {
		String message = "visog-job-portal-ui";
		return "master/languages";
	}

	@RequestMapping(value = "/currency", method = RequestMethod.GET)
	public String currency() {
		String message = "visog-job-portal-ui";
		return "master/currency";
	}

	@RequestMapping(value = "/industry", method = RequestMethod.GET)
	public String industry() {
		String message = "visog-job-portal-ui";
		return "master/industry";
	}

	@RequestMapping(value = "/domains", method = RequestMethod.GET)
	public String domains() {
		String message = "visog-job-portal-ui";
		return "master/domains";
	}

	@RequestMapping(value = "/jobrole", method = RequestMethod.GET)
	public String jobrole() {
		String message = "visog-job-portal-ui";
		return "master/job_Role";
	}

	@RequestMapping(value = "/status", method = RequestMethod.GET)
	public String status() {
		String message = "visog-job-portal-ui";
		return "master/status";
	}

	@RequestMapping(value = "/employmenttype", method = RequestMethod.GET)
	public String empType() {
		String message = "visog-job-portal-ui";
		return "master/employment_Type";
	}

	@RequestMapping(value = "/employertype", method = RequestMethod.GET)
	public String employertype() {
		String message = "visog-job-portal-ui";
		return "master/employer_Type";
	}

	@RequestMapping(value = "/filetype", method = RequestMethod.GET)
	public String filetype() {
		String message = "visog-job-portal-ui";
		return "master/file_Type";
	}

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index() {
		String message = "visog-job-portal-ui";
		return "main/index";
	}
	
	@RequestMapping(value = "/files", method = RequestMethod.GET)
	public String files() {
		String message = "visog-job-portal-ui";
		return "transaction/files";
	}
	
	

}
