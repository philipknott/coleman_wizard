//add radio buttons represented as text ( ) (*)
//this version handles text boxes
//   items have slots
//   slots have type
//   for type  simpleSlot calls processSimpleSlot(slot)
//working on erasing box contents
//lay out questions on plane
//needed functions
//drawQuestion(question, location)
//makeSpace(location, direction)
//connect(location0,location1)
//pan(direction)
//zoom(factor,location)
//NO: just do layout; use D3 for pan and zoom
//note that still need the fns above pan on the list
//checkerboard model
//  questions are short and wide, so unit should be a box of that shape, not a square
//  draw some examples on paper
//sort of working. issues:
//   take lengths of strings into account
//   figure out when to reset x coord ... all ok except for more
//          each layout returns its farthest right DONE
//   no add connectors
//	 	draw box around frame
//   make interactive
//		do this with clickable regions that act like radio buttons or checkboxes
//			https://www.creativebloq.com/netmag/create-responsive-svg-image-maps-51411831 
//		for slots have an input box appear (show the value as text when get it)
//   figure out how to use for editing
//   is erase and moving over actually needed? NO
//	 figure out how to handle more
//  svg clicking working; can identify box clicked
//  note some bug affecting "weekdays"
//need to move to widgets (eg radio buttons) in boxes
//put label and value in boxes... for buttons value is the state indicator
const BOXHEIGHT=40;
const BOXWIDTH=100;
const TEXTHT=10;
const GridSize=10;
var boxes=[];  //these arrays are used to store info about the spaces in the grid layout
var slots=[];
var vals=[];
var index=[]; //used to keep track of radio buttons and check boxes
for(var i=0;i<GridSize;i++)
{
	boxes[i]=[];
	slots[i]=[];
	vals[i]=[];
	index[i]=[];
	for(var j=0;j<GridSize;j++)
	{
		boxes[i][j]="";
		slots[i][j]=0;
		vals[i][j]="";
		index[i][j]=0;
	}
}
function layout(t)
{
	console.log("in layout with t ",t);
	layoutFrame(t[0],{x:1,y:1});
}
function layoutFrame(frame,org)
{
	var topLeft={x:org.x,y:org.y};
	if(frame.type=="compositeFrame")
			layoutCompositeFrame(frame,org);
		else if (frame.type=="alternativesFrame")
			layoutAlternativesFrame(frame,org)
		else if (frame.type=="leaf")
		{
			layoutLeaf(frame,org);
		}
	drawRect("red", topLeft,org);
}

function layoutCompositeFrame(frame,org)
{

	console.log("laying out composite ",frame);
	putBox(frame.prompt,"",org.x,org.y);
	org.y++;
	var savedX=org.x;
	var newRt=org.x;
	for(var i=0;i<frame.parts.length;i++)
	{
		var part=frame.parts[i];
		var partType=part.type;
		if(partType=="simpleSlot")
		{
			layoutSimpleSlot(part,org);
		}
		else if(partType=="checkboxesSlot")
		{
			layoutCheckBoxes(part,org);
		}
		else if(partType=="subFrame")
		{
				layoutFrame(part.subframe,org);
		}
		else if(partType="more")
		{
			layoutMore(part,org); 
		}
		else console.log("error: bad partType ",partType);
		if (org.x>newRt)
			newRt=org.x;
		org.x=savedX;
	}
	//org.y is already set
	org.x=newRt;
}

function layoutSimpleSlot(part,org)
{
	var topLeft={x:org.x,y:org.y};
	console.log("laying out simple slot ",part);
	putBox(part.question,"",org.x,org.y,part,0);
	org.x++;
	org.y++;
	drawRect("green", topLeft,org);
}
function layoutCheckBoxes(part,org)
{
	var boxLabel;
	var topLeft={x:org.x,y:org.y};
	console.log("laying out checkboxes ",part);
	for(var i=0;i<part.options.length;i++)
	{
		boxLabel=makeCheckboxLabelUnchecked();
		putBox(part.options[i].choice,boxLabel,org.x,org.y,part,i);
		//putBox(part.options[i].choice,org.x,org.y);
		org.x++;
	}
	org.y++;
	drawRect("green", topLeft,org); //green
}
function makeCheckboxLabelUnchecked(s)
{
	return "[ ]";
}
function makeCheckboxLabelChecked(s)
{
	return "[x]";
}

function layoutMore(part,org)
{
	console.log("laying out more ",part);
	putBox(part.question,"",org.x,org.y,part,0)
	org.x++;
	//org.y++;
	//layoutFrame(part.subframe,org);
}
function layoutAlternativesFrame(frame,org)
{
	console.log("laying out alternatives ",frame);
	var savedY=org.y;
	var newRt=org.x;
	var newBot=org.y;
	var boxLabel;
	
	for(var i=0;i<frame.choices.length;i++)
	{
		boxLabel=makeRadioLabel(i,frame.choices.length)
		//putBox(frame.choices[i].question,org.x,org.y);
		putBox(frame.choices[i].question,boxLabel,org.x,org.y,frame,i);
		org.y++;
		layoutFrame(frame.choices[i].subframe,org);
		if (org.x>newRt)
			newRt=org.x;
		if(org.y>newBot)
			newBot=org.y;
		org.y=savedY;
	}
	org.x=newRt;
	org.y=newBot;
	
}
function makeRadioLabel(i,n)
{
	if (i==0)
		return "|( )";
	if (i==(n-1))
		return "( )|";
	return "( )";
}
function layoutLeaf(frame,org)
{
	console.log("laying out leaf ",frame);
	org.x++;
	//org.y++;
	return; //nothing to lay out
}


function putBox(s,v,i,j,slot,ind)
{
	console.log("putting at i j",s,i,j);
	//if (!isEmpty(i,j))
	//{
	//	moveBoxRight(i,j);
	//}
	boxes[i][j]=s; //text
	vals[i][j]=v; //value
	slots[i][j]=slot;
	index[i][j]=ind;
	drawBox(v,i,j);
	makeClickableRect(i,j);
}

function drawBox(v,i,j)
{
	putText(boxes[i][j],i*BOXWIDTH+2,j*BOXHEIGHT+(BOXHEIGHT/3),i,j,"label"); //translate text grid coords to screen coords
	putText(v,i*BOXWIDTH+2,j*BOXHEIGHT+(.66*BOXHEIGHT),i,j,"value"); 
}
function drawRect(color,upperLeft,lowerRight)
{
	var w=lowerRight.x-upperLeft.x;
	var h=lowerRight.y-upperLeft.y;
	var newItem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	newItem.setAttribute("x", upperLeft.x*BOXWIDTH);
	newItem.setAttribute("y", (upperLeft.y)*BOXHEIGHT);
	newItem.setAttribute("width", w*BOXWIDTH-3);
	newItem.setAttribute("height", h*BOXHEIGHT-3);
	newItem.setAttribute("fill-opacity", "1%");
	newItem.setAttribute("stroke", color);
	newItem.setAttribute("stroke-width", 2);
	newItem.setAttribute("pointer-events", "none");
	document.getElementById("firstGroup").appendChild(newItem);
}
const SVG_NS = 'http://www.w3.org/2000/svg';

 function putText(s,x,y,i,j,type) 
 {
  const svg = document.getElementById("firstGroup");
  var id=type+i+":"+j;
  var newText = document.createElementNS(SVG_NS,"text");
  newText.setAttributeNS(null,"x",x);      
  newText.setAttributeNS(null,"y",y);   
  newText.setAttributeNS(null,"id",id);   
  var textNode = document.createTextNode(s);
  newText.appendChild(textNode);
  //document.getElementById("firstGroup").appendChild(textNode);
  svg.appendChild(newText);
}


function clickedOnRect(e)
{
	console.log('Rectangle was clicked');
	console.log(e.target.getAttribute("id"));
	var i=getIJfromId(e.target.getAttribute("id")).i;
	var j=getIJfromId(e.target.getAttribute("id")).j;
	console.log(i,j);
	console.log(slots[i][j]);
	if(slots[i][j].type=="simpleSlot")
		processSimpleSlotPar(i,j,slots[i][j]);
	else if (slots[i][j].type=="checkboxesSlot")
		processCheckBoxPar(i,j,slots[i][j]);
	else if (slots[i][j].type=="alternativesFrame")
		processRadioPar(i,j,slots[i][j]); 
	else console.log("bad slot type");
}
function processRadioPar(i,j,slot)
{
	console.log("radio");
	var radioVal=toggleRadio(i,j);
	//rewrite contents
	writeValue(i,j,radioVal);
	//process siblings...if turning on, turn sibling off
	//first to right
	if(radioIsOn(i,j))
	{
		setValueRadio(i,j);
		turnRadioOffRight(i,j);
		turnRadioOffLeft(i,j);
	}
}
function toggleRadio(i,j)
{
	var now=vals[i][j];
	if (now=="|( )")
		return "|(*)";
	if (now=="( )")
		return "(*)";
	if (now=="( )|")
		return "(*)|";
	if (now=="|(*)")
		return "|( )";
	if (now=="(*)")
		return "( )";
	if (now=="(*)|")
		return "( )|";
	console.log("bad radio value");
}
function radioIsOn(i,j)
{
	console.log("in radioIsOn ", i,j);
	return vals[i][j].includes("*");
}
function isRightEnd(i,j)
{
	return vals[i][j].includes(")|");
}
function turnRadioOffRight(i,j)
{
	if(isRightEnd(i,j))
		return;
	var ip1=parseInt(i)+1;
	if(radioIsOn(ip1,j))
	{
		writeValue(ip1,j,toggleRadio(ip1,j));
		return;
	}
	turnRadioOffRight(ip1,j);
}
function isLeftEnd(i,j)
{
	return vals[i][j].includes("|(");
}
function turnRadioOffLeft(i,j)
{
	if(isLeftEnd(i,j))
		return;
	var im1=parseInt(i)-1;
	if(radioIsOn(im1,j))
	{
		writeValue(im1,j,toggleRadio(im1,j));
		return;
	}
	turnRadioOffLeft(im1,j);
}
function setValueRadio(i,j)
{
	var slot=slots[i][j];
	slot.choice=slot.choices[index[i][j]].subframe;
	console.log("choice:",slot.choice);
}
/*
function closeAltRadio(subframe)
{
	var modal = document.getElementById("myModal");
  modal.style.display = "none";
  //read the checked value
  subframe.choice=subframe.choices[document.getElementById("foo")["alt"].value].subframe;
  
  	
  	setTimeout(function(){ askQuestionsTop(); }, 10);
}*/
function processCheckBoxPar(i,j,slot)
{
	//read contents
	var checked=stateCheckBox(i,j);
	var newVal;
	//determine state; toggle state
	if (checked)
		newVal=makeCheckboxLabelUnchecked();
	else newVal=makeCheckboxLabelChecked();
	console.log("setting checkbox label to ",newVal);
	//rewrite contents
	writeValue(i,j,newVal);
	processCheckBoxValue(i,j,slot);
}
//index[i][j] contains the index within a check box set of the clicked item
//need to look to left and right to collect the indices of boxes in the same set that are clicked
//can then get the corresponding options
function processCheckBoxValue(i,j,slot)
{
	var array = []
	//var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
	var checkboxInds=getCheckBoxInds(i,j,slot);
	console.log("checkboxInds[0]",checkboxInds[0]);
	var s="";

	for (var i = 0; i < checkboxInds.length; i++) 
	{
		console.log("ith item ",checkboxInds[i]);
		var option=slot.options[checkboxInds[i]];
		console.log("corresponding option ",option);
		if (option.type=="simple")
		{
  			array.push(option.choice);
  			s=s+","+option.choice;
  		}
  		else if(option.type=="multiple")
  		{
  			for(var i=0;i<option.values.length;i++)
  			{
  				array.push(option.values[i]);
  				s=s+","+option.values[i];
  			}
  		}
  		else console.log("bad option in checkboxesSlot");
  	}
  	
  	slot.value=array;
  	console.log("check box value: ",slot.value);
}
function getCheckBoxInds(i,j,checkboxesSlot)
{
	var indexList=[];
	if (stateCheckBox(i,j))
		indexList.push(index[i][j]);
	addBoxesLeft(i,j,indexList);
	addBoxesRight(i,j,indexList,checkboxesSlot);
	return indexList;
}
function isRightEndCheck(i,j,slot)
{
	//return vals[i][j].includes("]|");
	return (index[i][j]==slot.options.length-1);
}
function addBoxesRight(i,j,indexList,slot)
{
	if(isRightEndCheck(i,j,slot))
		return;
	var ip1=parseInt(i)+1;
	if(stateCheckBox(ip1,j))
	{
		indexList.push(index[ip1][j])
	}
	addBoxesRight(ip1,j,indexList,slot);
}
function isLeftEndCheck(i,j)
{
	//return vals[i][j].includes("|[");
	return (index[i][j]==0);
}
function addBoxesLeft(i,j,indexList)
{
	if(isLeftEndCheck(i,j))
		return;
	var im1=parseInt(i)-1;
	if(stateCheckBox(im1,j))
	{
		indexList.push(index[im1][j])
	}
	addBoxesLeft(im1,j,indexList);
}
function stateCheckBox(i,j)
{
	return vals[i][j].includes("x");
}

function getIJfromId(id)
{
	var parts=id.split(":");
	var res={i:parts[0],j:parts[1]};
	return res;
}
function processSimpleSlotPar(i,j,slot)
{
	console.log("simple slot");
	//if (slot.value!="")
	//{
	//	console.log("simple slot resolved");
	//	return true; //finished
	//}
	// Get the modal
	console.log("in simple slot");
	var modal = document.getElementById("myModal");
	var s='<form id="foo">&nbsp;';
	s=s+slot.question+'<input type="text" id="filler" value="   ">';
	s=s+"</form>";
	var innerModal=document.getElementById("innerModal");
	innerModal.innerHTML=s;

	modal.style.display = "block";
    document.getElementById("filler").focus();

	var close=document.getElementById("close");



	close.onclick = function()
	{
  		modal.style.display = "none";
  		//read the value
  		slot.value=document.getElementById("filler").value;
  		console.log("simple slot set");
  		writeValue(i,j,slot.value);
  		
  
	}
	setUpEnter();
	return false; //not finished
}
function writeValue(i,j,value)
{
	vals[i][j]=value;
	//erase i j
	console.log("erasing ",i,j);
	document.getElementById("value"+i+":"+j).remove();
	//putBox(boxes[i][j],i,j,slots[i][j]);
	putText(value,i*BOXWIDTH+2,j*BOXHEIGHT+(.66*BOXHEIGHT),i,j,"value"); 
}
function makeClickableRect(i,j)
{
	var id=i+":"+j;
	const svg = document.getElementById("firstGroup");
	const rect = document.createElementNS(SVG_NS, 'rect');
	rect.setAttributeNS(null, 'x', (i*BOXWIDTH).toString());
	rect.setAttributeNS(null, 'y', (j*BOXHEIGHT).toString());
	rect.setAttributeNS(null, 'width', BOXWIDTH);
	rect.setAttributeNS(null, 'height', BOXHEIGHT);
	//rect.setAttributeNS(null, "fill-opacity", "5%");
	rect.setAttributeNS(null, 'fill', "transparent");  //"transparent"
	//rect.setAttributeNS(null, 'stroke', "blue");
	//rect.setAttributeNS(null, 'stroke-width', '2');
	rect.setAttributeNS(null, 'tab-index', '0');
	rect.setAttributeNS(null, 'cursor', 'pointer');
	rect.setAttributeNS(null,"id",id);
	rect.addEventListener('click',clickedOnRect);
	//rect.addEventListener('click', ($event) => {
  	//	clickedOnRect();
	//});
	svg.appendChild(rect);
}



