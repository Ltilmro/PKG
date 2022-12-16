#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QPainter>
#include <QPaintEvent>
#include <QRgb>
#include <QColorDialog>
#include <QInputDialog>
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}
int x1=0;
int x2=-8;
int y1=1;
int y2=5;
int xx1=0;
int xx2=-8;
int yy1=2;
int yy2=-8;
int ddx1=2;
int ddx2=7;
int ddy1=3;
int ddy2=5;
double r=10.5;
int e=25;
void MainWindow::paintEvent(QPaintEvent*)
{
    QPainter painter(this);
    painter.setPen (QPen(Qt::black,1,Qt::SolidLine,Qt::FlatCap));
    QPainterPath path;
for(int i=0;i<500;i++)
{
    path.moveTo(0,e*i);
    path.lineTo(1920,e*i);
}
for(int i=0;i<500;i++)
{
    path.moveTo(i*e,0);
    path.lineTo(i*e,1080);
}
     painter.drawPath(path);
     painter.setPen (QPen(Qt::black,5,Qt::SolidLine,Qt::FlatCap));
     QPainterPath path2;
     path2.moveTo(16*e*e*(25/e),0);
     path2.lineTo(16*e*e*(25/e),1080);
     path2.moveTo(0,12*e*e*(25/e));
     path2.lineTo(1920,12*e*e*(25/e));
      painter.drawPath(path2);
      int x0=16*e*(25/e);
      int y0=12*e*(25/e);
      QPainterPath path3,path4;
      painter.setPen (QPen(Qt::red,5,Qt::SolidLine,Qt::FlatCap));
      path3.moveTo(x0+x1*e,y0-y1*e);
      path3.lineTo(x0+x2*e,y0-y2*e);
      painter.drawPath(path3);
      int x=x0+x1*e;
      int y=y0-y1*e;
      double dx=x2-x1;
      double dy=y2-y1;
      double k=dy/dx;
      if(k<0)
      {
          k=-k;
      }
      double er=-0.5;
      int ex,ey;
      if(x2-x1>0)
      {
          ex=e;
      }
      else
      {
          ex=-e;
      }
      if(y2-y1>0)
      {
          ey=-e;
      }
      else
      {
          ey=e;
      }
      //double k0=k;
      if(k>1)
      {
          k=dx/dy;
          if(k<0)
          {
              k=-k;
          }
          while(y!=y0-y2*e)
          {
          path4.moveTo(x,y);
          path4.lineTo(x,y+ey);
          path4.lineTo(x+ex,y+ey);
          path4.lineTo(x+ex,y);
          path4.lineTo(x,y);
          painter.drawPath(path4);
          path4.clear();
          er+=k;
          y+=ey;
          if(er>0)
          {
              x+=ex;
             er-=1;
          }
          }
      }
      else{
      while(x!=x0+x2*e)
      {
      path4.moveTo(x,y);
      path4.lineTo(x,y+ey);
      path4.lineTo(x+ex,y+ey);
      path4.lineTo(x+ex,y);
      path4.lineTo(x,y);
      painter.drawPath(path4);
      path4.clear();
      er+=k;
      x+=ex;
      if(er>0)
      {
          y+=ey;
         er-=1;
      }
      }
      }
     painter.setPen (QPen(Qt::blue,5,Qt::SolidLine,Qt::FlatCap));
     painter.drawEllipse(QPointF(x0,y0),r*e,r*e);
     x=x0;
     y=y0-e*int(r);
     er=3-2*int(r);
     double xx=0;
     double yy=r;
     painter.drawRect(x,y,e,-e);
     painter.drawRect(x,2*y0-y,e,e);
     painter.drawRect(2*x0-x,y,-e,-e);
     painter.drawRect(2*x0-x,2*y0-y,-e,e);
     painter.drawRect(x0+y0-y,y0-x0+x,e,-e);
     painter.drawRect(x0+y0-y,y0-x0+x,e,e);
     painter.drawRect(x0-y0+y,y0-x0+x,-e,-e);
     painter.drawRect(x0-y0+y,y0-x0+x,-e,e);
     while(yy>xx)
     {
         if(er<0)
         {
             er=er+4*xx+6;
             xx+=1;
             x+=e;
         }
         else
         {
             er=er+4*(xx-yy)+10;
             xx+=1;
             yy-=1;
             x+=e;
             y+=e;
         }
         painter.drawRect(x,y,e,-e);
         painter.drawRect(x,2*y0-y,e,e);
         painter.drawRect(2*x0-x,y,-e,-e);
         painter.drawRect(2*x0-x,2*y0-y,-e,e);
         painter.drawRect(x0+y0-y,y0-x0+x,e,-e);
         painter.drawRect(x0+y0-y,y0+x0-x,e,e);
         painter.drawRect(x0-y0+y,y0-x0+x,-e,-e);
         painter.drawRect(x0-y0+y,y0+x0-x,-e,e);
     }
     painter.setPen (QPen(Qt::yellow,5,Qt::SolidLine,Qt::FlatCap));
     path4.moveTo(xx1*e+x0,y0-e*yy1);
     path4.lineTo(xx2*e+x0,y0-e*yy2);
     painter.drawPath(path4);
     path4.clear();
     x=xx1;
     y=yy1;
     if(xx2-xx1>0)
     {
         ex=e;
     }
     else{
         ex=-e;
     }
     if(yy2-yy1>0)
     {
         ey=-e;
     }
     else{
         ey=e;
     }
     double yyy1,yyy2,xxx1,xxx2;
     yyy1=yy1;
     yyy2=yy2;
     xxx1=xx1;
     xxx2=xx2;
     double dd=((yyy2-yyy1))/((xxx2-xxx1));
     if(dd<0&&(yyy2-yyy1)>0)
     {
         dd=-dd;
     }
     else if(dd>0&&(yyy2-yyy1)<0)
     {
         dd=-dd;
     }
     //double dd=(yy1-yy2)/(xx1-xx2);
     //double dd=((xx2-xx1))/((yy2-yy1));
     //double b=yyy1-xxx1*dd;
     if(dd>-1&&dd<1)
     {
     double tempy=yyy1;
     while(x!=xx2)
     {
         painter.drawRect(x0+e*x,y0-e*y,ex,ey);
         tempy+=dd;
         y=tempy;
         if(xx2>x)
         {
         x=x+1;
         }
         else if(xx2<x)
         {
             x=x-1;
         }
     }
     }
     else
     {
         double tempx=xxx1;
         double ddd=1/dd;;
         if(ddd<0&&(xxx2-xxx1)>0)
         {
             ddd=-ddd;
         } else if(ddd>0&&(xxx2-xxx1)<0)
         {
             ddd=-ddd;
         }
         //double b=xxx1-yyy1*dd;
         while(y!=yy2)
         {
             painter.drawRect(x0+e*x,y0-e*y,ex,ey);
             tempx+=ddd;
             x=tempx;
             if(yy2>y)
             {
             y=y+1;
             }
             else if(yy2<y)
             {
                 y=y-1;
             }
         }
     }
     painter.setPen (QPen(Qt::green,5,Qt::SolidLine,Qt::FlatCap));
     path4.moveTo(ddx1*e+x0,y0-e*ddy1);
     path4.lineTo(ddx2*e+x0,y0-e*ddy2);
     double xd=ddx2-ddx1;
     double yd=ddy2-ddy1;
     double l;
     if(abs(yd)>abs(xd))
     {
         l=yd;
     }
     else
     {
         l=xd;
     }
     painter.drawPath(path4);
     if(ddx2-ddx1>0)
     {
         ex=e;
     }
     else{
         ex=-e;
     }
     if(ddy2-ddy1>0)
     {
         ey=-e;
     }
     else{
         ey=e;
     }
     x=ddx1;
     y=ddy1;
     double tx=xd/l;
     if((ddx2-ddx1<0&&tx>0)||(ddx2-ddx1>0&&tx<0))
     {
         tx=-tx;
     }
     double ty=yd/l;
     if((ddy2-ddy1<0&&ty>0)||(ddy2-ddy1>0&&ty<0))
     {
         ty=-ty;
     }
     double xt=x;
     double yt=y;
    // painter.drawRect(x0+e*x,y0-e*y,ex,ey);
     for(int i=0;i<abs(l);i++)
     {
         painter.drawRect(x0+e*x,y0-e*y,ex,ey);
         yt+=ty;
         xt+=tx;
         y=yt;
         x=xt;
         //painter.drawRect(x0+e*x,y0-e*y,ex,ey);
     }
     //painter.fillPath (path, QBrush (c));
}
void MainWindow::on_action_triggered()
{
    x1=QInputDialog::getInt(this,tr(""),tr("Enter x1"));
    x2=QInputDialog::getInt(this,tr(""),tr("Enter x2"));
    y1=QInputDialog::getInt(this,tr(""),tr("Enter y1"));
    y2=QInputDialog::getInt(this,tr(""),tr("Enter y2"));
    repaint();

}
void MainWindow::on_action_2_triggered()
{
    r=QInputDialog::getDouble(this,tr(""),tr("Enter r"));
    repaint();

}
void MainWindow::on_action_3_triggered()
{
    xx1=QInputDialog::getInt(this,tr(""),tr("Enter x1"));
    xx2=QInputDialog::getInt(this,tr(""),tr("Enter x2"));
    yy1=QInputDialog::getInt(this,tr(""),tr("Enter y1"));
    yy2=QInputDialog::getInt(this,tr(""),tr("Enter y2"));
    repaint();

}
void MainWindow::on_action_4_triggered()
{
    ddx1=QInputDialog::getInt(this,tr(""),tr("Enter x1"));
    ddx2=QInputDialog::getInt(this,tr(""),tr("Enter x2"));
    ddy1=QInputDialog::getInt(this,tr(""),tr("Enter y1"));
    ddy2=QInputDialog::getInt(this,tr(""),tr("Enter y2"));
    repaint();

}
void MainWindow::on_action_5_triggered()
{
    e=QInputDialog::getInt(this,tr(""),tr("Enter pixel size"));
    repaint();

}
MainWindow::~MainWindow()
{
    delete ui;
}

