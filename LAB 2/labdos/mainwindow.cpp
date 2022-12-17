#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QFileDialog>
#include <QDir>
#include <QImage>
#include <QFileInfo>
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::on_pushButton_clicked()
{
    QDir dir= QFileDialog::getExistingDirectory();
    QStringList images=dir.entryList(QStringList(),QDir::Files);
    foreach(QString filename,images)
    {
        ui->tableWidget->insertRow(ui->tableWidget->rowCount());
        QImage q;
        q.load(QFileInfo(dir,filename).canonicalFilePath());
        ui->tableWidget->setItem(ui->tableWidget->rowCount()-1,0,new QTableWidgetItem(filename));
        ui->tableWidget->setItem(ui->tableWidget->rowCount()-1,1,new QTableWidgetItem(QString(QString::number(q.width())+"x"+QString::number(q.height()))));
        ui->tableWidget->setItem(ui->tableWidget->rowCount()-1,2,new QTableWidgetItem(QString::number(q.dotsPerMeterX()/39.37)));
        ui->tableWidget->setItem(ui->tableWidget->rowCount()-1,3,new QTableWidgetItem(QString::number(q.depth())));
    }
}
