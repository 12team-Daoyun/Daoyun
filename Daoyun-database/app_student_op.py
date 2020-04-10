#!/usr/bin/python
# -*- coding: UTF-8 -*-
from imp import reload

from flask import Blueprint,session
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import Course,Teacher,USER,MENU,STUDENT,Course_Student,SignData,Course_Sign
import json
import time
import datetime
import sys
 
reload(sys)
sys.setdefaultencoding('utf8')
mod = Blueprint('app_student_op', __name__)

@mod.route('/app/student/login_check', methods=['post'])
def login_check_student():
    username_password=request.get_data()
    username_password=json.loads(username_password)
    # print(username_password)
    # {u'password': u'123', u'id': u'123'}
    user=USER.query.filter_by(Loginname=str(username_password['id'])).first()
    if not user:
        return jsonify({'state':'0','error':''})
    user_json=user.to_json()
    user=json.loads(user_json)
    # print(user['roleid'])
    if not user['roleid']==3:
        return jsonify({'state':'0','error':''})
    if user['password']==username_password['password']:
        return jsonify({'state':'1','error':''})
    return jsonify({'state':'2','error':''})

@mod.route('/app/student/<int:StudentNumber>', methods=['get'])
def get_name(StudentNumber):
	# print(StudentNumber)
	student=STUDENT.query.filter_by(StudentNumber = StudentNumber).first()
	return jsonify({'personnel':{'Pname':student.Studentname,'ID':StudentNumber,'Studentid':student.Studentid}})

@mod.route('/app/student_course/<int:StudentNumber>', methods=['get'])
def get_course(StudentNumber):
    return_data=[]
    # print(StudentNumber)
    student=STUDENT.query.filter_by(StudentNumber = StudentNumber).first()
    id=student.Studentid
    # print(id)
    course_ids=Course_Student.query.filter_by(Studentid=id).all()
    for course_id in course_ids:
        # print(course_id.CourseId)
        course_data=Course.query.filter_by(CourseId=int(course_id.CourseId)).first()
        course_data=course_data.to_json()
        course_data=json.loads(course_data)
        # print(course_data)
        a={'cnameAndID':{'courseID':course_data['CourseId'] }}
        a['cnameAndID']['courseName']=course_data['CourseName']
        # print(a)
        return_data.append(a)
    # print(return_data)
    return jsonify({'marks':return_data,'data':'','error':''})


@mod.route('/app/course_shape/<int:CourseId>', methods=['get'])
def get_course_shape(CourseId):
    course_data=Course.query.filter_by(CourseId=int(CourseId)).first()
    return jsonify({'shape':course_data.Layout})


@mod.route('/app/student/sign/', methods=['put'])
def sign_status():
    sign_data=request.get_data()
    sign_data=json.loads(sign_data)
    # {'Studentid': 2, 'position': '5*5', 'courseID': 1}
    sign_time=time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    Sign=SignData.query.filter_by(CourseId=sign_data['courseID']).order_by(SignData.StartData.desc()).first()
    if not Sign:
        return jsonify({'status':'error','data':'','error':'老师未发起签到'})
    sign_id=Sign.SignId
    student_sign=Course_Sign.query.filter_by(SignId=sign_id,CourseId=sign_data['courseID'],Studentid=sign_data['Studentid']).first()
    if student_sign.Status=='签到' or student_sign.Status=='迟到':
        return jsonify({'status':'error','data':'','error':'你已签到'})
    sign_start_time=Sign.StartData
    sign_start_time=datetime.datetime.strptime(sign_start_time,"%Y-%m-%d %H:%M:%S")
    sign_time=datetime.datetime.strptime(sign_time,"%Y-%m-%d %H:%M:%S")
    timeout=sign_time-sign_start_time
    seconds=timeout.seconds
    if seconds < 120 :
        student_sign=Course_Sign.query.filter_by(SignId=sign_id,CourseId=sign_data['courseID'],Place=sign_data['position']).first()
        if student_sign:
            return jsonify({'status':'error','data':'','error':'该位置已经有人'})
        student_sign=Course_Sign.query.filter_by(SignId=sign_id,CourseId=sign_data['courseID'],Studentid=sign_data['Studentid']).first()
        student_sign.SignData=sign_time
        student_sign.Status="签到"
        student_sign.Place=sign_data['position']
        db.session.commit()
        return jsonify({'status':'success','data':'','error':''})
    elif seconds < 7200:
        student_sign=Course_Sign.query.filter_by(SignId=sign_id,CourseId=sign_data['courseID'],Place=sign_data['position']).first()
        if student_sign:
            return jsonify({'status':'error','data':'','error':'该位置已经有人'})
        student_sign=Course_Sign.query.filter_by(SignId=sign_id,CourseId=sign_data['courseID'],Studentid=sign_data['Studentid']).first()
        student_sign.SignData=sign_time
        student_sign.Status="迟到"
        student_sign.Place=sign_data['position']
        db.session.commit()
        return jsonify({'status':'error','data':'','error':'签到成功，你已迟到'})
    else:
        return jsonify({'status':'error','data':'','error':'你迟到过久，记为旷课'})


@mod.route('/app/student/change_pass', methods=['put'])
def change_pass():
    up_data=request.get_data()
    up_data=json.loads(up_data)
    user_data=USER.query.filter_by(Loginname=up_data['loginname']).first()
    user_data.password=up_data['password']
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/app/student/kaoqin/<int:studentid>', methods=['get'])
def get_kaoqin(studentid):
    return_data=[]
    course_ids=Course_Student.query.filter_by(Studentid=studentid).all()
    for course in course_ids:
        a={}
        course_id=course.CourseId
        course_data=Course.query.filter_by(CourseId=course_id).first()
        a['coursename']=course_data.CourseName
        a['ok']=0
        a['later']=0
        a['no']=0
        sign_datas=Course_Sign.query.filter_by(CourseId=course_id,Studentid=studentid).all()
        for sign in sign_datas:
            print(sign.get_Status())
            if sign.Status.decode("utf-8") == "签到":
                a['ok']+=1
            if sign.Status.decode("utf-8") == "迟到":
                a['later']+=1
            if sign.Status.decode("utf-8") == "旷课":
                a['no']+=1
        return_data.append(a)
    return jsonify({'status':'success','data':return_data,'error':''})


@mod.route('/app/student/nocourse/<int:studentid>', methods=['get'])
def get_nocourse(studentid):
    courses=Course.query.all()
    return_data=[]
    for course in courses:
        course_id=course.CourseId
        data=Course_Student.query.filter_by(Studentid=studentid,CourseId=course_id).first()
        if not data:
            a={}
            a['coursename']=course.CourseName
            a['courseid']=course.CourseId
            teacher_id=course.TeachId
            teacher=Teacher.query.filter_by(TeachId = teacher_id).first()
            a['teachername']=teacher.TeachName
            a['CourseWeek']=course.CourseWeek
            a['CourseDay']=course.CourseDay
            a['CourseTime']=course.CourseTime
            a['CoursePlace']=course.CoursePlace
            return_data.append(a)
    return jsonify({'status':'success','data':return_data,'error':''})


@mod.route('/app/student/add_course/<int:courseid>', methods=['post'])
def add_course(courseid):
    add_data=request.get_data()
    add_data=json.loads(add_data)
    # {'studentid':studentid}
    # print(add_data)
    add=Course_Student(courseid,add_data['studentid'])
    db.session.add(add)
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})
