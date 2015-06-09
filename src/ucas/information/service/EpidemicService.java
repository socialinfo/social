package ucas.information.service;

import org.python.core.PyFunction;
import org.python.core.PyInteger;
import org.python.core.PyObject;
import org.python.util.PythonInterpreter;

import ucas.information.entity.SIModel;

public class EpidemicService {
	public SIModel fittingModel(String []xs,String []ys){
		SIModel model = new SIModel();
		model.setAlpha(100);
		model.setBeta(10);
//		PythonInterpreter interpreter = new PythonInterpreter();  
//		String path = EpidemicService.class.getClassLoader().getResource("leastsq.py").getPath();
//		interpreter.execfile(path);  
//		PyFunction func = (PyFunction)interpreter.get("add",PyFunction.class);  
//		  
//		int a = 2010, b = 2 ;  
//	    PyObject pyobj = func.__call__(new PyInteger(a), new PyInteger(b));  
//	    System.out.println("anwser = " + pyobj.toString());  
		return model;
	}
}
