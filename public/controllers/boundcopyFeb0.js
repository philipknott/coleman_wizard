//after question asking, traverse data structure of frame(s)
//replace frame references that use names by copies of frames referred to
//bindTopLevel() then
//traverseBoundVersions() then
//generateCommandsTopLevel()

/*
var boundVersions=[];

console.log("about to define bindTopLevel");
function bindTopLevel()
{
	for(var i=0;i<topLevel.length;i++)
		boundVersions[i]=bind(frames.get(topLevel[i].name));
}

function bind(frame)
{
	//var frameCopy={name:frame.name, type:frame.type};
	if(frame.type=="compositeFrame")
		return bindCompositeFrame(frame);
	if(frame.type=="alternativesFrame")
		return bindAlternativesFrame(frame);
	if(frame.type=="leaf")
		return bindLeaf(frame);
	console.log("bad frame type");
}
function bindLeaf(frame)
{
	var frameCopy={name:frame.name, type:frame.type};
	return frameCopy;
}
function bindAlternativesFrame(frame)
{
	var frameCopy={name:frame.name, type:frame.type};
	frameCopy.finished=frame.finished;
	if (frame.choice!="")
		frameCopy.choice=bind(frames.get(frame.choice));
	frameCopy.choices=[];
	for(var i=0;i<frame.choices.length;i++)
		frameCopy.choices[i]=frame.choices[i];
	console.log("in bindAlternativesFrame, choice is ",frameCopy.choice);
	return frameCopy;
}
function bindCompositeFrame(frame)
{
	var frameCopy={name:frame.name, type:frame.type};
	frameCopy.prompt=frame.prompt;
	frameCopy.parts=[];
	for(var i=0;i<frame.parts.length;i++)
		frameCopy.parts[i]=bindPart(frame.parts[i]);
	return frameCopy;
}
function bindPart(part)
{
	if(part.type=="simpleSlot")
		return simpleSlotBind(part);
	if(part.type=="checkboxesSlot")
		return checkboxesSlotBind(part);
	if (part.type=="frameName")
		return bindFrameName(part);
}
function bindFrameName(part)
{
	console.log("binding ",part.name);
	return {type:"subFrame",name:part.name,frame:bind(frames.get(part.name))};
}
function simpleSlotBind(part)
{
	return {type:"simpleSlot",name:part.name,question:part.question,value:part.value};
}
function checkboxesSlotBind(part)
{
	var newPart={type:"checkboxesSlot",name:part.name,options:part.options,cloneQuestion:part.cloneQuestion};
	newPart.value=[];
	for (var i=0;i<part.value.length;i++)
		newPart.value[i]=part.value[i];
	return newPart;
}
*/

//traverse looking for splits and making the copies using clone

function traverseTop()
{
	for(var i=0;i<topLevel.length;i++)
	{
		console.log("************************ traversing i:",i);
		traverse(topLevel[i],i);
		displayColor(i,topLevel); //debug only
		console.log("************************ finished traversing i topLevel.length ",i, topLevel.length);
	}
}
function displayColor(index,frameArray)
{
	//console.log("===================== index, color:",index,frameArray[index].parts[3].subframe.choice.choice.choice.name);
}

function traverse(frame,index) //index keeps track of what top level frame is being processed
{
	console.log("traverse ",frame," index ", index);
	if (frame=="")
	{
		console.log("no choice filled in");
		return;
	}
	if(frame.type=="compositeFrame")
	{
		traverseCompositeFrame(frame,index);
		return;
	}
	if(frame.type=="alternativesFrame")
	{
		traverseAlternativesFrame(frame,index);
		return;
	}
	if(frame.type=="leaf")
		return; //nothing to do
		
	console.log("bad frame type");
}

function traverseAlternativesFrame(frame,index)
{
	traverse(frame.choice,index);
}
function traverseCompositeFrame(frame,index)
{
	console.log("traversing composite frame ",frame);
	for(var i=0;i<frame.parts.length;i++)
		traversePart(frame.parts[i],index);
	console.log("finished traversing ",frame);
}
function traversePart(part,index)
{
	if(part.type=="checkboxesSlot")
		traverseCheckboxesSlot(part,index);
	if (part.type=="subFrame")
		traverseSubFrame(part,index);
}
function traverseSubFrame(part,index)
{
	traverse(part.subframe,index);
}

function traverseCheckboxesSlot(part,index)
{
	//for all values
	//	insert value
	//	if not last 
	//		add copy to topLevel
	if (part.value.length == 1) //if only one value nothing to do
	{
		//part.value=part.value[0];
		return;
	}
	var savedValues=[];
	for(var i=0; i<part.value.length;i++)
		savedValues[i]=part.value[i];
	console.log("num of savedValues ",savedValues.length);
	for(var i=0;i<savedValues.length-1;i++)
	{
		console.log("one pass thru splitting for index ",index);
		part.value=[];
		part.value[0]=savedValues[i];
		addCopyFrameToTopLevel(index);
	}
	console.log("final clone for index ",index);
	part.value=[];
	part.value[0]=savedValues[savedValues.length-1];
}

function addCopyFrameToTopLevel(index)
{
	console.log("adding clone at topLevel"); //need to insert after current one, not at end?
	topLevel[topLevel.length]=clone(topLevel[index]); 
	console.log("after addCopyFrameToTopLevel, index and topLevel: ",index,topLevel);
	console.log("in addCopyFrameToTopLevel");
	displayColor(topLevel.length-1,topLevel);
}




//how to clone a frame (fully bound)
function clone(frame)
{
	console.log("start cloning frame ",frame);
	if(frame.type=="compositeFrame")
		return cloneCompositeFrame(frame);
	if(frame.type=="alternativesFrame")
		return cloneAlternativesFrame(frame);
	if(frame.type=="leaf")
		return cloneLeaf(frame);
	console.log("bad frame type");
}
function cloneLeaf(frame)
{
	var frameCopy={name:frame.name, type:frame.type};
	return frameCopy;
}
function cloneAlternativesFrame(frame)
{
	console.log("in cloneAlternativesFrame, frame: ",frame);
	if(frame.name=="color")
		console.log("---------------------in cloneAlternativesFrame color is ",frame.choice.name);
	var frameCopy={name:frame.name, type:frame.type};
	frameCopy.finished=frame.finished;
	frameCopy.choices=[];
	for(var i=0;i<frame.choices.length;i++)
		frameCopy.choices[i]={question:frame.choices[i].question,subframe:clone(frame.choices[i].subframe)};
	if (frame.choice!="")
	{
		//frameCopy.choice=frame.choice;//removing clone here did not help... but try again
		frameCopy.choice=frameCopy.choices[findChoiceIndex(frame)].subframe;
	}
	else frameCopy.choice="";
	console.log("++++++++++++++++++choice is ",frameCopy.choice);

	return frameCopy;
}
function findChoiceIndex(frame)
{
	for(var i=0;i<frame.choices.length;i++)
		if(frame.choice.name==frame.choices[i].subframe.name)
			return i;
	console.log("bad choice in cloning alternativesFrame");
	return -1;

}
function cloneCompositeFrame(frame)
{
	var frameCopy={name:frame.name, type:frame.type};
	frameCopy.prompt=frame.prompt;
	frameCopy.parts=[];
	for(var i=0;i<frame.parts.length;i++)
		frameCopy.parts[i]=clonePart(frame.parts[i]);
	return frameCopy;
}
function clonePart(part)
{
	if(part.type=="simpleSlot")
		return simpleSlotClone(part);
	if(part.type=="checkboxesSlot")
		return checkboxesSlotClone(part);
	if (part.type=="subFrame")
		return cloneSubFrame(part);
	if(part.type=="more")
		return cloneMore(part);
	console.log("bad part in clone")
	return "bad part in clone";
}
function cloneMore(part)
{
	return {type:"more",question:part.question,finished:part.finished,subframe:clone(part.subframe)};
}
function cloneSubFrame(part)
{
	return {type:"subFrame",subframe:clone(part.subframe)};
}
function simpleSlotClone(part)
{
	console.log("in simpleSlotClone part: ",part);
	return {type:"simpleSlot",name:part.name,question:part.question,value:part.value};
}

function checkboxesSlotClone(part)
{
	console.log("in checkboxesSlotClone; part: ",part);
	return {type:"checkboxesSlot", name:part.name,options:part.options,cloneQuestion:part.cloneQuestion,value:part.value};
}
/*
function checkboxesSlotClone(part)
{
	var newPart={type:"checkboxesSlot",name:part.name,options:part.options,cloneQuestion:part.cloneQuestion};
	if(part.value.length==1)//single value
	{
		newPart.value=[];
		newPart.value[0]=part.value[0];
		return newPart;
	}
	console.log("bad checkboxes ");
	return {};

}
*/

/* think don't need the following
//make blank clone
function blankClone(frame)
{
	console.log("frame is ",frame);
	console.log("blank cloning ",frame.name);
	if(frame.type=="compositeFrame")
		return blankCloneCompositeFrame(frame);
	if(frame.type=="alternativesFrame")
		return blankCloneAlternativesFrame(frame);
	if(frame.type=="leaf")
		return blankCloneLeaf(frame);
	console.log("bad frame type");
}
function blankCloneLeaf(frame)
{
	var frameCopy={name:frame.name, type:frame.type};
	return frameCopy;
}
function blankCloneAlternativesFrame(frame)
{
	console.log("starting blankclonealternativesframe for ",frame);
	var frameCopy={name:frame.name, type:frame.type};
	frameCopy.finished=false;
	frameCopy.choice="";
	frameCopy.choices=[];
	for(var i=0;i<frame.choices.length;i++)
	{
		frameCopy.choices[i]={};
		frameCopy.choices[i].question=frame.choices[i].question;
		frameCopy.choices[i].subframe=blankClone(frame.choices[i].subframe);
	}
	console.log("finished blank clone of ",frame);
	return frameCopy;
}
function blankCloneCompositeFrame(frame)
{
	var frameCopy={name:frame.name, type:frame.type};
	frameCopy.prompt=frame.prompt;
	frameCopy.parts=[];
	for(var i=0;i<frame.parts.length;i++)
		frameCopy.parts[i]=blankClonePart(frame.parts[i]);
	return frameCopy;
}
function blankClonePart(part)
{
	if(part.type=="simpleSlot")
		return blankSimpleSlotClone(part);
	if(part.type=="checkboxesSlot")
		return blankCheckboxesSlotClone(part);
	if (part.type=="subFrame")
		return blankCloneSubFrame(part);
	if(part.type=="more")
		return blankCloneMore(part);
}
function blankCloneMore(part)
{
	return {type:"more",question:part.question,finished:false,subframe:blankClone(part.subframe)};
}
function blankCloneSubFrame(part)
{
	return {type:"subFrame",name:part.name,subframe:blankClone(part.subframe)};
}
function blankSimpleSlotClone(part)
{
	return {type:"simpleSlot",name:part.name,question:part.question,value:""};
}
function blankCheckboxesSlotClone(part)
{
	return {type:"checkboxesSlot",name:part.name,options:part.options,value:[],cloneQuestion:part.cloneQuestion};
}
*/

	

	


