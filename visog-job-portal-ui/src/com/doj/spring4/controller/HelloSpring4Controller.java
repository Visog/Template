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
		return new ModelAndView("main/user");
	}

	@RequestMapping("/userreg")
	public ModelAndView userreg() {
		return new ModelAndView("users_Registration");
	}

	@RequestMapping("/hello")
	public ModelAndView sayHello() {
		return new ModelAndView("hello2");
	}

	@RequestMapping("/reg")
	public ModelAndView reg() {
		return new ModelAndView("transaction/users_Registration");
	}

	@RequestMapping("/registration")
	public ModelAndView say() {
		return new ModelAndView("master/registration");
	}

	@RequestMapping(value = "/roles", method = RequestMethod.GET)
	public String roles() {
		return "master/roles";
	}

	@RequestMapping(value = "/gender", method = RequestMethod.GET)
	public String gender() {
		return "master/gender";
	}

	@RequestMapping(value = "/country", method = RequestMethod.GET)
	public String country() {
		return "master/country";
	}

	@RequestMapping(value = "/state", method = RequestMethod.GET)
	public String state() {
		return "master/state";
	}

	@RequestMapping(value = "/city", method = RequestMethod.GET)
	public String city() {
		return "master/city";
	}

	@RequestMapping(value = "/addressType", method = RequestMethod.GET)
	public String addresstype() {
		return "master/address_Type";
	}

	@RequestMapping(value = "/courses", method = RequestMethod.GET)
	public String courses() {
		return "master/courses";
	}

	@RequestMapping(value = "/specialization", method = RequestMethod.GET)
	public String specialization() {
		return "master/specialization";
	}

	@RequestMapping(value = "/university", method = RequestMethod.GET)
	public String university() {
		return "master/university";
	}

	@RequestMapping(value = "/educationType", method = RequestMethod.GET)
	public String educationType() {
		return "master/educationType";
	}

	@RequestMapping(value = "/languages", method = RequestMethod.GET)
	public String languages() {
		return "master/languages";
	}

	@RequestMapping(value = "/currency", method = RequestMethod.GET)
	public String currency() {
		return "master/currency";
	}

	@RequestMapping(value = "/industry", method = RequestMethod.GET)
	public String industry() {
		return "master/industry";
	}

	@RequestMapping(value = "/domains", method = RequestMethod.GET)
	public String domains() {
		return "master/domains";
	}

	@RequestMapping(value = "/jobRole", method = RequestMethod.GET)
	public String jobRole() {
		return "master/job_Role";
	}

	@RequestMapping(value = "/status", method = RequestMethod.GET)
	public String status() {
		return "master/status";
	}

	@RequestMapping(value = "/employementType", method = RequestMethod.GET)
	public String employmenttype() {
		return "master/employementType";
	}

	@RequestMapping(value = "/employerType", method = RequestMethod.GET)
	public String employertype() {
		return "master/employer_Type";
	}

	@RequestMapping(value = "/fileType", method = RequestMethod.GET)
	public String filetype() {
		return "master/file_Type";
	}

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index() {
		return "main/index";
	}

	@RequestMapping(value = "/files", method = RequestMethod.GET)
	public String files() {
		return "transaction/files";
	}

	@RequestMapping(value = "/experienceDetails", method = RequestMethod.GET)
	public String experiencedetails() {
		return "transaction/experience_Details";
	}

	@RequestMapping(value = "/jobSeeker", method = RequestMethod.GET)
	public String jobseeker() {
		return "transaction/job_Seeker";
	}

	@RequestMapping(value = "/employerJobseeker", method = RequestMethod.GET)
	public String employerjobseeker() {
		return "transaction/employer_Jobseeker";
	}

	@RequestMapping(value = "/address", method = RequestMethod.GET)
	public String address() {
		return "transaction/address";
	}

	@RequestMapping(value = "/employer", method = RequestMethod.GET)
	public String employer() {
		return "transaction/employer";
	}
	
	@RequestMapping(value = "/languagesKnown", method = RequestMethod.GET)
	public String languageknown() {
		return "transaction/language_Known";
	}

	@RequestMapping(value = "/postJob", method = RequestMethod.GET)
	public String postjob() {
	//	return "transaction/post_Job";
		return "transaction//PostJobByEmployer";
	}
	
	@RequestMapping(value = "/projectDetails", method = RequestMethod.GET)
	public String projectdetails() {
		return "transaction/project_Details";
	}
	
	@RequestMapping(value = "/postJodDomains", method = RequestMethod.GET)
	public String Post_JodDomains() {
		return "transaction/post_JobDomains";
	}
	
	@RequestMapping(value = "/educationDetails", method = RequestMethod.GET)
	public String educationdetails() {
		return "transaction/education_Details";
	}
	@RequestMapping(value = "/postJobseeker", method = RequestMethod.GET)
	public String postjobseeker() {
		return "transaction/postJobSeeker";
	}

	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		return "transaction/LoginNew";
	}
}
