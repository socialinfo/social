#!/usr/bin/python
# -*- coding: utf-8 -*-
from __future__ import division
from scipy.optimize import leastsq
from scipy.integrate import odeint
import matplotlib.pyplot as plt 
import numpy as np
from utils import func_dict,args_dict

def add(a,b):
    return a+b
#包装求解微分方程的函数
def fitting_model(model,init_val,pos):
    def wrapfunc(x,p):
        p = tuple(p)
        res = odeint(model, init_val, x, args=p)
        return res[:,pos]
    return wrapfunc
#包装求解残量的函数
def residuals(model,init_val,pos):
    def wrapfunc(p, y, x):
        func = fitting_model(model,init_val,pos)
        return y - func(x, p)
    return wrapfunc

"""
Arguments:
    modelName:模型的名称(SI,SIR,SIS,SIRS)
    init_val:微分方程中参数的初始解
    argsName:需要拟合的变量名称 (S,I,R)
    x:x轴上的位置
    p:需要拟合参数的初始值
"""
def fitArgs(modelName,init_val,argsName,x,p,data):
    pos = args_dict[argsName]
    modelName = modelName.upper()
    if(modelName not in func_dict):
        print 'unknown Model name %s' %modelName
    character = func_dict[modelName]
    if len(init_val) != character[1]:
        print 'too more or less initial value'
        print 'takes exactly %d' %character[1]
        return
    if len(p) != character[2]:
        print 'too more or less fitting arguments'
        print 'takes exactly %d' %character[2]
        return
    
    func1 = fitting_model(character[0],init_val,pos)
    #y1 = data + 4 * np.random.randn(len(x)) 
    
    re = residuals(character[0],init_val,pos)
    plsq = leastsq(re, p, args=(data, x))
    
    return plsq[0]
def wx_fitArgs(modelName,init_val,argsName,x,p,data,MPL):
    pos = args_dict[argsName]
    modelName = modelName.upper()
    if(modelName not in func_dict):
        print 'unknown Model name %s' %modelName
    character = func_dict[modelName]
    if len(init_val) != character[1]:
        print 'too more or less initial value'
        print 'takes exactly %d' %character[1]
        return
    if len(p) != character[2]:
        print 'too more or less fitting arguments'
        print 'takes exactly %d' %character[2]
        return
    
    func1 = fitting_model(character[0],init_val,pos)
    #y1 = data + 4 * np.random.randn(len(x)) 
    
    re = residuals(character[0],init_val,pos)
    plsq = leastsq(re, p, args=(data, x))
    
    print "Fitting arguments:", plsq[0]
    
    MPL.cla()
    MPL.plot(x, data, 'xr',label="Real Data")
    #plt.plot(x, data, label="Data with Noise")
    MPL.plot(x, func1(x, plsq[0]), label="Fitting Data")
    MPL.title_MPL(modelName + ' Model with arguments '+ str(plsq[0]))
    MPL.legend(loc=2)
    MPL.UpdatePlot()
def simulationData(modelName,x,init_val,argsName,p):
    pos = args_dict[argsName]
    func1 = fitting_model(func_dict[modelName.upper()][0],init_val,pos)
    data = func1(x, p) 
    return data
if __name__  == '__main__':
    real_data = [173772,196452,214711,237735,265464,289709,312804,337017,362827]
    x = np.linspace(0, 1, len(real_data))
    #第一步猜想的值
    p0 = [0.0001]  
    init_val = [362827.0,173772]
    fitArgs('SI',init_val,'I',x,p0,real_data) 
    
    #实际的值
    p = [0.003]
    x0 = np.linspace(0, 1, len(real_data))
    #这里的data要换成真实的数据值
    data = simulationData('SI', x0, init_val,'I', p)
    #fitArgs('SI',init_val,'I',x0,p0,data) 
    #print data
