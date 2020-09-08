console.log("about to define generateCommandsTopLevel");

function generateCommandsTopLevel()
{
	for(i=0;i<topLevel.length;i++)
	{
		console.log("bound version :",topLevel[i]);
		document.getElementById("output").innerHTML+=generateCommands(topLevel[i]);
	}
}



function generateCommands(frame)
{
	console.log("generating commands for ",frame.name);
	//var frame=frames.get(frameName);
	var s=scripts.get(frame.name); //name of frame is name of script
	var splits=s.split("^");
	var result=[];
	for(var i=0;i<splits.length;i++)
	{
		result += processSplit(frame,splits[i])
	}
	result=replaceBreaks(result);
	//document.getElementById("output").innerHTML+=result;
	return result;
}
function genCommandsParts(frame)
{
	var result=[]
	for(var i=0; i<frame.parts.length;i++)
	{
		var part=frame.parts[i];
		if(part.type=="subFrame")
			result+=generateCommands(part.subframe);
	}
	return result;
}
function replaceBreaks(s)
{
	return s.replace(/\n/g,"<br>");
}
function processSplit(frame,split)
{
	if(split.startsWith("slotval"))
		return findSlotValue(frame, split.slice(8));
	//if(split.startsWith("subframeScript"))
	//{
	//	console.log("subframe ", split.slice(15)," in ",frame);
	//	return generateCommands(findSubframe(frame,split.slice(15)));
	//	//return generateCommands(frames.get(split.slice(15)));
	//}
	if(split.startsWith("parts"))
	{
		console.log("parts in frame ",frame);
		if (frame.type!="compositeFrame")
		{
			console.log("bad parts ref in ",frame)
			return "bad parts ref";
		}
		return genCommandsParts(frame);
	}
	if(split.startsWith("chosen"))
	{
		console.log("processing chosen in frame ",frame, " with choice ",frame.choice);
		return generateCommands(frame.choice);
	}
		//return generateCommands(findChosen(frame,split.slice(7)));
	return split;
}
function findSubframe(frame,name)
{
	for(var i=0;i<frame.parts.length;i++)
		if (frame.parts[i].type=="subFrame")
			if(frame.parts[i].subframe.name==name)
				return frame.parts[i].subframe;
	console.log("bad subframe");
}
function findSlotValue(frame,name) //add check that it is a slot
{
	for(var i=0;i<frame.parts.length;i++)
		if (frame.parts[i].name==name)
		{   
			if(frame.parts[i].type=="simpleSlot")
				return frame.parts[i].value;
			if(frame.parts[i].type=="checkboxesSlot")
				return frame.parts[i].value[0]; //this should be fixed by cloning process
			console.log("bad slot type in findSlotValue: name ",frame.parts[i].name, " type ",frame.parts[i].type);
		}
	return "error: slot not found";
}
function findChosen(frame, name)
{
	console.log("looking for choice ",name," in ",frame.name);
	console.log(frame.choice);
	return frame.choice;
}
