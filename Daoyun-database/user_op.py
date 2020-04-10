#!/usr/bin/python
# -*- coding: UTF-8 -*-

from flask import Blueprint
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import STUDENT,USER,Role
import json


mod = Blueprint('user',__name__)


@mod.route('/user',methods = ['GET'])

def user_data():
    students=USER.query.all()
    #print(students)
    return_data=[]
    for data in students:
        data_json=data.to_json() 
        #print(data.Roleid)
        r = Role.query.filter_by(Roleid = data.Roleid).first().Rolename
        data=json.loads(data_json)
        data['Rolename'] = r
        return_data.append(data)
        #print(return_data)
    return jsonify({'status':'success','data':return_data,'error':''})

@mod.route('/user/role',methods = ['GET'])

def role_data():
    students=Role.query.all()
    #print(students)
    return_data=[]
    for data in students:
        data_json=data.to_json() 
        #print(data.Roleid)
        data=json.loads(data_json)
        return_data.append(data)
        #print(return_data)
    return jsonify({'status':'success','data':return_data,'error':''})

@mod.route('/user/resetPSW',methods = ['PUT'])

def resetPSW():
	data = request.get_data()
	data = json.loads(data)
	user = USER.query.filter_by(Userid = data['userid']).first()
	print(user)
	try:
		user.password = 'e10adc3949ba59abbe56e057f20f883e'
		db.session.commit()
	except:
		db.session.rollback()
		return jsonify({'status':'error','data':'','error':'密码重置失败'})
	return jsonify({'status':'success','data':'','error':''})


@mod.route('/user/updataInfo', methods=['PUT'])
def update_user():
	up_data = request.get_data()
	up_data = json.loads(up_data)
	user = USER.query.filter_by(Loginname = up_data['Loginname']).first()
	try:
		user.Roleid = up_data['Roleid']
		db.session.commit()
	except:
		db.session.rollback()
		return jsonify({'status':'error','data':'','error':'更新角色信息错误'})
	return jsonify({'status':'success','data':'','error':''})



@mod.route('/user/insert', methods=['POST'])
def add_user():
	add_data = request.get_data()
	add_data = json.loads(add_data)
	print(add_data)
	count = USER.query.filter_by(Loginname = add_data['Loginname']).count()
	if(count):
		return jsonify({'status':'error','data':'','error':'用户已存在'})
	user = USER(add_data['Loginname'],"e10adc3949ba59abbe56e057f20f883e",add_data['Roleid'])
	#'hashlib.md5('123456'.encode('utf-8')).hexdigest()'
	db.session.add(user)
	db.session.commit()
	return jsonify({'status':'success','data':'','error':''})



@mod.route('/user/delete/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
     	user = USER.query.filter_by(Userid = id).first()
     	if user.Roleid == 2:
     		t = Teacher.query.filter_by(TeachNumber = user.Loginname).first()
     		db.session.delete(t)
     		db.session.commit()
     	elif user.Roleid == 3:
     		s = STUDENT.query.filter_by(StudentNumber = user.Loginname).first()
     		db.session.delete(s)
     		db.session.commit()
     	db.session.delete(user)
     	db.session.commit()
    except:
    	db.session.rollback()
    	return jsonify({'status':'error','data':'','error':'删除失败'})
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/updataLoginname',methods = ['PUT'])
def updataLoginname():
    add_data = request.get_data()
    add_data = json.loads(add_data)
    print(add_data)
    if add_data['username'] != add_data['loginname']:
        u = USER.query.filter_by(Loginname = add_data['username']).first()
        try:
            u.Loginname = add_data['loginname']
            db.session.commit()
        except:
            db.session.rollback()
            return jsonify({'status':'error','data':'','error':'修改用户名失败'})
    return jsonify({'status':'success','data':'','error':''})


@mod.route('/updatapsw',methods = ['PUT'])

def username_data():
    add_data = request.get_data()
    add_data = json.loads(add_data)
    if add_data['username'] != add_data['loginname']:
        u = USER.query.filter_by(Loginname = add_data['username']).first()
        try:
            u.Loginname = add_data['loginname']
            db.session.commit()
        except:
            db.session.rollback()
            return jsonify({'status':'error','data':'','error':'修改用户名失败'})
    users = USER.query.filter_by(Loginname = add_data['loginname']).first()
    try:
        users.password = add_data['newpassword']
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'修改密码失败'})
    return jsonify({'status':'success','data':'','error':''})
