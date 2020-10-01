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
//   add connectors
//	 	draw box around frame
//   make interactive
//   figure out how to use for editing
//   is erase and moving over actually needed? NO
//	 figure out how to handle more
const BOXHEIGHT=40;
const BOXWIDTH=100;
const TEXTHT=10;
const GridSize=10;
var boxes=[];
for(var i=0;i<GridSize;i++)
{
	boxes[i]=[];
	for(var j=0;j<GridSize;j++)
		boxes[i][j]="";
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
	putBox(frame.prompt,org.x,org.y);
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
	putBox(part.question,org.x,org.y);
	org.x++;
	org.y++;
	drawRect("green", topLeft,org);
}
function layoutCheckBoxes(part,org)
{
	var topLeft={x:org.x,y:org.y};
	console.log("laying out checkboxes ",part);
	for(var i=0;i<part.options.length;i++)
	{
		putBox(part.options[i].choice,org.x,org.y)
		org.x++;
	}
	org.y++;
	drawRect("green", topLeft,org);
}

function layoutMore(part,org)
{
	console.log("laying out more ",part);
	putBox(part.question,org.x,org.y)
	org.x++;
	org.y++;
	//layoutFrame(part.subframe,org);
}
function layoutAlternativesFrame(frame,org)
{
	console.log("laying out alternatives ",frame);
	var savedY=org.y;
	var newRt=org.x;
	var newBot=org.y;
	
	for(var i=0;i<frame.choices.length;i++)
	{
		putBox(frame.choices[i].question,org.x,org.y);
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
function layoutLeaf(frame,org)
{
	console.log("laying out leaf ",frame);
	org.x++;
	return; //nothing to lay out
}

function createText()
{
	putText("eggplant",100,100);
	putText("broccoli",150,150);
}
function putBox(s,i,j)
{
	console.log("putting at i j",s,i,j);
	//if (!isEmpty(i,j))
	//{
	//	moveBoxRight(i,j);
	//}
	boxes[i][j]=s;
	drawBox(i,j);
}
function isEmpty(i,j)
{
	if((i<0)||(i>(GridSize-1))||(j<0)||(j>(GridSize-1)))
		return false;
	return boxes[i][j]=="";
}
function moveBoxRight(i,j)
{
	if((i<0)||(i>(GridSize-1))||(j<0)||(j>(GridSize-1)))
	{
		console.log("out of space in grid");
		return;
	}
	//erase i j
	console.log("erasing ",i,j);
	document.getElementById(i+":"+j).remove();
	putBox(boxes[i][j],i+1,j);
}
function drawBox(i,j)
{
	putText(boxes[i][j],i*BOXWIDTH+2,j*BOXHEIGHT-TEXTHT,i+":"+j);
	
}
function drawRect(color,upperLeft,lowerRight)
{
	var w=lowerRight.x-upperLeft.x;
	var h=lowerRight.y-upperLeft.y;
	var newItem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	newItem.setAttribute("x", upperLeft.x*BOXWIDTH);
	newItem.setAttribute("y", (upperLeft.y-1)*BOXHEIGHT);
	newItem.setAttribute("width", w*BOXWIDTH-3);
	newItem.setAttribute("height", h*BOXHEIGHT-3);
	newItem.setAttribute("fill-opacity", "1%");
	newItem.setAttribute("stroke", color);
	newItem.setAttribute("stroke-width", 2);
	document.getElementById("firstGroup").appendChild(newItem);
}

 function putText(s,x,y,id) 
 {
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var newText = document.createElementNS(SVG_NS,"text");
  newText.setAttributeNS(null,"x",x);      
  newText.setAttributeNS(null,"y",y);   
  newText.setAttributeNS(null,"id",id);
  var textNode = document.createTextNode(s);
  newText.appendChild(textNode);
  //document.getElementById("firstGroup").appendChild(textNode);
  document.getElementById("firstGroup").appendChild(newText);
}
