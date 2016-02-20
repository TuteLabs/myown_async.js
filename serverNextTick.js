

/**
 * High CPU Utilisation - I/O BLocked by this function 
 */
function compute() {
	for(var i=0;i<5000000000;i++) {

	}
	console.log("compute finished")
}

// console.log("I am going to be busy for some time...wait for me please")

console.log("Busy Executing a task...")
compute()
console.log("I am Free now :)")
