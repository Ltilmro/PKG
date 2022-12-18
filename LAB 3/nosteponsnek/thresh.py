import cv2
import numpy as np

img = cv2.imread('skull.jpg',0)
img2 = cv2.imread('skull.jpg')
img3=cv2.subtract(img2,img2)
threb=cv2.subtract(img,img)
nib=cv2.subtract(img,img)
retval, threshold = cv2.threshold(img, 12, 255, cv2.THRESH_BINARY)
thresh = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 15, 10)
contours, hierarchy=cv2.findContours(threshold,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
thr:int
l:int
r:int
u:int
d:int
for i in range(img.shape[0]):
    for j in range(img.shape[1]):
        sum=0
        mean=0
        dsp=0
        mx=0
        mn=255
        l=max(i-7,0)
        r=min(i+7,img.shape[0])
        u=max(j-7,0)
        d=min(j+7,img.shape[1])
        for x in range(l,r):
            for y in range(u,d):
                sum+=img[x][y]
                if(img[x][y]>mx):
                    mx=img[x][y]
                if(img[x][y]<mn):
                    mn=img[x][y]
        sum=sum/((d-u+1)*(r-l+1))
        for x in range(l,r):
            for y in range(u,d):
                dsp+=pow((sum-img[x][y]),2)
        mean=(mx+mn)/2
        dsp=pow((dsp/((d-u+1)*(r-l+1))),1/2)
        if(img[i][j]>=mean):
            threb[i][j]=255
        else:
            threb[i][j]=0
        if(img[i][j]>=sum-0.2*dsp):
            nib[i][j]=255
        else:
            nib[i][j]=0
cv2.drawContours(img3,contours,-1,(0,0,255),1)
cv2.imshow('original',img)
cv2.imshow('nib',nib)
cv2.imshow('bern',threb)
cv2.imshow('adp',thresh)
cv2.imshow('contour',img3)
cv2.waitKey(0)
cv2.destroyAllWindows()