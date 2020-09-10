//this version adds "more" blocks for in-question cloning
//extending spoken message stub

var redSubframe=
{
	name:"red",
	type:"leaf"
};
var blueSubframe=
{
	name:"blue",
	type: "leaf"
};
var yellowSubframe=
{
	name:"yellow",
	type: "leaf"
};
var greenSubframe=
{
	name:"green",
	type:"leaf"
};
var turnOnSubframe=
{
	name:"turnOn",
	type:"leaf"
};
var turnOffSubframe=
{
	name:"turnOff",
	type:"leaf"
};
var spokenSubframe=
{
	name:"spoken",
	type:"compositeFrame",
	prompt: "Message?",
	parts: 
	[
	{
		type:"simpleSlot",
		name: "message",
		question: "",
		value:""
	}
	]
};
var colorSubframe=
{
	name:"color",
	type:"alternativesFrame",
	finished:false,
	choice:"",
	choices:
	[
	{
		question: "Red?",
		subframe: redSubframe
	},
	{
		question: "Blue?",
		subframe: blueSubframe
	},
	{
		question: "Yellow?",
		subframe: yellowSubframe
	},
	{
		question: "Green?",
		subframe: greenSubframe
	}
	]
};
var onOffSubframe=
{
	name:"on-off",
	type:"alternativesFrame",
	finished:false,
	choice:"",
	choices:
	[
	{
		question: "On?",
		subframe: turnOnSubframe
	},
	{
		question: "Off?",
		subframe: turnOffSubframe
	}
	]
};
var lampSubframe=
{
	name:"lamp",
	type:"alternativesFrame",
	finished:false,
		choice:"",
		choices:
		[
		{
			question: "Color?",
			subframe: colorSubframe
		},
		{
			question: "On/Off?",
			subframe: onOffSubframe
		}
		],
};
var actionFrame=
{
		name: "action", //do we need this? YES, to link to references in scripts
		type:"alternativesFrame",
		finished:false,
		choice:"",
		choices:
		[
		{
			question: "lamp?",
			subframe: lampSubframe
		},
		{
			question: "speech?",
			subframe: spokenSubframe
		}
		],
};

/*
var top1=
{
	name:"top1",
	type:"leaf"
};
var top2=
{
	name:"top2",
	type:"leaf"
};
*/
var topX=
{
	name:"top",
	type:"compositeFrame",
	prompt: "When would you like something to happen?",
	parts: 
	[
	{
		type:"simpleSlot",
		name: "hour",
		question: "hour?",
		value:""
	},
	{
		type:"simpleSlot",
		name: "minute",
		question: "minute?",
		value:""
	},
	{
		type:"checkboxesSlot",
		name: "days",
		options: [{type:"simple",choice:"Su"},{type:"simple",choice:"Mo"},
		{type:"simple",choice:"Tu"},{type:"simple",choice:"We"},
		{type:"simple",choice:"Th"},{type:"simple",choice:"Fr"},
		{type:"simple",choice:"Sa"},{type:"multiple",choice:"weekdays",values:["Mo","Tu","We","Th","Fr"]}
		],
		cloneQuestion:"Same thing every day?",
		value:[]
	},
	{
		type:"subFrame",
		subframe: actionFrame
	},
	{
		type:"more",
		question:"another action?",
		subframe:actionFrame,
		finished:false
	}
	]
};
console.log("top name is ",topX.name);






//use markdown philosophy for scripts: plan text escaping with ^ 
var scripts=new Map();
scripts.set("top",
`select +       
enter routine name
select next
select + next to when this happens
select schedule
select at time
set ^slotval hour^ on dial
set ^slotval minute^ on dial
select ok
select repeat
select ^slotval days^
select next
select add action
^parts^
select save
select next
select save
`);
scripts.set("action","^chosen action^");
scripts.set("lamp",
`select lights 
select color lamp
select next
^chosen lamp^
`);
scripts.set("color",
`select set color
select color

^chosen color^
`);
scripts.set("on-off",
`select power

^chosen on-off^
`);
scripts.set("turnOn",
	`select next`);
scripts.set("turnOff",
	`swipe button
	select next`);
scripts.set("red",
	`action to select red`);
scripts.set("blue",
	`actions to select blue`);
scripts.set("yellow",
	`action to select yellow`);
scripts.set("green",
	`actions to select green`);
scripts.set("spoken",
	`action for spoken prompt
	^slotval message^
	`);


