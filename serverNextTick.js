var http = require('http');

function compute() {
	for(var i=0;i<5000000000;i++) {

	}
	console.log("compute finished")
}

// Handling CPU utilisation

console.log("here")
console.log("here")
console.log("here")
console.log("here")
console.log("here")
console.log("here")
console.log("here")
process.nextTick(function() {
	// setTimeout(function() {
		console.log("delayed")
	// }, 110)
});
process.nextTick(compute);
process.nextTick(function() {
	// setTimeout(function() {
		console.log("delayed 2")
	// }, 110)
});
console.log("after here")
console.log("after here")
console.log("after here")
console.log("after here")
console.log("after here")
console.log("after here")

function computeMe(index, callback) {
	for(var i=0;i<5000000000;i++) {

	}
	console.log("compute finished", index)
	console.log(index, callback)
	callback(index, callback)
}

var arr = [computeMe, computeMe, computeMe, computeMe]

var callback = function(index) {
	console.log("I am callback", index)
}

function myComplexExecutionBlockHandler(tasks, callback) {
	tasks.map(function(func, index) {
		process.nextTick(function() {
			console.log("start:" , index + 1)
			func.apply(this, [index, callback])
		})

	})
	process.nextTick(function() {
		console.log("All done...finished, Enjoy Async")
	})

}

// myComplexExecutionBlockHandler(arr, callback)

// Handling async operations - setTimeout
// 

var fs = require("fs");
var count =0;
var res = [];
function asyncFunc(index, callback) {
	count++;
	if(count > 4) {
		count = 1;
	}
	console.log("reading ", "file" + count + ".js")
	fs.readFile("file" + count + ".js",function(err,data) {
		console.log(data.toString())
		console.log("")
		res.push(data.toString())
		callback();
	})
}

var arr = [asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc]

function myAsycSeries(tasks, callback) {
	var _this = this;
	var _end = tasks.length;
	var myInernalCallback = function(index) {
		console.log("myInernalCallback", index, " finished ", index)
		if(index == _end) {
			callback()
		}
	}
	tasks.map(function(func, index) {
		// console.log("schedule... ", "task " + (index + 1) + ".js")
		process.nextTick(function() {
			func.apply(_this, [index + 1, myInernalCallback.bind(_this,index + 1)])
		})
	})
}

// myAsycSeries(arr, function() {
// 	console.log("All done...finished, Enjoy Async")
// 	console.log(res)
// });


var arr = [asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc]

function myAsycSeries_AlsoPreventOrderOfExecution(tasks, callback) {
	var _this = this;
	var _end = tasks.length - 1;
	var myInernalCallback = function(index) {
		console.log("myInernalCallback", index, " finished ", index)
		if(index == _end) {
			callback()
		} else if(index < _end) {
			process.nextTick(function() {
				console.log("calling task " + (index+1))
				tasks[index].apply(_this, [index+1, myInernalCallback.bind(_this,index+1)])
			})		
		} else {
			console.log("Why Am I Still running");
		}
	}
	// tasks.map(function(func, index) {
		process.nextTick(function() {
			console.log("calling task 1")
			tasks[0].apply(_this, [0, myInernalCallback.bind(_this,0)])
		})
	// })
}

myAsycSeries_AlsoPreventOrderOfExecution(arr, function() {
	console.log("All done...finished, Enjoy Async")
	console.log(res)
});