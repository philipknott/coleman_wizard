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
//		do this with clickable regions that act like radio buttons or checkboxes
//			https://www.creativebloq.com/netmag/create-responsive-svg-image-maps-51411831 
//		for slots have an input box appear (show the value as text when get it)
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
	//org.y++;
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
	org.y++;
	return; //nothing to lay out
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
	makeClickableRect(i,j);
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
	putText(boxes[i][j],i*BOXWIDTH+2,j*BOXHEIGHT+(BOXHEIGHT/2)); //translate text grid coords to screen coords
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
	newItem.setAttribute("pointer-events", "none");
	document.getElementById("firstGroup").appendChild(newItem);
}
const SVG_NS = 'http://www.w3.org/2000/svg';

 function putText(s,x,y) 
 {
  const svg = document.getElementById("firstGroup");
  var newText = document.createElementNS(SVG_NS,"text");
  newText.setAttributeNS(null,"x",x);      
  newText.setAttributeNS(null,"y",y);   
  
  var textNode = document.createTextNode(s);
  newText.appendChild(textNode);
  //document.getElementById("firstGroup").appendChild(textNode);
  svg.appendChild(newText);
}

/* this won't track as SVG is deformed
function handleClick(e)
{
    var i= Math.floor(e.clientX/BOXWIDTH);
    var j= Math.floor(e.clientY/BOXHEIGHT);
    console.log("box: ",i,j,e.clientX);
}
*/
function clickedOnRect(e)
{
	console.log('Rectangle was clicked');
	console.log(e.target.getAttribute("id"));
	console.log(boxes[getIJfromId(e.target.getAttribute("id")).i][getIJfromId(e.target.getAttribute("id")).j]);
}
function getIJfromId(id)
{
	var parts=id.split(":");
	var res={i:parts[0],j:parts[1]};
	return res;
}

/*
const clickedOnRect = () => {
  alert('Rectangle was clicked');
}
*/
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



