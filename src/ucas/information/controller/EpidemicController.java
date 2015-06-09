package ucas.information.controller;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ucas.information.entity.SIModel;
import ucas.information.service.EpidemicService;

@Controller
public class EpidemicController {
	@Resource(name = "epidemicService")
    private EpidemicService service;
	@RequestMapping(value = "/simodel.do",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public SIModel fittingData(@RequestParam(value = "xs", required = true) String []xs, @RequestParam(value = "ys",required = true) String[] ys){
		
		return service.fittingModel(xs, ys);
	}
}
