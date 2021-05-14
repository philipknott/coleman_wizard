//interpretCommands.js
console.log("interpretCommands.js loaded");
function dummy() {
	console.log("dummy");
}
function interpretCommands(commands) {
	// console.log(commands);
	console.log('----------COMMANDS----------')
	console.log(commands)
	console.log('----------end-----------')
	var frame = { "hour": "", "minute": "", "day": 0, "command": "" };
	var commandArray = commands.split("\n");
	for (var i = 0; i < commandArray.length; i++)
		processCommand(commandArray[i], frame);

	console.log(`frame: ${frame}`)
	

}
function processCommand(item, frame) {
	var pieces = item.split(" ");
	if (pieces[0] == "hour")
		frame.hour = clean(pieces[1]);
	else if (pieces[0] == "minute")
		frame.minute = clean(pieces[1]);
	else if (pieces[0] == "day")
		frame.day = clean(pieces[1])
	else if (pieces[0] == "command") {
		frame.command = clean(pieces[1]);
		generateCallFor(frame);
	}
}
function clean(s) {
	//remove leading and trailing blanks from s
	return s.trim();
}
function dayNum(day) {
	var code = { "Su": 0, "Mo": 1, "Tu": 2, "We": 3, "Th": 4, "Fr": 5, "Sa": 6 };
	return code[day];
}
function generateCallFor(f) {
	//do call
	scheduleIt(dayNum(f.day), f.hour + ":" + f.minute + ":00", f.command);

}
function scheduleIt(day, time, command) {
	console.log("scheduled: " + day + " at " + time + " do " + command);
}