#!/usr/bin/python
# -*- coding: utf-8 -*-
import numpy as np

import math

#SI model
def SI(w, t,beta,alpha): 
    x, y = w
    return np.array([-beta*y*x/(2*math.pi*alpha),beta*y*x/(2*math.pi*alpha)])  
#SIR model
def SIR(w, t, beta,gamma): 
    x, y, z = w
    return np.array([-beta*y*x, beta*y*x-gamma*y, gamma*y]) 
#SIS model
def SIS(w, t, beta,gamma): 
    x, y = w
    return np.array([gamma*y-beta*y*x,beta*y*x-gamma*y]) 
#SIRS model
def SIRS(w, t,alpha,beta,gamma):
    x, y, z = w
    return np.array([alpha*z-beta*y*x, beta*y*x-gamma*y, gamma*y-alpha*z])

#str_express:(function_name,initital data length args length)
func_dict = {"SI":(SI,2,2),"SIR":(SIR,3,2),"SIS":(SIS,2,2),'SIRS':(SIRS,3,3)}
#the label show in the figure
labels = ['$S(t)$','$I(t)$','$R(t)$']
#the line color
colors = ['blue','green','red']
#arguments name
args_dict = {'S':0,'I':1,'R':2}