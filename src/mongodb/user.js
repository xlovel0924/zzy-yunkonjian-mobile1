const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('users')
const _filter = {'pwd':0,'__v':0}

Router.get('/list',function(req, res){
	const { type } = req.query
	// User.remove({},function(e,d){})
	User.find({type},function(err,doc){
		return res.json({code:200,data:doc})
	})
})

Router.post('/login', function(req,res){
	const {user, pwd} = req.body
	User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
		if (!doc) {
			return res.json({code:401,msg:'用户名或者密码错误'})
		}
		res.cookie('userid', doc._id)
		return res.json({code:200,data:doc})
	})
})

Router.get('/info',function(req, res){
	const {userid} = req.cookies
	if (!userid) {
		return res.json({code:1})
	}
	User.findOne({_id:userid} ,_filter , function(err,doc){
		if (err) {
			return res.json({code:401, msg:'后端出错了'})
		}
		if (doc) {
			return res.json({code:200,data:doc})
		}
	})
})

function md5Pwd(pwd){
	const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
	return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router;