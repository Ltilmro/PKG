import cv2
import numpy as np

img = cv2.imread('skull.jpg',0)
img2 = cv2.imread('skull.jpg')
img3=cv2.subtract(img2,img2)
retval, threshold = cv2.threshold(img, 12, 255, cv2.THRESH_BINARY)
thresh = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 15, 10)
thresh2 = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C+cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 15, 0)
contours, hierarchy=cv2.findContours(threshold,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
cv2.drawContours(img3,contours,-1,(0,0,255),1)
cv2.imshow('original',img)
cv2.imshow('threshold',threshold)
cv2.imshow('adp',thresh)
cv2.imshow('gauss',thresh2)
cv2.imshow('contour',img3)
cv2.waitKey(0)
cv2.destroyAllWindows()