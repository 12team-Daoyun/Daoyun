import pymysql
from flask import Flask
import mysql.connector

def connect():
    config={'host':'127.0.0.1',
            'user':'root',
            'password':'123456',
            'port':3306,
            'database':'daoyun',
            'charset':'utf8'
            }
    try:
        mydb=mysql.connector.connect(**config)
    except mysql.connector.Error as e:
        print('链接数据库失败！',str(e))
    else:
        print('数据库链接成功')
        return mydb


if __name__ == '__main__':
    conn = connect()
    cur = conn.cursor()
    sql="select * from `student`"
    cur.execute(sql)
    data=cur.fetchall()
    for i in data[:3]:
        print(i)
        cur.close()
        conn.close()



