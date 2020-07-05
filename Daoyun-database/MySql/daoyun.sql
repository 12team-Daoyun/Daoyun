/*
Navicat MySQL Data Transfer

Source Server         : Daoyun
Source Server Version : 80019
Source Host           : localhost:3306
Source Database       : daoyun

Target Server Type    : MYSQL
Target Server Version : 80019
File Encoding         : 65001

Date: 2020-07-04 00:07:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `Admin_ID` int NOT NULL,
  `Admin_Name` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Admin_ID`),
  KEY `Admin_ID` (`Admin_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'huangxu', '123456');

-- ----------------------------
-- Table structure for class_info
-- ----------------------------
DROP TABLE IF EXISTS `class_info`;
CREATE TABLE `class_info` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) DEFAULT NULL,
  `userid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `teacher_name` varchar(255) DEFAULT NULL,
  `grade` int DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class_info
-- ----------------------------
INSERT INTO `class_info` VALUES ('1', '正式', '1321324', '负利率', '2019', '很好');
INSERT INTO `class_info` VALUES ('2', 'hhh', '20', 'M', '2000', '2000');
INSERT INTO `class_info` VALUES ('3', '正式', '20', 'M', '2000', '2000');
INSERT INTO `class_info` VALUES ('4', '正式', 'cce', '负利率', '3', 'goods');
INSERT INTO `class_info` VALUES ('5', '自然', '7878992', '付乐乐', '2019', '自然辩证法');
INSERT INTO `class_info` VALUES ('6', '自然', '7878992', '付乐乐', '2019', '自然辩证法');

-- ----------------------------
-- Table structure for class_member
-- ----------------------------
DROP TABLE IF EXISTS `class_member`;
CREATE TABLE `class_member` (
  `class_id` int NOT NULL,
  `user_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class_member
-- ----------------------------
INSERT INTO `class_member` VALUES ('5', '13859047863');
INSERT INTO `class_member` VALUES ('1', '13859047863');
INSERT INTO `class_member` VALUES ('4', '13859047863');
INSERT INTO `class_member` VALUES ('1', '13859047864');
INSERT INTO `class_member` VALUES ('2', '13859047863');
INSERT INTO `class_member` VALUES ('2', '13859047864');
INSERT INTO `class_member` VALUES ('2', '13859047864');

-- ----------------------------
-- Table structure for dictionary
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `ID` int NOT NULL,
  `Dictionary_Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictionary
-- ----------------------------

-- ----------------------------
-- Table structure for dictionary_data
-- ----------------------------
DROP TABLE IF EXISTS `dictionary_data`;
CREATE TABLE `dictionary_data` (
  `ID` varchar(255) NOT NULL,
  `Value` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `isfixed` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictionary_data
-- ----------------------------

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `Menu_ID` int DEFAULT NULL,
  `Menu_Adress` varchar(255) NOT NULL,
  `Key` varchar(255) DEFAULT NULL,
  `Menu_Name` varchar(255) DEFAULT NULL,
  `Menu_Type` int DEFAULT NULL,
  `Menu_State` int DEFAULT NULL,
  `Add_Time` datetime DEFAULT NULL,
  `Modify_Time` datetime DEFAULT NULL,
  `Creative` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `isdefault` int DEFAULT NULL,
  PRIMARY KEY (`Menu_Adress`),
  KEY `Menu_ID` (`Menu_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `Role_ID` int NOT NULL,
  `Role_Name` varchar(255) DEFAULT NULL,
  `Permission` varchar(255) DEFAULT NULL COMMENT '用户权限',
  PRIMARY KEY (`Role_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `ID` int NOT NULL,
  `State` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_permission
-- ----------------------------

-- ----------------------------
-- Table structure for sign_in
-- ----------------------------
DROP TABLE IF EXISTS `sign_in`;
CREATE TABLE `sign_in` (
  `class_id` int NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `Is_signin` int DEFAULT NULL,
  `Signin_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sign_in
-- ----------------------------
INSERT INTO `sign_in` VALUES ('9', '15059150223', '1', '2020-07-0116:03:24');
INSERT INTO `sign_in` VALUES ('8', '13859047863', '1', '2020-07-0116:28:12');
INSERT INTO `sign_in` VALUES ('8', '13859047863', '1', '2020-07-0116:29:56');
INSERT INTO `sign_in` VALUES ('8', '13859047863', '1', '2020-07-0116:30:53');

-- ----------------------------
-- Table structure for sign_state
-- ----------------------------
DROP TABLE IF EXISTS `sign_state`;
CREATE TABLE `sign_state` (
  `class_id` int NOT NULL,
  `Is_sign` int DEFAULT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sign_state
-- ----------------------------
INSERT INTO `sign_state` VALUES ('1', '0');
INSERT INTO `sign_state` VALUES ('2', '0');
INSERT INTO `sign_state` VALUES ('3', '0');
INSERT INTO `sign_state` VALUES ('4', '0');
INSERT INTO `sign_state` VALUES ('5', '0');
INSERT INTO `sign_state` VALUES ('6', '0');
INSERT INTO `sign_state` VALUES ('7', '0');
INSERT INTO `sign_state` VALUES ('8', '0');
INSERT INTO `sign_state` VALUES ('9', '1');
INSERT INTO `sign_state` VALUES ('10', '0');
INSERT INTO `sign_state` VALUES ('11', '0');
INSERT INTO `sign_state` VALUES ('12', '0');
INSERT INTO `sign_state` VALUES ('13', '0');
INSERT INTO `sign_state` VALUES ('14', '0');
INSERT INTO `sign_state` VALUES ('15', '0');
INSERT INTO `sign_state` VALUES ('16', '0');
INSERT INTO `sign_state` VALUES ('17', '0');
INSERT INTO `sign_state` VALUES ('18', '0');
INSERT INTO `sign_state` VALUES ('19', '0');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `Student_ID` int NOT NULL,
  `Student_Name` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `School` varchar(255) DEFAULT NULL,
  `College` varchar(255) DEFAULT NULL,
  `Grade` varchar(255) DEFAULT NULL,
  `Class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Student_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', '黄旭', '123456', '福州大学', '数计学院', '研究生一年级', '一班');
INSERT INTO `student` VALUES ('2', '李鸣', '123456', '福州大学', '数计学院', '研究生一年级', '一班');
INSERT INTO `student` VALUES ('3', '杨立坚', '123456', '福州大学', '数计学院', '研究生一年级', '一班');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `Teacher_ID` int NOT NULL,
  `Teacher_Name` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `School` varchar(255) DEFAULT NULL,
  `College` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Teacher_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `User_ID` varchar(255) NOT NULL,
  `User_Name` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `college` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `identity` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('123456', null, '123456', null, null, null, null);
INSERT INTO `user` VALUES ('12397', null, '252358', null, null, null, null);
INSERT INTO `user` VALUES ('13859047863', 'ylj', '12345678..Lijian', '福州大学', '数计学院', '1', '1');
INSERT INTO `user` VALUES ('13859047864', 'test', '123456', 'fzu', 'cs', '1', '0');
INSERT INTO `user` VALUES ('15059150223', 'xjp', '12234', '清华大学', '经管', '1', '1');
INSERT INTO `user` VALUES ('15626895456', null, '123456', null, null, null, null);

-- ----------------------------
-- Table structure for user-role
-- ----------------------------
DROP TABLE IF EXISTS `user-role`;
CREATE TABLE `user-role` (
  `UserRole_ID` int NOT NULL,
  `Modify_Time` datetime DEFAULT NULL COMMENT '修改时间',
  `Create_Time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`UserRole_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user-role
-- ----------------------------

-- ----------------------------
-- Table structure for user_permission
-- ----------------------------
DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE `user_permission` (
  `ID` int NOT NULL,
  `Menu_Adress` varchar(255) DEFAULT NULL,
  `State` int DEFAULT NULL,
  KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_permission
-- ----------------------------

-- ----------------------------
-- Table structure for work_description
-- ----------------------------
DROP TABLE IF EXISTS `work_description`;
CREATE TABLE `work_description` (
  `work_id` int NOT NULL,
  `class_id` int DEFAULT NULL,
  `work_name` varchar(255) DEFAULT NULL,
  `work_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `work_requirement` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`work_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of work_description
-- ----------------------------
INSERT INTO `work_description` VALUES ('1', '2', '作业1', '写代码', '认真');
INSERT INTO `work_description` VALUES ('2', '9', '作业1', '写代码', '认真');
INSERT INTO `work_description` VALUES ('3', '9', '作业2', 'test', 'test');
INSERT INTO `work_description` VALUES ('4', '2', '测试作业', '作业内容', '作业要求');
INSERT INTO `work_description` VALUES ('5', '2', '测试作业', '作业内容', '作业要求');
INSERT INTO `work_description` VALUES ('6', '2', 'test222', '2222', '2222');
INSERT INTO `work_description` VALUES ('7', '2', '111', '111', '1111');
INSERT INTO `work_description` VALUES ('8', '2', '222', '222', '2222');
INSERT INTO `work_description` VALUES ('9', '2', '333', '333', '333');
INSERT INTO `work_description` VALUES ('10', '2', '666', '666', '666');
INSERT INTO `work_description` VALUES ('11', '2', 'ddd', 'ddd', 'ddd');
INSERT INTO `work_description` VALUES ('12', '2', 'ggg', 'ggg', 'ggg');
INSERT INTO `work_description` VALUES ('13', '5', '作业1', '学习', '666');
INSERT INTO `work_description` VALUES ('14', '1', 'xxx', 'xxx', 'xxx');

-- ----------------------------
-- Table structure for wwork
-- ----------------------------
DROP TABLE IF EXISTS `wwork`;
CREATE TABLE `wwork` (
  `class_id` int NOT NULL,
  `work_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `work_id` int NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wwork
-- ----------------------------
INSERT INTO `wwork` VALUES ('2', 'json.txt', '1', '13859047864');
INSERT INTO `wwork` VALUES ('2', 'json字符值含义.txt', '4', '13859047864');
INSERT INTO `wwork` VALUES ('1', 'magazine-unlock-06-2.3.4822-FC3D65CA05BD9B74AC62932BF8C3E1EC.jpg', '14', '13859047864');
