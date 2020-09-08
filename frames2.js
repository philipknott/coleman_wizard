//restructure so that all subframes are in map, indexed by name
//a composite frame has an array of parts
//parts can be slots or frame names
//slots can be simple, checkboxes, or ?radio
//frames can be composite, alternatives or leaf


var frames=new Map();
frames.set("top",
{

	name:"top",
	type:"compositeFrame",
	prompt: "When would you like something to happen?",
	parts:
	[
		{
			type:"simpleSlot",
			name: "routineName",
			question: "Name of Routine?",
			value:""
		},
	{
		type:"simpleSlot",
		name: "hour",
		question: "hour?",
		value:""
	},
	{
		type:"simpleSlot",
		name: "minute",
		question: "minute",
		value:""
	},
	{
		type:"simpleSlot",
		name: "meridiem",
		question: "AM or PM?",
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
		value:""
	},
	{
		type:"frameName",
		name: "action"
	}
	]
}
);
frames.set("action",
{
		name: "action", //do we need this? YES, to link to references in scripts
		//note: don't require subframe names to be unique outside a frame, by adding
		//super name to name for lookup... wouldn't work? because subframe could have more than
		//one superframe... for now, require uniqueness (##and check)
		//so then the (sub)frame name can be the script name
		type:"alternativesFrame",
		finished:false,
		choice:"",
		choices:
		[
		{
			question: "lamp?",
			subframe: "lamp"
		},
		{
			question: "spoken message?",
			subframe: "spoken"
		}
		],
		more: "Another action?"
}
);
console.log("frames is ",frames);
frames.set("lamp",
{
	name:"lamp",
	type:"alternativesFrame",
	finished:false,
		choice:"",
		choices:
		[
		{
			question: "Color?",
			subframe: "color"
		},
		{
			question: "On/Off?",
			subframe: "on-off"
		}
		],
		more: "Another action?"
}
);
frames.set("color",
{
	name:"color",
	type:"alternativesFrame",
	finished:false,
	choice:"",
	choices:
	[
	{
		question: "Red?",
		subframe: "red"
	},
	{
		question: "Blue?",
		subframe: "blue"
	},
	{
		question: "Yellow?",
		subframe: "yellow"
	},
	{
		question: "Green?",
		subframe: "green"
	}
	]
}
);
frames.set("on-off",
{
	name:"on-off",
	type:"alternativesFrame",
	finished:false,
	choice:"",
	choices:
	[
	{
		question: "On?",
		subframe: "turnOn"
	},
	{
		question: "Off?",
		subframe: "turnOff"
	}
	]
}
);
frames.set("red",
{
	name:"red",
	type:"leaf"
}
);
frames.set("blue",
{
	name:"blue",
	type: "leaf"
}
);
frames.set("yellow",
{
	name:"yellow",
	type: "leaf"
}
);
frames.set("green",
{
	name:"green",
	type:"leaf"
}
);
frames.set("turnOn",
{
	name:"on",
	type:"leaf"
}
);
frames.set("turnOff",
{
	name:"off",
	type:"leaf"
}
);


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

^subframeScript action^
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
