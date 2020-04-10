#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Blueprint
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import STUDENT,USER,check_role
import json
import hashlib


mod = Blueprint('student',__name__)

@mod.route('/student',methods = ['GET'])
@check_role(4)
def student_data():
    students=STUDENT.query.all()
    #print(students)
    return_data=[]
    for data in students:
        data_json=data.to_json()
        #print(data_json)
      	# dictionary_detail=data.get_dictionary_detail()
        data=json.loads(data_json)
       #  dictionary_detail=json.loads(dictionary_detail)
       #  data['childen']=dictionary_detail
        return_data.append(data)
        #print(return_data)
    return jsonify({'status':'success','data':return_data,'error':''})

@mod.route('/student/add_newone', methods=['POST'])
@check_role(1)
def add_student():
	add_data = request.get_data()
	add_data = json.loads(add_data)
	print(add_data)
	count = USER.query.filter_by(Loginname = add_data['StudentNumber']).count()
	if(count):
		return jsonify({'status':'error','data':'','error':'学生已存在'})
	user = USER(add_data['StudentNumber'],"e10adc3949ba59abbe56e057f20f883e",3)
	#'hashlib.md5('123456'.encode('utf-8')).hexdigest()'
	db.session.add(user)
	db.session.commit()
	userid = USER.query.filter_by(Loginname = add_data['StudentNumber']).first().Userid
	print(userid)
	stu = STUDENT(add_data['Studentname'],add_data['StudentNumber'],add_data['Major'],add_data['Schooling'],userid,add_data['Class'])
	db.session.add(stu)
	db.session.commit()
	return jsonify({'status':'success','data':'','error':''})


@mod.route('/student/updateInfo', methods=['PUT'])
@check_role(3)
def update_student():
	up_data = request.get_data()
	up_data = json.loads(up_data)
	stu = STUDENT.query.filter_by(StudentNumber = up_data['StudentNumber']).first()
	try:
		stu.Studentname = up_data['Studentname']
		stu.Major = up_data['Major']
		stu.Schooling = up_data['Schooling']
		stu.Class = up_data['Class']
		db.session.commit()
	#print(up_data)
	except:
		db.session.rollback()
		return jsonify({'status':'error','data':'','error':'更新学生信息错误'})
	return jsonify({'status':'success','data':'','error':''})


@mod.route('/student/delete_singleOne/<int:StudentNumber>', methods=['DELETE'])
@check_role(2)
def delete_singleOne(StudentNumber):
	try:
		user = USER.query.filter_by(Loginname = StudentNumber).first()
		db.session.delete(user)
		db.session.commit()
		try:
			stu = STUDENT.query.filter_by(StudentNumber=StudentNumber).first()
			db.session.delete(stu)
			db.session.commit()
		except:
			db.session.rollback()
			return jsonify({'status':'error','data':'','error':'删除失败'})
	except:
		db.session.rollback()
		return jsonify({'status':'error','data':'','error':'删除失败'})
	return jsonify({'status':'success','data':'','error':''})

	    
