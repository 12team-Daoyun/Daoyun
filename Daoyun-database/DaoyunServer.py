import pymysql
from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# 连接数据库，
conn = pymysql.connect(
    host='localhost',
    user='root',
    password='123456',
    port=3306,
    db='daoyun',
    charset='utf8',
)

#注册接口
@app.route('/regist', methods=["GET","POST"])  # 代表首页
def regist():  # 视图函数
    data = request.get_data()
    print(data)
    #接收表单
    tel = request.form.get('tel')
    pwd = request.form.get('pwd')

    tel = str(tel)
    pwd = str(pwd)
    print("手机：", tel)
    print("密码：", pwd)
    #建立游标
    cur = conn.cursor()
    #返回的数据字典
    returndata = dict()
    try:
        insertsql = "insert into user(User_ID,Password) values (%s, %s)"%(tel, pwd)
        cur.execute(insertsql)
    except Exception as e:
        returndata['status']=0   #注册失败为0
        returndata['msg'] = ''
        returndata['data'] = ''
        print("插入数据失败:", e)
    else:
        #数据库更新，在插入，更新，删除都得有，查询不需要
        conn.commit()

        returndata['status'] = 1  #注册成功为1
        returndata['msg']=''
        returndata['data'] =''
        print("插入成功")
        #关闭游标
        cur.close()

    return jsonify(returndata)  # 返回内容

#登录接口
@app.route('/login', methods=["GET","POST"])
def login():
    userid = request.form.get("tel")
    pwd = request.form.get("pwd")
    userid = str(userid)
    pwd = str(pwd)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    selectsql = "select User_ID, Password from user where User_ID = %s and Password = %s" %(userid, pwd)
    cur.execute(selectsql)
    result = cur.fetchone()
    if result:
        print("登录成功")
        returndata['status'] = 1
        returndata['msg'] = ''
        returndata['data'] = ''
    else:
        print("账号或密码错误")
        returndata['status'] = 0
        returndata['msg'] = ''
        returndata['data'] = ''

    return jsonify(returndata)


# 创建班课接口
@app.route('/constuctclass', methods=["GET", "POST"])
def constuctClass():
    userid = request.form.get('userid')
    class_name = request.form.get('className')
    teacher_name = request.form.get('teacherName')
    grade = request.form.get('grade')
    comments = request.form.get('comments')
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    selectsql = "select count(*) from class_info"
    count=cur.execute(selectsql)
    class_id = count+1
    try:
        insertsql = 'insert into class_info values (%d,%s,%s,%s,%d,%s)'%(class_id,class_name,userid,teacher_name,grade,comments )
        cur.execute(insertsql)
    except Exception as e:
        returndata['status'] = 0  # 创建课程失败为0
        returndata['msg'] = ''
        returndata['data'] = ''
        print("创建课程失败:", e)
    else:
        conn.commit()
        returndata['status'] = 1  # 创建课程成功为1
        returndata['msg'] = ''
        returndata['data'] = ''
        print("创建课程成功")

    return jsonify(returndata)

#获取班课列表接口
@app.route('/getclass', methods=["GET","POST"])
def getClass():
    userid = request.form.get('userid')
    classType = request.form.get('classType')
    # 建立游标
    cur = conn.cursor()
    # 返回数据
    returndata = dict()
    if classType==0:  #为1代表创建的班级
        selectsql = 'select from class_info where userid = %s'%(userid)
        cur.execute(selectsql)
        contents = cur.fetchall()
        if contents is None:
            returndata['status'] = 0  #0表示没有创建的班级
            returndata['msg'] = ''
            returndata['data'] = ''
            return jsonify(returndata)
        else:
            # 创建列表
            dataList = []
            for row in contents:  # 遍历查询内容
                class_id = row[0]
                class_name = row[1]
                teacher_name = row[3]
                grade = row[4]
                comments = row[5]
                dataDic = dict()
                dataDic['class_id'] = class_id
                dataDic['class_name'] = class_name
                dataDic['teacher_name'] = teacher_name
                dataDic['grade'] = grade
                dataDic['comments'] = comments
                dataList.append(dataDic)
            returndata['status'] = 1  # 1表示有创建的班级
            returndata['msg'] = ''
            returndata['data'] = dataList
            return jsonify(returndata)

    else:  #为0代表创建的课程
        selectsql  = 'select from class_info where class_id in ' \
                     '(select class_id from class_member where userid = %s)' %(userid)
        cur.execute(selectsql)
        #获取所有信息
        contents = cur.fetchall()
        if contents is None:
            returndata['status'] = 0  # 0表示没有加入的班级
            returndata['msg'] = ''
            returndata['data'] = ''
            return jsonify(returndata)
        else:
            # 创建列表
            dataList = []
            for row in contents:  # 遍历查询内容
                class_id = row[0]
                class_name = row[1]
                teacher_name = row[3]
                grade = row[4]
                comments = row[5]
                dataDic = dict()
                dataDic['class_id'] = class_id
                dataDic['class_name'] = class_name
                dataDic['teacher_name'] = teacher_name
                dataDic['grade'] = grade
                dataDic['comments'] = comments
                dataList.append(dataDic)
            returndata['status'] = 1  # 1表示有创建的班级
            returndata['msg'] = ''
            returndata['data'] = dataList
            return jsonify(returndata)

#加入班课接口
@app.route('/joinClass',methods=["GET","POST"])
def joinClass():
    my_Class_Id = request.form.get('classId')
    my_User_Id = request.form.get('userid')
    #建立游标
    cur = conn.cursor()
    #返回的数据字典
    returndata = dict()
    try:
        insertsql = "insert into class_member(class_id,user_id) values (%s,%s)"%(my_Class_Id,my_User_Id)
        cur.execute(insertsql)
    except Exception as e:
        returndata['status']=0 #加入失败
        returndata['msg'] = ''
        returndata['data'] = ''
        print("插入数据失败:", e)
    else:
        conn.commit()
        returndata['status'] = 1 #加入成功
        returndata['msg'] = ''
        returndata['data'] = ''
        print("插入成功")
        # 关闭游标
        cur.close()

        return jsonify(returndata)

if __name__ == '__main__':
    app.run(host='0.0.0.0')  # 运行程序