
//对javascript的字符串增加一个trim函数
String.prototype.trim   =   function()
{
         //   用正则表达式将前后空格
         //   用空字符串替代。
         return   this.replace(/(^\s*)|(\s*$)/g,   "");
}


Array.prototype.clear=function(){ 
this.length=0; 
} 
Array.prototype.insertAt=function(index,obj){ 
this.splice(index,0,obj); 
} 
Array.prototype.removeAt=function(index){ 
this.splice(index,1); 
} 
Array.prototype.remove=function(obj){ 
var index=this.indexOf(obj); 
if (index>=0){ 
this.removeAt(index); 
} 
} 


//javascript 日志输出到chrome的控制台上
function Log(str)
		{
			if(window.console && console.log)
			{
				console.log(str);
			}
		}
//启动函数，清除Ajax缓存
 $(document).ready(function()
	 {         
				$.ajaxSetup ({
				   cache: false //关闭AJAX相应的缓存
				});        
				//将所有必填的字段都加上*标
				$("#EntityForm .required").each(function(){
					var content = $(this).html();

					var required = "<span class=\"star\"> *</span>";

					$(this).after(required);

				});  
				$(".EntityForm .required").each(function(){
					var content = $(this).html();

					var required = "<span class=\"star\"> *</span>";

					$(this).after(required);

				});  
				$("#queryForm .required").each(function(){
					var content = $(this).html();

					var required = "<span class=\"star\"> *</span>";

					$(this).after(required);

				}); 
	 }
 );


Utility = {};

if(typeof globalConfig == "undefined")
   globalConfig = {ApplicationPath:'/wegis'};



 
 Utility.sendRequest = function(url, postData){
    $.getJSON(url, postData, function(msg){
         $.messager.alert('提示',msg.Message);
	});
 }

/**
  *修改查询表单的URL指向excel导出的URL,并提交查询表单，导出下载数据
  */
  Utility.excelExport =function (url)
			{
				var queryUrl = $("#queryForm").attr("action");
				//Excel下载地址
				$("#queryForm").attr("action",url); 
				$("#queryForm").attr("method","POST"); 
				$("#queryForm").attr("target","_blank"); //弹屏下载
				document.getElementById("queryForm").submit();
				$("#queryForm").attr("action",queryUrl); //恢复到原来的查询地址
				$("#queryForm").attr("target",""); 
			}
/**
 * 创建下拉部门树
 */
Utility.createDepTree = function(id,defaultValue)
{
	var url = globalConfig.webPath + '/vehicle/depMenu.action';
	this.createComboTree(id, url, defaultValue);
}
/**
 * 创建下拉树
 */
Utility.createComboTree = function(id, url, defaultValue)
{
	 $("#"+id).combotree({
					url:url,method:'get',onLoadSuccess:function()
		 {
			//加载成功后，设置默认值
			 if(defaultValue || defaultValue == 0)
				{
					 $("#"+id).combotree('setValue', defaultValue);
				}
		 }
	 });
	

}



Utility.loadGridWithParams = function()
{
     var queryForm = $("#queryForm").ajaxForm();
	 var formData = queryForm.formToArray();
	 var queryParams = {};
	for(var m in formData){
		 queryParams[formData[m].name] = formData[m].value;        
	}

	 $("#queryGrid").datagrid("load", queryParams);
}


Utility.deleteEntity = function(actionUrl, EntityId, gridId){
    if (gridId == null) 
        gridId = "list";
	
	$.messager.confirm('确认','你确定要删除记录吗?',function(r){
		if (r){					
			if(actionUrl.indexOf("?") > 0)
				actionUrl = actionUrl + "&EntityID=" + EntityId;
			else
				actionUrl = actionUrl + "?EntityID=" + EntityId;
			
			$.getJSON(actionUrl, function(result){
				if (result.success == true) {
					$("#queryGrid").datagrid('load');
					//$("#" + gridId).trigger("reloadGrid");
					//$("#dataTable"). dataTable().fnDraw();
					$.messager.alert('提示',"删除成功!");
				}
				else 
					$.messager.alert('提示',"无法删除! 错误原因：" + result.message);
			});
		}
	});
    
};

Utility.entityFormOptions = {
    beforeSubmit: function(formData, jqForm, options){
		 //alert(jqForm.attr("id"));
         if(! doValidate(jqForm[0]))
			 return false;

		 //Utility.plsWait();//显示请等待的消息...
		 return true;
    },
    success: function(responseText){
		//Utility.done();  //结束显示的等待消息..
        //alert(1);
        result = eval("(" + responseText + ")");     
        //alert(result);
        if (result.Success) {
					var Entity = result.Data;
		
					if(Entity){
						$("#EntityId").val(Entity.EntityId);
						$("#Sn").val(Entity.Sn);
						$.messager.alert('提示',"操作成功!");
					}else
		                $.messager.alert('提示',"保存成功!");
					//if(result.Message)
						//alert(result.Message);
        }
        else 
            $.messager.alert('提示',"保存失败! 错误原因：" + (result.Message ? result.Message : result.Data));


    }
};
Utility.GetQueryString = function(str){
    var LocString = String(window.document.location.href);

	//alert(LocString);
    
    var rs = new RegExp("(^|)" + str + "=([^\&]*)(\&|$)", "gi").exec(LocString), tmp;
    if (tmp = rs) 
        return tmp[2];
    return "没有这个参数";
};

/** 
 * 将Json数据串转化成对象，并按照表单的元素的name一一对照填充表单数据
*/
Utility.populateFormByJsonData = function(formId, jsonString){
	  if(jsonString.length == 0 || jsonString == "()")
		    return {};
       var entity = eval(jsonString);          //转换成对象
        var EntityForm = $("#" + formId);        
        EntityForm.populate(entity, {
                    debug: 1,
                    identifier: 'name' 
                });    

		return entity;
}
/**
 * callbackFunc 时Load数据成功后，触发的回调函数
 */
Utility.populateForm = function(formId, _url, callbackFunc){
	 var EntityForm = $("#" + formId);


	 Utility.plsWait();

     $.ajax({
            type: "POST",
            url: _url,
			error:function(){
			   $.messager.alert('提示',"网络连接错误，无法读取数据!");
               Utility.done();
			},
            success: function(jsonString){
				Utility.done();
                //alert(jsonString);
                /** 微软的独有的Json日期格式，需要做日期转换 */
				jsonString = jsonString.replace(new RegExp('\\:null','g'), ':""');  //替换Null值为空值
                
                var jsonString1 = jsonString.replace(new RegExp('(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+(\\+[0-9]+)?)\\)\\\\/\\"', 'g'), "$1MyDate($2)");
                //alert(jsonString1);
                var data = eval("(" + jsonString1 + ")");

				if(data.Success == false && data.Message){
					$.messager.alert('提示',"操作发生错误! 错误原因:"  + data.Message);

				}

				data = data.Data || data;
                
                EntityForm.populate(data, {
                    debug: 1,
                    identifier: 'name'
                });
                
                if (typeof callbackFunc == "function") {
                    callbackFunc.apply(this, [data]);
                }
                
            }
        });

};


Utility.initEntity = function(formId, actionUrl, formOptions, callbackFunc){

	var EntityId = this.GetQueryString("EntityId");

	actionUrl = globalConfig.webPath + actionUrl;

	this.initEntityByEntityId(formId, EntityId, actionUrl, formOptions, callbackFunc);

    return EntityId;

};


Utility.initEntityByEntityId = function(formId, EntityId, actionUrl, formOptions, callbackFunc){

	var EntityForm = $("#" + formId);
    
    if (EntityId > 0) {
       var url = actionUrl + "?EntityId=" + EntityId;
       this.populateForm(formId, url, callbackFunc);
    }else if(EntityId == 0){
        if (typeof callbackFunc == "function") {
             callbackFunc.apply(this, [{}]);
        }
	}else
		$.messager.alert('提示',"EntityId:" + EntityId);

    var options = $.extend({}, this.entityFormOptions, formOptions);
    
    // bind form using 'ajaxForm'
    EntityForm.ajaxForm(options);
    
    return EntityId;

};



Utility.ajaxSubmitForm = function(formId, formOptions){	
    var geFormOptions = {
		beforeSubmit: function(formData, jqForm, options){
			 var isValid = $("#" + formId).valid(); //调用Jquery.validate.js的验证插件来验证Form
			 return isValid;
		},
		success: function(responseText){
			//alert(responseText);
			var result = responseText;
			if (result.success) {
				 $.messager.alert('提示',"命令已经下发,请等待处理!");
			}
			else 
				$.messager.alert('提示',"提交失败! 错误原因：" + (result.message ? result.message : result.Data));
	    }
     };

     var options = $.extend({}, geFormOptions , formOptions); 
	 var EntityForm = $("#" + formId);
        // bind form using 'ajaxForm'
     EntityForm.ajaxForm(options);
};


Utility.ajaxForm = function(formId, formOptions){	
    var geFormOptions = {
    beforeSubmit: function(formData, jqForm, options){
		 var isValid = $("#" + formId).valid(); //调用Jquery.validate.js的验证插件来验证Form
		 return isValid;
    },
    success: function(responseText){
		//Utility.done();  //结束显示的等待消息..
        //alert(1);
		//alert(1);
		var result = responseText;
        //var result = eval("(" + responseText + ")");     
        //alert(result);
        if (result.Success) {
					var Entity = result.Data
					if(Entity)
					{
						$("#EntityId").val(Entity.EntityId);
						$("#Sn").val(Entity.Sn);
						$.messager.alert('提示',"操作成功!");
					}
					else
					{
					    if (result.Message!=null || result.Message!="") {
					        $.messager.alert('提示',result.Message);
					    } 
					    else{
		                    $.messager.alert('提示',"保存成功!");
		                }
		            }
        }
        else 
            $.messager.alert('提示',"保存失败! 错误原因：" + (result.Message ? result.Message : result.Data));
		  }
     };

     var options = $.extend({}, geFormOptions , formOptions); 

	 var EntityForm = $("#" + formId);
        // bind form using 'ajaxForm'
     EntityForm.ajaxForm(options);
};

//将以分钟为单位的时间间隔转换成时、分、秒的形式
Utility.descrTimeSpan = function(interval){
    var strInterval = "";

								 var hour = Math.floor(interval / 60);

								 var min = Math.floor(interval - hour * 60);

								 var sec = Math.floor((interval - hour * 60 - min) * 60);

								 if(hour > 0)
								    strInterval += hour + "小时," ;								 
								 if(min > 0)
								    strInterval += min + "分,";
								 if(sec > 0)
								    strInterval += sec + "秒";
	return strInterval;
}

//将日期对话框，初始化为当期日期
$.fn.today = function(opt){
	//alert(Date.today().toString("yyyy-MM-dd"));
    this.each(function(){this.value = 
		Utility.today();
	});
};




$.fn.populateTemplate = function(data){

   return this.each(function(){
      var template_content = $(this).html();

	  $(this).setTemplate(template_content);
	  $(this).processTemplate(data);
   });
};


/**
 * params = {
	   queryID : 'selectSysCode', //查询ID
       parent No: '',  //上一级或父级的编码
	   selectedValue : '' //选中值
	}

 */
$.fn.lookup = function(params){     
	 this.each(function(){
         var selectObj = this;
		 $(this).empty(); //清空下拉框
		 //log(params.selectedValue);
		 $.getJSON(globalConfig.webPath + "/data/basicData.action", params, 
						function(result){		
			                if(result.success == false)
							{
								return;
							}
							result = result.data;
			                var isSelected = false;
							var emptyOp = new Option("请选择", "");
							var t = selectObj.options;
							t[t.length] = (emptyOp);
							$.each(result, function(i, item){
								 var op = new Option(item.name, item.code);
								 var code = ""+item.code;
								 if(code == params.selectedValue){
									  op.selected = true;
									  isSelected = true;
								 }
								 var t = selectObj.options;
								 t[t.length] = (op);
							});
							if(isSelected == false){
								  emptyOp.selected = true;
							}
							if(params.callback)
								params.callback(result);
						});

	 });

}


Utility.easyCombobox = function(id,params){     
	 
         var selectObj = this;
		 //$(this).empty(); //清空下拉框
		 //log(params.selectedValue);
		 $.getJSON(globalConfig.webPath + "/data/basicData.action", params, 
						function(result){		
			                if(result.success == false)
							{
								return;
							}
							result = result.data;
							result.insertAt(0,{code:'',name:'请选择'});
			                $('#'+id).combobox({valueField:'code',
									textField:'name',
								    data:result
							});
							if(params.callback)
								params.callback(result);
						});

	 
}


/**
 * 彻底删除数据库记录
 */
Utility.removeRecord = function(actionUrl){
    EntityId = $("#EntityId").val();
    if (EntityId == 0) 
        return;
    
    $.getJSON(globalConfig.webPath + actionUrl + "?EntityId=" + EntityId, function(result){
        if (result.Success) {
            //$("#list").trigger("reloadGrid");
            $.messager.alert('提示',"删除成功!");
            window.close();
        }
        else 
            $.messager.alert('提示',"无法删除! 错误原因：" + result.Message);
    });
    
};

Utility.initDatepicker = function(){
    //$(".datepicker").datepicker({ duration: 'fast' });  //对于日期输入框，进行日历对话框绑定
	
		//setter
	//$('.datepicker').datepicker('option', 'dayNamesMin', ['日', '一', '二', '三', '四', '五', '六']);

	$(".datepicker").click(function(){
         $(this).today();
	});

    $('.datepicker').attr("readonly", true);  //日期不能手动录入

	//alert("d");
};


Utility.getDate = function(dateObj){   
	 var o = { 		
		"year" : dateObj.getFullYear(),                 //月份 
		"month" : dateObj.getMonth()+1,                 //月份 
		"day" : dateObj.getDate(),                    //日 
		"hour" : dateObj.getHours(),                   //小时 
		"min" : dateObj.getMinutes(),                 //分 
		"sec" : dateObj.getSeconds(),                 //秒 
		"quarter" : Math.floor((dateObj.getMonth()+3)/3), //季度 
		"ms"  : dateObj.getMilliseconds()             //毫秒 
	  }; 

	  o.month = o.month < 10 ? ("0" + o.month) : o.month;
	  o.day = o.day < 10 ? ("0" + o.day) : o.day;
	  o.hour = o.hour < 10 ? ("0" + o.hour) : o.hour;
	  o.min = o.min < 10 ? ("0" + o.min) : o.min;	  
	  o.sec = o.sec < 10 ? ("0" + o.sec) : o.sec;

	  return o;
};

Utility.dateToString = function(_date, format){
	  //alert(format);

	  var dt = this.getDate(_date);

	  if(format == "dd hh:mm:ss")	  
	     return dt.day + " " + dt.hour + ":" + dt.min + ":" + dt.sec;
	  else if(format == "yyyy-MM-dd")
		 return dt.year + "-" + dt.month + "-" + dt.day;
	  else if(format == "hh:mm:ss")	  
	     return dt.hour + ":" + dt.min + ":" + dt.sec;
	  else if(format == "hh:mm")	  
	     return dt.hour + ":" + dt.min;
	  else if(format == "yyyy-MM-dd HH:mm")	  
	     return dt.year + "-" + dt.month + "-" + dt.day + " " + dt.hour + ":" + dt.min;
	  else
	     return dt.year + "-" + dt.month + "-" + dt.day + " " + dt.hour + ":" + dt.min  + ":" + dt.sec;
};

Utility.today = function(interval){
	  var dt = new Date();

	  if(interval){
         var ms = (interval*86400000);
		 dt.setMilliseconds(dt.getMilliseconds()+ms);
	  }
	  
	  dt = this.dateToString(dt, "yyyy-MM-dd");
	  return dt;
};

Utility.now = function(interval){
	  var dt = new Date();

	  if(interval){
         var ms = (interval*86400000);
		 dt.setMilliseconds(dt.getMilliseconds()+ms);
	  }
	  
	  dt = this.dateToString(dt);
	  return dt;
};


//得到两个日期相差的天数
Utility.getDay = function(startTime, endTime)
{
	var date1 = new Date(startTime.getFullYear(),startTime.getMonth(),startTime.getDate());
	   var date2 = new Date(startTime.getFullYear(),endTime.getMonth(),endTime.getDate());
	   var  iDays = parseInt(Math.abs(date2 - date1) / 1000 / 60 / 60 / 24) + 1; 

	return iDays;
}

Utility.addDay = function(date, day)
{
		   var ms = (day*86400000);
		   date.setMilliseconds(date.getMilliseconds()+ms);
		   return date;
}

Utility.stringToDate = function(str)
{
	return new Date(Date.parse(str.replace(/-/g, "/")));
}


Utility.AddMonth = function(interval)
{

	var dt = new Date();
	dt.setMonth(dt.getMonth()+interval)
	return dt.getYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate();
}




/**
 * 选择计量单位数据填充到下拉框中
 * @id 下拉框控件的id
 */
Utility.selectUnit = function(id, defaultValue){
	if(!id)
		id = "Unit";

    //var defaultSettings = {hiddenValue:'EntityId', isSendValue:true};
    $('#' + id).populateFromBasicData({
        category: 'Unit',
        hiddenValue:'Name'
    });

	if(defaultValue)
	$('#' + id).setDefault(defaultValue);


};



Utility.plsWait = function(){   
    $.blockUI({ message: "正在提交数据.....", css: { width: '275px', border:'1px solid #6600FF' } }); 
}

Utility.done = function(){
    $.unblockUI(); 
}

/*
src 需保留的值
pos 小数点后保留的位数
*/
Utility.getFormat = function(src, pos)
{
    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
}

Utility.getFormat = function(src, pos)
{
    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
}


//打印软件,导出Excel
Utility.doPrintForm = function(formId, url){
        var formObj = document.getElementById(formId);
		var formAction = formObj.action ;
		formObj.action = '../Reports.mvc/' + url;
		formObj.target = "_blank";
		formObj.submit();
		formObj.target = "";
		formObj.action = formAction;
}

Utility.doSQL = function(formId,url){
        var formObj = document.getElementById(formId);
		var formAction = formObj.action ;
		formObj.action = '../Reports.mvc/' + url;
		formObj.target = "_blank";
		formObj.submit();
		formObj.target = "";
		formObj.action = formAction;
}

//打印和导出异常
Utility.doAbnormal = function(formId, url){
        var formObj = document.getElementById(formId);
		var formAction = formObj.action ;
		formObj.action = '../Abnormal.mvc/' + url;
		formObj.target = "_blank";
		formObj.submit();
		formObj.target = "";
		formObj.action = formAction;
}

/**
 * 将基础数据加载到客户端的内存当中,用于数据转换使用
 */

function BasicData(){
	this.dataMapper = {};
	this.codeMapper = {};

	this.userMapper = {};

};


BasicData.prototype.loadAllData = function(){
	var dataMapper = this.dataMapper;
	var codeMapper = this.codeMapper;
	var userMapper = this.userMapper;

	var jsonString1 = $.ajax({
	  url: "../Lookup.mvc/LoadAll",
	  async: false
	 }).responseText;

	  var result = eval("("+jsonString1+")");

		  jQuery.each(result, function(){
                    
          dataMapper[this.EntityId] = this;
		        
          codeMapper[this.Code] = this;
	 });

    var jsonString1 = $.ajax({
	  url: "../Lookup.mvc/Find?queryID=selectUser",
	  async: false
	 }).responseText;

	  var result = eval("("+jsonString1+")");

		  jQuery.each(result, function(){
                    
          userMapper[this.UserId] = this;
		        
	 });
};

//将ID转换成名称
BasicData.prototype.idToName = function(id){
    var data = this.dataMapper[id];
	
	//debugger;

	if(data != null)
		return data.Name;

	return ""; 
};

//将ID转换成名称
BasicData.prototype.userIdToName = function(id){
    var data = this.userMapper[id];	
	//debugger;
	if(data != null)
		return data.Name;

	return ""; 
};


//将状态码转换成名称
BasicData.prototype.stateToName = function(status){
    var data = this.codeMapper[status];
	
	//debugger;

	if(data != null)
		return data.Name;

	return ""; 
};