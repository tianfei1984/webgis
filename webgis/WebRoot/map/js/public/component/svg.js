function svg(){
	this.twConstants = {
		DIALECT_SVG:"svg",
		DIALECT_VML:"vml",
		NS_SVG:"http://www.w3.org/2000/svg",
		NS_XLINK:"http://www.w3.org/1999/xlink"
	}
	
	this.emptySVGSrc = "./twaver/emptySVG.svg";
	
}

svg.prototype = {
	getSVGDocument : function(svg){
	    var result=null;
	    if(isIEBrowser()){
	        if(svg.tagName.toLowerCase()=="embed"){
	            try{
	                result=svg.getSVGDocument();
	            }catch(e){
	                alert(e+" may be svg embed not init");
	            }
	        }
	    }else{
	        result=svg.ownerDocument;
	    }
	    return result;
	},
	
	getSVGRoot : function(svg,doc){
	    if(svg.tagName.toLowerCase() == "embed"){
	        if(doc){
	            return doc.documentElement;
	        }else{
	            return this.getSVGDocument(svg).documentElement;
	        }
	    }else if(svg.tagName.toLowerCase() == "svg"){
	        return svg;
	    }return null;
	},
	
	createSVG : function(id,parent){
	    var svg;
	    if(isIEBrowser()){
	        svg=document.createElement("embed");
	        svg.setAttribute("id",id);
	        svg.setAttribute("type","image/svg+xml");
	        svg.setAttribute("src",this.emptySVGSrc);
	    }else {
	        svg=document.createElementNS(this.twConstants.NS_SVG,"svg");
	    }
	    svg.setAttribute("width","100%");
	    svg.setAttribute("height","100%");
	    parent.appendChild(svg);
	    return svg;
	},
	
	getSvg : function(id, parent, callback){
		var svg = this.createSVG(id,parent);
		var svgdoc = this.getSVGDocument(svg);
	    var svgRoot = this.getSVGRoot(svg);
	    callback(svgdoc, svgRoot);
	}
		
}

/**
//空SVG文件路径

//在Html中创建一个SVG节点，指定id，父亲节点，对于IE创建，其他浏览器创建<SVG />

//得到SVG根结点

//扩展setTimeout方法，实现延时执行
function doLater(callback,timeout,param)
{
    var args = Array.prototype.slice.call(arguments,2);
    var _cb = function()
    {
        callback.apply(null,args);
    }
    setTimeout(_cb,timeout);
}

//______测试代码_______
var svg;
var addRect=function(svg){
    var svgdoc=getSVGDocument(svg);
    var svgRoot=getSVGRoot(svg);
    var rect=svgdoc.createElementNS(this.twConstants.NS_SVG,"path");

	rect.setAttribute("d",d);
	rect.setAttribute("fill-opacity","0.5");
	rect.setAttribute("stroke-opacity","0.5");
	rect.setAttribute("stroke-dasharray","none");
	rect.setAttribute("stroke-linejoin","round");
	rect.setAttribute("stroke-linecap","0.5");
	rect.setAttribute("stroke-width","2");
	rect.setAttribute("fill","yellow");
	rect.setAttribute("stroke","blue");

    // rect.setAttribute("id","rect2");
    // rect.setAttribute("x",10);
    // rect.setAttribute("y",10);
    // rect.setAttribute("width",200);
    // rect.setAttribute("height",200);
    // rect.setAttribute("fill","red");
    svgRoot.appendChild(rect);

}
function call(){
    var body=document.getElementsByTagName("body")[0];
    svg=createSVG("svgid",body);
    /**
    //如果创建SVG对象后马上添加SVGElement，对于IE需要延时执行
    if(isIE){
        doLater(function(svg){
            addRect(svg);
        },100,svg);
    }else{
        addRect(svg);
    }
    
}
function showmsg()
{
    //这里不需要延时执行，因为这里是在按钮点击事件中，SVG已经初始化
    addRect(svg);
}**/