#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <fstream>
#include <algorithm>
#include <QPainter>
#include <QPaintEvent>
#include <QRgb>
#include <QColorDialog>
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}
bool lb=1;
void MainWindow::paintEvent(QPaintEvent*)
{
    std::ifstream in;
    in.open("input.txt");
    int n;
    in>>n;
    int* x1;
    int* x2;
    int* y1;
    int* y2;
    x1=new int[n];
    x2=new int[n];
    y1=new int[n];
    y2=new int[n];
    double yn,yx,yo,yt,xn,xx,xo,xt;
    int xmin,ymin,xmax,ymax;
    QPainter painter(this);
    painter.setPen (QPen(Qt::black,5,Qt::SolidLine,Qt::RoundCap));
    QPainterPath path;
    bool b;
for(int i=0;i<n;i++)
{
    in>>x1[i]>>y1[i]>>x2[i]>>y2[i];
    //path.moveTo(x1,y1);
    //path.lineTo(x2,y2);
}
 //painter.drawPath(path);
 //path.clear();
in>>xmin>>ymin>>xmax>>ymax;
xx=xmax;
yx=ymax;
yn=ymin;
xn=xmin;
painter.setPen (QPen(Qt::red,3,Qt::SolidLine,Qt::RoundCap));
if(lb)
{
path.moveTo(xmin,ymin);
path.lineTo(xmin,ymax);
path.lineTo(xmax,ymax);
path.lineTo(xmax,ymin);
path.lineTo(xmin,ymin);
     painter.drawPath(path);
     path.clear();
     painter.setPen (QPen(Qt::black,5,Qt::SolidLine,Qt::RoundCap));
     double xin,yin,xout,yout,ti,to;
     double s[4];
     double q[4];
     for(int i=0;i<n;i++)
     {
        xo=x1[i];
        xt=x2[i];
        yo=y1[i];
        yt=y2[i];
        ti=0;
        to=1;
        s[0]=yo-yt; s[1]=xo-xt; s[2]=yt-yo; s[3]=xt-xo;
        q[0]=yo-yn; q[1]=xo-xn; q[2]=yx-yo; q[3]=xx-xo;
        for(int j=0;j<4;j++)
        {
            b=1;
            if(s[j]>0)
            {
                to=std::min(q[j]/s[j],to);
            }
            else if(s[j]<0)
            {
                ti=std::max(q[j]/s[j],ti);
            }
            if(s[j]==0)
            {
                if(q[j]<0)
                {
                b=0;
                break;
                }
            }
        }
        if(b)
        {
        xin=xo+ti*(s[3]);
        xout=xo+to*(s[3]);
        yin=yo+ti*(s[2]);
        yout=yo+to*(s[2]);
        if(xn<=xin&&xin<=xx&&xn<=xout&&xout<=xx&&yn<=yin&&yin<=yx&&yn<=yout&&yout<=yx)
        {
        path.moveTo(xin,yin);
        path.lineTo(xout,yout);
        }
        }
     }
     painter.drawPath(path);
}
else
{
    int nn;
    in>>nn;
int* a1;
int* a2;
int* b1;
int* b2;
a1=new int[nn];
a2=new int[nn];
b1=new int[nn];
b2=new int[nn];
for(int i=0;i<nn;i++)
{
    in>>a1[i]>>b1[i]>>a2[i]>>b2[i];
    path.moveTo(a1[i],b1[i]);
    path.lineTo(a2[i],b2[i]);
}
painter.drawPath(path);
path.clear();
for(int i=0;i<n;i++)
{
   xo=x1[i];
   xt=x2[i];
   yo=y1[i];
   yt=y2[i];
}
}
}
void MainWindow::on_actionRectangle_triggered()
{
    lb=1;
    repaint();

}
void MainWindow::on_actionPolygon_triggered()
{
    lb=0;
    repaint();

}
MainWindow::~MainWindow()
{
    delete ui;
}

