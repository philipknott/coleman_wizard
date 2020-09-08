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
`<TaskerData sr="" dvi="1" tv="5.9.2">
<Profile sr="prof2" ve="2">
<cdate>1592290752621</cdate>
<edate>1592304467345</edate>
<flags>8</flags>
<id>2</id>
<mid0>3</mid0>
<nme>Alexa Routine</nme>
<App sr="con0" ve="2">
<cls0>com.amazon.dee.app.Launcher</cls0>
<flags>2</flags>
<label0>Amazon Alexa</label0>
<pkg0>com.amazon.dee.app</pkg0>
</App>
</Profile>
<Task sr="task3">
<cdate>1592290764775</cdate>
<edate>1592304467345</edate>
<id>3</id>
<nme>Set Routine</nme>
<pri>100</pri>
<Action sr="act0" ve="7">
<code>20</code>
<App sr="arg0">
<appClass>com.amazon.dee.app.Launcher</appClass>
<appPkg>com.amazon.dee.app</appPkg>
<label>Amazon Alexa</label>
</App>
<Str sr="arg1" ve="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
</Action>
<Action sr="act1" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="10"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act10" ve="7">
<code>105</code>
<Str sr="arg0" ve="3">TestRoutine</Str>
<Int sr="arg1" val="0"/>
</Action>
<Action sr="act11" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act12" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>please enter a routine name</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>32768</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: please enter a routine name
Action : Paste</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>597eebe6-d2bf-499a-a1a5-0cfbe2fab8b8</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act13" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act14" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Next</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Next
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>b17e91a4-bd5f-4245-bb7b-be88fd3ba071</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act15" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act16" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>When this happens ex. you say "Alexa, good morning"</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: When this happens ex. you say "Alexa, good morning"
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>c7b275a3-4a7a-4262-879a-33083689b9fb</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act17" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act18" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Schedule</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Schedule
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>05ca5408-1a58-44ee-b0f4-88d7b2297af4</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act19" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act2" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>com.amazon.dee.app:id/home_menu</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>1</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Id
Value: com.amazon.dee.app:id/home_menu
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>9841c1a7-352f-4b62-a499-ebdecba91318</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act20" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>At Time</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: At Time
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>517ec691-12ad-46a8-ae62-5fe59e472c46</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act21" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act22" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>At Time, Tap to set Time.</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: At Time, Tap to set Time.
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>1fc6aed7-1b82-431a-aaf7-ea2e74360ab7</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act23" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act24" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Switch to text input mode for the time input.</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Switch to text input mode for the time input.
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>6075b57c-8ab8-4690-9a89-8fe5e0c310e7</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act25" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act26" ve="7">
<code>^slotval hour^</code>
<Str sr="arg0" ve="3">7</Str>
<Int sr="arg1" val="0"/>
</Action>
<Action sr="act27" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>android:id/input_hour</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>32768</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>1</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Id
Value: android:id/input_hour
Action : Paste</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>a96920d2-5b70-445d-bc3a-84e6dbe36bc8</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act28" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act29" ve="7">
<code>105</code>
<Str sr="arg0" ve="3">^slotval minute^</Str>
<Int sr="arg1" val="0"/>
</Action>
<Action sr="act3" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act30" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>android:id/input_minute</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>32768</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>1</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Id
Value: android:id/input_minute
Action : Paste</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>6055f920-7caf-4f94-8845-36ddfad0d43c</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act31" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act32" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>android:id/am_pm_spinner</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>1</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Id
Value: android:id/am_pm_spinner
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>120eaa24-3b4f-4310-9803-215bab1ba3d4</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act33" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act34" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>AM</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: ^slotval meridiem^
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>08e9afe7-0dbc-46b2-ad5d-5d7876c1769c</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act35" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act36" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>OK</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: OK
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>46af0920-a0f8-4c18-8990-000e2bcb08d7</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act37" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act38" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Repeat</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Repeat
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>c71cc6d7-4024-4552-bbcf-c05fb90b1dca</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act39" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act4" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Routines</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Routines
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>27777531-11f5-4b05-9004-61817abb25e8</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act40" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>^slotval days^</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: ^slotval days^
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>0c0d6bf4-6ebe-4e9d-b6a2-0949059eb7fe</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act41" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act42" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Next</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Next
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>542ea465-edea-4711-9115-539c5d1b5806</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act43" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act44" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Add action ex. Play weather</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Add action ex. Play weather
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>f912815d-3941-4983-8ef5-09f199dc5b90</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act45" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act46" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Tab, Devices</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Tab, Devices
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>646eb0bf-bb75-4ce6-929a-7357a51a50a3</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act47" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act48" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Add a new device or group</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Add a new device or group
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>aa923253-10be-4501-9d57-45032f715470</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act49" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act5" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act50" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Add Device Echo, Smart Home, and Accessories</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Add Device Echo, Smart Home, and Accessories
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>e0d40b64-af05-4777-9ee2-f67b9db649f6</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act51" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act6" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Add New</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Add New
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>c205e5d1-1335-41dc-b536-1ce82ed77c0d</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act7" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
<Action sr="act8" ve="7">
<code>1732635924</code>
<Bundle sr="arg0">
<Vals sr="val">
<ActionId>Enter routine name</ActionId>
<ActionId-type>java.lang.String</ActionId-type>
<ActionType>16</ActionType>
<ActionType-type>java.lang.String</ActionType-type>
<EnableDisableAccessibilityService>&lt;null&gt;</EnableDisableAccessibilityService>
<EnableDisableAccessibilityService-type>java.lang.String</EnableDisableAccessibilityService-type>
<FieldSelectionType>0</FieldSelectionType>
<FieldSelectionType-type>java.lang.String</FieldSelectionType-type>
<IsFirstAction>false</IsFirstAction>
<IsFirstAction-type>java.lang.Boolean</IsFirstAction-type>
<IsTaskerAction>false</IsTaskerAction>
<IsTaskerAction-type>java.lang.Boolean</IsTaskerAction-type>
<NearbyText>&lt;null&gt;</NearbyText>
<NearbyText-type>java.lang.String</NearbyText-type>
<Password>&lt;null&gt;</Password>
<Password-type>java.lang.String</Password-type>
<RepeatInterval>&lt;null&gt;</RepeatInterval>
<RepeatInterval-type>java.lang.String</RepeatInterval-type>
<RepeatTimes>&lt;null&gt;</RepeatTimes>
<RepeatTimes-type>java.lang.String</RepeatTimes-type>
<StoredAction>&lt;null&gt;</StoredAction>
<StoredAction-type>java.lang.String</StoredAction-type>
<TextToWrite>&lt;null&gt;</TextToWrite>
<TextToWrite-type>java.lang.String</TextToWrite-type>
<com.twofortyfouram.locale.intent.extra.BLURB>Type: Text
Value: Enter routine name
Action : Click</com.twofortyfouram.locale.intent.extra.BLURB>
<com.twofortyfouram.locale.intent.extra.BLURB-type>java.lang.String</com.twofortyfouram.locale.intent.extra.BLURB-type>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES>&lt;StringArray sr=""&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;%err
Error Code
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES0&gt;&lt;_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;%errmsg
Error Message
Only available if you select &amp;lt;b&amp;gt;Continue Task After Error&amp;lt;/b&amp;gt; and the action ends in error&lt;/_array_net.dinglisch.android.tasker.RELEVANT_VARIABLES1&gt;&lt;/StringArray&gt;</net.dinglisch.android.tasker.RELEVANT_VARIABLES>
<net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>[Ljava.lang.String;</net.dinglisch.android.tasker.RELEVANT_VARIABLES-type>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>ActionId FieldSelectionType ActionType plugininstanceid plugintypeid </net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS>
<net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>java.lang.String</net.dinglisch.android.tasker.extras.VARIABLE_REPLACE_KEYS-type>
<net.dinglisch.android.tasker.subbundled>true</net.dinglisch.android.tasker.subbundled>
<net.dinglisch.android.tasker.subbundled-type>java.lang.Boolean</net.dinglisch.android.tasker.subbundled-type>
<plugininstanceid>435365d5-933d-4f58-afc7-bb5c52ed8bec</plugininstanceid>
<plugininstanceid-type>java.lang.String</plugininstanceid-type>
<plugintypeid>com.joaomgcd.autoinput.intent.IntentPerformAction</plugintypeid>
<plugintypeid-type>java.lang.String</plugintypeid-type>
</Vals>
</Bundle>
<Str sr="arg1" ve="3">com.joaomgcd.autoinput</Str>
<Str sr="arg2" ve="3">com.joaomgcd.autoinput.activity.ActivityConfigPerformAction</Str>
<Int sr="arg3" val="23"/>
</Action>
<Action sr="act9" ve="7">
<code>30</code>
<Int sr="arg0" val="0"/>
<Int sr="arg1" val="3"/>
<Int sr="arg2" val="0"/>
<Int sr="arg3" val="0"/>
<Int sr="arg4" val="0"/>
</Action>
</Task>
</TaskerData>`
);

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


