const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://47.95.219.9:27017/small-owners'
mongoose.connect(DB_URL)

const models = {
	users:{
    'name': {type:String, require:true},
    'password': {type:String, require:true},
    'seq': {type:String, require:true},
    'job': {type:String, require:true},
    'stauts': {type:String, require:true},
    'token': {type:String, require:true}
  },
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}


