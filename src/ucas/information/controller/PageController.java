package ucas.information.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class PageController
{

	@RequestMapping("/pageDispatch.do")
	public String pageDispatch(String page)
	{
		if(null == page || "".equals(page))
		{
			return "main";
		}
		return page;
	}
}