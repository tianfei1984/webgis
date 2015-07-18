
/*
 * Mapbar Maplet Engine (C)2005 Mapbar Inc
 * Date: 2008-7-17
 * Time: 16:14:51
 */
 strMapIMGsvrUrl = "";
if (typeof strImgsvrUrl == "undefined") {
	strImgsvrUrl = "http://img.mapbar.com/maplite/";
}
if (typeof strMapsvrUrl == "undefined") {
	strMapsvrUrl = "http://api.mapbar.com/api/";
}
if (navigator.appVersion.match(/\bMSIE\b/)) {
	document.write("<html xmlns:v='urn chemas-microsoft-com:vml'>");
	document.write("<link rel=\"stylesheet\" href=\"" + strMapsvrUrl + "css/mapbar30.css\" type=\"text/css\" media=\"screen\">");
} else {
	document.write("<link rel=\"stylesheet\" href=\"" + strMapsvrUrl + "css/mapbar30ff.css\" type=\"text/css\" media=\"screen\">");
}
var transparencyLevel = 60;

// for bubble footer
var DirectionInfo = "";
var strLicenseKey = "8890";
var strRemoteIP = "www.mapbar.com";

//var bubbleX = 0; //-38;
//var bubbleY = 0;
if (typeof iToolTipStyle == "undefined") {
	var iToolTipStyle = 1; // 1 - for bubble, 0 - for conventional
}


// conventional tooltip style definition here
//var topColor = "#8080FF";
//var subColor = "#CCCCFF";
//var topColor = "#FFAA60";
//var subColor = "#FFFFCC";
var mapwidth = 600;
var mapheight = 400;
//var xoffset = 0;
//var yoffset = 30;
var MapBackgroundColor = "#EBEAE8";
var arrayCity = new Array();
arrayCity["\u5168\u56fd"] = "GGFVJRWUUEARAF";
arrayCity["\u5317\u4eac\u5e02"] = "HEUIDVWVVHUEEU";
arrayCity["\u5929\u6d25\u5e02"] = "HHDVGAWVVJDBGD";
arrayCity["\u5858\u6cbd"] = "HICCRIXVWBRBGC";
arrayCity["\u5927\u6e2f\u533a"] = "HIAVWDXVVHCUFA";
arrayCity["\u4e0a\u6d77\u5e02"] = "IJUAFCXVIWCHCU";
arrayCity["\u91cd\u5e86\u5e02"] = "HFRASSXTWJRFBR";
arrayCity["\u5e7f\u4e1c\u7701"] = "IJRCEHVUABJGJR";
arrayCity["\u5e7f\u5dde\u5e02"] = "IJRCEHVUABJGJR";
arrayCity["\u6e05\u8fdc\u5e02"] = "IIGFGJVUARHGUG";
arrayCity["\u4f5b\u5c71\u5e02"] = "IJJCRUXTWSGVBJ";
arrayCity["\u6df1\u5733\u5e02"] = "ISUGRJVUAIIDFU";
arrayCity["\u6e5b\u6c5f\u5e02"] = "IIEBEDVTITUFUE";
arrayCity["\u8087\u5e86\u5e02"] = "IIIIHHWTVUETJI";
arrayCity["\u4e2d\u5c71\u5e02"] = "IRTCBCXTWFUSGT";
arrayCity["\u4e1c\u839e\u5e02"] = "IRIJBUVUASTDUI";
arrayCity["\u97f6\u5173\u5e02"] = "IHJVJIWUDDDSTJ";
arrayCity["\u6c55\u5934\u5e02"] = "IVIHBWXUFSBTWI";
arrayCity["\u987a\u5fb7\u5e02"] = "IRCGSHXTWRHISC";
arrayCity["\u73e0\u6d77\u5e02"] = "ISHEIFXTWDEUFH";
arrayCity["\u63ed\u9633\u5e02"] = "IUSVUWXUFHRSUS";
arrayCity["\u4ece\u5316\u5e02"] = "IJIIIDVUBEBAJI";
arrayCity["\u6f6e\u5dde\u5e02"] = "IUWTBHXUGBCDUW";
arrayCity["\u60e0\u5dde\u5e02"] = "ISHTBAVUBTSBEH";
arrayCity["\u6c5f\u95e8\u5e02"] = "IREBCSXTWBEAWE";
arrayCity["\u8302\u540d\u5e02"] = "IIEEBSXTRDWRDE";
arrayCity["\u6885\u5dde\u5e02"] = "ITDHSFVUGDGISD";
arrayCity["\u6cb3\u6e90\u5e02"] = "IRVJACXUDDIWRV";
arrayCity["\u6c55\u5c3e\u5e02"] = "IUGGGAXUCTDWCG";
arrayCity["\u9633\u6c5f\u5e02"] = "IJJVUVWTTDFTVJ";
arrayCity["\u4e91\u6d6e\u5e02"] = "IIBSIBWTUVVGBB";
arrayCity["\u6c88\u9633\u5e02"] = "HTSCARXWTBGETS";
arrayCity["\u961c\u65b0\u5e02"] = "HJRHTCXWJSHWVR";
arrayCity["\u76d8\u9526\u5e02"] = "HSFTUDXWJBBHUF";
arrayCity["\u629a\u987a\u5e02"] = "HUCSRCXWTSTTTC";
arrayCity["\u8425\u53e3\u5e02"] = "HTJFIWXWIIVJHJ";
arrayCity["\u5927\u8fde\u5e02"] = "HVESCTXWEVHRRE";
arrayCity["\u846b\u82a6\u5c9b\u5e02"] = "HRFWSJXWGITHJF";
arrayCity["\u978d\u5c71\u5e02"] = "HUASWDXWRHBRUA";
arrayCity["\u4e39\u4e1c\u5e02"] = "IARWBGXWRWGTRR";
arrayCity["\u5357\u4eac\u5e02"] = "IEHIJFWVGDBVSH";
arrayCity["\u5f90\u5dde\u5e02"] = "HVRIUEWVHBRHCR";
arrayCity["\u8fde\u4e91\u6e2f\u5e02"] = "IBCJDAWVRJVHEC";
arrayCity["\u6dee\u9634\u5e02"] = "ICHUDGWVIURHGH";
arrayCity["\u76d0\u57ce\u5e02"] = "IEIBCFXVRDWJBI";
arrayCity["\u626c\u5dde\u5e02"] = "IEWESGXVHRSJGW";
arrayCity["\u6cf0\u5dde\u5e02"] = "IFIFEVWVIIUDVI";
arrayCity["\u9547\u6c5f\u5e02"] = "IFDWSVXVHGGAID";
arrayCity["\u5357\u901a\u5e02"] = "IHSDGJWVJEAFHS";
arrayCity["\u5e38\u5dde\u5e02"] = "IGRSWHXVHIHHBR";
arrayCity["\u65e0\u9521\u5e02"] = "IHIEEWXVHSTJBI";
arrayCity["\u82cf\u5dde\u5e02"] = "IIFVFGWVHTJBEF";
arrayCity["\u6dee\u5b89\u5e02"] = "ICHVTTWVIVFJAH";
arrayCity["\u5bbf\u8fc1\u5e02"] = "IAUEAGWVIFASVU";
arrayCity["\u6c5f\u9634\u5e02"] = "IGWERFXVIDIHWW";
arrayCity["\u5b9c\u5174\u5e02"] = "Data Out Of Range";
arrayCity["\u6b66\u6c49\u5e02"] = "HWUGBAXUUAIWIU";
arrayCity["\u8346\u95e8\u5e02"] = "HSWWASXURJETSW";
arrayCity["\u8346\u5dde\u5e02"] = "HUBWHHXUJIHSUB";
arrayCity["\u5341\u5830\u5e02"] = "HHFTBSXURTGGWF";
arrayCity["\u968f\u5dde\u5e02"] = "HTSFJSXUUGCVWS";
arrayCity["\u8944\u6a0a\u5e02"] = "HRFEDWXUTBDJSF";
arrayCity["\u5b9c\u660c\u5e02"] = "HSCBIAVUISGJIC";
arrayCity["\u5b5d\u611f\u5e02"] = "HVSVTSWUUAHRHS";
arrayCity["\u6210\u90fd\u5e02"] = "HACUWTXTUJEGAC";
arrayCity["\u6cf8\u5dde\u5e02"] = "HEWASJXTTWJSSW";
arrayCity["\u8fbe\u5dde\u5e02"] = "HEICTRXUDJWFEI";
arrayCity["\u5e7f\u5b89\u5e02"] = "HEFTDCVUBDGJRF";
arrayCity["\u5e7f\u5143\u5e02"] = "HABUIBXUCWGSSB";
arrayCity["\u4e50\u5c71\u5e02"] = "HBFGTIXTSGWFCF";
arrayCity["\u5185\u6c5f\u5e02"] = "HDEJBBXTUGWRSE";
arrayCity["\u6500\u679d\u82b1\u5e02"] = "HCRHCWXTDSASTR";
arrayCity["\u9042\u5b81\u5e02"] = "HCJJUFXTWRIGCJ";
arrayCity["\u5b9c\u5bbe\u5e02"] = "HDTRTSXTSIWBVT";
arrayCity["\u81ea\u8d21\u5e02"] = "HDCDSUVTTRIJAC";
arrayCity["\u897f\u5b89\u5e02"] = "HBWSJFXURIEREW";
arrayCity["\u54b8\u9633\u5e02"] = "HBIIBFWUREFVCI";
arrayCity["\u77f3\u5bb6\u5e84\u5e02"] = "HESUBVWVITTHSS";
arrayCity["\u5510\u5c71\u5e02"] = "HHWAWWXWATUCTW";
arrayCity["\u79e6\u7687\u5c9b\u5e02"] = "HJJVGFXWDGIEGJ";
arrayCity["\u627f\u5fb7\u5e02"] = "HFHJHWXWCHACRH";
arrayCity["\u5eca\u574a\u5e02"] = "HFTVWAXVVFSCHT";
arrayCity["\u5f20\u5bb6\u53e3\u5e02"] = "HBBTDBWVUISAGB";
arrayCity["\u4fdd\u5b9a\u5e02"] = "HEWGEJXVSICHVW";
arrayCity["\u90a2\u53f0\u5e02"] = "HGDDSHWVHDJBVD";
arrayCity["\u90af\u90f8\u5e02"] = "HGVCGVWVGIBRDV";
arrayCity["\u6ca7\u5dde\u5e02"] = "HHVAAFWVTTRDTV";
arrayCity["\u592a\u539f\u5e02"] = "HCAFICWVFITUBA";
arrayCity["\u957f\u6cbb\u5e02"] = "HFGISAWVDTTJHG";
arrayCity["\u5927\u540c\u5e02"] = "GWSVEUXVRAJVRS";
arrayCity["\u664b\u57ce\u5e02"] = "HGBDAUWVCFJIAB";
arrayCity["\u664b\u4e2d\u5e02"] = "HCIWDTXVFIGDHI";
arrayCity["\u4e34\u6c7e\u5e02"] = "HDCJHGWVBDIBBC";
arrayCity["\u5415\u6881\u5730\u533a"] = "HAGDSSXVCUGWAG";
arrayCity["\u6714\u5dde\u5e02"] = "GWJHIEXVHJBJFJ";
arrayCity["\u5ffb\u5dde\u5e02"] = "HBHFJSWVGJVDTH";
arrayCity["\u9633\u6cc9\u5e02"] = "HDIVBIXVHAUWWI";
arrayCity["\u8fd0\u57ce\u5e02"] = "HDWEIIXUVUARJW";
arrayCity["\u90d1\u5dde\u5e02"] = "HIGSCCWVCHAHFG";
arrayCity["\u6d1b\u9633\u5e02"] = "HGRDWVXVAFWVUR";
arrayCity["\u5e73\u9876\u5c71\u5e02"] = "HJHARHWVAFTSRH";
arrayCity["\u8bb8\u660c\u5e02"] = "HJTUEIWVBJITUT";
arrayCity["\u5357\u9633\u5e02"] = "HJGEVGXUVAWHWG";
arrayCity["\u9a7b\u9a6c\u5e97\u5e02"] = "HSSISAWVAEVVBS";
arrayCity["\u5468\u53e3\u5e02"] = "HSRTHWXVCDTSRR";
arrayCity["\u5546\u4e18\u5e02"] = "HSWBAEXVEWSCSW";
arrayCity["\u5f00\u5c01\u5e02"] = "HJGVEGXVDIWGWG";
arrayCity["\u65b0\u4e61\u5e02"] = "HHWEWDXVDJSICW";
arrayCity["\u4e09\u95e8\u5ce1\u5e02"] = "HERHERWUVSTUFR";
arrayCity["\u6fee\u9633\u5e02"] = "HJADAVWVGATIHA";
arrayCity["\u4fe1\u9633\u5e02"] = "HUBFDBXUWBFVVB";
arrayCity["\u9e64\u58c1\u5e02"] = "HHGUUJWVFADAEG";
arrayCity["\u5b89\u9633\u5e02"] = "HHHDVVXVFIVEWH";
arrayCity["\u7126\u4f5c\u5e02"] = "HHBCJJXVCIHWIB";
arrayCity["\u6f2f\u6cb3\u5e02"] = "HRUCUFWVBDVRAU";
arrayCity["\u957f\u6625\u5e02"] = "HTESJCVBACCRUUE";
arrayCity["\u5409\u6797\u5e02"] = "HVCVBJWBAEBVVRC";
arrayCity["\u54c8\u5c14\u6ee8\u5e02"] = "HSHWUDXBAHARIGH";
arrayCity["\u9f50\u9f50\u54c8\u5c14\u5e02"] = "HEWGJRXBAFGFFHW";
arrayCity["\u5927\u5e86\u5e02"] = "HHSSFDVBAFUUUGS";
arrayCity["\u4e94\u5927\u8fde\u6c60\u5e02"] = "HGERCVWBARSCISE";
arrayCity["\u7261\u4e39\u6c5f\u5e02"] = "IBTVJCXBAJTWCBT";
arrayCity["\u547c\u548c\u6d69\u7279\u5e02"] = "GTCIEDWVIRJSIC";
arrayCity["\u9521\u6797\u90ed\u52d2"] = "GVBWHFXWECWVCB";
arrayCity["\u6d4e\u5357\u5e02"] = "HRRRBTWVRIHDUR";
arrayCity["\u804a\u57ce\u5e02"] = "HJFDFSWVIJVDIF";
arrayCity["\u70df\u53f0\u5e02"] = "HWWUHDXWCHRJCW";
arrayCity["\u5a01\u6d77\u5e02"] = "IBCGUJXWDIRTIC";
arrayCity["\u9752\u5c9b\u5e02"] = "IARACCWVVUDCUR";
arrayCity["\u6cf0\u5b89\u5e02"] = "HSIVBAXVJWASDI";
arrayCity["\u83b1\u829c\u5e02"] = "HTFICSXVRTHWCF";
arrayCity["\u6d4e\u5b81\u5e02"] = "HSVHFHWVHVRAGV";
arrayCity["\u83cf\u6cfd\u5e02"] = "HRHRJJXVFWWUGH";
arrayCity["\u4e34\u6c82\u5e02"] = "HWCAADXVRBECVC";
arrayCity["\u5fb7\u5dde\u5e02"] = "HIEVBTWVRSSVFE";
arrayCity["\u6dc4\u535a\u5e02"] = "HTAVDJWVTEHVCA";
arrayCity["\u6f4d\u574a\u5e02"] = "HUTJUUWVUSVICT";
arrayCity["\u65e5\u7167\u5e02"] = "IAFTHRWVTFJJSF";
arrayCity["\u4e1c\u8425\u5e02"] = "HSUERIWVVBGCUU";
arrayCity["\u6ee8\u5dde\u5e02"] = "HSAWCDXVUBRBVA";
arrayCity["\u67a3\u5e84\u5e02"] = "HVDUUEWVIIUTHD";
arrayCity["\u5408\u80a5\u5e02"] = "ICGAACWVDIGSDG";
arrayCity["\u829c\u6e56\u5e02"] = "IEUISRWVEGSBFU";
arrayCity["\u9ec4\u5c71\u5e02"] = "IHDTICWVBUURUD";
arrayCity["\u5b89\u5e86\u5e02"] = "IEBDSUWVBDBHEB";
arrayCity["\u868c\u57e0\u5e02"] = "IAUUAAWVFFCHBU";
arrayCity["\u4eb3\u5dde\u5e02"] = "HUAIWVXVEFIFUA";
arrayCity["\u5de2\u6e56\u5e02"] = "IDRTRDWVEBHRVR";
arrayCity["\u6c60\u5dde\u5e02"] = "IEIGTWXVCAUICI";
arrayCity["\u6ec1\u5dde\u5e02"] = "IDEJCAWVFUDAJE";
arrayCity["\u961c\u9633\u5e02"] = "HVJGCUXVCWCGGJ";
arrayCity["\u6dee\u5317\u5e02"] = "HVHEGJXVFWWCIH";
arrayCity["\u516d\u5b89\u5e02"] = "IBFVUSXVCDSWTF";
arrayCity["\u9a6c\u978d\u5c71\u5e02"] = "IEHRWSXVFDABTH";
arrayCity["\u5bbf\u5dde\u5e02"] = "HWDSDFXVFUGHAD";
arrayCity["\u94dc\u9675\u5e02"] = "IEJTFVWVCVFJFJ";
arrayCity["\u5ba3\u57ce\u5e02"] = "IGAAECWVEHBGDA";
arrayCity["\u6dee\u5357\u5e02"] = "IASFHWXVEDVTES";
arrayCity["\u676d\u5dde\u5e02"] = "IJDAJAWVFJGCBD";
arrayCity["\u7ecd\u5174\u5e02"] = "IREBUTXVFTERWE";
arrayCity["\u5b81\u6ce2\u5e02"] = "ISWIFCXVHBBASW";
arrayCity["\u6e56\u5dde\u5e02"] = "IIDGEDWVGFJRID";
arrayCity["\u5609\u5174\u5e02"] = "IJFTGAWVHDDBJF";
arrayCity["\u91d1\u534e\u5e02"] = "IRDGFTXVCWSAHD";
arrayCity["\u4e3d\u6c34\u5e02"] = "ISRHIDWVCGJFIR";
arrayCity["\u6e29\u5dde\u5e02"] = "IUGWBGXVCUHFDG";
arrayCity["\u4e50\u6e05\u5e02"] = "IUSDHJWVDHSSVS";
arrayCity["\u53f0\u5dde\u5e02"] = "IUJGDSWVFAFUEJ";
arrayCity["\u8862\u5dde\u5e02"] = "IJEDARWVBJCGDE";
arrayCity["\u798f\u5dde\u5e02"] = "IVGDHIXUUTREWG";
arrayCity["\u8386\u7530\u5e02"] = "IVUGHUWUTGHGGU";
arrayCity["\u5357\u5e73\u5e02"] = "ISRAGEWUTVCRBR";
arrayCity["\u53a6\u95e8\u5e02"] = "IVVSDUWUJJTJRV";
arrayCity["\u6cc9\u5dde\u5e02"] = "IVWVHJXURWGTTW";
arrayCity["\u6f33\u5dde\u5e02"] = "IVCTCHWUIVUGCC";
arrayCity["\u4e09\u660e\u5e02"] = "ISHCWSXUSIFFTH";
arrayCity["\u9f99\u5ca9\u5e02"] = "ITFFFUWUIUVGCF";
arrayCity["\u957f\u6c99\u5e02"] = "IBGRTCVUHGRSFG";
arrayCity["\u5f20\u5bb6\u754c\u5e02"] = "HTDSDJVUFATFGT";
arrayCity["\u5cb3\u9633\u5e02"] = "HWURCEXUJHAEHU";
arrayCity["\u682a\u6d32\u5e02"] = "ICDADVXUHCBWHD";
arrayCity["\u90f4\u5dde\u5e02"] = "IFCBUEVUDUGGUC";
arrayCity["\u5e38\u5fb7\u5e02"] = "HVDAVWXUGSCRID";
arrayCity["\u8861\u9633\u5e02"] = "ICUVVBXUEUWGEU";
arrayCity["\u90b5\u9633\u5e02"] = "IAJDWAXUDRJDWJ";
arrayCity["\u6e58\u6f6d\u5e02"] = "IBUTBWXUGTIBIU";
arrayCity["\u76ca\u9633\u5e02"] = "HWVBGTXUHAUABV";
arrayCity["\u6e58\u897f"] = "HTESRDVUCRFHCE";
arrayCity["\u5357\u5b81\u5e02"] = "ICIFVTWTIBCAUI";
arrayCity["\u6842\u6797\u5e02"] = "IBTCGEWTVUSVHT";
arrayCity["\u767d\u8272\u5e02"] = "HVEHATXTHCIWJE";
arrayCity["\u5357\u660c\u5e02"] = "IFCEUTVUTJJDUC";
arrayCity["\u8d35\u9633\u5e02"] = "HRFBHUVTSGBFIF";
arrayCity["\u6606\u660e\u5e02"] = "HGIVRBXTCWBDGI";
arrayCity["\u7389\u6eaa\u5e02"] = "HHFUSFXTBJWHGF";
arrayCity["\u695a\u96c4\u5e02"] = "HEGDTDUTBSTCCG";
arrayCity["\u5fb7\u5b8f"] = "HAECBGXSSEAWDE";
arrayCity["\u8fea\u5e86"] = "GTWSURXTCJAJSW";
arrayCity["\u4e2a\u65e7\u5e02"] = "HJECWRXTBDUCFE";
arrayCity["\u4e34\u6ca7\u5e02"] = "HDFFEHUSTSDDIF";
arrayCity["\u6012\u6c5f\u5e02"] = "GUTHDTWTAATVUT";
arrayCity["\u66f2\u9756\u5e02"] = "HHGUGEVTFUBJHG";
arrayCity["\u601d\u8305\u5e02"] = "HGAEUCVSUHFHUA";
arrayCity["\u62c9\u8428\u5e02"] = "FUUVCJWSIEVARU";
arrayCity["\u6d77\u53e3\u5e02"] = "IJTRTWXTGUUSRT";
arrayCity["\u4e09\u4e9a\u5e02"] = "ISECARWTCVVADE";
arrayCity["\u743c\u6d77\u5e02"] = "ISDJDGWTFVIASD";
arrayCity["\u5170\u5dde\u5e02"] = "GHFHGUWUFFUUVF";
arrayCity["\u94f6\u5ddd\u5e02"] = "GHIEETXUTURWFI";
arrayCity["\u897f\u5b81\u5e02"] = "GDIATWXUDCTBAI";
arrayCity["\u4e4c\u9c81\u6728\u9f50\u5e02"] = "ECTRRTUTIIAJHT";
arrayCity["\u9999\u6e2f"] = "ITDUDHWUADIVID";
arrayCity["\u6fb3\u95e8"] = "ISGWHUXTWBWWTG";
arrayCity["\u53f0\u6e7e"] = "JESFTTXUTRWJWS";
arrayCity["\u9e64\u5c97\u5e02"] = "HVREATXBAVVGWHR";
arrayCity["\u5305\u5934\u5e02"] = "GJJSCSZVFRAIAJ";
arrayCity["\u8861\u6c34\u5e02"] = "HGWVHSZVRBHDVW";
arrayCity["\u6986\u6797\u5e02"] = "GUBBADZVBUWWAB";
arrayCity["\u901a\u8fbd\u5e02"] = "HIAJGGXWUBWRCA";
arrayCity["\u8d64\u5cf0\u5e02"] = "HFAGBIXWGAFHIA";
arrayCity["\u547c\u4f26\u8d1d\u5c14"] = "GSRDHWXBABUCHHR";
arrayCity["\u5174\u5b89\u76df"] = "HDWGITXBAAIVARW";
arrayCity["\u5b81\u5fb7\u5e02"] = "IUSTGRXUWBCGAS";
function getPid(a) {
	if (typeof arrayCity[a] == "undefined") {
		return a;
	}
	return arrayCity[a];
}
var topColor = "#FFFFFF";
var subColor = "#FFFFFF";
var xoffset = 0;
var yoffset = 0;
var sN = function () {
	this.clear = function () {
	};
	this.paint = function () {
	};
	this.lB = function () {
	};
	this.lE = function () {
	};
	this.setColor = function () {
	};
};
var q1 = function (name) {
	if (document.getElementById(name) != null) {
		return document.getElementById(name);
	}
	return null;
};
var q2 = function (name) {
	if (document.getElementById(name) != null) {
		return document.getElementById(name).style;
	}
	return null;
};
var qZ = function (name, left, top, width, height, z6, AA, content) {
	document.writeln("<div unselectable=\"on\" id=\"" + name + "\" style=\"position:absolute; overflow:none; left:" + left + "px; top:" + top + "px; width:" + width + "px; height:" + height + "px;" + " visibility:" + (z6 ? "visible;" : "hidden;") + "z-Index:" + AA + ";\">");
	document.writeln(content);
	document.writeln("</div>");
};
var gq = function (name, left, top, width, height, z6, AA, content) {
	var nN = document.createElement("div");
	nN.unselectable = "on";
	nN.id = name;
	nN.style.position = "absolute";
	nN.style.top = parseInt(top) + "px";
	nN.style.left = parseInt(left) + "px";
	nN.style.zIndex = AA;
	nN.style.width = parseInt(width) + "px";
	nN.style.height = parseInt(height) + "px";
	nN.style.visibility = (z6) ? "visible" : "hidden";
	nN.innerHTML = content;
	return nN;
};
var gt = function (w6, left, top, width, height) {
	var nN = new Image();
	nN.unselectable = "on";
	nN.style.position = "absolute";
	nN.style.top = parseInt(top) + "px";
	nN.style.left = parseInt(left) + "px";
	nN.style.width = parseInt(width) + "px";
	nN.style.height = parseInt(height) + "px";
	if (w6 != "undefined") {
		nN.src = w6;
	}
	nN.onerror = function () {
		this.onerror = null;
		if (this.parentNode) {
			this.parentNode.removeChild(this);
		}
	};
	return nN;
};
var gu = function (zC, color) {
	var nN = document.createElement("div");
	nN.style.position = "absolute";
	nN.unselectable = "on";
	var nQ = "<div unselectable=\"on\" id=\"mbglabel\" style=\"" + "border:1px solid " + color + ";" + "left:2px;top:2px;" + "background-color:" + color + ";" + "color:" + this.color + ";\">" + "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" bordercolor=\"" + color + "\">" + "<tr><td width=\"100%\">" + "<font class=\"ptlabel\" color=\"" + color + "\">" + zC + "</font>" + "</td></tr>" + "</table>" + "</div>";
	nQ += "<div unselectable=\"on\" id=\"mfglabel\" style=\"" + "border:1px solid " + color + ";" + "left:0px;top:0px;" + "background-color:#FFFFCC;" + "color:" + this.color + ";\">" + "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" bordercolor=#FFFFCC>" + "<tr><td width=\"100%\">" + "<font class=\"ptlabel\" color=\"" + color + "\" title=\"" + zC + "\">" + zC + "</font>" + "</td></tr>" + "</table>" + "</div>";
	nN.innerHTML = nQ;
	return nN;
};
var PerformControl = function (lM, uy, qu) {
	var maplet = uy.parentNode.q9;
	switch (qu) {
	  case 1:
		hideBubble(maplet);
		maplet.panTo(parseInt(maplet.width) / 2, 0);
		break;
	  case 2:
		hideBubble(maplet);
		maplet.panTo(0, parseInt(maplet.height) / 2);
		break;
	  case 3:
		hideBubble(maplet);
		maplet.panTo(-parseInt(maplet.width) / 2, 0);
		break;
	  case 4:
		hideBubble(maplet);
		maplet.panTo(0, -parseInt(maplet.height) / 2);
		break;
	  case 5:
		hideBubble(maplet);
		maplet.zoomIn();
		break;
	  case 6:
		hideBubble(maplet);
		maplet.zoomOut();
		break;
	  case 7:
		hideBubble(maplet);
		maplet.setMode(ts.tb);
		break;
	  case 8:
		hideBubble(maplet);
		var yoffset = parseInt(uy.style.top) - 96 + parseInt(maplet.ga.top);
		var y = parseInt((px) ? event.clientY : lM.clientY) - parseInt(maplet.offsetY) - parseInt(maplet.top);
		y -= yoffset;
		if (!px && maplet.vb.style.position != "absolute") {
		}
		AB = sY - Math.max(0, Math.min(sY, parseInt((parseInt(y) - 100) / (132 / (sY - 1)))));
		uy.parentNode.zI(AB);
		maplet.setZoomLevel(AB);
		break;
	  default:
		break;
	}
};
var y4 = null;
var showMouseTipBox = function (x, y, x8, f2) {
	try {
		if (y4 == null || y4 == "undefined") {
			var xu = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" bordercolor=#FF0000>" + "<tr><td width=\"100%\" bgcolor=#FFFFCC>" + "<font class=\"ptlabel\" color=\"#000000\" >" + x8 + "</font>" + "</td></tr>" + "</table>";
			y4 = gq("mousetipbox", parseInt(x) + 10, parseInt(y) + 18, 70, 20, 1, 100, xu);
			y4.unselectable = "on";
			y4.style.MozUserSelect = "none";
		} else {
			y4.style.left = (parseInt(x) + 10) + "px";
			y4.style.top = (parseInt(y) + 18) + "px";
			y4.visibility = "visible";
		}
		if (y4 != null && (y4.parentNode == null || y4.parentNode != f2)) {
			f2.appendChild(y4);
		}
	}
	catch (lM) {
	}
};
var nX = function () {
	if (y4 != null) {
		if (y4.parentNode != null) {
			y4.parentNode.removeChild(y4);
		}
		y4 = null;
	}
};
var nE = function (lM) {
	return (px) ? event.srcElement.id : lM.target.id;
};
var imageTileError = function (yF) {
	if (yF.width == 300 && yF.ntry == "0") {
		yF.ntry = "1";
		yF.src = yF.src + "?";
	} else {
		if (yF.width == 300 && yF.ntry == "1") {
			yF.ntry = "2";
			yF.src = yF.src + "?";
		} else {
			yF.ntry = "3";
			yF.onerror = null;
			yF.src = strImgsvrUrl + "images/mask.gif";
			yF.style.width = "300px";
			yF.style.height = "300px";
		}
	}
};
var imageTileOk = function (yF) {
	yF.onerror = null;
	yF.onload = null;
	yF.style.width = "300px";
	yF.style.height = "300px";
};
var fJ = function (uy, yH) {
	var cU = false;
	while (uy != null) {
		if ((typeof yH == "string" && uy.id == yH) || (uy == yH)) {
			cU = true;
			break;
		}
		uy = uy.parentNode;
	}
	return cU;
};
var pE = function (w6, left, top, width, height, f2) {
	this.pP = gt(w6, left, top, width, height);
	this.gd = 0;
	this.ge = 0;
	this.name = name;
	f2.appendChild(this.pP);
	this.hide = function () {
		this.pP.style.visibility = "hidden";
	};
	this.show = function () {
		this.pP.style.visibility = "visible";
	};
	this.moveTo = function (x, y) {
		this.pP.style.left = parseInt(x) + "px";
		this.pP.style.top = parseInt(y) + "px";
	};
	this.resize = function (Af, nN) {
		this.pP.style.width = parseInt(Af) + "px";
		this.pP.style.height = parseInt(nN) + "px";
	};
	this.getName = function () {
		return this.name;
	};
	this.aW = function (f2) {
		f2.appendChild(this.pP);
	};
};
var yq = function (nN, pS, zIndex) {
	if (pS != "undefined" && pS != "") {
		nN.src = pS;
	}
	nN.style.zIndex = zIndex;
};
var vB = function (uy, aB) {
	try {
		if (document.getElementById(aB) != null && uy != null) {
			document.getElementById(aB).innerHTML = vo(uy.responseText);
		}
	}
	catch (lM) {
	}
};
var vo = function (xM) {
	return xM;
};
var uP = function (lM, title, content) {
	var maplet = document["mapbar-maplet"];
	var x = ((px) ? event.clientX : lM.clientX) - maplet.offsetX - maplet.left;
	var y = ((px) ? event.clientY : lM.clientY) - maplet.offsetY - maplet.top;
	maplet.wN(x, y, title, content);
};
var lbp2 = function (id, zS) {
	if (typeof id == "string" && id != null && document.getElementById(id) != null && typeof zS == "string" && zS != null) {
		document.getElementById(id).innerHTML += zS;
	}
};
var y5 = null;
var waitHideTip = function () {
	if (y5) {
		clearTimeout(y5);
	}
	y5 = null;
	y5 = setTimeout("hideToolTipMenu()", 2000);
};
var lbp = function (id, x, y, Af, wO, y6, yU, x85A) {
	E35[id] = {x:x, y:y, Af:Af, wO:wO, y6:y6, yU:yU, x85A:x85A};
	gS9(id, x, y, Af, wO, y6, yU, x85A);
};
var gS9 = function (id, x, y, Af, wO, y6, yU, x85A) {
	if (typeof id == "string" && id != null && document.getElementById(id) != null && typeof wO == "string" && wO != null) {
		if (!x85A) {
			document.getElementById(id).innerHTML += "<div unselectable=\"on\" class=\"hotspotlabel\" onmouseout=\"javascript:waitHideTip();\" onmouseover=\"javascript:{var e = arguments[0];setToolTipMenu(e,e,'" + y6 + "','" + (yU) + "',e)};\" style=\"position:absolute;left:" + x + "px;top:" + y + "px;width:" + Af + "px;height:0px\">" + wO + "</div>";
		} else {
			document.getElementById(id).innerHTML += "<div unselectable=\"on\"  style=\"position:absolute;left:" + x + "px;top:" + y + "px;width:" + Af + "px;height:0px\">" + wO + "</div>";
		}
	}
};
var E35 = {};
var OtH4 = function (lM, uy, qu) {
	var maplet = uy.parentNode.q9;
	switch (qu) {
	  case 1:
		hideBubble(maplet);
		maplet.panTo(parseInt(maplet.width) / 2, 0);
		break;
	  case 2:
		hideBubble(maplet);
		maplet.panTo(0, parseInt(maplet.height) / 2);
		break;
	  case 3:
		hideBubble(maplet);
		maplet.panTo(-parseInt(maplet.width) / 2, 0);
		break;
	  case 4:
		hideBubble(maplet);
		maplet.panTo(0, -parseInt(maplet.height) / 2);
		break;
	  case 5:
		hideBubble(maplet);
		maplet.zoomIn();
		break;
	  case 6:
		hideBubble(maplet);
		maplet.zoomOut();
		break;
	  case 7:
		hideBubble(maplet);
		maplet.setMode(ts.tb);
		break;
	  case 8:
		hideBubble(maplet);
		var yoffset = parseInt(uy.style.top) - 96 + parseInt(maplet.ga.top);
		var y = parseInt((px) ? event.clientY : lM.clientY) - parseInt(maplet.offsetY) - parseInt(maplet.top);
		y -= yoffset;
		if (!px && maplet.vb.style.position != "absolute") {
		}
		AB = sY - Math.max(0, Math.min(sY, parseInt((parseInt(y) - 100) / (132 / (sY - 1)))));
		uy.parentNode.zI(AB);
		maplet.setZoomLevel(AB);
		break;
	  default:
		break;
	}
};
function CreateToolTip(qR, ya, xu) {
	var ContentInfo = "<table id=\"mytooltip_container\" border=\"0\" width=\"150\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\"100%\" bgcolor=\"#FF0000\"><table border=\"0\" width=\"150\" cellspacing=\"1\" cellpadding=\"0\">" + "<tr><td width=\"100%\" bgcolor=\"#FF0000\">" + "<table border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">" + "<tr><td width=\"100%\" bgcolor=" + topColor + ">" + "<table border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">" + "<tr><td id=\"mytooltiptitle\"width=\"100%\" class=\"tooltiptitle\">" + ya + "</td>" + "<td style=\"cursor:hand;cursor:pointer;\" valign=\"top\" align=\"right\">" + "<img src=\"" + strImgsvrUrl + "images/xclose.gif\" onclick=\"javascript:hideToolTipMenu();\">" + "</td>" + "</tr>" + "</table>" + "</td></tr>" + "<tr><td width=\"100%\" bgcolor=" + subColor + ">" + "<table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\">" + "<tr><td id=\"mytooltipcontent\" width=\"100%\" class=\"tooltipcontent\">" + xu + "</td></tr>" + "</table>" + "</td></tr>" + "</table>" + "</td></tr>" + "</table></td></tr></table>";
	document.getElementById(qR).innerHTML = ContentInfo;
	var yw = document.getElementById(qR).childNodes[0];
	document.getElementById(qR).style.width = yw.clientWidth;
	document.getElementById(qR).style.height = yw.clientHeight;
}
var setToolTipMenu = function (x, y, ya, xu, lM) {
	var maplet = document["mapbar-maplet"];
	if (maplet != null && maplet.width && maplet.height) {
		mapwidth = maplet.width;
		mapheight = maplet.height;
		if (typeof x == "undefined" || typeof lM == "object") {
			x = ((px) ? event.clientX : lM.clientX) - maplet.offsetX - maplet.left;
			y = ((px) ? event.clientY : lM.clientY) - maplet.offsetY - maplet.top;
		}
	}
	UpdateContent("ToolTip", ya, xu);
	var y8 = document.getElementById("ToolTip").clientWidth;
	var y1 = document.getElementById("ToolTip").clientHeight;
	if (x > mapwidth - y8) {
		x = x - y8;
	}
	if (y > mapheight - y1) {
		y = y - y1;
	}
	MoveToolTip("ToolTip", y + yoffset, x + xoffset);
	document.getElementById("ToolTip").style.visibility = "visible";
};
var hideToolTipMenu = function () {
	document.getElementById("ToolTip").style.visibility = "hidden";
	var maplet = document["mapbar-maplet"];
	if (maplet.getContextMenu() != null) {
		maplet.getContextMenu().hide();
	}
	MoveToolTip("ToolTip", 0, 0);
};
var MoveToolTip = function (qR, nr, nq) {
	if (px) {
		document.getElementById(qR).style.top = parseInt(eval(nr)) + "px";
	} else {
		document.getElementById(qR).style.top = parseInt(eval(nr)) + "px";
	}
	document.getElementById(qR).style.left = parseInt(eval(nq)) + "px";
};
var UpdateContent = function (qR, ya, xu) {
	if (qc == 0) {
		CreateToolTip(qR, ya, xu);
		qc = 1;
	} else {
		if (document.getElementById("mytooltiptitle")) {
			document.getElementById("mytooltiptitle").innerHTML = ya;
		}
		if (document.getElementById("mytooltipcontent")) {
			document.getElementById("mytooltipcontent").innerHTML = xu;
		}
		var K98a9 = document.getElementById("ToolTip");
		var C034 = document.getElementById("mytooltip_container");
		K98a9.style.width = C034.clientWidth + "px";
		K98a9.style.height = C034.clientHeight + "px";
	}
};
var ts = {tz:1, tA:2, ty:3, tv:5, tw:6, tx:7, tt:8, lz:9, ly:10, tb:11, np:12, l3:13, tM:14, tu:23, ta:15};
var showLoading = function () {
	sb++;
	if (document.getElementById("loading")) {
		document.getElementById("loading").style.display = "block";
		document.getElementById("loading").style.visibility = "visible";
	}
};
var hideLoading = function () {
	sb--;
	if (sb <= 0) {
		if (document.getElementById("loading")) {
			document.getElementById("loading").style.display = "none";
			document.getElementById("loading").style.visibility = "hidden";
			if (ad && new Date().getTime() - ac.getTime() > 9) {
				document.getElementById("sendmapload").src = "http://211.157.24.143:8001/log.jsp?type=map-mapbar&time=" + (new Date().getTime() - ac.getTime()) + "&" + Math.random();
				if (typeof ad == "undefined") {
					var ad = false;
				} else {
					ad = false;
				}
			}
		}
	}
};
var vZ = function (maplet) {
	if (document.getElementById("loading")) {
		document.getElementById("loading").style.left = ((maplet.width - parseInt(document.getElementById("loading").clientWidth)) / 2) + "px";
		document.getElementById("loading").style.top = ((maplet.height - parseInt(document.getElementById("loading").clientHeight)) / 2) + "px";
	}
};
var pc = new Array();
pc["icon1"] = strImgsvrUrl + "images/" + "number1.gif";
pc["icon2"] = strImgsvrUrl + "images/" + "number2.gif";
pc["icon3"] = strImgsvrUrl + "images/" + "number3.gif";
pc["icon4"] = strImgsvrUrl + "images/" + "number4.gif";
pc["icon5"] = strImgsvrUrl + "images/" + "number5.gif";
pc["icon6"] = strImgsvrUrl + "images/" + "number6.gif";
pc["icon7"] = strImgsvrUrl + "images/" + "number7.gif";
pc["icon8"] = strImgsvrUrl + "images/" + "number8.gif";
pc["icon9"] = strImgsvrUrl + "images/" + "number9.gif";
pc["icon10"] = strImgsvrUrl + "images/" + "number10.gif";
var pb = new Array();
pb["icon1"] = strImgsvrUrl + "images/" + "number1-2.gif";
pb["icon2"] = strImgsvrUrl + "images/" + "number2-2.gif";
pb["icon3"] = strImgsvrUrl + "images/" + "number3-2.gif";
pb["icon4"] = strImgsvrUrl + "images/" + "number4-2.gif";
pb["icon5"] = strImgsvrUrl + "images/" + "number5-2.gif";
pb["icon6"] = strImgsvrUrl + "images/" + "number6-2.gif";
pb["icon7"] = strImgsvrUrl + "images/" + "number7-2.gif";
pb["icon8"] = strImgsvrUrl + "images/" + "number8-2.gif";
pb["icon9"] = strImgsvrUrl + "images/" + "number9-2.gif";
pb["icon10"] = strImgsvrUrl + "images/" + "number10-2.gif";
function JqVX(uy) {
	if (typeof uy == "undefined") {
		return false;
	}
	return uy.constructor.toString().indexOf("Array") != -1;
}
function Wa43(lT) {
	var Thw = 0, _6B = 0;
	if (typeof lT == "string" && lT) {
		lT = document.getElementById(lT);
	}
	if (typeof lT == "object" && lT) {
		do {
			Thw += lT.offsetTop || 0;
			_6B += lT.offsetLeft || 0;
			if (lT.offsetParent == document.body) {
				if (lT.style.position == "absolute") {
					break;
				}
			}
			lT = lT.offsetParent;
		} while (lT);
	}
	return [_6B, Thw];
}
function j04l0(pt, e3QN) {
	for (var fw = false, i = -1, S7a = e3QN.length, qC = S7a - 1; ++i < S7a; qC = i) {
		if (((e3QN[i].y <= pt.y && pt.y < e3QN[qC].y) || (e3QN[qC].y <= pt.y && pt.y < e3QN[i].y)) && (pt.x < (e3QN[qC].x - e3QN[i].x) * (pt.y - e3QN[i].y) / (e3QN[qC].y - e3QN[i].y) + e3QN[i].x)) {
			fw = !fw;
		}
	}
	return fw;
}
function vTF(pt, S3Y2) {
	if (S3Y2.max.x > pt.x && S3Y2.min.x <= pt.x && S3Y2.max.y > pt.y && S3Y2.min.y <= pt.y) {
		return true;
	}
	return false;
}
var J5R1m = function (URL, Q82_d, aJJ23, cAn) {
	this.URL = URL;
	this.Q82_d = Q82_d;
	this.aJJ23 = aJJ23;
	this.cAn = cAn;
};
J5R1m.prototype.nN0 = function () {
	var IXg_ = document.getElementById("scriptTemp");
	if (IXg_) {
		IXg_.parentNode.removeChild(IXg_);
	}
	var s = document.createElement("script");
	s.language = "javascript";
	s.type = "text/javascript";
	s.id = (this.cAn && this.cAn == true) ? "Temp" + Math.random() : "scriptTemp";
	s.src = (this.aJJ23 && this.aJJ23 == true) ? this.URL + "?" + Math.random() : this.URL;
	var Tw8 = this.Q82_d ? (this.Q82_d) : parseInt;
	var J0EP = function () {
		if (navigator.appVersion.match(new RegExp("\\bMSIE\\b"))) {
			if (s.readyState == "loaded" || s.readyState == "complete") {
				Tw8();
			}
		} else {
			Tw8();
		}
	};
	if (s.attachEvent) {
		s.attachEvent("onreadystatechange", J0EP);
	} else {
		s.addEventListener("load", J0EP, false);
	}
	document.body.insertBefore(s, document.body.firstChild);
};
var sC = function (x, y, xu) {
	document.getElementById("myalert").style.top = (parseInt(y) - 60 + parseInt(document.body.scrollTop)) + "px";
	document.getElementById("myalert").style.left = (parseInt(x) - 100 + parseInt(document.body.scrollLeft)) + "px";
	var xs = (en == 1) ? "Close" : tX("%u5175%uE760");
	document.getElementById("myalert").innerHTML = "<table width=\"196px\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border:1px solid #CCCCCC;\"><tr><td height=\"19px\" bgcolor=\"#8888FF\"></td></tr><tr><td height=\"100px\" align=\"center\" valign=\"middle\" bgcolor=\"#FFFFFF\"><table width=\"167px\" height=\"79px\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td height=\"55px\" align=\"center\" valign=\"middle\" style=\"font-size: 12px;color: #0065AD;\">" + xu + "</td></tr><tr><td height=\"24px\" align=\"center\" valign=\"middle\"><input type=\"button\" value=\"" + xs + "\" onClick=\"document.getElementById('myalert').style.visibility = 'hidden'\"onMouseOver=\"style.background='#DEE7EF';style.cursor='hand';style.cursor='pointer'\"onMouseOut=\"this.style.background='FDFAF3'\" style=\"font-size: 9pt;  width: 38px; height:18px; border: 1px solid #4A799C;background-color: #FDFAF3\"></td></tr></table></td></tr></table>";
	document.getElementById("myalert").style.visibility = "visible";
};
var gP = function (xu) {
	if (gQ) {
		sC(100, 100, xu);
	}
};
var cq = {pu:{}, vp:function (li) {
	return this.pu[li] || function (pu, xT) {
		var v6;
		if (xT.indexOf(",") == -1) {
			var pk = -1;
			var fE = 0;
			var ub = "";
			var fH = "";
			if (xT != null && parseInt(xT.charAt(0), 36) >= 33) {
				fH = xT.charAt(0);
				xT = xT.substring(1);
			}
			for (var i = 0; i < (xT.length - (c75 ? 1 : 0)); i++) {
				var n8 = parseInt(xT.charAt(i), 36) - 10;
				if (n8 >= 17) {
					n8 = n8 - 7;
				}
				ub += (n8).toString(36);
				if (n8 > fE) {
					pk = i;
					fE = n8;
				}
			}
			var n9 = parseInt(ub.substring(0, pk), 16);
			var n0 = parseInt(ub.substring(pk + 1), 16);
			if ("X" == fH) {
				n9 = -n9;
			}
			if ("Y" == fH) {
				n0 = -n0;
			}
			v6 = new Array();
			v6[0] = (n9 + n0 - parseInt(strLicenseKey)) / 2;
			v6[1] = (n0 - v6[0]) / 100000;
			v6[0] /= 100000;
			if (v6[0] > 180) {
				v6[0] -= 360;
			}
			pu[xT] = v6;
			return v6;
		} else {
			v6 = XE5(xT);
			pu[xT] = v6;
			return v6;
		}
	}(this.pu, li);
}, zn:function (li, lf, hK666) {
	if (typeof hK666 != "boolean") {
		hK666 = false;
	}
	if (typeof li != "undefined" && typeof lf != "undefined") {
		this.lf = parseFloat(lf);
		this.li = parseFloat(li);
	}
	if (apiType == 1 && !hK666) {
		return cTq1(this.li + "," + this.lf).join(",");
	} else {
		var v6 = "";
		var uh = parseInt(parseFloat(Math.max(-90, Math.min(90, this.lf))) * 100000);
		var uj = parseInt(parseFloat((this.li < 0) ? (this.li + 360) : this.li) * 100000);
		var pl = uj - uh + parseInt(strLicenseKey);
		var pm = uj + uh;
		if (pl < 0) {
			v6 = "X";
			pl = -pl;
		}
		if (pm < 0) {
			v6 = "Y";
			pm = -pm;
		}
		var ph = (pl).toString(16);
		var pi = (pm).toString(16);
		for (var i = 0; i < ph.length; i++) {
			var qv = parseInt(ph.charAt(i), 16);
			v6 += (((qv >= 10) ? (qv + 7) : qv) + 10).toString(36);
		}
		v6 += "z";
		for (var qC = 0; qC < pi.length; qC++) {
			var om45 = parseInt(pi.charAt(qC), 16);
			v6 += (((om45 >= 10) ? (om45 + 7) : om45) + 10).toString(36);
		}
		if (c75) {
			v6 += v6.charAt(c75);
		}
		return v6.toUpperCase();
	}
}};
var xE = function (xj) {
	var fw = "";
	for (var i = 0; i < xj.length; i++) {
		var zh = xj.charCodeAt(i).toString(36).toUpperCase();
		if (zh.length <= 1) {
			zh = "0" + zh;
		}
		fw += zh;
	}
	return fw;
};
var sdc = function (xj) {
	var fw = "";
	for (var i = 0; i < xj.length; i += 2) {
		var zh = xj.substring(i, i + 2);
		fw += String.fromCharCode(parseInt(zh, 36));
	}
	return fw;
};
var tX = function (xj) {
	var zh = eval("unescape");
	xj = zh(xj);
	var fw = String.fromCharCode(xj.charCodeAt(0) - xj.length);
	for (var i = 1; i < xj.length; i++) {
		fw += String.fromCharCode(xj.charCodeAt(i) - fw.charCodeAt(i - 1));
	}
	return fw;
};
function cTq1(k$77) {
	var $1L0 = k$77.split(",");
	var x = parseFloat($1L0[0]) * 100000 % 36000000;
	var y = parseFloat($1L0[1]) * 100000 % 36000000;
	var A745 = parseInt(HIw8(x, y) + x);
	var Et061 = parseInt(Y8D2(x, y) + y);
	return [A745 / 100000, Et061 / 100000];
}
function XE5(k$77) {
	var $1L0 = k$77.split(",");
	var x = parseFloat($1L0[0]) * 100000 % 36000000;
	var y = parseFloat($1L0[1]) * 100000 % 36000000;
	var HB6 = parseInt(-ih$4(x, y) + x);
	var yAt = parseInt(-$Mbom(x, y) + y);
	HB6 = parseInt(-ih$4(HB6, yAt) + x + ((x > 0) ? 1 : -1));
	yAt = parseInt(-$Mbom(HB6, yAt) + y + ((y > 0) ? 1 : -1));
	return [HB6 / 100000, yAt / 100000];
}
function HIw8(x, y) {
	return ehw4x(x, y);
}
function Y8D2(x, y) {
	return s14(x, y);
}
function ih$4(x, y) {
	return ehw4x(x, y);
}
function $Mbom(x, y) {
	return s14(x, y);
}
function ehw4x(x, y) {
	return V2fW6(y0k(YoUC(y, x), bm97(x, y)), y0k(_r272(x, y), VVjWG(y, x)));
}
function s14(x, y) {
	return V2fW6(y0k(_r272(y, x), bm97(x, y)), y0k(YoUC(x, y), VVjWG(y, x)));
}
function y0k(x, y) {
	return x * y;
}
function V2fW6(x, y) {
	return x + y;
}
function YoUC(x, y) {
	return Math.cos(x / 100000);
}
function _r272(x, y) {
	return Math.sin(x / 100000);
}
function VVjWG(x, y) {
	return x / 9000;
}
function bm97(x, y) {
	return x / 18000;
}
var fD = function (name, left, top, width, height, z6, AA, content, f2) {
	this.n7 = content;
	this.f2 = f2;
	this.name = name;
	this.qe = 1;
	this.hide = function () {
		this.style.visibility = "hidden";
	};
	this.show = function () {
		this.style.visibility = "visible";
	};
	this.moveTo = function (x, y) {
		eval(document.body.scrollTop);
		this.style.left = parseInt(x) + "px";
		this.style.top = parseInt(y) + "px";
	};
	this.resize = function (Af, nN) {
		if (parseInt(Af) >= 0 && parseInt(nN) >= 0) {
			this.style.width = parseInt(Af) + "px";
			this.style.height = parseInt(nN) + "px";
		}
	};
	this.nz = function () {
		return parseInt(this.style.height);
	};
	this.nH = function () {
		return parseInt(this.style.width);
	};
	this.qn = function (x, y) {
		return (x > parseInt(this.style.left) && x < (parseInt(this.style.left) + parseInt(this.style.width)) && y > parseInt(this.style.top) && y < (parseInt(this.style.top) + parseInt(this.style.height)));
	};
	this.appendChild = function (fK) {
		try {
			this.ld.appendChild(fK);
		}
		catch (lM) {
		}
	};
	this.removeChild = function (fK) {
		try {
			this.ld.removeChild(fK);
		}
		catch (lM) {
		}
	};
	this.clear = function () {
		while (this.ld.hasChildNodes()) {
			this.ld.removeChild(this.ld.lastChild);
		}
	};
	this.clean = this.clear;
	this.getName = function () {
		return this.name;
	};
	try {
		this.ld = gq(this.name, left, top, width, height, z6, AA, content);
		this.ld.unselectable = "on";
		if (this.f2) {
			this.f2.appendChild(this.ld);
		}
		this.style = this.ld.style;
		this.graphics = (px) ? new sN() : new jsGraphics(this.name);
	}
	catch (lM) {
	}
};
var MBound = function (tj, tl, s4, s6, tp, s0) {
	this.s4 = s4;
	this.tj = tj;
	this.s6 = s6;
	this.tl = tl;
	this.s0 = (typeof s0 == "undefined") ? sY : parseInt(s0);
	this.tp = (typeof tp == "undefined") ? te : parseInt(tp);
	this.qn = function (lat, lon) {
		if (this.s4 < lat || this.tj > lat) {
			return false;
		}
		var g2 = (lon - this.tl) % 360;
		if (g2 < 0) {
			g2 += 360;
		}
		return ((this.s6 - this.tl) >= g2);
	};
};
var MBrush = function (xt, x5, x6, cr, xn, yc, xo, fh) {
	this.color = (typeof xt == "undefined") ? "#FF0000" : xt;
	this.stroke = (typeof x5 == "undefined") ? 5 : parseInt(x5);
	this.style = (typeof x6 == "undefined") ? 0 : parseInt(x6);
	this.fill = (typeof cr == "undefined") ? false : cr;
	this.bgcolor = (typeof xn == "undefined") ? this.color : xn;
	this.transparency = (typeof yc == "undefined") ? transparencyLevel : parseInt(yc);
	this.bgtransparency = (typeof xo == "undefined") ? transparencyLevel / 2 : parseInt(xo);
	this.arrow = (typeof fh == "undefined") ? bArrow : fh;
	this.toString = function () {
		return "com.mapbar.maplet.MBrush";
	};
};
var MPoint = function (xQ, _E8) {
	this.lat = null;
	this.lon = null;
	this.maplet = null;
	var i91 = null;
	var M2dV = null;
	this.sU = null;
	this.sV = null;
	this.fHy00 = null;
	if (typeof xQ != "undefined" || typeof _E8 != "undefined") {
		if (JqVX(xQ)) {
			xQ = xQ.join(",");
		}
		if (typeof xQ == "string" && xQ.indexOf(",") != -1) {
			this.pid = xQ;
			this.lon = parseFloat(xQ.split(",")[0]);
			this.lat = parseFloat(xQ.split(",")[1]);
		} else {
			if (!isNaN(parseFloat(xQ)) && !isNaN(parseFloat(_E8))) {
				this.pid = xQ + "," + _E8;
				this.lon = parseFloat(xQ);
				this.lat = parseFloat(_E8);
			} else {
				this.pid = (typeof getPid == "undefined") ? xQ : getPid(xQ);
				if (apiType == 1) {
					var TPjK = cq.vp(this.pid);
					this.pid = cq.zn(TPjK[0], TPjK[1]);
					this.lon = parseFloat(this.pid.split(",")[0]);
					this.lat = parseFloat(this.pid.split(",")[1]);
				}
			}
		}
		var Do_ = cq.vp(this.pid);
		this.pid = cq.zn(Do_[0], Do_[1]);
		M2dV = Do_[0];
		i91 = Do_[1];
	}
	this.ba0p = function (x, y) {
		this.sU = x;
		this.sV = y;
		M2dV = this.maplet.zp(x, y);
		i91 = this.maplet.zo(x, y);
		this.pid = cq.zn(M2dV, i91);
		if (apiType == 1) {
			this.lon = this.pid.split(",")[0];
			this.lat = this.pid.split(",")[1];
		}
	};
	this.A3p9 = function () {
		this.sU = this.maplet.zl(M2dV, i91);
		this.sV = this.maplet.zm(i91, M2dV);
	};
	this.qc = function (maplet) {
		this.maplet = maplet;
		this.A3p9();
	};
	this.toString = function () {
		return "com.mapbar.maplet.MPoint";
	};
};
var lQ = {nh:function (id, uO, uM, lG, callback) {
	uO = parseInt(uO);
	uM = parseInt(uM);
	lG = parseInt(lG);
	if (uO == uM) {
		lQ.fF(uO, id, uM, callback);
		return;
	}
	this.fF(uO, id);
	var yN = Math.max(100, Math.round(lG / Math.abs(uM - uO)));
	var lo = Math.max(1, Math.abs((uM - uO) / (lG / yN)));
	var uN = uO + lo;
	if (uO > uM) {
		uN = uO - lo;
	}
	setTimeout("lQ.nh('" + id + "'," + uN + "," + uM + "," + (lG - yN) + ",'" + callback + "')", (yN));
}, ni:function (id, lG) {
	if (typeof lG == "undefined") {
		lG = 1000;
	}
	this.nh(id, 0, 100, lG);
}, nj:function (id, lG) {
	if (typeof lG == "undefined") {
		lG = 1000;
	}
	this.nh(id, 100, 0, lG);
}, fF:function (opacity, id, l2, callback) {
	var ai = document.getElementById(id).style;
	ai.opacity = (opacity / 100);
	ai.MozOpacity = (opacity / 100);
	ai.qK = (opacity / 100);
	ai.filter = "alpha(opacity=" + opacity + ")";
	if (opacity == l2 && callback != null) {
		eval(callback);
	}
}, qH:function (id, nJ, nK) {
	document.getElementById(id).style.left = parseInt(nJ) + "px";
	document.getElementById(id).style.top = parseInt(nK) + "px";
}, move:function (id, xa, xb, nJ, nK, lG, callback) {
	this.qH(id, xa, xb);
	this.panTo(id, nJ, nK, lG, callback);
}, panTo:function (id, nJ, nK, lG, callback) {
	nJ = parseInt(nJ);
	nK = parseInt(nK);
	var xa = parseInt(document.getElementById(id).style.left);
	var xb = parseInt(document.getElementById(id).style.top);
	lG = parseInt(lG);
	var g4 = nJ - xa;
	var g5 = nK - xb;
	if (g4 == 0 && g5 == 0) {
		if (callback != null) {
			eval(callback);
		}
		return;
	}
	var g3 = Math.abs(g4) + Math.abs(g5);
	var xd = Math.max(5, g3 / (lG / 100));
	var yN = Math.max(100, Math.round(lG / (g3 / xd)));
	var xh = g4 * xd / g3;
	var xi = g5 * xd / g3;
	var uf = xa + xh;
	var ug = xb + xi;
	if (g3 < xd) {
		uf = nJ;
		ug = nK;
	}
	this.qH(id, uf, ug);
	setTimeout("lQ.panTo('" + id + "'," + nJ + "," + nK + "," + (lG - yN) + ",'" + callback + "')", (yN));
}};
var f1 = {fx:[], uo:20, nk:function (img, src, Af, nN) {
	this.fx[this.fx.length] = new Image();
	var pn = this.fx.length - 1;
	this.fx[pn].q9 = img;
	img.style.filter = "alpha(opacity=" + this.uo + ");";
	img.style.MozOpacity = (this.uo / 100);
	img.style.opacity = (this.uo / 100);
	img.style.qK = (this.uo / 100);
	img.src = sX;
	if (typeof Af != "undefined") {
		img.width = parseInt(Af) + "px";
		this.fx[pn].width = parseInt(Af) + "px";
	}
	if (typeof nN != "undefined") {
		img.height = parseInt(nN) + "px";
		this.fx[pn].height = parseInt(nN) + "px";
	}
	this.fx[pn].f2 = this;
	this.fx[pn].pn = pn;
	this.fx[pn].ln = "0";
	this.fx[pn].onload = function () {
		if (typeof Af != "undefined") {
			this.width = parseInt(Af) + "px";
		}
		if (typeof nN != "undefined") {
			this.height = parseInt(nN) + "px";
		}
		this.q9.src = this.src;
		this.q9.style.filter = null;
		this.q9.style.MozOpacity = 1;
		this.q9.style.opacity = 1;
		this.q9.style.qK = 1;
		if (typeof Af != "undefined" && !px) {
			this.q9.width = parseInt(Af) + "px";
			this.q9.style.width = parseInt(Af) + "px";
		}
		if (typeof nN != "undefined" && !px) {
			this.q9.height = parseInt(nN) + "px";
			this.q9.style.height = parseInt(nN) + "px";
		}
		this.ln = "1";
		this.f2[this.pn] = null;
		this.f2.fN();
		this.f2 = null;
		this.q9 = null;
		this.onload = null;
		this.onerror = null;
	};
	this.fx[pn].onerror = function () {
		if (typeof Af != "undefined") {
			this.width = parseInt(Af) + "px";
		}
		if (typeof nN != "undefined") {
			this.height = parseInt(nN) + "px";
		}
		this.q9.style.filter = null;
		if (typeof Af != "undefined" && !px) {
			this.q9.width = parseInt(Af) + "px";
		}
		if (typeof nN != "undefined" && !px) {
			this.q9.height = parseInt(nN) + "px";
		}
		this.ln = "1";
		this.f2[this.pn] = null;
		this.f2.fN();
		this.f2 = null;
		this.q9 = null;
		this.onload = null;
		this.onerror = null;
	};
	showLoading();
	this.fx[pn].src = src;
}, fN:function () {
	hideLoading();
	var cp = 1;
	for (var i = 0; i < this.fx.length; i++) {
		if (this.fx[i] != null && this.fx[i].ln == "0") {
			cp = 0;
		} else {
			if (this.fx[i] != null) {
				this.fx[i].q9 = null;
				this.fx[i].f2 = null;
				this.fx[i].onload = null;
				this.fx[i].onerror = null;
				delete (this.fx[i]);
			}
		}
	}
	if (cp) {
		for (var qC = 0; i < this.fx.length; qC++) {
			if (this.fx[qC] != null) {
				this.fx[qC].q9 = null;
				this.fx[qC].f2 = null;
				this.fx[qC].onload = null;
				this.fx[qC].onerror = null;
				delete (this.fx[qC]);
			}
		}
		this.fx.length = 0;
		MEvent.trigger(this, "clean");
	}
}};
var AO = function (maplet, AB, left, top, Af, nN, z6, f2, x6) {
	this.maplet = maplet;
	this.left = left;
	this.top = top;
	this.width = Af;
	this.height = nN;
	this.AG = AB;
	this.wX = 51;
	this.AU = 18;
	this.AV = 16;
	this.cJ = false;
	this.f2 = f2;
	this.x6 = (typeof x6 != "undefined") ? x6 : "";
	this.lq = 0;
	this.lr = 0;
	this.AP = new fD("LayerZoomBar", this.left, this.top, this.width, this.height, z6, 2, "", this.f2);
	var vz = (sY / 2) * (this.height - this.AU * 2 - this.wX) / sY + this.AU;
	this.pH = gt(strImgsvrUrl + "images/" + this.x6 + "/zoombg.gif", 0, 0, this.AV, this.height);
	this.pI = gt(strImgsvrUrl + "images/" + this.x6 + "/zoombg2.gif", 0, 0, this.AV, vz);
	this.p6 = gt(strImgsvrUrl + "images/" + this.x6 + "/zoomin.gif", 0, 0, this.AV, this.AU);
	this.p7 = gt(strImgsvrUrl + "images/" + this.x6 + "/zoomout.gif", 0, this.height - this.AU, this.AV, this.AU);
	this.pR = gt(strImgsvrUrl + "images/" + this.x6 + "/slider.gif", 0, vz, this.AV, this.wX);
	this.pR.id = "zoombarSlider";
	this.AP.ld.appendChild(this.pH);
	this.AP.ld.appendChild(this.pI);
	this.AP.ld.appendChild(this.p6);
	this.AP.ld.appendChild(this.p7);
	this.AP.ld.appendChild(this.pR);
	this.pR.onmousedown = function (lM) {
		return false;
	};
	this.setZoomLevel = function (AB) {
		AB = parseInt(AB);
		if (AB < 0) {
			AB = 0;
		}
		if (AB > sY) {
			AB = sY;
		}
		if (this.AG != AB) {
			this.AG = AB;
			this.refresh();
		}
	};
	this.setStyle = function (x6) {
		if (typeof x6 != "undefined" && this.x6 != x6) {
			this.x6 = x6;
			this.pH.src = (strImgsvrUrl + "images/" + this.x6 + "/zoombg.gif");
			this.pI.src = (strImgsvrUrl + "images/" + this.x6 + "/zoombg2.gif");
			this.p6.src = (strImgsvrUrl + "images/" + this.x6 + "/zoomin.gif");
			this.p7.src = (strImgsvrUrl + "images/" + this.x6 + "/zoomout.gif");
			this.pR.src = (strImgsvrUrl + "images/" + this.x6 + "/slider.gif");
		}
	};
	this.getZoomLevel = function () {
		return this.AG;
	};
	this.show = function () {
		this.AP.show();
		this.pR.style.visibility = "visible";
	};
	this.hide = function () {
		this.AP.hide();
		this.pR.style.visibility = "hidden";
	};
	this.resize = function (nN) {
		this.height = parseInt(nN);
		this.AP.resize(this.width, this.height);
		this.pH.style.height = this.height + "px";
		this.p7.style.top = (this.height - this.AU) + "px";
		this.refresh();
	};
	this.moveTo = function (x, y) {
		this.left = x;
		this.top = y;
		this.AP.moveTo(this.left, this.top);
	};
	this.refresh = function () {
		this.paint();
	};
	this.paint = function () {
		vz = (sY - this.AG) * (this.height - this.AU * 2 - this.wX) / sY + this.AU;
		this.pI.style.height = parseInt(vz) + "px";
		if (this.pR != null) {
			this.pR.style.top = vz;
			if (this.pR.parentNode == null) {
				this.AP.ld.appendChild(this.pR);
			}
		}
	};
	this.zoomIn = function () {
		this.setZoomLevel(this.AG + 1);
	};
	this.zoomOut = function () {
		this.setZoomLevel(this.AG - 1);
	};
	this.qn = function (x, y) {
		return (x > this.left) && (x < this.left + this.width) && (y > this.top) && (y < this.top + this.height);
	};
	this.tF = function (lR, x, y) {
		if (this.cL) {
			y = y - this.wX / 2;
			AB = sY * (this.height - y - this.AU - this.wX) / (this.height - this.AU * 2 - this.wX);
			if (y > this.AU && y < (this.height - this.AU - this.wX)) {
				this.pR.style.top = parseInt(y) + "px";
				this.pI.style.height = parseInt(y) + "px";
				if (px) {
					this.maplet.AN(AB);
				}
			}
			return true;
		}
		if (this.qn(x, y)) {
			if (y < (this.AU) || y > (this.height - this.AU)) {
				this.AP.style.cursor = (px) ? "hand" : "pointer";
			} else {
				if (lR == "zoombarSlider") {
					this.AP.style.cursor = (px) ? "hand" : "pointer";
				} else {
					this.AP.style.cursor = "default";
				}
			}
			return true;
		}
		return false;
	};
	this.tE = function (x, y) {
		this.lq = x;
		this.lr = y;
		return this.qn(x, y);
	};
	this.tJ = function (x, y) {
		var fv = false;
		this.maplet.sF.ld.style.zoom = 1;
		if (this.cL) {
			if (y < this.AU) {
				this.zoomIn();
			} else {
				if (y > (this.height - this.AU)) {
					this.zoomOut();
				} else {
					y = y - this.wX / 2;
					y = (y > (this.height - this.AU - this.wX)) ? (this.height - this.AU - this.wX) : ((y < this.AU) ? this.AU : y);
					AB = sY * (this.height - y - this.AU - this.wX) / (this.height - this.AU * 2 - this.wX);
					this.setZoomLevel(parseInt(AB + 0.5));
				}
			}
			fv = true;
		}
		this.cL = false;
		return fv;
	};
	this.tC = function (x, y) {
	};
};
var gb = function (x7, AB, left, top, width, height, z6, AA, f2, q9, fk) {
	left = parseInt(left);
	top = parseInt(top);
	this.x6 = (x7 == null || x7 == "undefined") ? "" : x7 + "/";
	this.fi = (typeof fk == "undefined") ? 0 : parseInt(fk);
	if (this.fi == 2) {
		top = top - 35;
		left = left - 10;
	}
	this.uC = (this.fi) ? 100 : 254;
	this.uC += top;
	this.left = left;
	this.top = top;
	this.gy = "";
	if (this.fi != 2) {
		this.gy += "<IMG unselectable=\"on\" style=\"position:absolute;left:" + (left + 10) + "px;top:" + (top + 10) + "px;filter=alpha(opacity=60);\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "panshadow.png\" >";
		this.gy += "<IMG id=\"ctrlw\" unselectable=\"on\" title=\"" + xN[0] + "\" onmousemove=style.cursor=\"hand\";style.cursor=\"pointer\" onclick=\"javascript:PerformControl(event, this,1);\" style=\"position:absolute;left:" + (left + 10) + "px;top:" + (top + 30) + "px;width:17px;height:17px;\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "west.png\" >";
		this.gy += "<IMG id=\"ctrln\" unselectable=\"on\" title=\"" + xN[1] + "\" onmousemove=style.cursor=\"hand\";style.cursor=\"pointer\" onclick=\"javascript:PerformControl(event, this,2);\" style=\"position:absolute;left:" + (left + 30) + "px;top:" + (top + 10) + "px;width:17px;height:17px;\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "north.png\" >";
		this.gy += "<IMG id=\"ctrle\" unselectable=\"on\" title=\"" + xN[2] + "\" onmousemove=style.cursor=\"hand\";style.cursor=\"pointer\" onclick=\"javascript:PerformControl(event, this,3);\" style=\"position:absolute;left:" + (left + 50) + "px;top:" + (top + 30) + "px;width:17px;height:17px;\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "east.png\" >";
		this.gy += "<IMG id=\"ctrls\" unselectable=\"on\" title=\"" + xN[3] + "\" onmousemove=style.cursor=\"hand\";style.cursor=\"pointer\" onclick=\"javascript:PerformControl(event, this,4);\" style=\"position:absolute;left:" + (left + 30) + "px;top:" + (top + 50) + "px;width:17px;height:17px;\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "south.png\" >";
		this.gy += "<IMG id=\"ctrlmeas\" unselectable=\"on\" title=\"" + xN[4] + "\" onmousemove=style.cursor=\"hand\";style.cursor=\"pointer\" onclick=\"javascript:PerformControl(event, this,7);\" style=\"position:absolute;left:" + (left + 30) + "px;top:" + (top + 30) + "px;width:17px;height:17px;\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "measure.png\" >";
	}
	this.gy += "<IMG unselectable=\"on\" style=\"position:absolute;left:" + (left + 31) + "px;top:" + (top + 81) + "px;filter=alpha(opacity=60);\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "gridshadow.png\" >";
	this.gy += "<IMG unselectable=\"on\" style=\"position:absolute;left:" + (left + 31) + "px;top:" + (this.uC + 1) + "px;filter=alpha(opacity=60);\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "gridshadow.png\" >";
	if (this.fi == 0) {
		this.gy += "<IMG id=\"ctrlbg2\" unselectable=\"on\" style=\"position:absolute;left:" + (left + 31) + "px;top:" + (top + 97) + "px;filter=alpha(opacity=60);\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "zoom-bg2.png\" >";
		this.gy += "<IMG id=\"ctrlbg\" unselectable=\"on\" title=\"" + xN[5] + "\" onmousemove=style.cursor=\"default\"  onclick=\"javascript:PerformControl(event, this, 8);\" style=\"position:absolute;left:" + (left + 30) + "px;top:" + (top + 96) + "px;\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "zoom-bg.png\" >";
	}
	this.gy += "<IMG id=\"ctrlzmin\" unselectable=\"on\" title=\"" + xN[6] + "\" onmousemove=style.cursor=\"hand\";style.cursor=\"pointer\" onclick=\"javascript:PerformControl(event, this,5);\" style=\"position:absolute;left:" + (left + 30) + "px;top:" + (top + 80) + "px;width:17px;height:17px;\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "zoom-plus.png\" >";
	this.gy += "<IMG id=\"ctrlzmout\" unselectable=\"on\" title=\"" + xN[7] + "\" onmousemove=style.cursor=\"hand\";style.cursor=\"pointer\" onclick=\"javascript:PerformControl(event, this,6);\" style=\"position:absolute;left:" + (left + 30) + "px;top:" + this.uC + "px;width:17px;height:17px;\" src=\"" + strImgsvrUrl + "images/" + this.x6 + "zoom-minus.png\" >";
	this.ga = new fD("LayerControl", left, top, 0, 0, z6, AA, this.gy, f2);
	this.ga.ld.q9 = q9;
	if (this.fi == 0) {
		this.wW = document.createElement("div");
		this.wW.id = "ctrlslider";
		this.wW.unselectable = "on";
		this.wW.innerHTML = "<IMG id=\"ctrlsliderimg\" src=" + strImgsvrUrl + "images/" + this.x6 + "slider.png style=float:left;>";
		this.wW.style.position = "absolute";
		this.wW.style.top = (parseInt(this.top) + 165) + "px";
		this.wW.style.left = (parseInt(this.left) + 30) + "px";
		this.wW.style.width = "17px";
		this.wW.style.height = "9px";
		this.wW.lp = 0;
		this.ga.ld.appendChild(this.wW);
		this.ga.ld.wW = this.wW;
		this.wW.style.top = ((sY - AB) * (132 / (sY - 1)) + 100 + parseInt(this.top)) + "px";
		this.wW.firstChild.onmousedown = function (lM) {
			return false;
		};
		this.wW.ga = this;
		this.wW.onmousedown = function (lM) {
			if (this.lp == 0) {
				this.lp = parseInt((px) ? event.clientY : lM.clientY) - parseInt(this.ga.top);
				if (this.setCapture) {
					this.setCapture();
				}
				this.style.cursor = "move";
			} else {
				this.lp = 0;
			}
			if (gQ) {
				gP(this.lp);
			}
			return true;
		};
		this.wW.ondrag = function (lM) {
			if (this.lp > 0) {
				var maplet = this.parentNode.q9;
				this.style.cursor = "move";
				var currTop = parseInt((px) ? event.clientY : lM.clientY) - 5 - maplet.offsetY - parseInt(maplet.top) - 2 * parseInt(this.ga.top);
				if (currTop >= 100 && currTop < 244) {
					this.style.top = (currTop + parseInt(this.ga.top)) + "px";
					var lv = 132;
					if (px) {
						var y = parseInt((px) ? event.clientY : lM.clientY) - 3 - maplet.offsetY - parseInt(maplet.top) - 2 * parseInt(this.ga.top);
						AB = sY - Math.max(0, Math.min(sY, parseInt(((parseInt(y) - 100) / (sY - 1)) * (lv / (sY - 1))) / (lv / (sY))));
						maplet.AN(AB);
						this.style.cursor = "move";
						this.parentNode.style.cursor = "move";
					}
				}
				return true;
			}
			return false;
		};
		this.wW.ondragend = function (lM) {
			if (this.lp > 0) {
				var maplet = this.parentNode.q9;
				var y = parseInt((px) ? event.clientY : lM.clientY) - maplet.offsetY - parseInt(maplet.top) - 2 * parseInt(this.ga.top);
				AB = sY - Math.max(0, Math.min(sY, parseInt((parseInt(y) - 100) / (132 / (sY - 1)))));
				this.parentNode.zI(AB);
				maplet.sF.ld.style.zoom = 1;
				maplet.setZoomLevel(parseInt(AB));
				this.lp = 0;
				if (this.releaseCapture) {
					this.releaseCapture();
				}
			}
			this.lp = 0;
			this.style.cursor = "default";
			return true;
		};
	}
	this.onmousedown = function () {
		return false;
	};
	this.onmousemove = function (lM) {
		if (this.wW) {
			return (px) ? this.wW.ondrag() : this.wW.ondrag(lM);
		} else {
			return false;
		}
	};
	this.onmouseup = function (lM) {
		return (this.wW) ? ((px) ? this.wW.ondragend() : this.wW.ondragend(lM)) : false;
	};
	this.onmouseout = function () {
		return false;
	};
	this.ga.ld.zI = function (AB) {
		if (this.wW) {
			this.wW.style.top = ((sY - AB) * (132 / (sY - 1)) + 100 + (parseInt(this.style.top))) + "px";
			if (this.wW.parentNode == null || this.wW.parentNode != this) {
				this.appendChild(this.wW);
			}
		}
	};
	this.zI = function (AB) {
		this.ga.ld.zI(AB);
	};
	this.hide = function () {
		this.ga.hide();
	};
	this.show = function () {
		this.ga.show();
	};
	this.g1 = function () {
		this.ga.ld.q9 = null;
		if (this.ga.ld != null && this.ga.ld.parentNode != null) {
			this.ga.ld.parentNode.removeChild(this.ga.ld);
			this.ga.ld = null;
		}
	};
};
var AjaxHttp = {sendReq:function (zS, callback, aB) {
	var uA = new qF();
	with (uA) {
		try {
			uA.readyState = -1;
			if (typeof showLoading == "function") {
				showLoading();
			}
			uA.onreadystatechange = function () {
				uA.readyState = 4;
				if (px) {
					if (uA.wv.readyState == "loaded" || uA.wv.readyState == "complete") {
						callback(aB);
						uA.vY();
					}
				} else {
					callback(aB);
					uA.vY();
				}
				if (typeof hideLoading == "function") {
					hideLoading();
				}
			};
			if (document.all) {
				uA.wv.attachEvent("onreadystatechange", uA.onreadystatechange);
			} else {
				uA.wv.addEventListener("load", uA.onreadystatechange, false);
			}
			uA.fr(zS);
			uA.aq();
		}
		catch (lM) {
			alert(lM);
		}
	}
}};
var MArc = function (gC, Am, n3, w9, lZ, brush, info, label) {
	this.id = new Date().getTime() + "" + parseInt(Math.random() * 10000);
	this.pt = gC;
	this.Am = parseFloat(Am);
	this.n3 = parseFloat(n3);
	this.yy = parseInt(w9);
	this.yx = parseInt(lZ);
	this.brush = (typeof brush == "undefined") ? new MBrush() : brush;
	this.info = (typeof info == "undefined") ? null : info;
	this.label = (typeof label == "undefined") ? null : label;
	this.qo = false;
	this.z9 = null;
	this.ao = new Array();
	this.bEditable = false;
	this.setEditable = function (cs) {
		this.bEditable = (typeof cs == "undefined") ? false : cs;
	};
	this.qc = function (maplet) {
		this.maplet = maplet;
		if (this.info) {
			this.ao["click"] = MEvent.bindDom(this.maplet.map, "click", this, this.openInfoWindow);
		}
		this.ao["mouseover"] = MEvent.bindDom(this.maplet.map, "mouseover", this, this.uG);
		this.ao["mousedown"] = MEvent.bindDom(this.maplet.map, "mousedown", this, this.w0);
		this.ao["mousemove"] = MEvent.bindDom(this.maplet.map, "mousemove", this, this.f9);
		this.ao["mouseup"] = MEvent.bindDom(this.maplet.map, "mouseup", this, this.l1);
		if (typeof this.maplet.lA != "undefined") {
			this.paint();
		}
	};
	this.toString = function () {
		return "com.mapbar.maplet.MArc";
	};
	this.zq = function () {
		return "";
	};
	this.paint = function () {
		if (!px) {
			return;
		}
		if (this.maplet != null && this.maplet.lA != null && this.zX && this.zX.parentNode) {
			this.maplet.lA.removeChild(this.zX);
		}
		this.zX = document.createElement("div");
		this.zX.vb = this;
		this.zX.id = this.id;
		this.zX.style.position = "absolute";
		this.zX.unselectable = "on";
		this.zX.style.zIndex = 10;
		this.zX.style.cursor = (px) ? "hand" : "pointer";
		this.zW = document.createElement("v:arc");
		this.zW.unselectable = "on";
		this.zW.id = this.id;
		this.zW.strokecolor = this.brush.color;
		this.zW.strokeweight = this.brush.stroke + "pt";
		this.zW.fill = this.brush.fill;
		this.zW.filled = this.brush.fill;
		this.zW.style.position = "absolute";
		this.Ad = document.createElement("v:stroke");
		this.Ad.opacity = (this.brush.transparency / 100);
		this.Ad.joinstyle = "round";
		this.Ad.endcap = "round";
		this.Ad.fill = this.brush.fill;
		if (this.brush.arrow) {
			this.Ad.endarrow = "classic";
		}
		if (parseInt(this.brush.style)) {
			this.Ad.dashstyle = "dash";
		}
		this.zY = document.createElement("v:fill");
		this.zY.opacity = ((this.brush.bgtransparency) / 100);
		this.zY.color = this.brush.bgcolor;
		this.z9 = document.createElement("div");
		this.z9.vb = this;
		this.z9.id = this.id;
		this.z9.style.position = "absolute";
		this.z9.style.visibility = "hidden";
		this.z9.unselectable = "on";
		this.z9.style.zIndex = 11;
		this.z9.style.cursor = (px) ? "hand" : "pointer";
		this.zW.appendChild(this.Ad);
		this.zW.appendChild(this.zY);
		this.zX.appendChild(this.zW);
		this.zX.appendChild(this.z9);
		this.zI();
		this.zX.style.visibility = "visible";
		if (this.maplet != null && this.maplet.lA != null) {
			this.maplet.lA.appendChild(this.zX);
		}
	};
	this.zI = function () {
		if (this.pt.pid == null) {
			return;
		}
		var zh = cq.vp(this.pt.pid);
		var top = this.maplet.zm(zh[1] + this.n3 / 2, zh[0]);
		var left = this.maplet.zl(zh[0] - this.Am / 2, zh[1]);
		var bottom = this.maplet.zm(zh[1] - this.n3 / 2, zh[0]);
		var right = this.maplet.zl(zh[0] + this.Am / 2, zh[1]);
		var width = right - left;
		var height = bottom - top;
		if (left > this.maplet.width || right < 0 || bottom < 0 || top > this.maplet.height) {
			return;
		}
		if (this.bEditable || this.maplet.sS == ts.tu) {
			var z7 = document.getElementById(this.id + "_node_ctr");
			if (z7 == null) {
				z7 = new Image();
				z7.id = this.id + "_node_ctr";
				z7.qf = 0;
				z7.src = ul;
				z7.unselectable = "on";
				z7.alt = lt;
				z7.style.position = "absolute";
				z7.style.filter = "alpha(opacity=80);";
			}
			z7.style.left = (parseInt(left + right) / 2 - 5) + "px";
			z7.style.top = (parseInt(top + bottom) / 2 - 5) + "px";
			this.z9.appendChild(z7);
		}
		if (this.zW) {
			this.zW.style.width = width;
			this.zW.style.height = height;
			this.zW.style.left = left;
			this.zW.style.top = top;
			this.zW.StartAngle = this.yy;
			this.zW.EndAngle = this.yx;
		}
	};
	this.remove = function () {
		if (typeof this.zX != "undefined" && this.zX.parentNode) {
			this.zX.parentNode.removeChild(this.zX);
		}
		if (typeof this.graphics != "undefined") {
			this.graphics.clear();
		}
		for (var l8 in this.ao) {
			MEvent.removeBuiltInListener(this.maplet.map, l8, this.ao[l8]);
			this.ao[l8] = null;
		}
		this.maplet = null;
	};
	this.openInfoWindow = function (lM) {
		if (this.maplet) {
			if (this.maplet.sS != ts.ty && this.maplet.sS != ts.tu) {
				return;
			}
			if (typeof lM == "undefined") {
				if (this.info != null && this.pt.pid != null) {
					var Ao = 0;
					var Au = 0;
					var zh = cq.vp(this.pt.pid);
					Au = this.maplet.zm(zh[1], zh[0]);
					Ao = this.maplet.zl(zh[0], zh[1]);
					if (Ao > this.maplet.width * 2 || Ao < -this.maplet.width || Au < -this.maplet.height || Au > this.maplet.height * 2) {
						this.maplet.setCenter(this.pid);
						Ao = this.maplet.width / 2;
						Au = this.maplet.height / 2;
					} else {
						if (iToolTipStyle == 2) {
							this.x = Ao;
							this.y = Au;
							MEvent.trigger(this, "click", this);
						} else {
							this.maplet.wN(Ao, Au, this.info.title, this.info.content);
						}
					}
				}
			} else {
				if (lM.target.id == this.id) {
					var x = lM.clientX - this.maplet.offsetX - this.maplet.left;
					var y = lM.clientY - this.maplet.offsetY - this.maplet.top + 6;
					if (iToolTipStyle == 2) {
						this.x = x;
						this.y = y;
						MEvent.trigger(this, "click", this);
					} else {
						this.maplet.wN(x, y, this.info.title, this.info.content);
					}
				}
			}
		}
	};
	this.wQ = function (fg) {
		if (this.z9 != null) {
			if (fg) {
				this.z9.style.visibility = "visible";
			} else {
				this.z9.style.visibility = "hidden";
			}
		}
	};
	this.uG = function (lM) {
		if (this.bEditable || this.maplet.sS == ts.tu) {
			if (this.zX != null && this.maplet && fJ(lM.target, this.zX)) {
				this.Ad.opacity = 1;
				this.wQ(true);
			} else {
				this.Ad.opacity = (this.brush.transparency / 100);
				this.wQ(false);
			}
		}
	};
	this.w0 = function (lM) {
	};
	this.f9 = function (lM) {
	};
	this.l1 = function (lM) {
	};
};
function ny(lM) {
	if (!lM) {
		lM = window.event;
	}
	if (lM && !lM.target) {
		lM.target = lM.srcElement;
	}
	if (lM && typeof lM.button == "undefined") {
		lM.button = lM.which;
	}
	return lM;
}
function getTimeout(uy, q0, yI) {
	return window.setTimeout(function () {
		q0.apply(uy);
	}, yI);
}
function nB(uy, q0, yI) {
	return window.setInterval(function () {
		q0.apply(uy);
	}, yI);
}
var MEvent = {nD:function (l7) {
	return "_e__" + l7;
}, addListener:function (uy, l7, q0) {
	var l8 = this.nD(l7);
	if (uy[l8]) {
		var cZ = true;
		for (var i = 0; i < uy[l8].length; i++) {
			var nN = uy[l8][i];
			if (nN == q0) {
				cZ = false;
				break;
			}
		}
		if (cZ) {
			uy[l8].push(q0);
		}
	} else {
		uy[l8] = [q0];
	}
	return {qg:uy, propertyName:l8, q0:q0};
}, removeListener:function (q9) {
	var uy = q9.qg[q9.propertyName];
	for (var fw = 0; fw < uy.length; fw++) {
		if (uy[fw] == q9.q0) {
			uy.splice(fw, 1);
			return;
		}
	}
}, clearListeners:function (uy, l7) {
	var l8 = this.nD(l7);
	uy[l8] = null;
}, trigger:function (uy, l8) {
	var l9 = this.nD(l8);
	var lS = uy[l9];
	if (lS && lS.length > 0) {
		var vn = [];
		for (var eYrl4 = 2; eYrl4 < arguments.length; eYrl4++) {
			vn.push(arguments[eYrl4]);
		}
		for (var i = 0; i < lS.length; i++) {
			var nN = lS[i];
			if (nN) {
				try {
					nN.apply(uy, vn);
				}
				catch (lM) {
					throw lM;
				}
			}
		}
	}
}, addBuiltInListener:function (uy, l8, q0) {
	if (uy.addEventListener) {
		uy.addEventListener(l8, q0, false);
	} else {
		if (uy.attachEvent) {
			uy.attachEvent("on" + l8, q0);
		} else {
			uy["on" + l8] = q0;
		}
	}
	return q0;
}, removeBuiltInListener:function (uy, l8, q0) {
	if (uy.removeEventListener) {
		uy.removeEventListener(l8, q0, false);
	} else {
		if (uy.detachEvent) {
			uy.detachEvent("on" + l8, q0);
		} else {
			uy["on" + l8] = null;
		}
	}
}, bind:function (uy, l8, fU, q0) {
	return this.addListener(uy, l8, function () {
		q0.apply(fU, arguments);
	});
}, bindDom:function (uy, l8, fU, q0) {
	var an = this.gm(fU, q0);
	return this.addBuiltInListener(uy, l8, an);
}, gm:function (uy, l8) {
	return function (lM) {
		lM = ny(lM);
		l8.call(uy, lM);
	};
}, callback:function (q0, uy) {
	return function () {
		return uy.apply(q0, arguments);
	};
}};
var MIcon = function (S8x63, width, height, anchorX, anchorY, pY) {
	this.ao = new Array();
	this.NTO3 = 1;
	this.ld = document.createElement("div");
	this.ld.unselectable = "on";
	this.ld.style.zIndex = this.NTO3;
	this.ld.style.position = "absolute";
	width = (typeof width == "undefined") ? 16 : width;
	height = (typeof height == "undefined") ? 16 : height;
	this.img = document.createElement("div");
	this.img.unselectable = "on";
	this.img.style.MozUserSelect = "none";
	this.img.style.zIndex = this.NTO3;
	this.img.style.position = "absolute";
	this.img.style.cursor = "hand";
	this.img.style.cursor = "pointer";
	this.img.style.top = "0px";
	this.img.style.left = "0px";
	this.S8x63 = S8x63;
	this.wz = function (id) {
		this.ld.id = "OverlayBg" + id;
		this.img.id = id;
	};
	this.qc = function (sW) {
		if (px) {
			this.img.ondragstart = function () {
				return false;
			};
		}
		this.sW = sW;
		this.setContextMenu(sW.contextmenu);
		this.ao["mouseover"] = MEvent.bindDom(this.img.firstChild, "mouseover", this.sW, this.sW.hiliteIcon);
		this.ao["mouseout"] = MEvent.bindDom(this.img.firstChild, "mouseout", this.sW, this.sW.v4);
	};
	this.setContextMenu = function (menu) {
		this.contextmenu = menu;
		this.img.contextmenu = this.contextmenu;
		for (var i in this.img.childNodes) {
			if (typeof this.img.childNodes[i] == "object") {
				this.img.childNodes[i].contextmenu = this.contextmenu;
			}
		}
	};
	this.updateImage = function (w7, Aj, nV) {
		this.S8x63 = w7;
		if (this.S8x63 != null && this.S8x63.indexOf("<") >= 0) {
			this.img.innerHTML = this.S8x63;
		} else {
			this.img.innerHTML = "<img src=" + this.S8x63 + " width=" + (typeof Aj == "undefined" ? width : Aj) + " height=" + (typeof Aj == "undefined" ? height : nV) + ">";
			if (this.sW) {
				if (this.sW.label && typeof Aj != "undefined") {
					this.sW.label.xoffset += Aj - width;
					width = Aj;
				}
				if (this.sW.maplet) {
					this.sW.qc(this.sW.maplet);
				}
			}
		}
		this.img.firstChild.onmousedown = function (lM) {
			return false;
		};
	};
	this.updateImage(S8x63);
	this.width = (typeof width == "undefined") ? parseInt(this.img.width) : parseInt(width);
	this.height = (typeof height == "undefined") ? parseInt(this.img.height) : parseInt(height);
	this.ld.style.width = this.width + "px";
	this.ld.style.height = this.height + "px";
	this.pY = (typeof pY == "undefined") ? S8x63 : pY;
	this.anchorX = (typeof anchorX == "undefined") ? this.width / 2 : parseInt(anchorX);
	this.anchorY = (typeof anchorY == "undefined") ? this.height / 2 : parseInt(anchorY);
	this.ld.appendChild(this.img);
	this.zI = function (maplet, left, top) {
		var zB = parseInt(left) - parseInt(this.anchorX);
		var zF = parseInt(top) - parseInt(this.anchorY);
		if (zB > maplet.width || zB < -this.width || zF > maplet.height || zF < -this.height) {
			if (this.ld.parentNode) {
				this.ld.parentNode.removeChild(this.ld);
				if (this.sW.label) {
					this.sW.label.remove();
				}
				this.fu = false;
			}
		} else {
			if (this.ld.parentNode != maplet.lA.ld) {
				maplet.lA.appendChild(this.ld);
				this.ld.style.width = this.width + "px";
				this.ld.style.height = this.height + "px";
				this.img.width = this.width + "px";
				this.img.height = this.height + "px";
				this.fu = true;
			}
			this.ld.style.top = parseInt(zF) + "px";
			this.ld.style.left = parseInt(zB) + "px";
			if (this.sW.label) {
				this.sW.label.zI(this.sW.maplet, left, top);
			}
		}
	};
	this.qs = function () {
		return (this.fu);
	};
	this.zq = function () {
		return (this.img.firstChild.src) + "," + this.width + "," + this.height;
	};
	this.hilite = function () {
		if (this.ld) {
			if (this.ld.style.zIndex < pF) {
				pF++;
			}
			this.R_91d(pF);
		}
	};
	this.remove = function () {
		if (this.ld && this.ld.parentNode) {
			this.ld.parentNode.removeChild(this.ld);
		}
		for (var l8 in this.ao) {
			MEvent.removeBuiltInListener(this.img.firstChild, l8, this.ao[l8]);
			this.ao[l8] = null;
		}
	};
	this.R_91d = function (T3QU1) {
		if (this.ld && this.ld.parentNode && T3QU1 != this.ld.style.zIndex) {
			this.NTO3 = this.ld.style.zIndex;
			this.ld.style.zIndex = T3QU1;
		}
	};
	this.d15$ = function () {
		if (this.NTO3 != this.ld.style.zIndex) {
			this.R_91d(this.NTO3);
		}
	};
	this.toString = function () {
		return "com.mapbar.maplet.MIcon";
	};
};
var MMarker = function (pt, icon, info, label) {
	this.id = new Date().getTime() + "" + parseInt(Math.random() * 10000);
	this.pt = pt;
	this.icon = (typeof icon == "undefined") ? null : icon;
	if (this.icon && this.icon.wz) {
		this.icon.wz(this.id);
	}
	if (this.label && this.label.wz) {
		this.label.wz(this.id);
	}
	this.info = null;
	if (typeof info != "undefined" && info) {
		this.info = info;
		this.info.setOverlay(this);
	}
	this.label = (typeof label == "undefined") ? null : label;
	this.lw = 0;
	this.ls = false;
	this.bEditable = false;
	this.rotation = 0;
	this.ao = new Array();
	this.contextmenu = null;
	this.setContextMenu = function (menu) {
		this.contextmenu = menu;
		if (this.icon != null) {
			this.icon.setContextMenu(this.contextmenu);
		}
		if (this.label != null) {
			this.label.setContextMenu(this.contextmenu);
		}
		if (typeof this.maplet == "object" && this.maplet) {
			this.contextmenu.qc(this.maplet);
		}
	};
	this.wz = function (id) {
		this.id = id;
		if (this.icon && this.icon.wz) {
			this.icon.wz(id);
		}
	};
	this.setEditable = function (cs) {
		this.bEditable = (typeof cs == "undefined") ? false : cs;
		if (rmi) {
			this.refreshZIndex();
		}
	};
	this.refreshZIndex = function (MsD1) {
		if (typeof MsD1 != "boolean") {
			MsD1 = true;
		}
		if (this.maplet) {
			var UX5W = this.maplet.getMarkerPolygons(this);
			if (UX5W.length > 0) {
				if (this.bEditable) {
					if (this.icon.ld.style.zIndex < 0) {
						this.d15$();
					}
				} else {
					if (this.icon.ld.style.zIndex >= 0) {
						this.R_91d(-1);
					}
				}
				if (MsD1) {
					for (var i = 0; i < UX5W.length; i++) {
						UX5W[i].i6N0M(this);
					}
				}
			}
		}
	};
	this.qc = function (maplet) {
		this.maplet = maplet;
		if (typeof this.contextmenu == "object" && this.contextmenu) {
			this.contextmenu.qc(this.maplet);
		}
		this.ao["mousedown"] = MEvent.bindDom(this.maplet.map, "mousedown", this, this.w0);
		if (this.icon != null) {
			this.icon.qc(this);
		}
		if (this.label != null) {
			this.label.qc(this);
		}
		if (this.info != null) {
			this.ao["info_" + this.info.yd] = MEvent.bindDom(this.maplet.map, this.info.yd, this, this.openInfoWindow);
		} else {
			this.ao["click"] = MEvent.bindDom(this.maplet.map, "click", this, this.openInfoWindow);
		}
		if (typeof this.maplet.lA != "undefined") {
			this.paint();
		}
		if (rmi) {
			this.refreshZIndex();
		}
	};
	this.toString = function () {
		return "com.mapbar.maplet.MMarker";
	};
	this.paint = function () {
		if (!this.pt.maplet) {
			this.pt.qc(maplet);
		}
		if (this.maplet.s16F) {
			if (this.maplet.fHy00 != this.pt.fHy00) {
				this.pt.sU += this.maplet.S024Y;
				this.pt.sV += this.maplet.XP9;
				this.pt.fHy00 = this.maplet.fHy00;
			}
		} else {
			this.pt.A3p9();
		}
		if (this.icon) {
			if (!this.icon.sW) {
				this.icon.qc(this);
			}
			this.icon.zI(this.maplet, this.pt.sU, this.pt.sV);
		}
	};
	this.zq = function () {
		return (this.icon.qs()) ? "1" + "," + this.pt.pid + "," + this.icon.zq() : "";
	};
	this.remove = function () {
		this.removeContextMenu();
		if (this.icon) {
			this.icon.remove();
		}
		if (this.label) {
			this.label.remove();
		}
		for (var l8 in this.ao) {
			MEvent.removeBuiltInListener(this.maplet.map, l8, this.ao[l8]);
			this.ao[l8] = null;
		}
		this.maplet = null;
	};
	this.removeContextMenu = function () {
		if (typeof this.contextmenu == "object" && this.contextmenu) {
			if (this.icon) {
				this.icon.setContextMenu(null);
			}
			if (this.label) {
				this.label.setContextMenu(null);
			}
			this.contextmenu.remove();
			this.contextmenu = null;
		}
	};
	this.openInfoWindow = function (lM) {
		if (this.openInfoWindow.caller == null) {
		}
		if (this.maplet != null) {
			if ((new Date().getTime() - this.lw) < 200) {
				return;
			}
			var zh = cq.vp(this.pt.pid);
			var x = this.maplet.zl(zh[0], zh[1]);
			var y = this.maplet.zm(zh[1], zh[0]);
			if (typeof lM == "undefined" || (typeof lM == "object" && fJ(lM.target, this.icon.img)) || (typeof lM == "object" && this.label && fJ(lM.target, this.label.ld))) {
				if (typeof lM == "object" && this.maplet.sS != ts.ty && this.maplet.sS != ts.tu) {
					return;
				}
				if (x > this.maplet.width * 2 || x < -this.maplet.width || y < -this.maplet.height || y > this.maplet.height * 2) {
					this.maplet.setCenter(this.pt.pid);
					x = this.maplet.width / 2;
					y = this.maplet.height / 2;
				}
				this.x = x;
				this.y = y;
				if (this.openInfoWindow.caller && this.openInfoWindow.caller.toString().indexOf(".call(") != -1) {
					MEvent.trigger(this, "click", this);
				}
				if (!this.maplet) {
					return;
				}
				if (iToolTipStyle != 2) {
					this.icon.hilite();
					this.maplet.wN(x, y, this.info);
				}
			} else {
				if (typeof lM == "boolean" && lM || lM == "true") {
					if (x > this.maplet.width * 2 || x < -this.maplet.width || y < -this.maplet.height || y > this.maplet.height * 2) {
						this.maplet.setCenter(this.pt.pid);
						x = this.maplet.width / 2;
						y = this.maplet.height / 2;
					}
					this.icon.hilite();
					this.maplet.wN(x, y, this.info, true);
				}
			}
		}
	};
	this.w0 = function (lM) {
		if (this.icon != null && this.maplet && (this.bEditable || this.maplet.sS == ts.tu) && fJ(lM.target, this.icon.img) && lM.button != 2) {
			this.qo = true;
			this.fd = false;
			this.l6 = this.id;
			this.l0 = (lM.offsetX) ? lM.offsetX : parseInt(lM.clientX - this.maplet.offsetX - this.maplet.left) - parseInt(this.icon.ld.style.left);
			this.na = (lM.offsetY) ? lM.offsetY : parseInt(lM.clientY - this.maplet.offsetY - this.maplet.top) - parseInt(this.icon.ld.style.top);
			if (this.rotation == 1) {
				var lb = this.l0 - this.icon.width / 2;
				var lc = this.na - this.icon.height / 2;
				var la = Math.sqrt(lb * lb + lc * lc);
				if (la > (this.icon.width / 4 - 5)) {
					this.fd = true;
					this.lq = lM.clientX;
					this.lr = lM.clientY;
				}
			}
			this.ao["mousemove"] = MEvent.bindDom(this.maplet.map, "mousemove", this, this.f9);
			this.ao["mouseup"] = MEvent.bindDom(this.maplet.map, "mouseup", this, this.l1);
		}
	};
	this.f9 = function (lM) {
		if (this.icon != null && this.maplet && (this.bEditable || this.maplet.sS == ts.tu) && (fJ(lM.target, this.icon.img) || this.l6 == this.id)) {
			if (this.qo) {
				if (!this.fd) {
					var x = lM.clientX - this.maplet.offsetX - this.maplet.left - this.l0;
					var y = lM.clientY - this.maplet.offsetY - this.maplet.top - this.na;
					this.icon.zI(this.maplet, x + this.icon.anchorX, y + this.icon.anchorY);
					this.lw = new Date().getTime();
					this.ls = true;
				} else {
					var wc = parseInt(lM.clientX - this.maplet.offsetX - this.maplet.left) - parseInt(this.icon.ld.style.left);
					var wd = parseInt(lM.clientY - this.maplet.offsetY - this.maplet.top) - parseInt(this.icon.ld.style.top);
					var wa = Math.atan2((wd - this.icon.height / 2), wc - this.icon.width / 2);
					var wb = ((90 + wa * 180 / Math.PI) + 360) % 360;
					MEvent.trigger(this, "rotate", wb);
				}
			}
		}
	};
	this.l1 = function (lM) {
		if (this.icon != null && this.maplet && (this.bEditable || this.maplet.sS == ts.tu) && this.qo && this.ls) {
			MEvent.removeBuiltInListener(this.maplet.map, "mousemove", this.ao["mousemove"]);
			MEvent.removeBuiltInListener(this.maplet.map, "mouseup", this.ao["mouseup"]);
			if (!this.fd) {
				var x = lM.clientX - this.maplet.offsetX - this.maplet.left - this.l0;
				var y = lM.clientY - this.maplet.offsetY - this.maplet.top - this.na;
				this.pt.ba0p(x + this.icon.anchorX, y + this.icon.anchorY);
				this.x = x;
				this.y = y;
			} else {
			}
			MEvent.trigger(this, "drag", this);
			MEvent.trigger(this.maplet, "edit", this);
			if (this.ls) {
				this.lw = new Date().getTime();
				this.ls = false;
			}
		}
		if (this.l6 == this.id) {
			this.l6 = null;
		}
		this.qo = false;
	};
	this.hiliteIcon = function (lM) {
		if (this.icon != null && fJ(lM.target, this.id)) {
			this.icon.hilite();
			var zh = cq.vp(this.pt.pid);
			var x = this.maplet.zl(zh[0], zh[1]);
			var y = this.maplet.zm(zh[1], zh[0]);
			this.x = x;
			this.y = y;
			MEvent.trigger(this, "mouseover", this);
		}
	};
	this.v4 = function (lM) {
		if (this.icon != null && fJ(lM.target, this.id)) {
			var zh = cq.vp(this.pt.pid);
			var x = this.maplet.zl(zh[0], zh[1]);
			var y = this.maplet.zm(zh[1], zh[0]);
			this.x = x;
			this.y = y;
			MEvent.trigger(this, "mouseout", this);
		}
	};
	this.R_91d = function (T3QU1) {
		if (this.icon) {
			this.icon.R_91d(T3QU1);
		}
		if (this.label) {
			this.label.R_91d(T3QU1);
		}
	};
	this.d15$ = function () {
		if (this.icon) {
			this.icon.d15$();
		}
		if (this.label) {
			this.label.d15$();
		}
	};
	this.setIcon = function ($5f, D398) {
		if (typeof D398 != "boolean") {
			D398 = true;
		}
		var Y6Dsn = false;
		if (this.icon) {
			Y6Dsn = this.icon.qs();
			this.icon.remove();
			this.icon = null;
		}
		if ($5f) {
			this.icon = $5f;
			this.icon.wz(this.id);
			this.icon.qc(this);
			if (D398 && Y6Dsn) {
				this.paint();
			}
		}
	};
	this.setLabel = function (C302, D398) {
		if (typeof D398 != "boolean") {
			D398 = true;
		}
		var Y6Dsn = false;
		if (this.icon) {
			Y6Dsn = this.icon.qs();
		}
		if (this.label) {
			this.label.remove();
			this.label = null;
		}
		if (C302) {
			this.label = C302;
			this.label.wz(this.id);
			this.label.qc(this);
			if (D398 && Y6Dsn) {
				this.paint();
			}
		}
	};
};
var MPolyline = function (pts, brush, info, label) {
	this.id = new Date().getTime() + "" + parseInt(Math.random() * 10000) + "MPolyline";
	this.pts = pts;
	this.brush = (typeof brush == "undefined") ? new MBrush() : brush;
	this.info = null;
	if (typeof info != "undefined" && info) {
		this.info = info;
		this.info.setOverlay(this);
	}
	this.label = (typeof label == "undefined") ? null : label;
	this.qo = false;
	this.wk = null;
	this.z9 = null;
	this.um = new MContextMenu();
	this.un = new MContextMenuItem("\u5220\u9664\u8282\u70b9");
	this.um.addItem(this.un);
	this.contextmenu = null;
	this.ao = new Array();
	this.xR5 = new Object();
	this.isRefreshMkIndex = rmi;
	this.maplet = null;
	this.bEditable = false;
	this.setEditable = function (cs) {
		this.bEditable = (typeof cs == "undefined") ? false : cs;
		if (this.maplet != null) {
			this.zI();
		}
	};
	this.qc = function (maplet) {
		this.maplet = maplet;
		if (typeof this.contextmenu == "object" && this.contextmenu) {
			this.contextmenu.qc(this.maplet);
		}
		this.um.qc(this.maplet);
		this.ao["click"] = MEvent.bindDom(this.maplet.map, "click", this, this.openInfoWindow);
		this.ao["mouseover"] = MEvent.bindDom(this.maplet.map, "mouseover", this, this.uG);
		this.ao["mousedown"] = MEvent.bindDom(this.maplet.map, "mousedown", this, this.w0);
		this.ao["mousemove"] = MEvent.bindDom(this.maplet.map, "mousemove", this, this.f9);
		this.ao["mouseup"] = MEvent.bindDom(this.maplet.map, "mouseup", this, this.l1);
		if (this.brush.fill && this.pts[0].pid != this.pts[this.pts.length - 1].pid) {
			this.pts.push(this.pts[0]);
		}
		if (typeof this.maplet.lA != "undefined") {
			this.paint();
		}
	};
	this.toString = function () {
		return "com.mapbar.maplet.MPolyline";
	};
	this.zq = function () {
		return "";
	};
	this.zn = function () {
		if (apiType == 1) {
			return {brush:this.brush, points:this.pts};
		} else {
			var xU = this.brush.filled ? "2" : "0";
			var xT = this.brush.stroke + "," + xU + "," + this.brush.color + ":";
			for (var i = 0; i < this.pts.length; i++) {
				xT += this.pts[i].pid + ",";
			}
			return xT;
		}
	};
	this.paint = function () {
		if (px) {
			this.zX = document.getElementById("vCanvasVML");
			if (!this.zX) {
				this.zX = document.createElement("div");
				this.zX.vb = this;
				this.zX.id = "vCanvasVML";
				this.zX.style.position = "absolute";
				this.zX.unselectable = "on";
				this.zX.style.zIndex = 0;
				this.zX.contextmenu = this.contextmenu;
				this.maplet.lA.appendChild(this.zX);
			}
			if (!this.z0) {
				this.z0 = document.createElement("v:polyline");
				this.z0.unselectable = "on";
				this.z0.id = this.id;
				this.z0.setAttribute("MStrName", this.toString());
				this.z0.strokecolor = this.brush.color;
				this.z0.strokeweight = this.brush.stroke + "px";
				this.z0.fill = this.brush.fill;
				this.z0.filled = this.brush.fill;
				this.z0.style.position = "absolute";
				this.z0.style.cursor = "hand";
				this.z0.contextmenu = this.contextmenu;
				this.Ad = document.createElement("v:stroke");
				this.Ad.opacity = parseInt(this.brush.stroke) == 0 ? 0 : this.brush.transparency / 100;
				this.Ad.joinstyle = "round";
				this.Ad.endcap = "round";
				this.Ad.fill = this.brush.fill;
				this.Ad.endarrow = this.brush.arrow ? "classic" : "";
				this.Ad.dashstyle = parseInt(this.brush.style) ? "dash" : "";
				this.zY = document.createElement("v:fill");
				this.zY.opacity = ((this.brush.bgtransparency) / 100);
				this.zY.color = this.brush.bgcolor;
				this.z0.appendChild(this.zY);
				this.z0.appendChild(this.Ad);
				this.zX.appendChild(this.z0);
			}
		} else {
			this.zX = document.getElementById("vCanvasSVG");
			if (!this.zX) {
				this.zX = document.createElement("div");
				this.zX.vb = this;
				this.zX.id = "vCanvasSVG";
				this.zX.style.position = "absolute";
				this.zX.unselectable = "on";
				this.zX.style.zIndex = 0;
				this.zX.style.MozUserSelect = "none";
				this.maplet.lA.appendChild(this.zX);
			}
			this.z0 = document.getElementById("LayerDrawSVG");
			if (!this.z0) {
				this.z0 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				this.z0.setAttribute("id", "LayerDrawSVG");
				this.z0.setAttribute("version", "1.1");
				this.z0.setAttribute("overflow", "visible");
				this.z0.setAttribute("viewBox", "-" + this.maplet.width + " -" + this.maplet.height + " " + this.maplet.width * 3 + " " + this.maplet.height * 3);
				this.z0.setAttribute("style", "position: absolute; left: -" + this.maplet.width + "px; top: -" + this.maplet.height + "px; z-index: 0;");
				this.z0.setAttribute("height", this.maplet.height * 3 + "px");
				this.z0.setAttribute("width", this.maplet.width * 3 + "px");
				this.arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
				this.arrow.setAttribute("d", "M 0 0 L 10 5 L 0 10 L 4 5 z");
				this.arrow.setAttribute("fill", this.brush.color);
				this.arrow.setAttribute("fill-opacity", this.brush.bgtransparency / 100 + 0.3);
				this.zY = document.createElementNS("http://www.w3.org/2000/svg", "marker");
				this.zY.setAttribute("id", "svgArrow");
				this.zY.setAttribute("viewBox", "0 0 10 10");
				this.zY.setAttribute("refX", "6");
				this.zY.setAttribute("refY", "5");
				this.zY.setAttribute("markerUnits", "strokeWidth");
				this.zY.setAttribute("orient", "auto");
				this.zY.appendChild(this.arrow);
				this.z0.appendChild(this.zY);
				this.zX.appendChild(this.z0);
			}
			if (!this.Ad) {
				this.Ad = document.createElementNS("http://www.w3.org/2000/svg", "path");
				this.Ad.setAttribute("id", this.id);
				this.Ad.setAttribute("MStrName", this.toString());
				this.Ad.setAttribute("stroke-linejoin", "round");
				this.Ad.setAttribute("stroke-linecap", "round");
				this.Ad.setAttribute("marker-end", this.brush.arrow ? "url(#svgArrow)" : "");
				this.Ad.setAttribute("stroke", this.brush.color);
				this.Ad.setAttribute("stroke-width", this.brush.stroke + "px");
				this.Ad.setAttribute("stroke-opacity", this.brush.transparency / 100);
				this.Ad.setAttribute("style", parseInt(this.brush.style) ? "stroke-dasharray:10,15" : "");
				this.Ad.setAttribute("fill-opacity", this.brush.bgtransparency / 100);
				this.Ad.setAttribute("fill", (this.brush.fill) ? this.brush.bgcolor : "none");
				this.Ad.setAttribute("onmouseover", "this.style.cursor = \"pointer\"");
				this.Ad.setAttribute("onmousedown", "this.style.cursor = \"move\"");
				if (typeof this.contextmenu == "object" && this.contextmenu) {
					this.Ad.contextmenu = this.contextmenu;
				}
				this.z0.appendChild(this.Ad);
			}
		}
		this.zI();
	};
	this.setContextMenu = function (menu) {
		this.contextmenu = menu;
		if (px) {
			if (this.zX) {
				this.zX.contextmenu = this.contextmenu;
			}
			if (this.z0) {
				this.z0.contextmenu = this.contextmenu;
			}
		}
		if (this.Ad) {
			this.Ad.contextmenu = this.contextmenu;
		}
		if (typeof this.maplet == "object" && this.maplet) {
			this.contextmenu.qc(this.maplet);
		}
	};
	this.setBrush = function (T$n1) {
		if (!(T$n1 instanceof MBrush)) {
			return;
		}
		this.brush = T$n1;
		if (px) {
			if (this.z0 && this.Ad && this.zY) {
				this.z0.strokecolor = this.brush.color;
				this.z0.strokeweight = this.brush.stroke + "px";
				this.z0.fill = this.brush.fill;
				this.z0.filled = this.brush.fill;
				this.Ad.opacity = parseInt(this.brush.stroke) == 0 ? 0 : this.brush.transparency / 100;
				this.Ad.fill = this.brush.fill;
				this.Ad.endarrow = this.brush.arrow ? "classic" : "";
				this.Ad.dashstyle = parseInt(this.brush.style) ? "dash" : "";
				this.zY.opacity = ((this.brush.bgtransparency) / 100);
				this.zY.color = this.brush.bgcolor;
			}
		} else {
			if (this.arrow) {
				this.arrow.setAttribute("fill", this.brush.color);
				this.arrow.setAttribute("fill-opacity", this.brush.bgtransparency / 100 + 0.3);
			}
			if (this.Ad) {
				this.Ad.setAttribute("marker-end", this.brush.arrow ? "url(#svgArrow)" : "");
				this.Ad.setAttribute("stroke", this.brush.color);
				this.Ad.setAttribute("stroke-width", this.brush.stroke + "px");
				this.Ad.setAttribute("stroke-opacity", this.brush.transparency / 100);
				this.Ad.setAttribute("style", parseInt(this.brush.style) ? "stroke-dasharray:10,15" : "");
				this.Ad.setAttribute("fill-opacity", this.brush.bgtransparency / 100);
				this.Ad.setAttribute("fill", (this.brush.fill) ? this.brush.bgcolor : "none");
			}
		}
	};
	this.r792k = function (pt) {
		if (typeof pt != "object" || !pt) {
			return false;
		}
		return (pt.sU > -this.maplet.width / 3 && pt.sU < this.maplet.width * 1.33) && (pt.sV > -this.maplet.height / 3 && pt.sV < this.maplet.height * 1.33);
	};
	this.zI = function () {
		this.z9 = document.getElementById(this.id + "vNodeLayer");
		if (this.z9) {
			this.zX.removeChild(this.z9);
		}
		if (this.bEditable || this.maplet.sS == ts.tu) {
			this.z9 = document.createElement("div");
			this.z9.vb = this;
			this.z9.id = this.id + "vNodeLayer";
			this.z9.style.position = "absolute";
			this.z9.style.display = "none";
			this.z9.unselectable = "on";
			this.z9.style.zIndex = 1;
			this.zX.appendChild(this.z9);
		}
		this.pu = new Array();
		this.aP = new Array();
		this.aR = new Array();
		var pg = 0;
		var us = 10;
		if (this.pts == null || this.pts.length < 2) {
			return;
		}
		var cY = false;
		var tn = this.maplet.width;
		var to = this.maplet.height;
		for (var qC = 0; qC < this.pts.length; qC++) {
			if (!this.pts[qC].maplet) {
				this.pts[qC].qc(this.maplet);
			}
			if (this.maplet.s16F) {
				if (this.maplet.fHy00 != this.pts[qC].fHy00) {
					this.pts[qC].sU += this.maplet.S024Y;
					this.pts[qC].sV += this.maplet.XP9;
					this.pts[qC].fHy00 = this.maplet.fHy00;
				}
			} else {
				this.pts[qC].A3p9();
			}
			if (this.bEditable && !this.r792k(this.pts[qC]) && !this.r792k(this.pts[qC + 1]) && !this.r792k(this.pts[qC - 1])) {
				continue;
			}
			if (this.pts[qC].sU && this.pts[qC].sV) {
				this.aR[pg] = this.pts[qC].sV;
				this.aP[pg] = this.pts[qC].sU;
				this.pu[pg] = qC;
				if (tn > this.aP[pg]) {
					tn = this.aP[pg];
				}
				if (to > this.aR[pg]) {
					to = this.aR[pg];
				}
				if (!cY && (this.aR[pg] < 0 || this.aR[pg] > this.maplet.height || this.aP[pg] < 0 || this.aP[pg] > this.maplet.width)) {
					cY = true;
				}
				if (pg > 0 && (Math.abs(this.aP[pg] - this.aP[pg - 1]) + Math.abs(this.aR[pg] - this.aR[pg - 1])) > us) {
					pg++;
				}
				if (pg == 0) {
					pg++;
				}
			}
		}
		if (!(this.bEditable || this.maplet.sS == ts.tu) && cY) {
			var aQ = new Array();
			var aS = new Array();
			var pv = new Array();
			pg = 0;
			for (var eYrl4 = 1; eYrl4 < this.aP.length; eYrl4++) {
				if ((this.aR[eYrl4] < -this.maplet.height && this.aR[eYrl4 - 1] < -this.maplet.height) || (this.aR[eYrl4] > this.maplet.height * 2 && this.aR[eYrl4 - 1] > this.maplet.height * 2) || (this.aP[eYrl4] > this.maplet.width * 2 && this.aP[eYrl4 - 1] > this.maplet.width * 2) || (this.aP[eYrl4] < -this.maplet.width && this.aP[eYrl4 - 1] < -this.maplet.width)) {
					continue;
				}
				if (aQ.length == 0 || (aQ[pg] != this.aP[eYrl4 - 1] && aS[pg] != this.aR[eYrl4 - 1])) {
					aQ[pg] = this.aP[eYrl4 - 1];
					aS[pg] = this.aR[eYrl4 - 1];
					pv[pg] = this.pu[eYrl4 - 1];
					pg++;
				}
				aQ[pg] = this.aP[eYrl4];
				aS[pg] = this.aR[eYrl4];
				pv[pg] = this.pu[eYrl4];
				pg++;
			}
			this.aP = aQ;
			this.aR = aS;
			this.pu = pv;
			aQ = null;
			aS = null;
			pv = null;
		}
		var Aa = [];
		for (var i = 0; i < this.aP.length; i++) {
			if (px) {
				Aa.push(this.aP[i] + "," + this.aR[i]);
			} else {
				Aa.push(((i == 0) ? "M" : "L") + this.aP[i] + "," + this.aR[i]);
			}
			if (this.bEditable || this.maplet.sS == ts.tu) {
				var z7 = document.getElementById(this.id + "_node_" + this.pu[i]);
				if (z7 == null) {
					z7 = new Image();
					z7.id = this.id + "_node_" + this.pu[i];
					z7.qf = i;
					z7.vv = this;
					z7.qk = this.pu[i];
					z7.src = ul;
					z7.unselectable = "on";
					z7.alt = lt;
					z7.title = lt;
					z7.style.position = "absolute";
					z7.style.filter = "alpha(opacity=80);";
					z7.style.MozOpacity = 0.8;
					z7.style.opacity = 0.8;
					z7.onmousedown = function () {
						return false;
					};
					z7.contextmenu = this.um;
				}
				z7.style.left = (parseInt(this.aP[i]) - 5) + "px";
				z7.style.top = (parseInt(this.aR[i]) - 5) + "px";
				this.z9.appendChild(z7);
				if (i > 0) {
					var z8 = document.getElementById(this.id + "_midnode_" + this.pu[i]);
					if (z8 == null) {
						z8 = new Image();
						z8.id = this.id + "_midnode_" + this.pu[i];
						z8.qf = i;
						z8.qk = this.pu[i];
						z8.unselectable = "on";
						z8.src = ul;
						z8.alt = lt;
						z8.title = lt;
						z8.style.position = "absolute";
						z8.style.filter = "alpha(opacity=60);";
						z8.style.MozOpacity = 0.6;
						z8.style.opacity = 0.6;
						z8.onmousedown = function () {
							return false;
						};
						z8.contextmenu = this.um;
					}
					z8.style.left = ((parseInt(this.aP[i]) + parseInt(this.aP[i - 1])) / 2 - 5) + "px";
					z8.style.top = ((parseInt(this.aR[i]) + parseInt(this.aR[i - 1])) / 2 - 5) + "px";
					this.z9.appendChild(z8);
				}
			}
		}
		if (bmc) {
			this.z0.style.left = parseInt(tn) + "px";
			this.z0.style.top = parseInt(to) + "px";
		}
		if (this.z0) {
			if (this.z0.points) {
				this.z0.style.display = "none";
				this.z0.points.value = Aa.join(",");
				this.z0.style.display = "";
			} else {
				if (px) {
					this.z0.style.display = "none";
					this.z0.points = Aa.join(",");
					this.z0.style.display = "";
				} else {
					this.Ad.setAttribute("d", Aa.join(""));
				}
			}
		}
		if (this.isRefreshMkIndex && !(this.maplet.sS == ts.tb || this.maplet.sS == ts.ta || this.maplet.sS == ts.lz || this.maplet.sS == ts.ly)) {
			this.refreshMarkerZIndex();
		}
	};
	this.refreshMarkerZIndex = function () {
		if (!this.S0J68() || !this.maplet) {
			return;
		}
		var uT5 = this.maplet.getMarkersInPolygon(this);
		var BC9_L = new Object();
		if (uT5.length > 0) {
			for (var i = 0; i < uT5.length; i++) {
				if (this.bEditable && !uT5[i].bEditable) {
					uT5[i].R_91d(-1);
				} else {
					if (uT5[i].icon.ld.style.zIndex < 0) {
						uT5[i].d15$();
					}
				}
				BC9_L[uT5[i].id] = uT5[i];
			}
		}
		for (var i in this.xR5) {
			if (!BC9_L[this.xR5[i].id]) {
				this.xR5[i].d15$();
			}
		}
		this.xR5 = BC9_L;
	};
	this.S0J68 = function () {
		return this.Ad.getAttribute("fill") != "none" || this.Ad.getAttribute("fill") == true;
	};
	this.i6N0M = function ($2045) {
		if (!this.xR5[$2045.id]) {
			this.xR5[$2045.id] = $2045;
		}
	};
	this.remove = function () {
		if (this.S0J68() && this.bEditable) {
			this.bEditable = false;
			this.refreshMarkerZIndex();
		}
		if (px) {
			if (typeof this.z0 == "object" && this.z0 && this.z0.parentNode) {
				this.z0.parentNode.removeChild(this.z0);
			}
		} else {
			if (typeof this.Ad == "object" && this.Ad && this.Ad.parentNode) {
				this.Ad.parentNode.removeChild(this.Ad);
			}
		}
		if (typeof this.graphics != "undefined") {
			this.graphics.clear();
		}
		for (var l8 in this.ao) {
			MEvent.removeBuiltInListener(this.maplet.map, l8, this.ao[l8]);
			this.ao[l8] = null;
		}
		this.removeContextMenu();
		this.um.remove();
		this.um = null;
		this.maplet = null;
	};
	this.removeContextMenu = function () {
		if (typeof this.contextmenu == "object" && this.contextmenu) {
			if (px) {
				if (this.zX) {
					this.zX.contextmenu = null;
				}
				if (this.z0) {
					this.z0.contextmenu = null;
				}
			}
			if (this.Ad) {
				this.Ad.contextmenu = null;
			}
			this.contextmenu.remove();
			this.contextmenu = null;
		}
	};
	this.openInfoWindow = function (lM) {
		if (this.maplet) {
			if (this.maplet.sS != ts.ty && this.maplet.sS != ts.tu) {
				return;
			}
			if (typeof lM == "undefined") {
				if (this.info != null && this.pts.length >= 2) {
					var Ao = 0;
					var Au = 0;
					for (var i = 1; i < this.pts.length; i++) {
						var zh = cq.vp(this.pts[i].pid);
						Au = this.maplet.zm(zh[1], zh[0]);
						Ao = this.maplet.zl(zh[0], zh[1]);
						if (Ao > this.maplet.width * 2 || Ao < -this.maplet.width || Au < -this.maplet.height || Au > this.maplet.height * 2) {
							this.maplet.setCenter(this.pts[i].pid);
							Ao = this.maplet.width / 2;
							Au = this.maplet.height / 2;
						} else {
							if (iToolTipStyle == 2) {
								this.x = Ao;
								this.y = Au;
								MEvent.trigger(this, "click", this);
							} else {
								this.maplet.wN(Ao, Au, this.info.title, this.info.content);
							}
							break;
						}
					}
				}
			} else {
				if (lM.target.id == this.id && !this.maplet.A924D) {
					var x = lM.clientX - this.maplet.offsetX - this.maplet.left;
					var y = lM.clientY - this.maplet.offsetY - this.maplet.top + 6;
					if (iToolTipStyle == 2) {
						this.x = x;
						this.y = y;
						MEvent.trigger(this, "click", this);
					} else {
						MEvent.trigger(this, "click", this);
						if (this.info) {
							this.maplet.wN(x, y, this.info, false);
						}
					}
				} else {
					if (lM.target.id == this.id && this.maplet.A924D) {
						this.maplet.A924D = false;
					}
				}
			}
		}
	};
	this.wQ = function (fg) {
		if (this.z9 != null) {
			if (fg) {
				this.z9.style.display = "block";
				this.z9.style.zIndex = 10;
			} else {
				this.z9.style.display = "none";
				this.z9.style.zIndex = 0;
			}
		}
	};
	this.uG = function (lM) {
		if (this.bEditable || this.maplet.sS == ts.tu) {
			if (this.ls || this.zX != null && this.maplet && fJ(lM.target, px ? this.z0 : this.Ad) || fJ(lM.target, this.z9)) {
				if (px) {
					this.Ad.opacity = parseInt(this.brush.stroke) == 0 ? 0 : 1;
				} else {
					this.Ad.setAttribute("stroke-opacity", 1);
				}
				this.wQ(true);
			} else {
				if (px) {
					this.Ad.opacity = parseInt(this.brush.stroke) == 0 ? 0 : this.brush.transparency / 100;
				} else {
					this.Ad.setAttribute("stroke-opacity", this.brush.transparency / 100);
				}
				this.wQ(false);
			}
		}
	};
	this.w0 = function (lM) {
		if (this.zX != null && this.maplet && (px && lM.button == 1 || !px && lM.button == 0) && (this.bEditable || this.maplet.sS == ts.tu) && (fJ(lM.target, px ? this.z9 : this.Ad) || !px && fJ(lM.target, this.z9)) && lM.target.id.indexOf("node") != -1) {
			this.qo = true;
			this.maplet.l6 = lM.target.id;
			this.l0 = px ? lM.offsetX : lM.layerX;
			this.na = px ? lM.offsetY : lM.layerY;
			t9gk = lM.target;
			if (this.wk == null) {
				if (px) {
					this.wk = document.createElement("v:polyline");
					this.wk.unselectable = "on";
					this.wk.id = this.id;
					this.wk.strokecolor = this.brush.color;
					this.wk.strokeweight = this.brush.stroke + "px";
					this.wk.fill = this.brush.fill;
					this.wk.filled = this.brush.fill;
					this.wk.style.position = "absolute";
					this.Ac = document.createElement("v:stroke");
					this.Ac.opacity = parseInt(this.brush.stroke) == 0 ? 0 : 1;
					this.Ac.joinstyle = "round";
					this.Ac.endcap = "round";
					this.Ac.fill = this.brush.fill;
					this.Ac.dashstyle = "dash";
					var Ab = document.createElement("v:fill");
					Ab.opacity = ((this.brush.bgtransparency) / 100);
					Ab.color = this.brush.bgcolor;
					this.wk.appendChild(Ab);
				} else {
					this.wk = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					this.wk.setAttribute("version", "1.1");
					this.wk.setAttribute("overflow", "visible");
					this.wk.setAttribute("viewBox", "0 0 " + this.maplet.width + " " + this.maplet.height);
					this.wk.setAttribute("height", this.maplet.height + "px");
					this.wk.setAttribute("width", this.maplet.width + "px");
					this.wk.setAttribute("unselectable", "on");
					this.Ac = document.createElementNS("http://www.w3.org/2000/svg", "path");
					this.Ac.setAttribute("MStrName", this.toString());
					this.Ac.setAttribute("stroke-linejoin", "round");
					this.Ac.setAttribute("stroke-linecap", "round");
					this.Ac.setAttribute("stroke", this.brush.color);
					this.Ac.setAttribute("stroke-width", this.brush.stroke + "px");
					this.Ac.setAttribute("stroke-opacity", 1);
					this.Ac.setAttribute("style", "stroke-dasharray:10,15");
					this.Ac.setAttribute("fill-opacity", this.brush.bgtransparency / 100);
					this.Ac.setAttribute("fill", (this.brush.fill) ? this.brush.bgcolor : "none");
					this.Ac.setAttribute("onmouseover", "this.style.cursor = \"pointer\"");
					this.Ac.setAttribute("onmousedown", "this.style.cursor = \"move\"");
					if (this.brush.arrow) {
						this.arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
						this.arrow.setAttribute("d", "M 0 0 L 10 5 L 0 10 L 4 5 z");
						this.arrow.setAttribute("fill", this.brush.color);
						this.arrow.setAttribute("fill-opacity", this.brush.bgtransparency / 100 + 0.3);
						this.zY = document.createElementNS("http://www.w3.org/2000/svg", "marker");
						this.zY.setAttribute("id", "arrow" + this.id);
						this.zY.setAttribute("viewBox", "0 0 10 10");
						this.zY.setAttribute("refX", "6");
						this.zY.setAttribute("refY", "5");
						this.zY.setAttribute("markerUnits", "strokeWidth");
						this.zY.setAttribute("orient", "auto");
						this.zY.appendChild(this.arrow);
						this.zY.appendChild(this.arrow);
						this.wk.appendChild(this.zY);
					}
				}
			}
			this.wk.appendChild(this.Ac);
			this.zX.appendChild(this.wk);
		}
	};
	this.f9 = function (lM) {
		if (t9gk != null && (this.bEditable || this.maplet.sS == ts.tu) && t9gk.id.indexOf("node") > 0 && this.qo) {
			if (t9gk != null) {
				var x = lM.clientX - this.maplet.offsetX - this.maplet.left - this.l0;
				var y = lM.clientY - this.maplet.offsetY - this.maplet.top - this.na;
				t9gk.style.left = (parseInt(x)) + "px";
				t9gk.style.top = (parseInt(y)) + "px";
				this.lw = new Date().getTime();
				this.ls = true;
				var ps = parseInt(t9gk.qf);
				var Aa = new String(px ? "" : "M");
				if (t9gk.id.indexOf("_midnode_") > 0) {
					Aa += this.aP[ps - 1] + "," + this.aR[ps - 1];
					Aa += (px ? "," : "L") + (x + 5) + "," + (y + 5);
					Aa += (px ? "," : "L") + this.aP[ps] + "," + this.aR[ps];
				} else {
					if (ps > 0) {
						Aa += this.aP[ps - 1] + "," + this.aR[ps - 1] + (px ? "," : "");
					}
					Aa += ((ps > 0 && !px) ? "L" : "") + (x + 5) + "," + (y + 5);
					if (ps < this.aP.length - 1) {
						Aa += (px ? "," : "L") + this.aP[ps + 1] + "," + this.aR[ps + 1];
					}
				}
				if (this.wk != null) {
					if (this.wk.points) {
						this.wk.points.value = Aa;
					} else {
						if (px) {
							this.wk.value = Aa;
						} else {
							this.Ac.setAttribute("d", Aa);
						}
					}
				}
			}
		}
	};
	this.l1 = function (lM) {
		if (this.zX != null && this.maplet && (this.bEditable || this.maplet.sS == ts.tu) && this.qo) {
			if (t9gk != null) {
				var x = parseInt(lM.clientX) - parseInt(this.maplet.offsetX) - parseInt(this.maplet.left) - this.l0;
				var y = parseInt(lM.clientY) - parseInt(this.maplet.offsetY) - parseInt(this.maplet.top) - this.na;
				var ps = parseInt(t9gk.qk);
				var ud = this.maplet.toMapCoordinate(x + 5, y + 5);
				if (t9gk.id.indexOf("_midnode_") > 0) {
					this.pts.splice(ps, 0, new MPoint(ud));
				} else {
					this.pts.splice(ps, 1, new MPoint(ud));
				}
			}
			this.qo = false;
			MEvent.trigger(this, "drag", this);
			MEvent.trigger(this.maplet, "edit", this);
			if (this.ls) {
				this.lw = new Date().getTime();
				this.ls = false;
			}
			if (this.wk.parentNode != null) {
				this.wk.parentNode.removeChild(this.wk);
				this.wk = null;
			}
			this.zI();
		}
		if (this.maplet && this.maplet.l6 == this.id) {
			this.maplet.l6 = null;
		}
	};
	this.removeNode = function (qf) {
		if (typeof qf != "undefined") {
			if (qf.toString().indexOf(this.id) >= 0 && qf.toString().lastIndexOf("_") >= 0) {
				qf = qf.toString().substring(qf.toString().lastIndexOf("_") + 1);
			}
			qf = parseInt(qf);
			if (!isNaN(qf) && qf < this.pts.length) {
				this.pts.splice(qf, 1);
				MEvent.trigger(this, "edit", this);
				MEvent.trigger(this.maplet, "edit", this);
				if (typeof this.z9 != "undefined" && this.z9 != null) {
					for (var uy in this.z9) {
						if (typeof uy == "object") {
							this.z9.removeChild(uy);
						}
					}
				}
				if (this.wk != null && this.wk.parentNode != null) {
					this.wk.parentNode.removeChild(this.wk);
					this.wk = null;
				}
				this.maplet.refresh();
			}
		}
	};
	MEvent.bind(this.un, "select", this, this.removeNode);
};
var MLabel = function (xP, xoffset, yoffset, opacity) {
	this.label = xP;
	this.xoffset = (typeof xoffset == "undefined") ? 8 : parseInt(xoffset);
	this.yoffset = (typeof yoffset == "undefined") ? -12 : parseInt(yoffset);
	this.ld = document.createElement("div");
	this.ld.className = "tiplabel";
	this.ld.unselectable = "on";
	this.ld.style.zIndex = 10;
	this.ld.style.position = "absolute";
	this.ld.style.visibility = "visible";
	this.ld.style.cursor = px ? "hand" : "pointer";
	if (px && typeof opacity != "undefined") {
		this.ld.style.filter = "alpha( opacity = " + parseInt(opacity) + " )";
	} else {
		if (!px && typeof opacity != "undefined") {
			this.ld.style.MozOpacity = parseInt(opacity) / 100;
		}
	}
	this.wz = function (id) {
		this.ld.id = "OverlayBg" + id;
	};
	this.setContextMenu = function (menu) {
		this.contextmenu = menu;
		this.ld.contextmenu = menu;
	};
	this.qc = function (sW) {
		this.setContextMenu(sW.contextmenu);
	};
	this.zI = function (maplet, left, top) {
		if (this.ld.parentNode != maplet.lA.ld) {
			this.ld.innerHTML = this.label;
			maplet.lA.appendChild(this.ld);
		}
		this.ld.style.left = (parseInt(left) + this.xoffset) + "px";
		this.ld.style.top = (parseInt(top) + this.yoffset) + "px";
	};
	this.remove = function () {
		if (this.ld && this.ld.parentNode) {
			this.ld.parentNode.removeChild(this.ld);
		}
	};
	this.toString = function () {
		return "com.mapbar.maplet.MLabel";
	};
	this.NTO3 = this.ld.style.zIndex;
	this.R_91d = function (T3QU1) {
		if (this.ld && this.ld.parentNode && T3QU1 != this.ld.style.zIndex) {
			this.NTO3 = this.ld.style.zIndex;
			this.ld.style.zIndex = T3QU1;
		}
	};
	this.d15$ = function () {
		if (this.NTO3 != this.ld.style.zIndex) {
			this.R_91d(this.NTO3);
		}
	};
};
var MInfoWindow = function (ya, xv, yd, $R9GT) {
	this.title = ya;
	this.content = xv;
	this.yd = (typeof yd != "undefined" && "mouseover" == yd.toLowerCase()) ? "mouseover" : "click";
	this.gv = function (x, y) {
		avBubble.uX = this.getOverlay();
		return gp(this.title, x, y, this.content, $R9GT);
	};
	var hk3CC = null;
	this.setOverlay = function (uX) {
		hk3CC = uX;
	};
	this.getOverlay = function () {
		return hk3CC;
	};
	this.toString = function () {
		return "com.mapbar.maplet.MInfoWindow";
	};
	this.setTitle = function (yw) {
		if (ContentInfo) {
			this.title = yw;
			ContentInfo.SetTitle(yw);
		}
	};
	this.setContent = function (fw) {
		if (ContentInfo) {
			this.content = fw;
			ContentInfo.SetContent(fw);
		}
	};
	this.zoomTo = function (type) {
		if (type == "zoomin") {
			this.zoomOut();
		} else {
			if (type == "zoomout") {
				this.zoomIn();
			}
		}
	};
	this.zoomOut = function () {
		if (ContentInfo && typeof ContentInfo.onZoomOut == "function") {
			ContentInfo.onZoomOut();
		}
	};
	this.zoomIn = function () {
		if (ContentInfo && typeof ContentInfo.onZoomIn == "function") {
			ContentInfo.onZoomIn();
		}
	};
	this.getBodySize = function () {
		var size = {width:0, height:0};
		if (ContentInfo) {
			size.width = ContentInfo.Aj;
			size.height = ContentInfo.c1;
		}
		return size;
	};
	this.setZMBtnVisible = function (z6) {
		if (ContentInfo) {
			ContentInfo.D6_(z6);
		} else {
			avBubble.DoJ5U = z6;
		}
	};
	this.getZMBtnVisible = function () {
		if (ContentInfo) {
			return ContentInfo.i207u();
		}
		return false;
	};
};
var ContentInfo = null;
var gp = function (title, left, top, f5) {
	hideBubble(maplet);
	var bubble_my_mixwidth = (maplet.width > 700) ? 650 : maplet.width - 50;
	var bubble_my_mixhieght = (maplet.height > 600) ? 550 : maplet.height - 50;
	avBubble.left = parseInt(left) - (parseInt(avBubble.width) / 2 - avBubble.l2O_u);
	avBubble.top = parseInt(top) - (parseInt(avBubble.height) + avBubble.eoaE9);
	avBubble.head = title;
	avBubble.body = f5;
	avBubble.calcLatLon();
	if (ContentInfo == null) {
		ContentInfo = new CornerTip("mybubble", avBubble.left, avBubble.top, avBubble.width, avBubble.height, 100);
		ContentInfo.onClosed = function () {
			var u23 = ContentInfo.q3 + ContentInfo.cb.q3;
			var C643 = ContentInfo.zt + ContentInfo.nV;
			var vj = 0, vk = 0;
			if (u23 < 0) {
				vj = Math.abs(u23) + 50;
			}
			if (C643 > maplet.height) {
				vk = -(C643 - maplet.height + 50);
			}
			maplet.panTo(vj, vk);
			hideBubble(maplet);
		};
		ContentInfo.onZoomOut = function () {
			MEvent.trigger(avBubble.uX, "bubble_zoomout", avBubble.uX);
			var c7 = maplet.b9L();
			ContentInfo.ag(c7.width, c7.height);
			ContentInfo.ys(za.AW);
			ContentInfo.LayoutContent();
			avBubble.syncContentInfoPosition();
			avBubble.calcLatLon();
			var vj = ContentInfo.q3 - ((maplet.width - c7.width) / 2);
			var vk = ContentInfo.zt - ((maplet.height - c7.height) / 2);
			maplet.panTo(-vj, -vk);
		};
		ContentInfo.onZoomIn = function () {
			MEvent.trigger(avBubble.uX, "bubble_zoomin", avBubble.uX);
			ContentInfo.af(avBubble.width, avBubble.height);
			ContentInfo.ys(za.AX);
			ContentInfo.LayoutContent();
			avBubble.syncContentInfoPosition();
			avBubble.calcLatLon();
			var u23 = ContentInfo.q3 + ContentInfo.cb.q3;
			var C643 = ContentInfo.zt + ContentInfo.nV;
			var vj = 0, vk = 0;
			if (u23 < 0) {
				vj = Math.abs(u23) + 50;
			}
			if (C643 > maplet.height) {
				vk = -(C643 - maplet.height + 50);
			}
			maplet.panTo(vj, vk);
		};
		ContentInfo.jA4D2 = function (h80T_) {
			MEvent.trigger(avBubble.uX, "bubble_zoomend", h80T_);
			MEvent.trigger(maplet, "iw_zoomend", avBubble.uX.info, h80T_ == "out" ? "zoomin" : "zoomout");
		};
		ContentInfo.Show(avBubble.DoJ5U);
		ContentInfo.SetTitle(avBubble.head);
		ContentInfo.SetContent(avBubble.body);
	} else {
		ContentInfo.zoomTo(parseInt(avBubble.width), parseInt(avBubble.height));
		ContentInfo.wA(avBubble.top, avBubble.left);
		ContentInfo.SetTitle(avBubble.head);
		ContentInfo.SetContent(avBubble.body);
		ContentInfo.LayoutContent();
	}
	return document.getElementById("bubble");
};
function hideBubble(maplet) {
	avBubble.xR = "";
	var nN = document.getElementById("bubble");
	if (nN && nN.style.display != "none") {
		nN.style.display = "none";
		MEvent.trigger(maplet, "iw_hide");
	}
	if (typeof maplet != "undefined" && maplet.fp != null) {
		maplet.fp = null;
		maplet.refresh();
	} else {
		if (document["mapbar-maplet"] != "undefined" && document["mapbar-maplet"].fp != null) {
			document["mapbar-maplet"].fp = null;
			document["mapbar-maplet"].refresh();
		}
	}
	if (nN && nN.style.display != "none") {
		nN.style.display = "none";
		nN.style.visibility = "hidden";
	}
	if (ContentInfo) {
		ContentInfo.ys(za.AX);
	}
}
var fq = function () {
	this.xR = "";
	this.DoJ5U = false;
	this.left = 0;
	this.top = 0;
	this.head = new String();
	this.body = new String();
	this.width = 300;
	this.height = 300;
	this.uX = null;
	this.l2O_u = 27;
	this.eoaE9 = 3;
	this.xoffset = 0;
	this.SK15 = function (head) {
		this.head = head;
	};
	this.E25_f = function (body) {
		this.body = body;
	};
	this.gl = function () {
	};
	this.calcLatLon = function () {
		this.xR = maplet.toMapCoordinate(this.left, this.top);
	};
	this.syncContentInfoPosition = function () {
		if (ContentInfo) {
			this.left = ContentInfo.q3;
			this.top = ContentInfo.zt;
		}
	};
	this.C75y = function () {
		if (ContentInfo && this.xR && document.getElementById("bubble").style.display != "none") {
			var zh = cq.vp(this.xR);
			var x = maplet.zl(zh[0], zh[1]);
			var y = maplet.zm(zh[1], zh[0]);
			var offsetX = ContentInfo.q3 - x;
			var offsetY = ContentInfo.zt - y;
			ContentInfo.wA(ContentInfo.zt + (-offsetY), ContentInfo.q3 + (-offsetX));
			this.xR = maplet.toMapCoordinate(ContentInfo.q3, ContentInfo.zt);
		}
	};
};
var avBubble = new fq();
function aa(lT) {
	if (typeof lT == "string") {
		return document.getElementById(lT);
	} else {
		return null;
	}
}
function aj(y2) {
	if (window.HTMLElement) {
		y2 = y2.replace(new RegExp("(\\[imgsrc\\])", "g"), "src='" + strImgsvrUrl + "images/newbubbleimg/context.png'");
		y2 = y2.replace(new RegExp("(\\[imgfilter\\])", "g"), "");
		y2 = y2.replace(new RegExp("(\\[shadowsrc\\])", "g"), "src='" + strImgsvrUrl + "images/newbubbleimg/yy.png'");
		y2 = y2.replace(new RegExp("(\\[shadowfilter\\])", "g"), "");
	} else {
		y2 = y2.replace(new RegExp("(\\[imgsrc\\])", "g"), "src='" + strImgsvrUrl + "images/newbubbleimg/mbblank.gif'");
		y2 = y2.replace(new RegExp("(\\[imgfilter\\])", "g"), "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + strImgsvrUrl + "images/newbubbleimg/context.png,sizingMethod=scale);");
		y2 = y2.replace(new RegExp("(\\[shadowsrc\\])", "g"), "src='" + strImgsvrUrl + "images/newbubbleimg/mbblank.gif'");
		y2 = y2.replace(new RegExp("(\\[shadowfilter\\])", "g"), "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + strImgsvrUrl + "images/newbubbleimg/yy.png,sizingMethod=scale);");
	}
	return y2;
}
var gh = new function () {
	this._5YJ = 640;
	this.Pka = 590;
	this.v9641 = 250;
	this.aD11X = 150;
	this.pD = "[imgsrc]";
	this.pK = "[imgfilter]position:absolute;width:690px;height:786px;";
	this.wH = "[shadowsrc]";
	this.wI = "[shadowfilter]position:absolute;width:1044px;height:370px;";
	this.gj = 30;
	this.gf = 30;
	this.cd = 84;
	this.ck = 98;
	this.le = "position:absolute;overflow:hidden;";
	this.sq = "left:0px;top:0px;" + this.pK;
	this.qY = "left:0px;top:-660px;" + this.pK;
	this.wj = "left:-660px;top:0px;" + this.pK;
	this.vN = "left:-660px;top:-660px;" + this.pK;
	this.sp = 56;
	this.sn = 26;
	this.qX = 34;
	this.qV = 27;
	this.wi = 33;
	this.wg = 26;
	this.vM = 50;
	this.vK = 27;
	this.so = "left:-9px;top:-4px;" + this.wI;
	this.qW = "left:-30px;top:-310px;" + this.wI;
	this.wh = "left:-743px;top:-4px;" + this.wI;
	this.vL = "left:-382px;top:-310px;" + this.wI;
	this.yE = "left:-31px;top:0px;" + this.pK;
	this.cD = "left:-31px;top:-660px;" + this.pK;
	this.st = "left:0px;top:-31px;" + this.pK;
	this.wo = "left:-660px;top:-31px;" + this.pK;
	this.yD = "left:-64px;top:-4px;" + this.wI;
	this.cC = "left:-130px;top:-310px;" + this.wI;
	this.cj = "left:0px;top:-700px;" + this.pK;
	this.ci = 140;
	this.cg = 60;
	this.ch = "left:-473px;top:-310px;" + this.wI;
	this.fZ = 14;
	this.fX = 13;
	this.fY = "position:absolute;background-image:url(" + strImgsvrUrl + "images/newbubbleimg/mb_close.gif);background-repeat:no-repeat;";
	this.AR = 14;
	this.AQ = 13;
	this.AM = "position:absolute;background-image:url(" + strImgsvrUrl + "images/newbubbleimg/mb_plus.gif);background-repeat:no-repeat;";
	this.Ay = "position:absolute;background-image:url(" + strImgsvrUrl + "images/newbubbleimg/mb_minus.gif);background-repeat:no-repeat;";
	this.f7 = "left:-294px;top:-30px;" + this.wI;
};
var yY = {q7:1, q5:2, v8:3, v7:4};
function yX(gg, direction) {
	this.pj = gg;
	this.g6 = direction;
	this.q3 = 0;
	this.zt = 0;
	this.nA = function () {
		var v5 = "<div id='" + this.pj + "' unselectable='on' style='" + gh.le + "left:" + this.q3 + "px;top:" + this.zt + "px;width:" + gh.gj + "px;height:" + gh.gf + "px;'><img id='" + this.pj + "_Img' " + gh.pD + " style='";
		switch (direction) {
		  case yY.q7:
			v5 += gh.sq;
			break;
		  case yY.q5:
			v5 += gh.qY;
			break;
		  case yY.v8:
			v5 += gh.wj;
			break;
		  case yY.v7:
			v5 += gh.vN;
			break;
		  default:
			break;
		}
		return v5 + "'></div>";
	};
}
function yZ(wG, direction) {
	this.pj = wG;
	this.g6 = direction;
	this.q3 = 0;
	this.zt = 0;
	this.nA = function () {
		var v5 = "<div id='" + this.pj + "' unselectable='on' style='" + gh.le + "left:" + this.q3 + "px;top:" + this.zt + "px;";
		switch (direction) {
		  case yY.q7:
			v5 += "width:" + gh.sp + "px;height:" + gh.sn + "px;'><img id='" + this.pj + "_Img' " + gh.wH + " style='" + gh.so;
			break;
		  case yY.q5:
			v5 += "width:" + gh.qX + "px;height:" + gh.qV + "px;'><img id='" + this.pj + "_Img' " + gh.wH + " style='" + gh.qW;
			break;
		  case yY.v8:
			v5 += "width:" + gh.wi + "px;height:" + gh.wg + "px;'><img id='" + this.pj + "_Img' " + gh.wH + " style='" + gh.wh;
			break;
		  case yY.v7:
			v5 += "width:" + gh.vM + "px;height:" + gh.vK + "px;'><img id='" + this.pj + "_Img' " + gh.wH + " style='" + gh.vL;
			break;
		  default:
			break;
		}
		return v5 + "'></div>";
	};
}
var yR = {zv:1, c6:2, q8:3, v9:4};
function yQ(c5, direction) {
	this.pj = c5;
	this.g6 = direction;
	this.zt = 0;
	this.q3 = 0;
	this.Aj = 0;
	this.nV = 0;
	this.nA = function () {
		var v5 = "<div id='" + this.pj + "' unselectable='on' style='" + gh.le + "left:" + this.q3 + "px;top:" + this.zt + "px;width:" + this.Aj + "px;height:" + this.nV + "px;'>" + "<img id='" + this.pj + "_Img' " + gh.pD + " style='";
		switch (direction) {
		  case yR.zv:
			v5 += gh.yE;
			break;
		  case yR.c6:
			v5 += gh.cD;
			break;
		  case yR.q8:
			v5 += gh.st;
			break;
		  case yR.v9:
			v5 += gh.wo;
			break;
		  default:
			break;
		}
		return v5 + "'></div>";
	};
}
function yS(wG, direction) {
	this.pj = wG;
	this.g6 = direction;
	this.zt = 0;
	this.q3 = 0;
	this.Aj = 0;
	this.nV = 0;
	this.nA = function () {
		var v5 = "";
		switch (direction) {
		  case yR.zv:
			v5 = "<div id='" + this.pj + "' unselectable='on' style='" + gh.le + "left:" + this.q3 + "px;top:" + this.zt + "px;width:" + this.Aj + "px;height:" + this.nV + "px;'><img id='" + this.pj + "_Img' " + gh.wH + " style='" + gh.yD + "'></div>";
			break;
		  case yR.c6:
			v5 = "<div id='" + this.pj + "' unselectable='on' style='" + gh.le + "left:" + this.q3 + "px;top:" + this.zt + "px;width:" + this.Aj + "px;height:" + this.nV + "px;'><img id='" + this.pj + "_Img' " + gh.wH + " style='" + gh.cC + "'></div>";
			break;
		  case yR.q8:
			v5 = "<div id='" + this.pj + "' unselectable='on' style='" + gh.le + "left:" + this.q3 + "px;top:" + this.zt + "px;width:" + this.Aj + "px;height:" + this.nV + "px;'><img id='" + this.pj + "_Img' " + gh.wH + " style='" + gh.wI + "top:-" + (280 - this.nV + 24) + "px;'></div>";
			break;
		  case yR.v9:
			v5 = "<div id='" + this.pj + "' unselectable='on' style='" + gh.le + "left:" + this.q3 + "px;top:" + this.zt + "px;width:" + this.Aj + "px;height:" + this.nV + "px;'><img id='" + this.pj + "_Img' " + gh.wH + " style='" + gh.wI + "left:-758px;top:-" + (280 - this.Aj + 41) + "px;'></div>";
			break;
		  default:
			break;
		}
		return v5;
	};
}
function yO(ce) {
	this.pj = ce;
	this.q3 = 0;
	this.zt = 0;
	this.Aj = 0;
	this.nV = 0;
	this.nA = function () {
		return "<div id='" + this.pj + "' unselectable='on' style='" + gh.le + "left:" + this.q3 + "px;top:" + this.zt + "px;width:" + this.Aj + "px;height:" + this.nV + "px;'>" + "<img id='" + this.pj + "_Img' " + gh.pD + " style='" + gh.cj + "'></div>";
	};
}
function yP(ce) {
	this.pj = ce;
	this.q3 = 0;
	this.zt = 0;
	this.Aj = 0;
	this.nV = 0;
	this.nA = function () {
		return "<div id='" + this.pj + "' unselectable='on' style='" + gh.le + "left:" + this.q3 + "px;top:" + this.zt + "px;width:" + this.Aj + "px;height:" + this.nV + "px;'>" + "<img id='" + this.pj + "_Img' " + gh.wH + " style='" + gh.ch + "'></div>";
	};
}
function y7(zc, AA) {
	this.pj = zc;
	this.zd = zc + "_TitleTd";
	this.q3 = 0;
	this.zt = 0;
	this.Aj = 0;
	this.nV = 0;
	this.ze = AA;
	this.nA = function () {
		return "<table id='" + this.pj + "' unselectable='on' style='position:absolute; top:" + this.zt + "px;left:" + this.q3 + "px;width:" + this.Aj + "px;height:" + this.nV + "px;background-color:white;z-Index:" + this.ze + "'><tr><td id='" + this.zd + "'></td><td style='width:20px;'></td></tr></table>";
	};
	this.SetTitle = function (title) {
		if (aa(this.zd) != undefined) {
			aa(this.zd).innerHTML = "<strong style='font-size:14px'>" + title + "</strong>";
		}
	};
	this.nw = function () {
		if (aa(this.pj) != undefined) {
			return aa(this.pj).clientHeight;
		} else {
			return this.nV;
		}
	};
}
function yV(f4) {
	this.pj = f4;
	this.f3 = "";
	this.q3 = 0;
	this.zt = 0;
	this.Aj = 0;
	this.nV = 0;
	this.nA = function () {
		return "<div id='" + this.pj + "' unselectable='on' style='overflow:auto;position:absolute; top:" + this.zt + "px;left:" + this.q3 + "px;width:" + this.Aj + "px;height:" + this.nV + "px;background-color:white;'>" + this.f3 + "</div>";
	};
}
function yW(wG) {
	this.pj = wG;
	this.q3 = 0;
	this.zt = 0;
	this.Aj = 0;
	this.nV = 0;
	this.nA = function () {
		return "<div id='" + this.pj + "' unselectable='on' style='" + gh.le + "left:" + this.q3 + "px;top:" + this.zt + "px;width:" + this.Aj + "px;height:" + this.nV + "px;'>" + "<img id='" + this.pj + "_Img' " + gh.wH + " style='" + gh.f7 + "'></div>";
	};
}
function yT(fm, AA) {
	this.pj = fm;
	this.zt = 0;
	this.q3 = 0;
	this.Aj = 0;
	this.nV = 0;
	this.fn = AA;
	this.nA = function () {
		return "<div id='" + this.pj + "' unselectable='on' style='" + gh.fY + "  width:" + this.Aj + "px; height:" + this.nV + "px; top:" + this.zt + "px;left:" + this.q3 + "px;z-index:" + this.fn + ";cursor:pointer;'></div>";
	};
}
var za = {AX:1, AW:2};
function y0(fm, type, nv, nu, AA) {
	this.pj = fm;
	this.ft = type;
	this.q3 = 0;
	this.zt = 0;
	this.Aj = 0;
	this.nV = 0;
	this.onZoomOut = nv;
	this.onZoomIn = nu;
	this.fn = AA;
	this.nA = function (z6) {
		var v5 = "<div id='" + this.pj + "' unselectable='on' style='left:" + this.q3 + "px;top:" + this.zt + "px;width:" + this.Aj + "px;height:" + this.nV + "px;z-index:" + this.fn + ";cursor:pointer;";
		if (!z6) {
			v5 += "display:none";
		}
		v5 += ";";
		switch (this.ft) {
		  case za.AX:
			v5 += gh.AM + "' ";
			break;
		  case za.AW:
			v5 += gh.Ay + "' ";
			break;
		  default:
			break;
		}
		return v5 + "></div>";
	};
	this.yr = function (type) {
		if (aa(this.pj) != undefined && this.ft != type) {
			this.ft = type;
			if (this.ft == za.AW && this.onZoomIn != null) {
				aa(this.pj).style.backgroundImage = "url(" + strImgsvrUrl + "images/newbubbleimg/mb_minus.gif)";
				if (window.HTMLElement) {
					aa(this.pj).removeEventListener("click", this.onZoomOut, false);
					aa(this.pj).addEventListener("click", this.onZoomIn, false);
				} else {
					aa(this.pj).detachEvent("onclick", this.onZoomOut);
					aa(this.pj).attachEvent("onclick", this.onZoomIn);
				}
			} else {
				if (this.onZoomOut != null) {
					aa(this.pj).style.backgroundImage = "url(" + strImgsvrUrl + "images/newbubbleimg/mb_plus.gif)";
					if (window.HTMLElement) {
						aa(this.pj).removeEventListener("click", this.onZoomIn, false);
						aa(this.pj).addEventListener("click", this.onZoomOut, false);
					} else {
						aa(this.pj).detachEvent("onclick", this.onZoomIn);
						aa(this.pj).attachEvent("onclick", this.onZoomOut);
					}
				}
			}
		}
	};
}
function CornerTip(uH, left, top, width, height, AA) {
	this.TipId = uH;
	this.sk = null;
	this.qT = null;
	this.we = null;
	this.vH = null;
	this.yB = null;
	this.cy = null;
	this.sr = null;
	this.wl = null;
	this.cb = null;
	this.AD = null;
	this.zb = null;
	this.f3 = null;
	this.wD = null;
	this.zt = top;
	this.q3 = left;
	this.Aj = width;
	this.nV = height;
	this.c1 = height - gh.cd + 15;
	this.y3 = "";
	this.fW = null;
	this.onZoomOut = null;
	this.onZoomIn = null;
	this.jA4D2 = null;
	this.onClosed = null;
	this.y9 = AA;
	this.wA = function (top, left) {
		if (aa(this.TipId) != null) {
			var offsetY = this.wD.zt - (this.zt - top);
			var offsetX = this.wD.q3 - (this.q3 - left);
			this.wD.wA(offsetY, offsetX);
			this.zt = top;
			aa(this.TipId).style.top = this.zt + "px";
			this.q3 = left;
			aa(this.TipId).style.left = this.q3 + "px";
		}
	};
	this.Show = function (EqCQ7) {
		this.y3 = "<div id='" + this.TipId + "' unselectable='on' style='position:absolute; top:" + this.zt + "px;left:" + this.q3 + "px;width:" + this.Aj + "px;height:" + this.nV + "px;z-index:" + this.y9 + ";'>";
		this.sk = new yX(uH + "_LTCorner", yY.q7);
		this.qT = new yX(uH + "_LBCorner", yY.q5);
		this.qT.zt = this.c1 - gh.gf;
		this.we = new yX(uH + "_RTCorner", yY.v8);
		this.we.q3 = this.Aj - gh.gj;
		this.vH = new yX(uH + "_RBCorner", yY.v7);
		this.vH.zt = this.qT.zt;
		this.vH.q3 = this.we.q3;
		this.y3 += this.sk.nA() + this.qT.nA() + this.we.nA() + this.vH.nA();
		this.yB = new yQ(uH + "_THBorder", yR.zv);
		this.yB.q3 = gh.gj;
		this.yB.Aj = this.Aj - gh.gj * 2;
		this.yB.nV = gh.gf;
		this.cy = new yQ(uH + "_BHBorder", yR.c6);
		this.cy.zt = this.c1 - gh.gf;
		this.cy.q3 = gh.gj;
		this.cy.Aj = this.Aj - gh.gj * 2;
		this.cy.nV = gh.gf;
		this.sr = new yQ(uH + "_LVBorder", yR.q8);
		this.sr.zt = gh.gf;
		this.sr.Aj = gh.gj;
		this.sr.nV = this.c1 - gh.gf * 2;
		this.wl = new yQ(uH + "_RVBorder", yR.v9);
		this.wl.zt = gh.gf;
		this.wl.q3 = this.Aj - gh.gj;
		this.wl.Aj = gh.gj;
		this.wl.nV = this.c1 - gh.gf * 2;
		this.y3 += this.yB.nA() + this.cy.nA() + this.sr.nA() + this.wl.nA();
		this.cb = new yO(uH + "_Bar");
		this.cb.zt = this.c1 - 15;
		var pA = Math.round((this.Aj - gh.gj - gh.ck) / 2);
		this.cb.q3 = gh.gj + pA;
		this.cb.Aj = gh.ck;
		this.cb.nV = gh.cd;
		this.y3 += this.cb.nA();
		this.AD = new y0(uH + "_ZMBtn", za.AX, this.onZoomOut, this.onZoomIn, this.y9 + 1);
		this.AD.zt = 10;
		this.AD.q3 = this.Aj - 45;
		this.AD.Aj = gh.AR;
		this.AD.nV = gh.AQ;
		this.y3 += this.AD.nA(EqCQ7);
		this.fW = new yT(uH + "_CBtn", this.y9 + 1);
		this.fW.zt = 10;
		this.fW.q3 = this.Aj - 30;
		this.fW.Aj = gh.fZ;
		this.fW.nV = gh.fX;
		this.y3 += this.fW.nA();
		this.zb = new y7(uH + "_Title", this.y9);
		this.zb.zt = this.fW.zt;
		this.zb.q3 = 10;
		this.zb.Aj = this.fW.q3;
		this.zb.nV = 30;
		this.y3 += this.zb.nA();
		this.f3 = new yV(this.TipId + "_Content");
		this.f3.q3 = 10;
		this.f3.Aj = this.Aj - 20;
		this.y3 += this.f3.nA();
		this.y3 += "</div>";
		var yp = this.Aj * 1.3;
		var ym = Math.round(this.nV * 0.6);
		var yo = this.zt + Math.round(this.nV * 0.4);
		var yn = this.q3 + Math.round(this.Aj * 0.3);
		this.wD = new gi(this.TipId + "_Shadow", yn, yo, yp, ym, this.y9 - 1);
		this.y3 += this.wD.nA();
		this.y3 = aj(this.y3);
		var uB = document.createElement("DIV");
		uB.innerHTML = this.y3;
		uB.id = "bubble";
		uB.style.display = "none";
		uB.unselectable = "on";
		document.body.appendChild(uB);
		this.LayoutContent();
		var wE = this.q3 + this.cb.q3 + this.cb.Aj - 60;
		yn = wE - parseInt(aa(this.wD.cA.pj).style.width) - gh.qX;
		aa(this.wD.pj).style.left = this.wD.q3 = yn;
		aa(this.wD.pj).style.visibility = "visible";
		if (this.onZoomOut != null && aa(this.AD.pj) != undefined) {
			if (window.HTMLElement) {
				aa(this.AD.pj).addEventListener("click", this.onZoomOut, false);
			} else {
				aa(this.AD.pj).attachEvent("onclick", this.onZoomOut);
			}
		}
		if (aa(this.fW.pj) != undefined) {
			if (window.HTMLElement) {
				aa(this.fW.pj).addEventListener("click", this.ah, false);
				if (this.onClosed != null) {
					aa(this.fW.pj).addEventListener("click", this.onClosed, false);
				}
			} else {
				aa(this.fW.pj).attachEvent("onclick", this.ah);
				if (this.onClosed != null) {
					aa(this.fW.pj).attachEvent("onclick", this.onClosed);
				}
			}
		}
	};
	this.SetContent = function (content) {
		if (aa(this.f3.pj)) {
			if (typeof (content) == "string" || content instanceof String) {
				aa(this.f3.pj).innerHTML = "<div style='font-size:13px'>" + content + "</div>";
			} else {
				if (typeof (content) == "object" && content.tagName) {
					aa(this.f3.pj).appendChild(content);
				}
			}
		}
	};
	this.SetTitle = function (title) {
		if (this.zb && aa(this.zb.pj)) {
			this.zb.SetTitle(title);
			this.LayoutContent();
		}
	};
	this.nx = function () {
		if (this.f3 && aa(this.f3.pj)) {
			if (aa(this.f3.pj).style.display != "none") {
				return true;
			}
		}
		return false;
	};
	this.wx = function (z6) {
		if (this.f3 && aa(this.f3.pj)) {
			if (z6 && !this.nx()) {
				aa(this.f3.pj).style.display = "";
			} else {
				if (this.nx()) {
					aa(this.f3.pj).style.display = "none";
				}
			}
		}
	};
	this.D6_ = function (z6) {
		if (this.AD) {
			aa(this.AD.pj).style.display = z6 ? "" : "none";
		}
	};
	this.i207u = function () {
		if (this.AD) {
			return aa(this.AD.pj).style.display != "none" ? true : false;
		}
		return false;
	};
	this.LayoutContent = function () {
		aa(this.f3.pj).style.width = (this.Aj - 20) + "px";
		this.f3.zt = this.zb.zt + this.zb.nw();
		this.f3.nV = this.c1 - this.zb.nw() - 20;
		aa(this.f3.pj).style.height = this.f3.nV + "px";
		aa(this.f3.pj).style.top = this.f3.zt + "px";
	};
	this.ys = function (type) {
		if (this.AD != undefined) {
			this.AD.yr(type);
		}
	};
	this.zoomTo = function (gZ, gY) {
		if (this.Aj < gZ) {
			this.ag(gZ, gY);
		} else {
			if (this.Aj > gZ) {
				this.af(gZ, gY);
			}
		}
	};
	this.af = function (gZ, gY) {
		if (aa(this.TipId) != undefined) {
			if (this.Aj > gZ) {
				var gS = this.Aj - gZ;
				var nd = this.q3 + (gS / 2);
				aa(this.TipId).style.left = nd + "px";
				this.q3 = nd;
				aa(this.TipId).style.width = (parseInt(aa(this.TipId).style.width) - gS) + "px";
				aa(this.yB.pj).style.width = (parseInt(aa(this.yB.pj).style.width) - gS) + "px";
				aa(this.we.pj).style.left = (parseInt(aa(this.we.pj).style.left) - gS) + "px";
				aa(this.wl.pj).style.left = (parseInt(aa(this.wl.pj).style.left) - gS) + "px";
				aa(this.vH.pj).style.left = (parseInt(aa(this.vH.pj).style.left) - gS) + "px";
				aa(this.cy.pj).style.width = (parseInt(aa(this.cy.pj).style.width) - gS) + "px";
				aa(this.AD.pj).style.left = (parseInt(aa(this.AD.pj).style.left) - gS) + "px";
				this.AD.q3 = parseInt(aa(this.AD.pj).style.left);
				aa(this.fW.pj).style.left = (parseInt(aa(this.fW.pj).style.left) - gS) + "px";
				this.fW.q3 = parseInt(aa(this.fW.pj).style.left);
				aa(this.cb.pj).style.left = (parseInt(aa(this.cb.pj).style.left) - (gS / 2)) + "px";
				aa(this.zb.pj).style.width = (this.zb.Aj = this.fW.q3) + "px";
				this.Aj = gZ;
			}
			if (this.nV > gY) {
				var gR = this.nV - gY;
				var ne = this.zt + gR;
				aa(this.TipId).style.top = ne + "px";
				this.zt = ne;
				aa(this.TipId).style.height = (parseInt(aa(this.TipId).style.height) - gR) + "px";
				aa(this.sr.pj).style.height = (parseInt(aa(this.sr.pj).style.height) - gR) + "px";
				aa(this.qT.pj).style.top = (parseInt(aa(this.qT.pj).style.top) - gR) + "px";
				aa(this.wl.pj).style.height = (parseInt(aa(this.wl.pj).style.height) - gR) + "px";
				aa(this.vH.pj).style.top = (parseInt(aa(this.vH.pj).style.top) - gR) + "px";
				aa(this.cy.pj).style.top = (parseInt(aa(this.cy.pj).style.top) - gR) + "px";
				aa(this.cb.pj).style.top = (parseInt(aa(this.cb.pj).style.top) - gR) + "px";
				this.nV = gY;
				this.c1 = this.nV - gh.cd + 15;
			}
			var yp = this.Aj * 1.3;
			var ym = Math.round(this.nV * 0.6);
			this.wD.wU(yp, ym);
			if (typeof this.jA4D2 == "function") {
				this.jA4D2("in");
			}
		}
	};
	this.ag = function (gZ, gY) {
		if (aa(this.TipId) != undefined) {
			if (this.Aj < gZ) {
				var al = gZ - this.Aj;
				var nd = this.q3 - (al / 2);
				aa(this.TipId).style.left = nd + "px";
				this.q3 = nd;
				aa(this.TipId).style.width = (parseInt(aa(this.TipId).style.width) + al) + "px";
				aa(this.yB.pj).style.width = (parseInt(aa(this.yB.pj).style.width) + al) + "px";
				aa(this.we.pj).style.left = (parseInt(aa(this.we.pj).style.left) + al) + "px";
				aa(this.wl.pj).style.left = (parseInt(aa(this.wl.pj).style.left) + al) + "px";
				aa(this.vH.pj).style.left = (parseInt(aa(this.vH.pj).style.left) + al) + "px";
				aa(this.cy.pj).style.width = (parseInt(aa(this.cy.pj).style.width) + al) + "px";
				this.AD.q3 = parseInt(aa(this.AD.pj).style.left) + al;
				aa(this.AD.pj).style.left = this.AD.q3 + "px";
				this.fW.q3 = parseInt(aa(this.fW.pj).style.left) + al;
				aa(this.fW.pj).style.left = this.fW.q3 + "px";
				aa(this.cb.pj).style.left = (parseInt(aa(this.cb.pj).style.left) + (al / 2)) + "px";
				this.zb.Aj = this.fW.q3;
				aa(this.zb.pj).style.width = this.zb.Aj + "px";
				this.Aj = gZ;
			}
			if (this.nV < gY) {
				var ak = gY - this.nV;
				var ne = this.zt - ak;
				aa(this.TipId).style.top = ne + "px";
				this.zt = ne;
				aa(this.TipId).style.height = (parseInt(aa(this.TipId).style.height) + ak) + "px";
				aa(this.sr.pj).style.height = (parseInt(aa(this.sr.pj).style.height) + ak) + "px";
				aa(this.qT.pj).style.top = (parseInt(aa(this.qT.pj).style.top) + ak) + "px";
				aa(this.wl.pj).style.height = (parseInt(aa(this.wl.pj).style.height) + ak) + "px";
				aa(this.vH.pj).style.top = (parseInt(aa(this.vH.pj).style.top) + ak) + "px";
				aa(this.cy.pj).style.top = (parseInt(aa(this.cy.pj).style.top) + ak) + "px";
				aa(this.cb.pj).style.top = (parseInt(aa(this.cb.pj).style.top) + ak) + "px";
				this.nV = gY;
				this.c1 = this.nV - gh.cd + 15;
			}
			var yp = this.Aj * 1.3;
			var ym = Math.round(this.nV * 0.6);
			this.wD.wU(yp, ym);
			if (typeof this.jA4D2 == "function") {
				this.jA4D2("out");
			}
		}
	};
	this.ah = function () {
		return false;
	};
	this.fV = function () {
		if (!document.all) {
			var l8 = document.gr("MouseEvents");
			l8.qb("click", true, true);
			aa(this.fW.pj).g9(l8);
		} else {
			aa(this.fW.pj).eval("fireEvent(\"onclick\")");
		}
	};
}
CornerTip.ZoomOutTo = function (uR, gZ, gY, qh) {
	var qp = false;
	if (uR.Aj < gZ || uR.nV < gY) {
		uR.wx(false);
		var vm = uR.Aj + 100;
		vm = vm >= gZ ? gZ : vm;
		var vl = uR.nV + 100;
		vl = vl >= gY ? gY : vl;
		uR.ag(vm, vl);
		var ng = function () {
			CornerTip.ZoomOutTo.call(null, uR, gZ, gY, qh);
		};
		window.setTimeout(ng, qh);
		return;
	}
	uR.ys(za.AW);
	uR.LayoutContent();
	uR.wx(true);
};
CornerTip.ZoomInTo = function (uR, gZ, gY, qh) {
	if (uR.Aj > gZ || uR.nV > gY) {
		uR.wx(false);
		var vm = uR.Aj - 100;
		vm = vm <= gZ ? gZ : vm;
		var vl = uR.nV - 100;
		vl = vl <= gY ? gY : vl;
		uR.af(vm, vl);
		var ng = function () {
			CornerTip.ZoomInTo.call(null, uR, gZ, gY, qh);
		};
		window.setTimeout(ng, qh);
		return;
	}
	uR.ys(za.AX);
	uR.LayoutContent();
	uR.wx(true);
};
function gi(wG, left, top, width, height, AA) {
	this.pj = wG;
	this.sm = null;
	this.wf = null;
	this.qU = null;
	this.vJ = null;
	this.yC = null;
	this.cA = null;
	this.cB = null;
	this.ss = null;
	this.wn = null;
	this.cf = null;
	this.f6 = null;
	this.zt = top;
	this.q3 = left;
	this.Aj = width;
	this.nV = height;
	this.c1 = this.nV - 30;
	this.wJ = AA;
	this.wF = "";
	this.wA = function (top, left) {
		this.zt = top;
		this.q3 = left;
		aa(this.pj).style.top = this.zt + "px";
		aa(this.pj).style.left = this.q3 + "px";
	};
	this.nA = function () {
		this.wF = "<div id='" + this.pj + "' unselectable='on' style='position:absolute; top:" + this.zt + "px;left:" + this.q3 + "px;width:" + this.Aj + "px;height:" + this.nV + "px; overflow:hidden;z-index:" + this.wJ + "; visibility:hidden;'>";
		var wm = this.c1 - gh.wg - gh.vK;
		var vI = this.Aj - wm - gh.vM - 6;
		var sl = wm + 11;
		var am = vI + gh.vM;
		var cz = Math.ceil(((am - gh.qX - gh.vM - gh.ci) / 2));
		this.yC = new yS(this.pj + "_THBorder", yR.zv);
		this.yC.q3 = sl + gh.sp;
		this.yC.Aj = this.Aj - this.yC.q3 - gh.wi;
		this.yC.nV = gh.sn;
		this.wn = new yS(this.pj + "_RVBorder", yR.v9);
		this.wn.Aj = wm + 18;
		this.wn.nV = wm;
		this.wn.zt = gh.wg;
		this.wn.q3 = this.Aj - this.wn.Aj;
		this.ss = new yS(this.pj + "_LVBorder", yR.q8);
		this.ss.Aj = wm + 18;
		this.ss.nV = wm;
		this.ss.zt = gh.sn;
		this.ss.q3 = 3;
		this.cA = new yS(this.pj + "_BHBorder1", yR.c6);
		this.cA.Aj = cz;
		this.cA.nV = 30;
		this.cA.zt = this.ss.zt + this.ss.nV;
		this.cA.q3 = gh.qX;
		this.cB = new yS(this.pj + "_BHBorder2", yR.c6);
		this.cB.Aj = cz;
		this.cB.nV = 30;
		this.cB.zt = this.ss.zt + this.ss.nV;
		this.cB.q3 = vI - this.cB.Aj;
		this.wF += this.yC.nA() + this.ss.nA() + this.wn.nA() + this.cA.nA() + this.cB.nA();
		this.cf = new yP(this.pj + "_BarShadow");
		this.cf.zt = this.cA.zt;
		this.cf.q3 = this.cA.q3 + cz;
		this.cf.Aj = gh.ci - ((this.cf.q3 + gh.ci) - this.cB.q3);
		this.cf.nV = gh.cg;
		this.wF += this.cf.nA();
		this.sm = new yZ(this.pj + "_LTCorner", yY.q7);
		this.sm.zt = 0;
		this.sm.q3 = sl;
		this.wf = new yZ(this.pj + "_RTCorner", yY.v8);
		this.wf.q3 = this.Aj - gh.wi;
		this.qU = new yZ(this.pj + "_LBCorner", yY.q5);
		this.qU.zt = this.c1 - gh.qV;
		this.vJ = new yZ(this.pj + "_RBCorner", yY.v7);
		this.vJ.q3 = vI;
		this.vJ.zt = this.c1 - gh.vK;
		this.wF += this.sm.nA() + this.wf.nA() + this.vJ.nA() + this.qU.nA();
		this.f6 = new yW(this.pj + "_Content");
		this.f6.zt = this.ss.zt;
		this.f6.q3 = this.ss.q3 + this.ss.Aj;
		this.f6.Aj = this.wn.q3 - this.f6.q3;
		this.f6.nV = this.ss.nV;
		this.wF += this.f6.nA();
		this.wF += "</div>";
		return this.wF;
	};
	this.wU = function (gZ, gY) {
		if (aa(this.pj) != undefined) {
			var cc = this.cf.q3;
			var wS = this.pj;
			var al = gZ - this.Aj;
			var ak = gY - this.nV;
			var ne = this.zt - ak;
			this.zt -= ak;
			aa(wS).style.top = this.zt + "px";
			this.Aj = gZ;
			aa(wS).style.width = this.Aj + "px";
			this.nV = gY;
			aa(wS).style.height = this.nV + "px";
			this.c1 = this.nV - 30;
			var wm = this.c1 - gh.wg - gh.vK;
			var vI = this.Aj - wm - gh.vM - 6;
			var sl = wm + 11;
			var am = vI + gh.vM;
			var cz = Math.ceil(((am - gh.qX - gh.vM - gh.ci) / 2));
			wS = this.yC.pj;
			this.yC.q3 = sl + gh.sp;
			aa(wS).style.left = this.yC.q3 + "px";
			this.yC.Aj = this.Aj - this.yC.q3 - gh.wi;
			aa(wS).style.width = this.yC.Aj + "px";
			this.yC.nV = gh.sn;
			aa(wS).style.height = this.yC.nV + "px";
			wS = this.wn.pj;
			this.wn.Aj = wm + 18;
			aa(wS).style.width = this.wn.Aj + "px";
			this.wn.nV = wm;
			aa(wS).style.height = this.wn.nV + "px";
			this.wn.zt = gh.wg;
			aa(wS).style.top = this.wn.zt + "px";
			this.wn.q3 = this.Aj - this.wn.Aj;
			aa(wS).style.left = this.wn.q3 + "px";
			wS = wS + "_Img";
			aa(wS).style.top = (-(280 - this.wn.Aj + 41)) + "px";
			wS = this.ss.pj;
			this.ss.Aj = wm + 18;
			aa(wS).style.width = this.ss.Aj + "px";
			this.ss.nV = wm;
			aa(wS).style.height = this.ss.nV + "px";
			this.ss.zt = gh.sn;
			aa(wS).style.top = this.ss.zt + "px";
			this.ss.q3 = 3;
			aa(wS).style.left = this.ss.q3 + "px";
			wS = wS + "_Img";
			aa(wS).style.top = (-(280 - this.ss.nV + 24)) + "px";
			wS = this.cA.pj;
			this.cA.Aj = cz;
			aa(wS).style.width = this.cA.Aj + "px";
			this.cA.nV = 30;
			aa(wS).style.height = this.cA.nV + "px";
			this.cA.zt = this.ss.zt + this.ss.nV;
			aa(wS).style.top = this.cA.zt + "px";
			this.cA.q3 = gh.qX;
			aa(wS).style.left = this.cA.q3 + "px";
			wS = this.cB.pj;
			this.cB.Aj = cz;
			aa(wS).style.width = this.cB.Aj + "px";
			this.cB.nV = 30;
			aa(wS).style.height = this.cB.nV + "px";
			this.cB.zt = this.ss.zt + this.ss.nV;
			aa(wS).style.top = this.cB.zt + "px";
			this.cB.q3 = vI - this.cB.Aj;
			aa(wS).style.left = this.cB.q3 + "px";
			wS = this.sm.pj;
			this.sm.q3 = sl;
			aa(wS).style.left = this.sm.q3 + "px";
			wS = this.wf.pj;
			this.wf.q3 = this.Aj - gh.wi;
			aa(wS).style.left = this.wf.q3 + "px";
			wS = this.qU.pj;
			this.qU.zt = this.c1 - gh.qV;
			aa(wS).style.top = this.qU.zt + "px";
			wS = this.vJ.pj;
			this.vJ.q3 = vI;
			aa(wS).style.left = this.vJ.q3 + "px";
			this.vJ.zt = this.c1 - gh.vK;
			aa(wS).style.top = this.vJ.zt + "px";
			wS = this.f6.pj;
			this.f6.zt = this.ss.zt;
			aa(wS).style.top = this.f6.zt + "px";
			this.f6.q3 = this.ss.q3 + this.ss.Aj;
			aa(wS).style.left = this.f6.q3 + "px";
			this.f6.Aj = this.wn.q3 - this.f6.q3;
			aa(wS).style.width = this.f6.Aj + "px";
			this.f6.nV = this.ss.nV;
			aa(wS).style.height = this.f6.nV + "px";
			wS = this.cf.pj;
			this.cf.zt = this.cA.zt;
			aa(wS).style.top = this.cf.zt + "px";
			this.cf.q3 = this.cA.q3 + cz;
			aa(wS).style.left = this.cf.q3 + "px";
			this.cf.Aj = gh.ci - ((this.cf.q3 + gh.ci) - this.cB.q3);
			aa(wS).style.width = this.cf.Aj + "px";
			this.cf.nV = gh.cg;
			aa(wS).style.height = this.cf.nV + "px";
			wS = this.pj;
			this.q3 -= this.cf.q3 - cc;
			aa(wS).style.left = this.q3 + "px";
		}
	};
}
function a1b8(maplet) {
	this.maplet = maplet;
	document["mapbar-overview"] = this;
	this.yl = "baidu";
	this.ca = otp;
	this.vb = document.createElement("div");
	this.vb.unselectable = "on";
	this.vb.style.position = "absolute";
	this.vb.style.visibility = "visible";
	this.vb.style.zIndex = 1000;
	this.vb.style.backgroundColor = "white";
	this.vb.style.borderLeftStyle = "solid";
	this.vb.style.borderLeftWidth = "1px";
	this.vb.style.borderLeftColor = "#949694";
	if (this.ca) {
		this.vb.style.borderBottomStyle = "solid";
		this.vb.style.borderBottomWidth = "1px";
		this.vb.style.borderBottomColor = "#949694";
	} else {
		this.vb.style.borderTopStyle = "solid";
		this.vb.style.borderTopWidth = "1px";
		this.vb.style.borderTopColor = "#949694";
	}
	this.vb.style.overflow = "hidden";
	this.c3 = oo;
	if (this.ca) {
		this.vb.style.top = "0px";
	} else {
		if (this.c3) {
			this.vb.style.top = (this.maplet.height - owh) + "px";
		} else {
			this.vb.style.top = (this.maplet.height - uS) + "px";
		}
	}
	this.fC = document.createElement("div");
	this.fC.id = "mapbar-overview-canvas";
	this.fC.unselectable = "on";
	this.fC.style.position = "absolute";
	this.fC.style.visibility = "visible";
	this.fC.style.zIndex = 0;
	if (this.ca) {
		this.fC.style.top = "0px";
	} else {
		this.fC.style.top = (uU - 1) + "px";
	}
	this.fC.style.left = "7px";
	this.fC.style.backgroundColor = MapBackgroundColor;
	this.fC.style.borderStyle = "solid";
	this.fC.style.borderWidth = "1px";
	this.fC.style.overflow = "hidden";
	this.fC.style.borderColor = "#949694";
	this.fC.selected = false;
	this.vb.appendChild(this.fC);
	this.z3 = document.createElement("div");
	this.z3.id = "mapbar-overview-viewport";
	this.z3.unselectable = "on";
	this.fC.appendChild(this.z3);
	this.z1 = document.createElement("div");
	this.z1.id = "mapbar-overview-viewframe";
	this.z1.unselectable = "on";
	this.fC.appendChild(this.z1);
	this.z2 = document.createElement("div");
	this.z2.id = "mapbar-overview-viewpad";
	this.z2.unselectable = "on";
	this.fC.appendChild(this.z2);
	this.z2.style.cursor = "move";
	this.z2.selected = false;
	this.ao = new Array();
	this.cW = 0;
	this.show = function () {
		this.vb.style.visibility = "visible";
		this.vb.style.display = "block";
	};
	this.hide = function () {
		this.close();
		this.vb.style.visibility = "hidden";
		this.vb.style.display = "none";
	};
	this.nF = function () {
		return parseInt(this.vb.style.top);
	};
	this.nz = function () {
		return parseInt(this.vb.style.height);
	};
	this.w0 = function (lM) {
		if (this.cW != 0) {
			return;
		}
		if (lM.target.id == this.z2.id || Q3T1s == this.z2.id) {
			Q3T1s = this.z2.id;
			this.z2.selected = true;
			this.lq = (px) ? event.clientX : lM.clientX;
			this.lr = (px) ? event.clientY : lM.clientY;
			this.xa = this.lq;
			this.xb = this.lr;
		} else {
			if (fJ(lM.target, this.fC) || Q3T1s == this.fC.id) {
				Q3T1s = this.fC.id;
				this.fC.selected = true;
				this.lq = (px) ? event.clientX : lM.clientX;
				this.lr = (px) ? event.clientY : lM.clientY;
				this.xa = this.lq;
				this.xb = this.lr;
			}
		}
	};
	this.f9 = function (lM) {
		if (lM.target.id == this.z2.id || Q3T1s == this.z2.id) {
			if (this.z2.selected) {
				var tR = (px) ? event.clientX : lM.clientX;
				var tS = (px) ? event.clientY : lM.clientY;
				var lI = (tR - this.lq);
				var lK = (tS - this.lr);
				this.lq = tR;
				this.lr = tS;
				if (this.z2.style.top) {
					this.z2.style.top = (parseInt(this.z2.style.top) + lK) + "px";
					this.z2.style.left = (parseInt(this.z2.style.left) + lI) + "px";
				}
			}
		} else {
			if (fJ(lM.target, this.fC) || Q3T1s == this.fC.id) {
				if (this.fC.selected) {
					var tR = (px) ? event.clientX : lM.clientX;
					var tS = (px) ? event.clientY : lM.clientY;
					var lI = (tR - this.lq);
					var lK = (tS - this.lr);
					this.lq = tR;
					this.lr = tS;
					for (var i in this.pU) {
						if (typeof this.pU[i] == "object" && (this.pU[i] != null)) {
							this.pU[i].style.top = (parseInt(this.pU[i].style.top) + lK) + "px";
							this.pU[i].style.left = (parseInt(this.pU[i].style.left) + lI) + "px";
						}
					}
					if (this.z3.style.top) {
						this.z3.style.top = (parseInt(this.z3.style.top) + lK) + "px";
						this.z3.style.left = (parseInt(this.z3.style.left) + lI) + "px";
						this.z1.style.top = (parseInt(this.z1.style.top) + lK) + "px";
						this.z1.style.left = (parseInt(this.z1.style.left) + lI) + "px";
					}
				}
			}
		}
	};
	this.l1 = function (lM) {
		hideBubble(this.maplet);
		if (this.z2.selected) {
			Q3T1s = null;
			this.z2.selected = false;
			var tR = (px) ? event.clientX : lM.clientX;
			var tS = (px) ? event.clientY : lM.clientY;
			var lI = (tR - this.xa);
			var lK = (tS - this.xb);
			var lf = -lK * this.xf / this.maplet.pN;
			var li = lI * this.xg / this.maplet.pZ;
			this.gK = this.maplet.gx + lf;
			this.gL = this.maplet.gA + li;
			this.cW = 1;
			this.vh = getTimeout(this, this.vO, 20);
		} else {
			if (this.fC.selected) {
				Q3T1s = null;
				this.fC.selected = false;
				var tR = (px) ? event.clientX : lM.clientX;
				var tS = (px) ? event.clientY : lM.clientY;
				var lI = -(tR - this.xa);
				var lK = -(tS - this.xb);
				var lf = -lK * this.xf / this.maplet.pN;
				var li = lI * this.xg / this.maplet.pZ;
				this.gK = this.maplet.gx + lf;
				this.gL = this.maplet.gA + li;
				this.cW = 2;
				this.vh = getTimeout(this, this.vO, 20);
			}
		}
	};
	this.vO = function () {
		if (this.vh) {
			clearTimeout(this.vh);
			this.vh = null;
		}
		if (!this.z3.style.top || !this.z2.style.top) {
			this.maplet.setCenter(this.gK, this.gL, true);
			this.cW = 0;
			return;
		}
		var lK = parseInt(this.z2.style.top) - parseInt(this.z3.style.top);
		var lI = parseInt(this.z2.style.left) - parseInt(this.z3.style.left);
		var gN = Math.round(lI);
		var gO = Math.round(lK);
		if ((Math.abs(lI) + Math.abs(lK)) >= 10) {
			var gN = Math.round(lI * 10 / (Math.abs(lI) + Math.abs(lK)));
			var gO = Math.round(lK * 10 / (Math.abs(lI) + Math.abs(lK)));
		}
		if (this.cW == 2) {
			if ((Math.abs(lI) + Math.abs(lK)) == 0) {
				this.maplet.setCenter(this.gK, this.gL, true);
				this.cW = 0;
			} else {
				this.z3.style.top = (parseInt(this.z3.style.top) + gO) + "px";
				this.z3.style.left = (parseInt(this.z3.style.left) + gN) + "px";
				this.z1.style.top = (parseInt(this.z1.style.top) + gO) + "px";
				this.z1.style.left = (parseInt(this.z1.style.left) + gN) + "px";
				this.vh = getTimeout(this, this.vO, 20);
			}
		} else {
			if (this.cW == 1) {
				gN = -gN;
				gO = -gO;
				if ((Math.abs(lI) + Math.abs(lK)) == 0) {
					this.maplet.setCenter(this.gK, this.gL, true);
					this.cW = 0;
				} else {
					for (var i in this.pU) {
						if (typeof this.pU[i] == "object" && (this.pU[i] != null)) {
							this.pU[i].style.top = (parseInt(this.pU[i].style.top) + gO) + "px";
							this.pU[i].style.left = (parseInt(this.pU[i].style.left) + gN) + "px";
						}
					}
					this.z2.style.top = (parseInt(this.z2.style.top) + gO) + "px";
					this.z2.style.left = (parseInt(this.z2.style.left) + gN) + "px";
					this.vh = getTimeout(this, this.vO, 20);
				}
			}
		}
	};
	this.pU = new Array();
	this.yN = null;
	this.c4 = false;
	this.cl = false;
	if (this.c3) {
		var An = (px) ? 0 : 2;
		this.vb.style.left = (parseInt(this.maplet.width) - oww) + "px";
		this.vb.style.width = oww + "px";
		this.vb.style.height = owh + "px";
		this.fC.style.width = (oww - 8 - An) + "px";
		this.fC.style.height = (owh - 8) + "px";
	} else {
		var An = (px) ? 0 : 1;
		this.vb.style.left = (parseInt(this.maplet.width) - uS) + "px";
		this.vb.style.width = (uS) + "px";
		this.vb.style.height = (uS - An) + "px";
		this.fC.style.width = (uS - 4) + "px";
		this.fC.style.height = (uS - 4) + "px";
	}
	this.sa = new Array();
	this.nH = function () {
		return parseInt(this.vb.style.width);
	};
	this.addListener = function (uy) {
		this.sa[uy.id] = uy;
	};
	this.removeListener = function (uy) {
		this.sa[uy.id] = null;
	};
	this.uq = function () {
		for (var pf in this.sa) {
			if (this.sa[pf] && this.sa[pf].onresize) {
				this.sa[pf].onresize();
			}
		}
		this.maplet.onresize();
	};
	this.g1 = function () {
		for (var pf in this.sa) {
			if (this.sa[pf]) {
				this.sa[pf] = null;
			}
			this.sa = null;
		}
		for (var i in this.pU) {
			try {
				if (this.pU[i] != null) {
					if (this.pU[i].parentNode != null) {
						this.pU[i].parentNode.removeChild(this.pU[i]);
					}
					this.pU[i].onmousedown = null;
					this.pU[i].onerror = null;
					this.pU[i].onload = null;
					this.pU[i] = null;
				}
			}
			catch (lM) {
			}
			this.pU = null;
		}
		for (var l8 in this.ao) {
			try {
				if (this.ao[l8] != null) {
					MEvent.removeBuiltInListener(this.fC, l8, this.ao[l8]);
					this.ao[l8] = null;
				}
			}
			catch (lM) {
			}
			this.ao = null;
		}
		this.img.ovw = null;
		this.img.onclick = null;
		this.z2.w0 = null;
		this.z2.f9 = null;
		if (this.vb.parentNode != null) {
			this.vb.parentNode.removeChild(this.vb);
		}
		this.maplet = null;
	};
	this.onresize = function () {
		if (this.c3) {
			this.vb.style.left = (parseInt(this.maplet.width) - oww) + "px";
		} else {
			this.vb.style.left = (parseInt(this.maplet.width) - uS) + "px";
		}
		if (!this.ca) {
			this.vb.style.top = (this.maplet.height - parseInt(this.vb.style.height)) + "px";
		}
		this.uq();
	};
	this.close = function () {
		if (this.c4) {
			return;
		}
		if (this.img.src != uV) {
			this.img.src = uV;
		}
		var An = (px) ? 0 : 1;
		if (this.yN) {
			clearTimeout(this.yN);
		}
		this.yN = null;
		if (parseInt(this.vb.style.width) > 2 * uS) {
			this.vb.style.left = (parseInt(this.vb.style.left) + uS) + "px";
			this.vb.style.width = (parseInt(this.vb.style.width) - uS) + "px";
			this.vb.style.height = (parseInt(this.vb.style.height) - (uS - 5)) + "px";
			this.fC.style.width = (parseInt(this.vb.style.width) - uS - 4) + "px";
			this.fC.style.height = (parseInt(this.vb.style.height) - (uS - 5) - 4) + "px";
			this.img.style.left = (parseInt(this.vb.style.width) - uS - 1 + An) + "px";
			this.cl = true;
			this.yN = getTimeout(this, this.close, 10);
		} else {
			this.vb.style.left = (parseInt(this.maplet.width - uS)) + "px";
			this.vb.style.width = (uS) + "px";
			this.vb.style.height = (uS - An) + "px";
			this.fC.style.width = (uS - 4) + "px";
			this.fC.style.height = (uS - 4) + "px";
			this.img.style.left = "-1px";
			this.cl = false;
		}
		if (!this.ca) {
			this.vb.style.top = (this.maplet.height - parseInt(this.vb.style.height)) + "px";
			this.img.style.top = (parseInt(this.vb.style.height) - uS - 1) + "px";
		}
		this.uq();
	};
	this.open = function () {
		if (this.cl) {
			return;
		}
		var An = (px) ? 0 : 2;
		if (this.img.src != uT) {
			this.img.src = uT;
		}
		if (this.yN) {
			clearTimeout(this.yN);
		}
		this.yN = null;
		if (parseInt(this.vb.style.width) < (oww - 2 * uS)) {
			this.vb.style.left = (parseInt(this.vb.style.left) - uS) + "px";
			this.vb.style.width = (parseInt(this.vb.style.width) + uS) + "px";
			this.vb.style.height = (parseInt(this.vb.style.height) + (uS - 5)) + "px";
			this.fC.style.width = (parseInt(this.vb.style.width) - 4 - An) + "px";
			this.fC.style.height = (parseInt(this.vb.style.height) - 8 - 4) + "px";
			this.img.style.left = (parseInt(this.vb.style.width) - uS - 1) + "px";
			this.c4 = true;
			this.yN = getTimeout(this, this.open, 10);
		} else {
			this.vb.style.left = (parseInt(this.maplet.width) - oww) + "px";
			this.vb.style.width = (oww) + "px";
			this.vb.style.height = (owh) + "px";
			this.fC.style.width = (oww - 10) + "px";
			this.fC.style.height = (owh - 10) + "px";
			this.img.style.left = (oww - uS - 1) + "px";
			this.paint();
			this.c4 = false;
		}
		if (!this.ca) {
			this.vb.style.top = (this.maplet.height - parseInt(this.vb.style.height)) + "px";
			this.img.style.top = (parseInt(this.vb.style.height) - uS - 1) + "px";
		}
		this.uq();
	};
	this.qa = function (f2) {
		var An = (px) ? 0 : 2;
		this.img = new Image();
		this.img.unselectable = "on";
		this.img.style.position = "absolute";
		this.img.style.zIndex = 1000;
		this.img.style.left = "-1px";
		this.img.width = uS + "px";
		this.img.height = uS + "px";
		this.img.style.width = uS + "px";
		this.img.style.height = uS + "px";
		this.img.ovw = this;
		this.img.style.cursor = (px) ? "hand" : "pointer";
		this.img.onclick = function () {
			if (this.ovw.c3) {
				this.ovw.close();
			} else {
				this.ovw.open();
			}
			this.ovw.c3 = !this.ovw.c3;
		};
		if (this.c3) {
			this.img.src = uT;
		} else {
			this.img.src = uV;
		}
		if (this.ca) {
			this.img.style.top = "0px";
		} else {
			this.img.style.top = (parseInt(this.vb.style.height) - uS - ((px) ? 1 : 0)) + "px";
		}
		this.img.style.left = (parseInt(this.vb.style.width) - uS - 1) + "px";
		this.vb.appendChild(this.img);
		f2.appendChild(this.vb);
		this.ao["mousedown"] = MEvent.bindDom(this.fC, "mousedown", this, this.w0);
		this.ao["mousemove"] = MEvent.bindDom(this.fC, "mousemove", this, this.f9);
		this.ao["mouseup"] = MEvent.bindDom(this.fC, "mouseup", this, this.l1);
	};
	this.paint = function () {
		if (!this.c3) {
			return;
		}
		this.width = oww - 10;
		this.height = owh - 10;
		this.gx = this.maplet.gx;
		this.gA = this.maplet.gA;
		this.AG = Math.max(Math.max(0, te - 2), uW[this.maplet.AG]);
		this.pZ = this.maplet.pZ;
		this.pN = this.maplet.pN;
		this.xK = this.maplet.xK;
		if (this.yl != this.maplet.yl) {
			this.yl = this.maplet.yl;
			for (var i in this.pU) {
				try {
					if (this.pU[i] != null) {
						if (this.pU[i].parentNode != null) {
							this.pU[i].parentNode.removeChild(this.pU[i]);
						}
						this.pU[i].onmousedown = null;
						this.pU[i].onerror = null;
						this.pU[i].onload = null;
						this.pU[i] = null;
					}
				}
				catch (lM) {
				}
			}
		}
		var yk = this.yl;
		this.z4 = Math.ceil((this.width) / (this.pZ) / 2);
		this.z5 = Math.ceil((this.height) / (this.pN) / 2);
		this.xg = sj[this.AG];
		this.xf = qP[this.AG];
		this.sR = sI[this.AG] + "/";
		this.gD = Math.floor((this.maplet.gA) / this.xg);
		this.gE = Math.floor((this.maplet.gx) / this.xf);
		if (this.gD < 0) {
			this.gD += 1;
		}
		this.sU = this.width / 2 - Math.round(((this.gA * wp) % (this.xg * wp)) * this.pZ / (this.xg * wp));
		if (this.gx >= 0) {
			this.sV = this.height / 2 - this.pN + Math.round(((this.gx * wp) % (this.xf * wp)) * this.pN / (this.xf * wp));
		} else {
			this.sV = this.height / 2 + Math.round(((this.gx * wp) % (this.xf * wp)) * this.pN / (this.xf * wp));
		}
		var nL = nM[this.AG];
		this.sZ = 0;
		this.s1 = 0;
		this.tf1 = this.width;
		this.tg = this.height;
		this.s2 = parseInt(this.gD);
		this.s3 = parseInt(this.gE);
		this.th = parseInt(this.gD);
		this.ti = parseInt(this.gE);
		var s8 = (360 / sj[this.AG]);
		this.gk = 1;
		this.wT = 0;
		for (var i in this.pU) {
			if (this.pU[i] != null) {
				this.pU[i].c2 = false;
			}
		}
		for (qx = -this.z4 - 1; qx <= this.z4; qx++) {
			for (qz = -this.z5 - 1; qz <= this.z5; qz++) {
				try {
					var pM = this.maplet.xL + "mapbank/" + yk + "/" + this.sR;
					var qy = parseInt(this.gD + qx);
					var qA = parseInt(this.gE + qz);
					qy = (qy) % s8;
					if (qy >= (s8 / 2)) {
						qy -= s8;
					}
					if (qy < (-s8 / 2)) {
						qy += s8;
					}
					var g7 = parseInt(Math.floor((qy) / nL));
					var g8 = parseInt(Math.floor((qA) / nL));
					if (g7 < 0) {
						g7 += 1;
					}
					if (g8 < 0) {
						g8 += 1;
					}
					var nl = (qy) - g7 * nL;
					var nm = (qA) - g8 * nL;
					pM += g7 + "_" + g8 + "/";
					pM += nl + "_" + nm + "." + this.xK;
					var p1 = (qx * this.pZ) + parseInt(this.sU);
					var p3 = (-(qz * this.pN) + parseInt(this.sV));
					var p4 = p3;
					if (this.yl != "aerial" && this.yl.indexOf("aerial") < 0) {
						p3 = p3 + w8[this.AG];
					}
					if (p1 < -this.pZ || p1 > this.width || p3 > this.height || p3 < -this.pN) {
						continue;
					}
					if (this.sZ < (p1 + this.pZ)) {
						this.sZ = (p1 + this.pZ);
						this.s2 = parseInt(this.gD) + parseInt(qx);
					}
					if (this.s1 < (p3 + this.pN)) {
						this.s1 = (p3 + this.pN);
						this.ti = parseInt(this.gE) + parseInt(qz);
					}
					if (this.tf1 > p1) {
						this.tf1 = p1;
						this.th = parseInt(this.gD) + parseInt(qx);
					}
					if (this.tg > p3) {
						this.tg = p3;
						this.s3 = parseInt(this.gE) + parseInt(qz);
					}
					var xY = "__ov_" + ((this.AG).toString(16) + (this.gD + qx).toString(16) + "l" + (this.gE + qz).toString(16)).toLowerCase();
					if (pM && pM.indexOf("NaN") < 0) {
						if (this.pU[xY] == null) {
							this.pU[xY] = new Image();
							this.pU[xY].id = xY;
							this.pU[xY].name = xY;
							this.pU[xY].ntry = "0";
							this.pU[xY].unselectable = "on";
							this.pU[xY].style.position = "absolute";
							this.pU[xY].onmousedown = function () {
								return false;
							};
							this.pU[xY].src = pM;
						}
						var p2 = (p1 + this.pZ / 2 - this.width / 2) * this.gk - (p3 + this.pN / 2 - this.height / 2) * this.wT + this.width / 2;
						var p5 = (p1 + this.pZ / 2 - this.width / 2) * this.wT + (p3 + this.pN / 2 - this.height / 2) * this.gk + this.height / 2;
						this.pU[xY].style.top = parseInt(p5 - this.pN / 2) + "px";
						this.pU[xY].style.left = parseInt(p2 - this.pZ / 2) + "px";
						this.pU[xY].c2 = true;
					}
					pM = null;
					xY = null;
				}
				catch (lM) {
				}
			}
		}
		for (var i in this.pU) {
			try {
				if (this.pU[i] != null) {
					if (this.pU[i].c2 == true) {
						if (this.pU[i].parentNode != this.fC) {
							this.fC.appendChild(this.pU[i]);
						}
					} else {
						if (this.pU[i].parentNode != null) {
							this.pU[i].parentNode.removeChild(this.pU[i]);
						}
						this.pU[i].onmousedown = null;
						this.pU[i].onerror = null;
						this.pU[i].onload = null;
						this.pU[i] = null;
					}
				}
			}
			catch (lM) {
			}
		}
		var Ae = parseInt(this.maplet.width * this.maplet.xg / this.xg);
		var zZ = parseInt(this.maplet.height * this.maplet.xf / this.xf);
		if (Ae > this.width && zZ > this.height) {
			this.z3.style.visibility = "hidden";
			this.z1.style.visibility = "hidden";
			this.z2.style.visibility = "hidden";
		} else {
			this.z3.style.left = parseInt(this.width - Ae) / 2 + "px";
			this.z3.style.top = parseInt(this.height - zZ) / 2 + "px";
			this.z3.style.width = (Ae) + "px";
			this.z3.style.height = (zZ) + "px";
			this.z3.style.visibility = "visible";
			this.z1.style.left = parseInt(this.width - Ae) / 2 + "px";
			this.z1.style.top = parseInt(this.height - zZ) / 2 + "px";
			this.z1.style.width = (Ae) + "px";
			this.z1.style.height = (zZ) + "px";
			this.z1.style.visibility = "visible";
			this.z2.style.left = parseInt(this.width - Ae) / 2 + "px";
			this.z2.style.top = parseInt(this.height - zZ) / 2 + "px";
			this.z2.style.width = (Ae) + "px";
			this.z2.style.height = (zZ) + "px";
			this.z2.style.visibility = "visible";
		}
	};
}
function MStandardControl(x6, left, top, fi) {
	this.x6 = (typeof x6 == "undefined") ? "baidu" : x6;
	this.left = (typeof left == "undefined") ? 0 : parseInt(left);
	this.top = (typeof top == "undefined") ? 0 : parseInt(top);
	this.fi = (typeof fi == "undefined") ? 0 : parseInt(fi);
	this.id = new Date().getTime() + parseInt(Math.random() * 1000);
	this.nR = null;
	this.qc = function (maplet) {
		this.maplet = maplet;
		if (this.maplet.gc[this.id] == null) {
			if (!this.fi && this.maplet.height < 300) {
				if (bsc) {
					this.fi = 1;
				}
			}
			this.maplet.gc[this.id] = this;
			this.nR = new gb(this.x6, this.maplet.AG, this.left, this.top, 70, 120, true, 3, this.maplet.vb, this.maplet, this.fi);
			if (this.maplet.ga == null) {
				this.maplet.ga = this.nR;
			}
		}
	};
	this.remove = function () {
		this.maplet = null;
		if (this.nR) {
			if (this.nR == this.maplet.ga) {
				this.maplet.ga = null;
			}
			this.nR.g1();
			this.nR = null;
		}
	};
	this.toString = function () {
		return "com.mapbar.maplet.MStandardControl";
	};
}
function MZoomControl(x6, left, top, fi) {
	this.x6 = (typeof x6 == "undefined") ? "jongo" : x6;
	this.left = (typeof left == "undefined") ? 0 : parseInt(left);
	this.top = (typeof top == "undefined") ? 0 : parseInt(top);
	this.id = new Date().getTime() + parseInt(Math.random() * 1000);
	this.fi = (typeof fi == "undefined") ? false : fi;
	this.cx = strImgsvrUrl + "images/" + this.x6 + "/" + ((!this.fi) ? "bg.png" : "bgsmall.png");
	this.cw = 28;
	this.cu = (!this.fi) ? 241 : 155;
	this.cv = this.cu - 91;
	this.ao = new Array();
	this.onresize = function (maplet) {
		this.tY.style.left = (this.maplet.width - 40 + this.left) + "px";
	};
	this.qc = function (maplet) {
		this.maplet = maplet;
		if (this.maplet.gc[this.id] == null) {
			this.maplet.gc[this.id] = this;
			this.tY = document.createElement("div");
			this.tY.unselectable = "on";
			this.tY.style.position = "relative";
			this.tY.style.left = (this.maplet.width - 40 + this.left) + "px";
			this.tY.style.top = (this.maplet.height / 2 - this.cu / 2) + "px";
			this.tY.style.width = (this.cw) + "px";
			this.tY.style.height = (this.cu) + "px";
			this.tY.style.zIndex = 10;
			this.tY.style.visibility = "visible";
			this.tY.style.cursor = "default";
			this.tY.maplet = this.maplet;
			this.tY.cu = this.cu;
			this.tY.innerHTML = "<img unselectable=\"on\" id=\"" + this.id + "\" border=0 src=\"" + this.cx + "\" onmousedown=\"javascript:return false;\">";
			this.ao["mousedown"] = MEvent.bindDom(this.maplet.map, "mousedown", this, this.w0);
			this.ao["mousemove"] = MEvent.bindDom(this.maplet.map, "mousemove", this, this.f9);
			this.ao["mouseup"] = MEvent.bindDom(this.maplet.map, "mouseup", this, this.l1);
			this.tY.onmouseover = function (lM) {
				var Ap = parseInt((px) ? event.clientX : lM.clientX) - parseInt(this.style.left) - parseInt(this.maplet.left) - this.maplet.offsetX;
				var Av = parseInt((px) ? event.clientY : lM.clientY) - parseInt(this.style.top) - parseInt(this.maplet.top) - this.maplet.offsetY;
				if (!px && this.maplet.vb.style.position != "absolute") {
				}
				if (Ap >= 6 && Ap <= 22) {
					if (Av >= 18 && Av <= 34) {
						this.style.cursor = (px) ? "hand" : "pointer";
						this.firstChild.alt = (en) ? "Click to Zoom In" : tX("%u70BD%uC2B4%uB739%uBE65");
					} else {
						if (Av >= (this.cu - 42) && Av <= (this.cu - 26)) {
							this.style.cursor = (px) ? "hand" : "pointer";
							this.firstChild.alt = (en) ? "Click to Zoom Out" : tX("%u70BD%uC2B4%uD124%uDB38");
						} else {
							if (Av >= (this.cu - 21) && Av <= (this.cu - 5)) {
								this.style.cursor = (px) ? "hand" : "pointer";
								this.firstChild.alt = (en) ? "Help" : tX("%u5E32%uB0D7%uA28A%uB050");
							} else {
								if (Av < 18) {
									this.style.cursor = "move";
									this.firstChild.alt = (en) ? "Drag" : tX("%u9F24%u0727%uCADD%uC5D3");
								} else {
									if (Av > 34 && Av < (this.cu - 42)) {
										this.style.cursor = "default";
										this.firstChild.alt = (en) ? "Click to Zoom" : tX("%u70BD%uC2B4%uD124%uE467");
									} else {
										this.style.cursor = "default";
										this.firstChild.alt = "";
									}
								}
							}
						}
					}
				} else {
					this.style.cursor = "default";
				}
			};
			this.tY.onmousemove = this.tY.onmouseover;
			this.tY.onclick = function (lM) {
				var Ap = parseInt((px) ? event.clientX : lM.clientX) - parseInt(this.style.left) - parseInt(this.maplet.left) - this.maplet.offsetX;
				var Av = parseInt((px) ? event.clientY : lM.clientY) - parseInt(this.style.top) - parseInt(this.maplet.top) - this.maplet.offsetY;
				if (!px && this.maplet.vb.style.position != "absolute") {
				}
				if (Ap >= 6 && Ap <= 22) {
					if (Av >= 18 && Av <= 34) {
						this.maplet.zoomIn();
					} else {
						if (Av >= (this.cu - 42) && Av <= (this.cu - 26)) {
							this.maplet.zoomOut();
						} else {
							if (Av >= (this.cu - 21) && Av <= (this.cu - 5)) {
								if (typeof callback == "function") {
									callback("&act=help");
								}
							} else {
								if (Av > 34 && Av < (this.cu - 42)) {
									var lv = 150;
									var y = Math.max(38, Math.min((this.cu - 53), Av));
									var AB = sY - Math.max(0, Math.min(sY, parseInt((parseInt(y) - 38) / (lv / (sY)))));
									this.maplet.setZoomLevel(parseInt(AB));
								}
							}
						}
					}
				}
				this.lp = 0;
				this.style.cursor = "default";
				return false;
			};
			this.maplet.map.appendChild(this.tY);
			this.wW = document.createElement("div");
			this.wW.id = "slider" + this.id;
			this.wW.unselectable = "on";
			this.wW.innerHTML = "<IMG id=\"sliderimg" + this.id + "\" src=" + strImgsvrUrl + "images/" + this.x6 + "/slider.png>";
			this.wW.style.position = "absolute";
			this.wW.style.top = "100px";
			this.wW.style.left = "5px";
			this.wW.style.width = "18px";
			this.wW.style.height = "9px";
			this.wW.maplet = this.maplet;
			this.wW.cu = this.cu;
			this.tY.wW = this.wW;
			this.wW.lp = 0;
			this.tY.appendChild(this.wW);
			this.wW.firstChild.onmousedown = function (lM) {
				return false;
			};
			this.wW.onmousedown = function (lM) {
				if (this.lp == 0 || !this.selected) {
					this.selected = true;
					this.lp = parseInt((px) ? event.clientY : lM.clientY);
					if (this.setCapture) {
						this.setCapture();
					}
					this.style.cursor = "move";
				} else {
					this.lp = 0;
				}
				return true;
			};
			this.wW.ondrag = function (lM) {
				if (this.lp > 0 && this.selected) {
					this.style.cursor = "move";
					var currTop = parseInt((px) ? event.clientY : lM.clientY) - this.maplet.offsetY - this.maplet.top - parseInt(this.parentNode.style.top);
					currTop = Math.max(38, Math.min((this.cu - 53), currTop));
					this.style.top = ((px) ? currTop : (currTop - 5)) + "px";
					var lv = 150;
					if (px) {
						var y = parseInt((px) ? event.clientY : lM.clientY) - this.maplet.offsetY - this.maplet.top - parseInt(this.parentNode.style.top);
						var AB = sY - Math.max(0, Math.min(sY, parseInt(((parseInt(y) - 38) / (sY - 1)) * (lv / (sY - 1))) / (lv / (sY - 1))));
						this.maplet.AN(AB);
						this.style.cursor = "move";
						this.parentNode.style.cursor = "move";
					}
					return true;
				}
				return false;
			};
			this.wW.ondragend = function (lM) {
				this.selected = false;
				if (this.lp > 0) {
					var lv = 150;
					var y = parseInt((px) ? event.clientY : lM.clientY) - parseInt(this.maplet.offsetY) - parseInt(this.maplet.top) - parseInt(this.parentNode.style.top);
					var AB = sY - Math.max(0, Math.min(sY, parseInt((parseInt(y) - 38) / (lv / (sY)))));
					this.maplet.sF.ld.style.zoom = 1;
					this.maplet.setZoomLevel(parseInt(AB));
					this.lp = 0;
					if (this.releaseCapture) {
						this.releaseCapture();
					}
				}
				this.lp = 0;
				this.style.cursor = "default";
				return true;
			};
			this.wW.setZoomLevel = function (AB) {
				var qt = AB.toString().split("zm=");
				if (qt.length == 2) {
					AB = parseInt(qt[1]);
				}
				AB = parseInt(AB);
				this.style.top = ((sY - Math.min(sY, Math.max(AB, te))) * 150 / (sY) + 38) + "px";
			};
			MEvent.bind(this.maplet, "zoom", this.wW, this.wW.setZoomLevel);
			this.wW.setZoomLevel(this.maplet.getZoomLevel());
		}
	};
	this.w0 = function (lM) {
		if (this.maplet && lM.target.id == this.id) {
			this.qo = true;
			Q3T1s = this.id;
			this.l0 = (lM.offsetX) ? lM.offsetX : parseInt(lM.clientX - this.maplet.offsetX - this.maplet.left) - parseInt(this.tY.style.left);
			this.na = (lM.offsetY) ? lM.offsetY : parseInt(lM.clientY - this.maplet.offsetY - this.maplet.top) - parseInt(this.tY.style.top);
		}
	};
	this.f9 = function (lM) {
		if (this.maplet && (lM.target.id == this.id || Q3T1s == this.id)) {
			if (this.qo) {
				var x = lM.clientX - this.maplet.offsetX - this.maplet.left - this.l0;
				var y = lM.clientY - this.maplet.offsetY - this.maplet.top - this.na;
				x = Math.max(0, Math.min(this.maplet.width - this.cw, x));
				y = Math.max(0, Math.min(this.maplet.height - this.cu, y));
				this.tY.style.left = x + "px";
				this.tY.style.top = y + "px";
				this.lw = new Date().getTime();
				this.ls = true;
			}
		}
		this.wW.ondrag(lM);
	};
	this.l1 = function (lM) {
		if (this.maplet && this.qo) {
			this.qo = false;
			var x = lM.clientX - this.maplet.offsetX - this.maplet.left - this.l0;
			var y = lM.clientY - this.maplet.offsetY - this.maplet.top - this.na;
			if (this.ls) {
				this.lw = new Date().getTime();
				this.ls = false;
			}
		}
		if (Q3T1s == this.id) {
			Q3T1s = null;
		}
		this.wW.ondragend();
	};
	this.remove = function () {
		for (var l8 in this.ao) {
			try {
				if (this.ao[l8] != null) {
					MEvent.removeBuiltInListener(this.maplet.map, l8, this.ao[l8]);
					this.ao[l8] = null;
				}
			}
			catch (lM) {
			}
			this.ao = null;
		}
		this.maplet = null;
		if (this.tY != null && this.tY.parentNode != null) {
			this.tY.parentNode.removeChild(this.tY);
			this.tY = null;
		}
	};
	this.toString = function () {
		return "com.mapbar.maplet.MJongoControl";
	};
}
MJongoControl = MZoomControl;
function MMSNControl(x6, left, top) {
	this.x6 = (typeof x6 == "undefined") ? "msn" : x6;
	this.left = (typeof left == "undefined") ? 20 : left;
	this.top = (typeof top == "undefined") ? 20 : top;
	this.id = new Date().getTime() + parseInt(Math.random() * 1000);
	this.cw = 65;
	this.cu = 221;
	this.ao = new Array();
	this.onresize = function (maplet) {
		this.tY.style.left = this.left + "px";
	};
	this.qc = function (maplet) {
		this.maplet = maplet;
		if (this.maplet.gc[this.id] == null) {
			this.maplet.gc[this.id] = this;
			this.tY = document.createElement("div");
			this.tY.unselectable = "on";
			this.tY.style.position = "absolute";
			this.tY.style.left = this.left + "px";
			this.tY.style.top = this.top + "px";
			this.tY.style.width = this.cw + "px";
			this.tY.style.height = this.cu + "px";
			this.tY.style.zIndex = 10;
			this.tY.style.visibility = "visible";
			this.tY.style.overflow = "hidden";
			this.tY.style.filter = "alpha(opacity=80);";
			this.tY.style.MozOpacity = (80 / 100);
			this.tY.style.opacity = (80 / 100);
			this.tY.style.qK = (80 / 100);
			this.tY.style.cursor = "default";
			this.tY.maplet = this.maplet;
			var xm = "<img unselectable=\"on\" id=\"" + this.id + "\" border=0 src=\"" + strImgsvrUrl + "images/" + this.x6 + "/bg.png\" style=\"position:absolute;left:0px;top:0px;z-index:0;\" onmousedown=\"javascript:return false;\">";
			this.tY.innerHTML = xm;
			xm = null;
			this.tV = new Image();
			this.tV.x6 = this.x6;
			this.tV.unselectable = "on";
			this.tV.border = 0;
			this.tV.style.cursor = (px) ? "hand" : "point";
			this.tV.style.zIndex = 1;
			this.tV.style.position = "absolute";
			this.tV.style.left = "50px";
			this.tV.style.top = "4px";
			this.tV.tr = 1;
			this.tV.setMode = function () {
				this.tr = !this.tr;
				if (this.tr == 0) {
					this.alt = (en) ? "Close" : tX("%u5175%uE760");
					this.src = strImgsvrUrl + "images/" + this.x6 + "/close.png";
				} else {
					this.alt = (en) ? "Open" : ("\u6253\u5f00");
					this.src = strImgsvrUrl + "images/" + this.x6 + "/open.png";
				}
			};
			this.yN = null;
			this.setMode = function () {
				this.tV.setMode();
				this.zO();
			};
			this.zO = function () {
				if (this.yN != null) {
					clearTimeout(this.yN);
					this.yN = null;
				}
				if (this.tV.tr == 0) {
					this.tY.style.height = (parseInt(this.tY.style.height) + 10) + "px";
					if (parseInt(this.tY.style.height) > this.cu - 10) {
						this.tY.style.height = this.cu + "px";
					} else {
						this.yN = getTimeout(this, this.zO, 10);
					}
				} else {
					this.tY.style.height = (parseInt(this.tY.style.height) - 10) + "px";
					if (parseInt(this.tY.style.height) < 25) {
						this.tY.style.height = "15px";
					} else {
						this.yN = getTimeout(this, this.zO, 10);
					}
				}
			};
			this.ao["click"] = MEvent.bindDom(this.tV, "click", this, this.setMode);
			this.tV.setMode();
			this.tY.appendChild(this.tV);
			this.ao["mousedown"] = MEvent.bindDom(this.maplet.map, "mousedown", this, this.w0);
			this.ao["mousemove"] = MEvent.bindDom(this.maplet.map, "mousemove", this, this.f9);
			this.ao["mouseup"] = MEvent.bindDom(this.maplet.map, "mouseup", this, this.l1);
			this.tY.onmouseover = function (lM) {
				var Ap = parseInt((px) ? event.clientX : lM.clientX) - parseInt(this.style.left) - parseInt(this.maplet.left) - this.maplet.offsetX;
				var Av = parseInt((px) ? event.clientY : lM.clientY) - parseInt(this.style.top) - parseInt(this.maplet.top) - this.maplet.offsetY;
				if (Av < 16) {
					this.style.cursor = "move";
					this.firstChild.alt = (en) ? "Drag" : tX("%u9F24%u0727%uCADD%uC5D3");
				} else {
					if (Av > 21 && Av < 75) {
						if (Av > 20 && Av < 40 && Ap > 20 && Ap < 45) {
							this.style.cursor = (px) ? "hand" : "pointer";
							this.firstChild.alt = xN[1];
						} else {
							if (Av > 55 && Av < 75 && Ap > 20 && Ap < 45) {
								this.firstChild.alt = xN[3];
								this.style.cursor = (px) ? "hand" : "pointer";
							} else {
								if (Av > 36 && Av < 58 && Ap > 6 && Ap < 24) {
									this.style.cursor = (px) ? "hand" : "pointer";
									this.firstChild.alt = xN[0];
								} else {
									if (Av > 38 && Av < 58 && Ap > 42 && Ap < 60) {
										this.firstChild.alt = xN[2];
										this.style.cursor = (px) ? "hand" : "pointer";
									} else {
										this.firstChild.alt = "";
									}
								}
							}
						}
					} else {
						if (Ap >= 19 && Ap <= 49) {
							if (Av >= 81 && Av <= 100) {
								this.style.cursor = (px) ? "hand" : "pointer";
								this.firstChild.alt = (en) ? "Click to Zoom In" : tX("%u70BD%uC2B4%uB739%uBE65");
							} else {
								if (Av >= 208 && Av <= 221) {
									this.style.cursor = (px) ? "hand" : "pointer";
									this.firstChild.alt = (en) ? "Click to Zoom Out" : tX("%u70BD%uC2B4%uD124%uDB38");
								} else {
									if (Av > 100 && Av < 208) {
										this.style.cursor = "default";
										this.firstChild.alt = (en) ? "Click to Zoom" : tX("%u70BD%uC2B4%uD124%uE467");
									} else {
										this.style.cursor = "default";
										this.firstChild.alt = "";
									}
								}
							}
						} else {
							this.style.cursor = "default";
						}
					}
				}
			};
			this.tY.onmousemove = this.tY.onmouseover;
			this.tY.onclick = function (lM) {
				var Ap = parseInt((px) ? event.clientX : lM.clientX) - parseInt(this.style.left) - parseInt(this.maplet.left) - this.maplet.offsetX;
				var Av = parseInt((px) ? event.clientY : lM.clientY) - parseInt(this.style.top) - parseInt(this.maplet.top) - this.maplet.offsetY;
				if (Av > 21 && Av < 75) {
					if (Av > 20 && Av < 40 && Ap > 20 && Ap < 45) {
						this.maplet.panTo(0, this.maplet.height / 2);
					} else {
						if (Av > 55 && Av < 75 && Ap > 20 && Ap < 45) {
							this.maplet.panTo(0, -this.maplet.height / 2);
						} else {
							if (Av > 36 && Av < 58 && Ap > 6 && Ap < 24) {
								this.maplet.panTo(this.maplet.width / 2, 0);
							} else {
								if (Av > 38 && Av < 58 && Ap > 42 && Ap < 60) {
									this.maplet.panTo(-this.maplet.width / 2, 0);
								}
							}
						}
					}
				} else {
					if (Av > 80 && Ap >= 19 && Ap <= 49) {
						if (Av >= 81 && Av <= 100) {
							this.maplet.zoomIn();
						} else {
							if (Av >= 208 && Av <= 221) {
								this.maplet.zoomOut();
							} else {
								if (Av > 100 && Av < 208) {
									var lv = 100;
									var y = Math.max(100, Math.min(200, Av));
									var AB = sY - Math.max(0, Math.min(sY, parseInt((parseInt(y) - 100) / (lv / (sY)))));
									this.maplet.setZoomLevel(parseInt(AB));
								}
							}
						}
					}
				}
				this.lp = 0;
				this.style.cursor = "default";
				return false;
			};
			this.maplet.map.appendChild(this.tY);
			this.wW = document.createElement("div");
			this.wW.id = "slider" + this.id;
			this.wW.unselectable = "on";
			this.wW.innerHTML = "<IMG id=\"sliderimg" + this.id + "\" src=" + strImgsvrUrl + "images/" + this.x6 + "/slider.png>";
			this.wW.style.position = "absolute";
			this.wW.style.width = "20px";
			this.wW.style.height = "7px";
			this.wW.style.top = "100px";
			this.wW.style.left = ((this.cw + 1) / 2 - 10) + "px";
			this.wW.maplet = this.maplet;
			this.tY.wW = this.wW;
			this.wW.lp = 0;
			this.tY.appendChild(this.wW);
			this.wW.firstChild.onmousedown = function (lM) {
				return false;
			};
			this.wW.onmousedown = function (lM) {
				if (this.lp == 0 || !this.selected) {
					this.selected = true;
					this.lp = parseInt((px) ? event.clientY : lM.clientY);
					if (this.setCapture) {
						this.setCapture();
					}
					this.style.cursor = "move";
				} else {
					this.lp = 0;
				}
				return true;
			};
			this.wW.ondrag = function (lM) {
				if (this.lp > 0 && this.selected) {
					this.style.cursor = "move";
					var currTop = parseInt((px) ? event.clientY : lM.clientY) - this.maplet.offsetY - this.maplet.top - parseInt(this.parentNode.style.top);
					currTop = Math.max(100, Math.min(200, currTop));
					this.style.top = ((px) ? currTop : (currTop - 5)) + "px";
					var lv = 100;
					if (px) {
						var y = parseInt((px) ? event.clientY : lM.clientY) - this.maplet.offsetY - this.maplet.top - parseInt(this.parentNode.style.top);
						var AB = sY - Math.max(0, Math.min(sY, (parseInt(y) - 100) / (lv / sY)));
						this.maplet.AN(AB);
						this.style.cursor = "move";
						this.parentNode.style.cursor = "move";
					}
					return true;
				}
				return false;
			};
			this.wW.ondragend = function (lM) {
				this.selected = false;
				if (this.lp > 0) {
					var lv = 100;
					var y = parseInt((px) ? event.clientY : lM.clientY) - parseInt(this.maplet.offsetY) - parseInt(this.maplet.top) - parseInt(this.parentNode.style.top);
					var AB = sY - Math.max(0, Math.min(sY, parseInt((parseInt(y) - 100) / (lv / (sY)))));
					this.maplet.sF.ld.style.zoom = 1;
					this.maplet.setZoomLevel(parseInt(AB));
					this.lp = 0;
					if (this.releaseCapture) {
						this.releaseCapture();
					}
				}
				this.lp = 0;
				this.style.cursor = "default";
				return true;
			};
			this.wW.setZoomLevel = function (AB) {
				var qt = AB.toString().split("zm=");
				if (qt.length == 2) {
					AB = parseInt(qt[1]);
				}
				AB = parseInt(AB);
				this.style.top = ((sY - Math.min(sY, Math.max(AB, te))) * 100 / (sY) + 100) + "px";
			};
			MEvent.bind(this.maplet, "zoom", this.wW, this.wW.setZoomLevel);
			this.wW.setZoomLevel(this.maplet.getZoomLevel());
		}
	};
	this.w0 = function (lM) {
		if (this.maplet && lM.target.id == this.id) {
			this.qo = true;
			Q3T1s = this.id;
			this.l0 = (lM.offsetX) ? lM.offsetX : parseInt(lM.clientX - this.maplet.offsetX - this.maplet.left) - parseInt(this.tY.style.left);
			this.na = (lM.offsetY) ? lM.offsetY : parseInt(lM.clientY - this.maplet.offsetY - this.maplet.top) - parseInt(this.tY.style.top);
		}
	};
	this.f9 = function (lM) {
		if (this.maplet && (lM.target.id == this.id || Q3T1s == this.id)) {
			if (this.qo) {
				var x = lM.clientX - this.maplet.offsetX - this.maplet.left - this.l0;
				var y = lM.clientY - this.maplet.offsetY - this.maplet.top - this.na;
				x = Math.max(0, Math.min(this.maplet.width - this.cw, x));
				y = Math.max(0, Math.min(this.maplet.height - this.cu, y));
				this.tY.style.left = x + "px";
				this.tY.style.top = y + "px";
				this.lw = new Date().getTime();
				this.ls = true;
			}
		}
		this.wW.ondrag(lM);
	};
	this.l1 = function (lM) {
		if (this.maplet && this.qo) {
			this.qo = false;
			var x = lM.clientX - this.maplet.offsetX - this.maplet.left - this.l0;
			var y = lM.clientY - this.maplet.offsetY - this.maplet.top - this.na;
			if (this.ls) {
				this.lw = new Date().getTime();
				this.ls = false;
			}
		}
		if (Q3T1s == this.id) {
			Q3T1s = null;
		}
		this.wW.ondragend();
	};
	this.remove = function () {
		for (var l8 in this.ao) {
			try {
				if (this.ao[l8] != null) {
					MEvent.removeBuiltInListener(this.maplet.map, l8, this.ao[l8]);
					this.ao[l8] = null;
				}
			}
			catch (lM) {
			}
			this.ao = null;
		}
		this.maplet = null;
		if (this.tY != null && this.tY.parentNode != null) {
			this.tY.parentNode.removeChild(this.tY);
			this.tY = null;
		}
	};
	this.toString = function () {
		return "com.mapbar.maplet.MMSNControl";
	};
}
function MLookupControl(ya, left, top) {
	this.ya = (typeof ya == "undefined") ? tX("%u62CD%uCB0F%uD02B%uF3C7") : ya;
	this.left = (typeof left == "undefined") ? 0 : parseInt(left);
	this.top = (typeof top == "undefined") ? 0 : parseInt(top);
	this.id = new Date().getTime() + parseInt(Math.random() * 1000);
	this.onresize = function (maplet) {
		if (this.maplet.ovw.nF() <= 37) {
			this.tY.style.left = (this.maplet.width - 132 + this.left - this.maplet.ovw.nH()) + "px";
		} else {
			this.tY.style.left = (this.maplet.width - 132 + this.left) + "px";
		}
	};
	this.qc = function (maplet) {
		this.maplet = maplet;
		if (this.maplet.gc[this.id] == null) {
			this.maplet.gc[this.id] = this;
			this.tY = document.createElement("div");
			this.tY.style.position = "absolute";
			this.onresize(this.maplet);
			this.tY.style.top = (10 + this.top) + "px";
			this.tY.style.zIndex = 10;
			this.tY.style.visibility = "visible";
			this.tU = document.createElement("img");
			this.tU.unselectable = "on";
			this.tU.src = strImgsvrUrl + "images/lookup.png";
			this.tU.alt = this.ya;
			this.tU.style.cursor = "hand";
			this.tU.style.cursor = "pointer";
			this.tU.vb = this;
			this.tU.maplet = this.maplet;
			this.tU.onclick = function () {
				this.maplet.setMode("lookup");
				MEvent.trigger(this.vb, "onclick");
			};
			this.tY.appendChild(this.tU);
			this.maplet.vb.appendChild(this.tY);
		}
	};
	this.remove = function () {
		this.maplet = null;
		if (this.tY != null && this.tY.parentNode != null) {
			this.tY.parentNode.removeChild(this.tY);
			this.tY = null;
			this.tU.maplet = null;
			this.tU.onclick = null;
			this.tU = null;
		}
	};
	this.toString = function () {
		return "com.mapbar.maplet.MLookupControl";
	};
}
function MStyleControl(left, top) {
	this.left = (typeof left == "undefined") ? 0 : parseInt(left);
	this.top = (typeof top == "undefined") ? 0 : parseInt(top);
	this.id = new Date().getTime() + parseInt(Math.random() * 1000);
	this.onresize = function (maplet) {
		this.tY.style.left = (this.maplet.width - 132 + this.left - this.maplet.ovw.nH()) + "px";
		this.tZ.style.left = (this.maplet.width - 70 + this.left - this.maplet.ovw.nH()) + "px";
	};
	this.qc = function (maplet) {
		this.maplet = maplet;
		if (this.maplet.gc[this.id] == null) {
			this.maplet.gc[this.id] = this;
			this.tY = document.createElement("div");
			this.tY.id = "stylelabel";
			this.tY.style.position = "absolute";
			this.tY.style.left = (this.maplet.width - 132 + this.left - this.maplet.ovw.nH()) + "px";
			this.tY.style.top = (10 + this.top) + "px";
			this.tY.style.zIndex = 10;
			this.tY.style.visibility = "visible";
			this.tY.unselectable = "on";
			this.tY.alt = tX("%u6672%uF688%uE74A%uAE2E");
			this.tY.style.cursor = (px) ? "hand" : "pointer";
			this.tY.maplet = this.maplet;
			this.tY.innerHTML = tX("%u6672%uF688%uE74A%uAE2E");
			this.tY.style.backgroundColor = "#FFFFFF";
			this.tY.onclick = function () {
				this.maplet.setStyle("baidu");
			};
			this.tZ = document.createElement("div");
			this.tZ.id = "stylelabel";
			this.tZ.style.position = "absolute";
			this.tZ.style.left = (this.maplet.width - 70 + this.left - this.maplet.ovw.nH()) + "px";
			this.tZ.style.top = (10 + this.top) + "px";
			this.tZ.style.zIndex = 10;
			this.tZ.style.visibility = "visible";
			this.tZ.unselectable = "on";
			this.tZ.alt = tX("%u536F%uB98A%uC590%uB040");
			this.tZ.style.cursor = (px) ? "hand" : "pointer";
			this.tZ.maplet = this.maplet;
			this.tZ.innerHTML = tX("%u536F%uB98A%uC590%uB040");
			this.tZ.style.backgroundColor = "#FFFFFF";
			this.tZ.onclick = function () {
				this.maplet.setStyle("aerial");
			};
			this.maplet.vb.appendChild(this.tY);
			this.maplet.vb.appendChild(this.tZ);
		}
	};
	this.remove = function () {
		if (this.tY != null && this.tY.parentNode != null) {
			this.tY.parentNode.removeChild(this.tY);
			this.maplet = null;
			this.tY.onclick = null;
			this.tY.maplet = null;
			this.tY = null;
		}
		if (this.tZ != null && this.tZ.parentNode != null) {
			this.tZ.parentNode.removeChild(this.tZ);
			this.maplet = null;
			this.tZ.onclick = null;
			this.tZ.maplet = null;
			this.tZ = null;
		}
	};
	this.toString = function () {
		return "com.mapbar.maplet.MStyleControl";
	};
}
var MContextMenuItem = function (title, fy) {
	this.title = title;
	this.callback = (typeof fy == "undefined") ? null : fy;
	this.t6 = document.createElement("tr");
	this.t6.style.backgroundColor = "#EEEEEE";
	this.tW = document.createElement("td");
	this.tW.className = "contextmenuitem";
	this.tW.innerHTML = "&nbsp;" + title;
	this.t6.appendChild(this.tW);
	this.uK = function (lM) {
		this.vb.hide();
		if (typeof this.callback == "function" && this.callback) {
			this.callback.apply(null, [this, this.vb.maplet.fP]);
		} else {
			if (typeof this.callback == "string" && this.callback) {
				eval(this.callback);
			} else {
				MEvent.trigger(this, "select", this.vb.maplet.f8, this.vb.maplet.fP);
			}
		}
	};
	this.uG = function (lM) {
		this.t6.style.backgroundColor = "#C8C1C5";
	};
	this.uJ = function (lM) {
		this.t6.style.backgroundColor = "#EEEEEE";
	};
	this.paint = function (vb) {
		this.vb = vb;
		this.vb.t8.appendChild(this.t6);
	};
	this.toString = function () {
		return "com.mapbar.maplet.MContextMenuItem";
	};
	MEvent.bindDom(this.t6, "click", this, this.uK);
	MEvent.bindDom(this.t6, "mouseover", this, this.uG);
	MEvent.bindDom(this.t6, "mouseout", this, this.uJ);
};
var MContextMenu = function () {
	this.qt = new Array();
	this.id = new Date().getTime() + parseInt(Math.random() * 1000);
	this.tY = document.createElement("div");
	this.tY.className = "mapcontextmenu";
	this.t7 = document.createElement("table");
	this.t7.className = "contextmenutable";
	this.t8 = document.createElement("tbody");
	this.t7.appendChild(this.t8);
	this.tY.appendChild(this.t7);
	this.qc = function (maplet) {
		this.maplet = maplet;
		this.maplet.sF.appendChild(this.tY);
	};
	this.zI = function () {
		for (var i in this.t8.childNodes) {
			if (typeof this.t8.childNodes[i] == "object") {
				if (this.t8.childNodes[i].vb != null) {
					this.t8.childNodes[i].vb = null;
				}
				this.t8.removeChild(this.t8.childNodes[i]);
			}
		}
		for (var qC = 0; qC < this.qt.length; qC++) {
			this.qt[qC].paint(this);
		}
	};
	this.addItem = function (item, pn) {
		if (typeof pn == "undefined") {
			this.qt[this.qt.length] = item;
		} else {
			pn = parseInt(pn);
			this.qt.splice(pn, 0, item);
		}
		this.zI();
	};
	this.remove = function () {
		if (typeof this.maplet == "object" && this.maplet) {
			if (this == this.maplet.xc) {
				this.maplet.xc = null;
			}
			this.clear();
			this.maplet.sF.ld.removeChild(this.tY);
			this.maplet = null;
		}
	};
	this.vU = function (pn) {
		this.qt.splice(pn, 1);
		this.zI();
	};
	this.clear = function () {
		for (var qI in this.t8.childNodes) {
			if (typeof this.t8.childNodes[qI] == "object") {
				if (this.t8.childNodes[qI].vb != null) {
					this.t8.childNodes[qI].vb = null;
				}
				this.t8.removeChild(this.t8.childNodes[qI]);
			}
		}
		this.qt = new Array();
		this.zI();
	};
	this.show = function (x, y) {
		this.tY.style.left = parseInt(x) + "px";
		this.tY.style.top = parseInt(y) + "px";
		this.tY.style.visibility = "visible";
	};
	this.hide = function () {
		this.tY.style.visibility = "hidden";
	};
	this.toString = function () {
		return "[MapbarContextMenu]" + this.qt.length;
	};
};
window["MVersion"] = {"version":"31", "build":"0807180014"};
var Maplet = function (gx, gA, AB, Af, nN, Ak, Al, yv, x6) {
	this.lq = 0;
	this.lr = 0;
	this.tR = 0;
	this.tS = 0;
	this.fS = 0;
	this.fT = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	ac = new Date();
	this.pZ = 300;
	this.pN = 300;
	this.clickToCenter = true;
	this.rjk = true;
	this.s16F = false;
	this.A924D = false;
	this.fHy00 = null;
	this.S024Y = null;
	this.XP9 = null;
	this.iy307 = [];
	this.sS = ts.ty;
	this.id = "mapbar";
	this.yt = ((new Date().getTime()) % 86400000).toString(36) + (parseInt(Math.random() * 1000)).toString(36);
	if (typeof strRemoteIP != "undefined" && strRemoteIP) {
		this.yt += "*" + strRemoteIP;
	}
	document["mapbar-maplet"] = this;
	this.left = (typeof Ak == "undefined") ? 0 : parseInt(Ak);
	this.top = (typeof Al == "undefined") ? 0 : parseInt(Al);
	this.width = (typeof Af == "undefined") ? 600 : parseInt(Af);
	this.height = (typeof nN == "undefined") ? 400 : parseInt(nN);
	if (isNaN(parseFloat(gx))) {
		this.id = gx;
		this.vb = (typeof gx == "object") ? gx : document.getElementById(gx);
		if (gA != null && gA != "undefined") {
			var zh = cq.vp(gA);
			this.gx = Math.min(sy[1], Math.max(sy[0], parseFloat(zh[1])));
			this.gA = Math.min(sz[1], Math.max(sz[0], parseFloat(zh[0]) % 360));
			zh = null;
		}
		if (typeof this.vb != "undefined" && this.vb != null) {
			this.left = 0;
			this.top = 0;
			if (this.vb.style.left) {
				this.left = parseInt(this.vb.style.left);
			}
			if (this.vb.style.top) {
				this.top = parseInt(this.vb.style.top);
			}
			if (this.vb.style.width) {
				this.width = parseInt(this.vb.style.width);
			}
			if (this.vb.style.height) {
				this.height = parseInt(this.vb.style.height);
			}
		}
	} else {
		this.gA = gA;
		this.gx = gx;
	}
	this.xL = strImgsvrUrl;
	this.AG = (typeof AB == "undefined") ? 0 : parseInt(AB);
	this.nT = 0;
	this.py = 0;
	this.rotation = 0;
	this.gk = Math.cos(this.rotation / 180 * Math.PI);
	this.wT = Math.sin(this.rotation / 180 * Math.PI);
	this.yv = (yv == "undefined") ? "" : yv;
	this.pU = new Array();
	this.qE = new Array();
	this.yl = (typeof x6 == "undefined" || x6 == null) ? ds : x6;
	this.u2 = null;
	this.u3 = "";
	this.xK = "png";
	this.xw = this.yl;
	this.yh = "";
	this.x4 = this.yl;
	this.x3 = null;
	this.uu = null;
	this.xX = this.yl;
	this.pJ = null;
	this.bp = true;
	this.ff = false;
	this.fe = true;
	this.sf = null;
	this.fj = (typeof bDefaultControlOn == "undefined") ? true : bDefaultControlOn;
	this.fa = false;
	this.z4 = Math.ceil((this.width) / (this.pZ) / 2);
	this.z5 = Math.ceil((this.height) / (this.pN) / 2);
	this.aO = new Array();
	this.aN = new Array();
	this.yG = new Array();
	this.fp = null;
	this.pU = new Array();
	this.aE = new Array();
	this.aF = null;
	this.aG = null;
	this.aH = null;
	this.zy = null;
	this.tG = null;
	this.brush = new MBrush("#FF0000", 2);
	this.sv = 0;
	this.fo = false;
	this.gJ = null;
	this.gI = new Image();
	this.c8 = new MBound(0, 0, 0, 0);
	this.cH = false;
	this.c0 = false;
	this.w3 = new Array();
	this.cI = true;
	this.cn = false;
	this.gc = [];
	this.u5 = [];
	this.vA = this.sS;
	this.fs = false;
	this.c9 = false;
	this.L7142 = null;
	this.tD = 0;
	this.gM = 1;
	this.xc = null;
	this.mapContextMenu = null;
	if (this.width > 480) {
		oww = 210;
		owh = 140;
	}
	this.ovw = new a1b8(this);
	this.wK = new Array();
	if (typeof this.vb == "undefined" || this.vb == null) {
		document.writeln("<div unselectable=\"on\" id=\"" + this.id + "\" style=\"position:absolute;overflow:hidden; width:" + this.width + "px; height:" + this.height + "px; left:" + this.left + "px; top:" + this.top + "px;\"></div>");
		this.vb = q1(this.id);
	} else {
		this.vb.style.overflow = "hidden";
	}
	this.map = this.vb;
	if (this.map) {
		this.map.innerHTML = sc;
		this.map.style.backgroundImage = "url(" + lV + ")";
		this.map.setAttribute("align", "left");
		if (this.map.style.position != "absolute") {
			this.map.style.position = "relative";
		}
		var W_We = "http://www.mapbar.com/ApiCopyrightLink.html?referrer=" + window.location.host;
		this.hm5_ = document.createElement("a");
		this.hm5_.setAttribute("target", "_blank");
		this.hm5_.setAttribute("href", W_We);
		this.hm5_.innerHTML = "&copy;&nbsp;Mapbar";
		this.hm5_.style.position = "absolute";
		this.hm5_.style.zIndex = 3;
		this.hm5_.style.fontSize = "12px";
		this.hm5_.style.color = "blue";
		this.hm5_.style.fontFamily = "arial";
		this.hm5_.style.top = (this.height - 25) + "px";
		this.crd60 = document.createElement("a");
		this.crd60.setAttribute("target", "_blank");
		this.crd60.setAttribute("href", W_We);
		this.crd60.innerHTML = "<img style=\"border:0;\" src=" + strImgsvrUrl + "images/logo3.gif>";
		this.crd60.style.position = "absolute";
		this.crd60.style.zIndex = 3;
		this.crd60.style.fontSize = "12px";
		this.crd60.style.color = "blue";
		this.crd60.style.fontFamily = "arial";
		this.crd60.style.top = (this.height - 25) + "px";
		this.xky19 = document.createElement("a");
		this.xky19.setAttribute("target", "_blank");
		this.xky19.setAttribute("href", "http://www.navinfo.com.cn");
		this.xky19.innerHTML = "&copy;&nbsp;NavInfo";
		this.xky19.style.position = "absolute";
		this.xky19.style.zIndex = 3;
		this.xky19.style.fontSize = "12px";
		this.xky19.style.color = "blue";
		this.xky19.style.fontFamily = "arial";
		this.xky19.style.textDecoration = "none";
		this.xky19.style.top = (this.height - 25) + "px";
		this.xky19.style.left = (this.width - 70) + "px";
		if (this.ovw.nH() > 30) {
			this.hm5_.style.left = (this.width - this.ovw.nH() - 85) + "px";
			this.crd60.style.left = (this.width - this.ovw.nH() - 87) + "px";
		} else {
			this.hm5_.style.left = (this.width - 155) + "px";
			this.crd60.style.left = (this.width - 157) + "px";
		}
		this.map.appendChild(this.hm5_);
		this.map.appendChild(this.crd60);
		this.map.appendChild(this.xky19);
	}
	vZ(this);
	this.r8TR = false;
	this.uw = 0;
	this.t9 = 0;
	this.xe = 10;
	if (bp) {
		this.setOverlay("base");
	}
	this.fM = null;
	MEvent.bind(f1, "clean", this, this.fL);
	this.AY = 0.2;
	this.AS = -1;
	this.AT = 0;
	this.AZ = null;
	this.vg = 20;
	this.vh = null;
	this.Ah = null;
	this.vc = 0;
	this.vd = 0;
	this.vi = 0;
	this.tB = {"zoomin":1, "zoomout":2, "pan":3, "erase":13, "edit":23, "lookup":5, "bookmark":6, "drawline":9, "drawarea":10, "measure":11, "measarea":15};
};
Maplet.prototype = {onresize:function () {
	if (this.ovw.nH() > 75) {
		this.hm5_.style.left = (this.width - this.ovw.nH() - 85) + "px";
		this.crd60.style.left = (this.width - this.ovw.nH() - 87) + "px";
	}
	this.hm5_.style.top = (this.height - 25) + "px";
	this.crd60.style.top = (this.height - 25) + "px";
	this.xky19.style.top = (this.height - 20) + "px";
	this.xky19.style.left = (this.width - 70) + "px";
}, nI:function () {
	if (!this.ff) {
		return null;
	}
	if (this.AP == null) {
		this.AP = new AO(this, -1, this.width - 16, 0, 16, this.height, this.ff, this.vb);
	}
	return this.AP;
}, wP:function (lM) {
	MEvent.trigger(this, "contextmenu");
	var t5 = document["mapbar-maplet"];
	MEvent.trigger(t5, "contextmenu");
	var l6 = (px) ? event.srcElement.id : lM.target.id;
	var target = (px) ? event.srcElement : lM.target;
	var Ap = parseInt((px) ? event.clientX : lM.clientX) - t5.offsetX;
	var Av = parseInt((px) ? event.clientY : lM.clientY) - t5.offsetY;
	t5.l6 = l6;
	t5.f8 = l6;
	t5.fS = Ap - t5.left;
	t5.fT = Av - t5.top;
	t5.fR = t5.zp(t5.fS, t5.fT);
	t5.fO = t5.zo(t5.fS, t5.fT);
	cq.lf = t5.fO;
	cq.li = t5.fR;
	t5.fP = cq.zn();
	if (t5.xc) {
		t5.xc.hide();
	}
	if (typeof target.contextmenu != "undefined" && target.contextmenu != null) {
		t5.xc = target.contextmenu;
		target.contextmenu.show(t5.fS, t5.fT);
	} else {
		if (t5.mapContextMenu != null) {
			t5.xc = t5.mapContextMenu;
			t5.mapContextMenu.show(t5.fS, t5.fT);
		}
	}
	return false;
}, getContextMenu:function () {
	return this.mapContextMenu;
}, setContextMenu:function (uc) {
	if (this.mapContextMenu != uc) {
		this.removeContextMenu();
	}
	this.mapContextMenu = uc;
	if (this.mapContextMenu != null) {
		this.mapContextMenu.qc(this);
	}
}, setStandardContextMenu:function (uc) {
	this.xc = uc;
}, removeContextMenu:function () {
	if (this.mapContextMenu != null) {
		if (this.xc == this.mapContextMenu) {
			this.xc = null;
		}
		this.sF.ld.removeChild(this.mapContextMenu.tY);
		this.mapContextMenu.maplet = null;
		this.mapContextMenu = null;
	}
}, showMap:function () {
	if (MapBackgroundColor) {
		this.vb.style.backgroundColor = MapBackgroundColor;
	}
	this.vb.oncontextmenu = this.wP;
	this.sG = new fD("MapContainerBg", 0, 0, this.width, this.height, true, 0, "", this.vb);
	this.sF = new fD("MapContainer", 0, 0, this.width, this.height, true, 2, "", this.vb);
	this.zs = new fD("ToolTip", 0, 0, 0, 0, false, 24, "", this.sF);
	this.sE = new fD("LayerMap", 0, 0, this.width, this.height, true, 2, "", this.sF);
	this.vx = new fD("LayerPoiMap", 0, 0, this.width, this.height, true, 3, "", this.sF);
	this.nI();
	if (this.fj) {
		var gV = new MStandardControl();
		this.addControl(gV);
		this.ga = gV.nR;
	}
	this.wq = new fD("LayerScale", 1, this.height - 24, 100, 24, this.fe, 3, "", this.vb);
	var content = "<table bordercolor=\"#4444EE\" border=\"2\" width=\"100%\" height=\"100%\"><tr><td></td></tr></table>";
	this.sD = new fD("LayerBorder", 1, 1, 1, 1, false, 6, content, this.vb);
	var An = (navigator.appVersion.match(new RegExp("6.", "i")) == "6.") ? 0 : 2;
	this.sO = new fD("LayerMask", 0, 0, this.width - An, this.height - An, true, 2, "", this.sF);
	this.sO.style.backgroundImage = "url(" + strImgsvrUrl + "images/mask.gif)";
	this.sM = new fD("mapbar-bordertop", 0, 0, this.width, 0, true, 6, "", this.vb);
	this.sK = new fD("mapbar-borderlft", 0, 0, 0, this.height, true, 6, "", this.vb);
	this.sJ = new fD("mapbar-borderbtm", 0, this.height - 3 + An, this.width, 0, true, 6, "", this.vb);
	this.sL = new fD("mapbar-borderrgt", this.width - 1, 0, 0, this.height, true, 6, "", this.vb);
	this.lA = new fD("LayerDrawMap", 0, 0, this.width, this.height, true, 4, "", this.sF);
	this.lA.style.backgroundImage = "url(" + strImgsvrUrl + "images/mask.gif)";
	this.ovw.qa(this.vb);
	var rightMargin = 15;
	var ui = 0;
	this.sg = (this.width > 360) ? 150 : 73;
	if ((this.ovw.nF() + this.ovw.nz()) > (this.height - 23)) {
		ui += Math.max(0, this.ovw.nH() - (this.sg - 70));
	}
	MEvent.bindDom(this.map, "mousemove", this, this.a3);
	MEvent.bindDom(this.map, "mousedown", this, this.a2);
	MEvent.bindDom(this.map, "mouseup", this, this.a6);
	MEvent.bindDom(this.map, "click", this, this.aZ);
	MEvent.bindDom(this.map, "dblclick", this, this.a1);
	MEvent.bindDom(this.map, "mouseout", this, this.a4);
	MEvent.bindDom(this.map, "drag", this, this.a3);
	MEvent.bindDom(this.map, "dragstart", this, this.a3);
	MEvent.bindDom(this.map, "dragend", this, this.a3);
	MEvent.bindDom(this.map, "mouseover", this, this.a5);
	if (mw) {
		MEvent.bindDom(this.map, "mousewheel", this, this.a7);
	}
	if (kp) {
		MEvent.bindDom(document, "keydown", this, this.onkeydown);
	}
	MEvent.bindDom(window, "scroll", this, function (lM) {
		this.rjk = true;
		this.a5(lM);
	});
	this.qd();
	this.setZoomLevel(this.AG);
	this.setMode(this.sS);
	if (this.zP == null) {
		this.zP = setInterval("document['mapbar-maplet'].zL()", 100);
	}
}, qd:function () {
	this.sD.hide();
	this.sD.resize(1, 1);
	this.sD.moveTo(-10, -10);
	if (document.all) {
		this.sE.moveTo(0, 0);
		this.sE.show();
		this.vx.moveTo(0, 0);
		this.vx.show();
		this.lA.moveTo(0, 0);
		this.lA.show();
		this.sO.moveTo(0, 0);
		this.sO.show();
	}
}, setStyle:function (x7, xH) {
	if (this.yl != x7) {
		this.yl = x7;
		if ("aerial" == this.yl || this.yl.indexOf("aerial") >= 0) {
			this.xK = "jpg";
		} else {
			this.xK = "png";
		}
		if (typeof xH != "undefined") {
			this.xK = xH;
		}
		if (typeof this.sF != "undefined") {
			for (var i in this.pU) {
				try {
					if (this.pU[i] != null && typeof this.pU[i] == "object") {
						if (this.pU[i].parentNode != null) {
							this.pU[i].parentNode.removeChild(this.pU[i]);
						}
						this.pU[i] = null;
					}
				}
				catch (lM) {
				}
			}
			this.refresh();
			MEvent.trigger(this, "style", x7);
		}
	}
}, setRotation:function (v0) {
	if (px && rs) {
		this.rotation = v0;
		this.gk = Math.cos(this.rotation / 180 * Math.PI);
		this.wT = Math.sin(this.rotation / 180 * Math.PI);
	}
}, setHeadMode:function (pz) {
	this.nT = pz;
}, setOverlay:function (xZ, uz) {
	if (typeof uz == "string") {
		this.u3 = uz;
	}
	if (this.u2 != xZ) {
		this.u2 = xZ;
	}
	if (typeof this.sF != "undefined") {
		this.refresh();
	}
}, zN:function () {
	var ll = sj[this.AG] * this.width / this.pZ;
	this.c8.tl = (this.gA - ll / 2);
	this.c8.s6 = (this.gA + ll / 2);
	var lk = qP[this.AG] * this.height / this.pN;
	this.c8.tj = (this.gx - lk / 2);
	this.c8.s4 = (this.gx + lk / 2);
}, fI:function (AB) {
	if (this.w3 != null && this.w3.length > 0) {
		sY = this.c8.s0;
		te = this.c8.tp;
		var ll = sj[AB] * this.width / this.pZ;
		var tl = (this.gA - ll / 2);
		var s6 = (this.gA + ll / 2);
		var lk = qP[AB] * this.height / this.pN;
		var tj = (this.gx - lk / 2);
		var s4 = (this.gx + lk / 2);
		for (var i = 0; i < this.w3.length; i++) {
			if (this.w3[i].qn(tj, tl) && this.w3[i].qn(s4, s6)) {
				sY = this.w3[i].s0;
				te = this.w3[i].tp;
				break;
			}
		}
	}
}, setBound:function (c7) {
	this.c8 = c7;
}, refresh:function () {
	this.u0();
	this.u8();
}, fL:function () {
	if (this.fM != null) {
		clearTimeout(this.fM);
		this.fM = null;
	}
	if (this.c0 || this.fs || f1.fx.length > 0) {
		this.fM = getTimeout(this, this.fL, 100);
		return;
	}
	this.no();
}, no:function () {
	var pL = 0;
	for (var i in this.pU) {
		try {
			if (this.pU[i] != null && typeof this.pU[i] == "object") {
				if (this.pU[i].c2 == true) {
				} else {
					if (this.pU[i].parentNode != null) {
						this.pU[i].parentNode.removeChild(this.pU[i]);
					}
					this.pU[i].onerror = null;
					this.pU[i].onload = null;
					this.pU[i] = null;
					pL++;
				}
			}
		}
		catch (lM) {
		}
	}
	this.sG.ld.style.zoom = 1;
	this.sG.ld.style.left = "0px";
	this.sG.ld.style.top = "0px";
	this.sG.ld.style.visibility = "hidden";
}, zL:function () {
	if (this.fs == true || this.c0 == true || (typeof this.Ai != "undefined" && this.Ai != 0)) {
		return;
	}
	var sP = parseInt(this.sF.style.left);
	var sQ = parseInt(this.sF.style.top);
	if ((sP + this.tf1) >= 0 || (sP + this.sZ - this.width) <= 0 || (sQ + this.tg) >= 0 || (sQ + this.s1 - this.height) <= 0) {
		this.fs = true;
		this.zA();
	}
}, zA:function () {
	if (this.fs == false) {
		return;
	}
	var sP = parseInt(this.sF.style.left);
	var sQ = parseInt(this.sF.style.top);
	if ((sP + this.tf1) >= 0 || (sP + this.sZ - this.width) <= 0) {
		if (this.c0 == true) {
			return;
		}
		this.c0 = true;
		try {
			var qy = 0;
			var p1 = 0;
			if ((sP + this.tf1) >= 0) {
				this.th--;
				this.tf1 -= parseInt(this.pZ);
				qy = this.th;
				p1 = this.tf1;
			}
			if ((sP + this.sZ - this.width) <= 0) {
				this.s2++;
				p1 = this.sZ;
				this.sZ += parseInt(this.pZ);
				qy = this.s2;
			}
			var qx = qy;
			var nL = nM[this.AG];
			var s8 = parseInt(360 / sj[this.AG]);
			qy = (qy) % s8;
			if (qy >= (s8 / 2)) {
				qy -= s8;
			}
			if (qy < (-s8 / 2)) {
				qy += s8;
			}
			var yk = this.yl;
			for (var qz = this.ti; qz <= this.s3; qz++) {
				var qA = qz;
				var p3 = (-(qz - this.ti + 1) * this.pN) + this.s1;
				this.aA(p1, p3, qy, qA, qx, qz, yk);
			}
			this.c0 = false;
		}
		catch (lM) {
		}
	}
	if ((sQ + this.tg) >= 0 || (sQ + this.s1 - this.height) <= 0) {
		if (this.c0 == true) {
			return;
		}
		this.c0 = true;
		try {
			var qA = 0;
			var p3 = 0;
			if ((sQ + this.tg) >= 0) {
				this.s3++;
				this.tg -= parseInt(this.pN);
				qA = this.s3;
				p3 = this.tg;
			}
			if ((sQ + this.s1 - this.height) <= 0) {
				this.ti--;
				p3 = this.s1;
				this.s1 += parseInt(this.pN);
				qA = this.ti;
			}
			var qz = qA;
			var nL = nM[this.AG];
			var s8 = parseInt(360 / sj[this.AG]);
			var yk = this.yl;
			for (var qx = this.th; qx <= this.s2; qx++) {
				var qy = qx;
				qy = (qy) % s8;
				if (qy >= (s8 / 2)) {
					qy -= s8;
				}
				if (qy < (-s8 / 2)) {
					qy += s8;
				}
				var p1 = ((qx - this.th) * this.pZ) + this.tf1;
				this.aA(p1, p3, qy, qA, qx, qz, yk);
			}
			this.c0 = false;
		}
		catch (lM) {
		}
	}
	this.fs = false;
}, aA:function (p1, p3, qy, qA, qx, qz, yk) {
	var nL = nM[this.AG];
	var pM = this.xL + "mapbank/" + yk + "/" + this.sR;
	var xY = ((this.AG).toString(16) + qx.toString(16) + "l" + qz.toString(16)).toLowerCase();
	var g7 = parseInt(Math.floor((qy) / nL));
	var g8 = parseInt(Math.floor((qA) / nL));
	if (g7 < 0) {
		g7 += 1;
	}
	if (g8 < 0) {
		g8 += 1;
	}
	var nl = (qy) - g7 * nL;
	var nm = (qA) - g8 * nL;
	pM += g7 + "_" + g8 + "/";
	pM += nl + "_" + nm + "." + this.xK;
	if (pM && pM.indexOf("NaN") < 0) {
		if (this.pU[xY] == null) {
			if (rs == 0 || !px) {
				this.pU[xY] = new Image();
				this.pU[xY].id = xY;
				this.pU[xY].name = xY;
				this.pU[xY].ntry = "0";
				this.pU[xY].unselectable = "on";
				this.pU[xY].style.position = "absolute";
			} else {
				this.pU[xY] = document.createElement("v:Image");
				this.pU[xY].id = xY;
				this.pU[xY].name = xY;
				this.pU[xY].ntry = "0";
				this.pU[xY].unselectable = "on";
				this.pU[xY].style.position = "absolute";
				this.pU[xY].cE = "f";
				this.pU[xY].style.rotation = this.rotation;
				this.pU[xY].style.width = this.pZ + "px";
				this.pU[xY].style.height = this.pN + "px";
			}
			f1.nk(this.pU[xY], pM, this.pZ, this.pN);
			this.sE.ld.appendChild(this.pU[xY]);
		} else {
			if (px && rs) {
				this.pU[xY].style.rotation = this.rotation;
			}
		}
		var p2 = (p1 + this.pZ / 2 - this.width / 2) * this.gk - (p3 + this.pN / 2 - this.height / 2) * this.wT + this.width / 2;
		var p5 = (p1 + this.pZ / 2 - this.width / 2) * this.wT + (p3 + this.pN / 2 - this.height / 2) * this.gk + this.height / 2;
		this.pU[xY].style.top = parseInt(p5 - this.pN / 2) + "px";
		this.pU[xY].style.left = parseInt(p2 - this.pZ / 2) + "px";
		this.pU[xY].c2 = true;
		xY = null;
	}
	pM = null;
	this.no();
}, u8:function (nn, zE) {
	if (this.fe) {
		var ws = (this.xg * 100 * 81 / parseInt(this.pZ)) * this.gM;
		var wr = strImgsvrUrl + "images/scale.gif";
		var ns = "#FFFFBB";
		var zD = 4;
		var xC = (en) ? "km" : tX("%u516E%uE338");
		var xF = (en) ? "mi" : tX("%u54EA");
		if (this.x4 != "undefined" && this.x4 != null) {
			ws = (this.xg * 100 * 60 / parseInt(this.pZ)) * this.gM;
			wr = strImgsvrUrl + "images/" + this.x4 + "/scale.gif";
			ns = "#000000";
			zD = 0;
		}
		if (typeof nn != "undefined") {
			this.x3 = nn;
		}
		if (typeof zE != "undefined") {
			this.uu = zE;
		}
		if (this.x3 != null) {
			ns = this.x3;
		}
		if (this.uu != null) {
			zD = this.uu;
		}
		if (en == 1) {
			wr = strImgsvrUrl + "images/scale2.gif";
			zD = -1;
		}
		ws = (ws < 10) ? (ws).toPrecision(1) : parseInt(ws);
		var x2 = "<div unselectable=\"on\" style=\"position:absolute;top:3px;left:1px;z-Index:0\"><IMG src=\"" + wr + "\" ></div>";
		x2 += "<div unselectable=\"on\" style=\"position:absolute;top:" + zD + "px;left:1px;z-Index:1\"><TABLE cellSpacing=0 cellPadding=0 border=0><TBODY><TR><TD unselectable=\"on\" style=\"z-Index:1; font-family: arial;FONT-SIZE: 12px; color:" + ns + ";FONT-WEIGHT: bold;\" width=\"100%\">&nbsp;" + ws + " " + xC + "</TD></TR></TBODY></TABLE></div>";
		if (en == 1) {
			x2 += "<div unselectable=\"on\" style=\"position:absolute;top:" + (zD + 13) + "px;left:1px;z-Index:1px;\"><TABLE cellSpacing=0 cellPadding=0 border=0><TBODY><TR><TD unselectable=\"on\" style=\"z-Index:1; font-family: arial;FONT-SIZE: 12px; color:" + ns + ";FONT-WEIGHT: bold;\" width=\"100%\">&nbsp;" + ws + " " + xF + "</TD></TR></TBODY></TABLE></div>";
		}
		this.wq.ld.innerHTML = x2;
	} else {
		this.wq.ld.innerHTML = "";
	}
}, showSmallLogo:function (c2) {
	if (c2) {
		this.crd60.style.display = "none";
	} else {
		this.crd60.style.display = "block";
	}
}, showNavLogo:function (c2) {
	if (!c2) {
		this.xky19.style.display = "none";
	} else {
		this.xky19.style.display = "block";
	}
}, waitPan:function (x, y, fy) {
	if (this.Ah) {
		clearTimeout(this.Ah);
	}
	this.Ah = null;
	if (x && y) {
		if (this.vi == 0) {
			this.vi = 1;
			this.vc = x;
			this.vd = y;
			this.fy = fy;
			this.Ah = getTimeout(this, this.waitPan, 500);
		}
	} else {
		if (this.vi) {
			this.vi = 0;
			this.panTo(this.vc, this.vd, this.fy);
		}
	}
}, doPan:function () {
	this.fa = true;
	var tN = parseInt(Math.sqrt(this.Aq * this.Aq + this.Aw * this.Aw));
	if (this.vh) {
		clearTimeout(this.vh);
	}
	this.vh = null;
	if ((this.va - tN) <= (1.2 * this.vg)) {
		this.Aq = this.xoffset;
		this.Aw = this.yoffset;
		this.sF.moveTo(this.Aq, this.Aw);
		this.vh = getTimeout(this, this.finishupPan, 10);
	} else {
		var lJ = this.xoffset * this.vg / this.va;
		var lL = this.yoffset * this.vg / this.va;
		this.Aq += lJ;
		this.Aw += lL;
		this.sF.moveTo(this.Aq, this.Aw);
		this.vh = getTimeout(this, this.doPan, 10);
	}
}, finishupPan:function () {
	this.fa = false;
	this.s16F = true;
	this.fHy00 = new Date().getTime();
	this.S024Y = this.Aq;
	this.XP9 = this.Aw;
	if (this.vh) {
		clearTimeout(this.vh);
	}
	this.vh = null;
	this.setCenter(this.ve, this.vf);
	this.s16F = false;
	MEvent.trigger(this, "pan", "&act=pan&zm=" + this.AG + "&ctr=" + this.toMapCoordinate(this.width / 2, this.height / 2));
	if (this.fp && this.fp.parentNode != this.sF.ld) {
		this.sF.ld.appendChild(this.fp);
	} else {
	}
	if (this.fy != null && this.fy != "undefined") {
		eval(this.fy);
	}
}, AN:function (AL, x, y) {
	if (typeof x == "undefined") {
		x = 0;
	}
	if (typeof y == "undefined") {
		y = 0;
	}
	var AK = Math.pow(2, parseFloat(AL)) / Math.pow(2, this.AG);
	this.sF.ld.style.zoom = AK;
	this.sF.ld.style.left = (this.width / 2 - this.width * AK / 2 + x) + "px";
	this.sF.ld.style.top = (this.height / 2 - this.height * AK / 2 + y) + "px";
}, vQ:function (aD) {
	while (aD != null && aD.length > 0) {
		aD[aD.length - 1] = null;
		aD.length--;
	}
}, vS:function (aD, pp) {
	if (pp >= 0 && aD.length > pp) {
		aD[pp] = null;
		for (var i = pp; i < aD.length - 1; i++) {
			aD[i] = aD[i + 1];
		}
		aD[aD.length - 1] = null;
		aD.length--;
	}
}, getElementById:function (aD, pid) {
	var pp = this.p8(aD, pid);
	if (pp >= 0 && aD.length > pp) {
		return aD[pp];
	}
	return null;
}, p8:function (aD, lU) {
	var pp = -1;
	for (var i = 0; i < aD.length; i++) {
		if (aD[i].id == lU) {
			pp = i;
			break;
		}
	}
	return pp;
}, removePointAt:function (pt) {
	this.vS(this.aO, pt);
}, vX:function (pid) {
	this.vS(this.aO, this.p8(this.aO, pid));
}, removeAllPoints:function () {
	this.vQ(this.aO);
}, removeLabelAt:function (pq) {
	this.vS(this.yG, pq);
}, vV:function (pid) {
	this.vS(this.yG, this.p8(this.yG, pid));
}, removeAllLabels:function () {
	this.vQ(this.yG);
}, removeLineAt:function (pr) {
	this.vS(this.aN, pr);
}, vW:function (pid) {
	this.vS(this.aN, this.p8(this.aN, pid));
}, removeAllLines:function () {
	this.vQ(this.aN);
}, addHotspot:function (lf, li, xP, tp, s0) {
	var nW = "hotspot" + this.aE.length;
	if (typeof li == "object" && li.toString() == "com.mapbar.maplet.MPoint") {
		lf = li.lon;
		li = li.lat;
	} else {
		var zh = cq.vp(li);
		lf = Math.min(sy[1], Math.max(sy[0], parseFloat(zh[1])));
		li = Math.min(sz[1], Math.max(sz[0], parseFloat(zh[0]) % 360));
	}
	var n5 = new a8(nW, "", "", parseFloat(lf), parseFloat(li), xP, "", "0");
	n5.fl = false;
	n5.AJ = tp;
	n5.AI = s0;
	this.aE[this.aE.length] = n5;
}, addPointWithSwapImage:function (xI, xJ, lf, li, xP, xu, cK, vD) {
	this.aO[this.aO.length] = new a8("point" + this.sv, xI, xJ, parseFloat(lf), parseFloat(li), xP, xu, cK, vD);
	this.sv++;
}, addPointWithId:function (id, lf, li, xP, xu, cK, vD) {
	this.aO[this.aO.length] = new a8(id, pc[id], pb[id], parseFloat(lf), parseFloat(li), xP, xu, cK, vD);
}, addIcon:function (xI, xR, xP, xA, cK, vD) {
	var aI = cq.vp(xR);
	this.addPoint(xI, aI[1], aI[0], xP, xA, cK, vD);
}, nC:function () {
	return this.c8;
}, zp:function (x, y) {
	var An = (x - this.width / 2);
	if (this.rotation != 0) {
		var At = (y - this.height / 2);
		An = An * this.gk + At * this.wT;
	}
	var li = this.gA + An * this.xg / this.pZ;
	li = Math.min(sz[1], Math.max(sz[0], li % 360));
	return li;
}, zo:function (x, y) {
	var At = (y - this.height / 2);
	if (this.rotation != 0) {
		var An = (x - this.width / 2);
		At = -An * this.wT + At * this.gk;
	}
	var lf = this.gx - At * this.xf / this.pN;
	lf = Math.min(sy[1], Math.max(sy[0], lf));
	return lf;
}, zl:function (li, lf) {
	var g2 = ((parseFloat(li) - this.gA) % 360);
	if (g2 > 180) {
		g2 -= 360;
	}
	if (g2 < -180) {
		g2 += 360;
	}
	var p1 = Math.round(this.width / 2 + g2 / sj[this.AG] * this.pZ);
	if (this.rotation != 0) {
		var p3 = Math.round(this.height / 2 - ((parseFloat(lf) - this.gx) % 360) / qP[this.AG] * this.pN);
		p1 = (p1 - this.width / 2) * this.gk - (p3 - this.height / 2) * this.wT + this.width / 2;
	}
	return p1;
}, zm:function (lf, li) {
	var p3 = Math.round(this.height / 2 - ((parseFloat(lf) - this.gx) % 360) / qP[this.AG] * this.pN);
	if (this.rotation != 0) {
		var g2 = ((parseFloat(li) - this.gA) % 360);
		if (g2 > 180) {
			g2 -= 360;
		}
		if (g2 < -180) {
			g2 += 360;
		}
		var p1 = Math.round(this.width / 2 + g2 / sj[this.AG] * this.pZ);
		p3 = (p1 - this.width / 2) * this.wT + (p3 - this.height / 2) * this.gk + this.height / 2;
	}
	return p3;
}, setMode:function (zr, fy) {
	zr = zr.toString().toLowerCase();
	zr = (this.tB[zr]) ? parseInt(this.tB[zr]) : parseInt(zr);
	if ((zr != 3 && zr != 23) && this.sS == zr) {
		return null;
	}
	if (this.sS == 3 || this.sS == 23) {
		this.vA = this.sS;
	}
	this.sS = parseInt(zr);
	this.cS = false;
	this.cO = false;
	this.v2();
	var l8 = null;
	switch (zr) {
	  case "zoomin":
	  case "1":
	  case 1:
		this.cS = true;
		this.map.style.cursor = "crosshair";
		this.sS = 1;
		l8 = "zoomin";
		break;
	  case "zoomout":
	  case "2":
	  case 2:
		this.cS = true;
		this.sS = 2;
		this.map.style.cursor = "crosshair";
		l8 = "zoomout";
		break;
	  case ts.ty:
	  case "pan":
	  case 3:
		this.sS = 3;
		l8 = "pan";
		zr = null;
	  case ts.l3:
	  case 13:
	  case "erase":
		if (zr) {
			this.sS = 13;
			l8 = "erase";
			zr = null;
		}
	  case ts.tu:
	  case "edit":
	  case 23:
		if (zr) {
			this.sS = 23;
			l8 = "edit";
			zr = null;
		}
		this.cO = true;
		this.map.style.cursor = "default";
		break;
	  case ts.tv:
	  case "lookup":
	  case 5:
		this.cS = true;
		this.map.style.cursor = "crosshair";
		this.sS = 5;
		l8 = "lookup";
		break;
	  case "6":
	  case 6:
	  case "bookmark":
		this.map.style.cursor = "default";
		l8 = "bookmark";
		this.sS = 6;
		break;
	  case "7":
	  case 7:
		this.map.style.cursor = "default";
		break;
	  case "8":
	  case 8:
		this.map.style.cursor = "default";
		break;
	  case "9":
	  case 9:
	  case "drawline":
		this.map.style.cursor = "default";
		this.po = -1;
		this.sS = 9;
		l8 = "drawline";
		break;
	  case "10":
	  case 10:
	  case "drawarea":
		this.map.style.cursor = "default";
		this.po = -1;
		this.sS = 10;
		l8 = "drawarea";
		break;
	  case "11":
	  case 11:
	  case "measure":
		this.map.style.cursor = "default";
		l8 = "measure";
		this.sS = 11;
		break;
	  case "15":
	  case 15:
	  case "measarea":
		this.map.style.cursor = "default";
		l8 = "measarea";
		this.sS = 15;
		break;
	  default:
		break;
	}
	var rl3 = null;
	if (l8 != null && typeof fy == "function") {
		rl3 = MEvent.addListener(this, l8, fy);
	}
	if (l8 != null) {
		MEvent.trigger(this, "setmode", l8);
	}
	return rl3;
}, setCursorStyle:function (xy) {
	this.map.style.cursor = xy;
}, wN:function (x, y, ya, xu, ct) {
	if (this.fa) {
		return;
	}
	if (typeof ya == "undefined" || ya == null) {
		return;
	}
	if (iToolTipStyle == "undefined" || iToolTipStyle == 1) {
		var p0 = (typeof ya == "object") ? ya : null;
		if (p0) {
			avBubble.gl(p0.title, p0.content);
			ct = xu;
		} else {
			avBubble.gl(ya, xu);
		}
		if (ct == true || (((x > avBubble.width / 2 - avBubble.l2O_u) && (x < this.width - (avBubble.width / 2 + avBubble.l2O_u))) && (y > avBubble.height && y < this.height))) {
			if (p0) {
				this.fp = p0.gv(x, y);
			} else {
				this.fp = gp(ya, x, y, xu);
			}
			this.sF.ld.appendChild(this.fp);
			document.getElementById("bubble").style.display = "block";
			ContentInfo.LayoutContent();
		} else {
			var anchorX = new Number();
			var anchorY = new Number();
			if (x < avBubble.width / 2 - avBubble.l2O_u) {
				anchorX = avBubble.width / 2 - avBubble.l2O_u + 10;
			} else {
				if (x > this.width - (avBubble.width / 2 + avBubble.l2O_u)) {
					anchorX = this.width - (avBubble.width / 2 + avBubble.l2O_u) - 10;
				} else {
					anchorX = x;
				}
			}
			if (y > avBubble.height && y < this.height) {
				anchorY = y;
			} else {
				anchorY = avBubble.height + 10;
			}
			var vj = anchorX - x;
			var vk = anchorY - y;
			if (p0) {
				this.fp = p0.gv(anchorX + 2, anchorY, true);
			} else {
				this.fp = gp(ya, anchorX, anchorY, xu, true);
			}
			this.panTo(vj, vk, "document.getElementById(\"bubble\").style.display = \"block\";ContentInfo.LayoutContent();avBubble.syncContentInfoPosition();avBubble.calcLatLon();");
		}
	} else {
		var p0 = (typeof ya == "object") ? ya : null;
		if (p0) {
			setToolTipMenu(x, y, p0.title, p0.content);
		} else {
			setToolTipMenu(x, y, ya, xu);
		}
	}
}, hideBubble:function () {
	hideBubble(this);
	if (this.fp) {
		if (this.fp.parentNode) {
			this.fp.parentNode.removeChild(this.fp);
		}
		this.fp = null;
	}
}, aY:function () {
	if ((this.tR > 0) && (this.tR < this.width) && (this.tS > 0) && (this.tS < this.height) && (this.lq > 0) && (this.lq < this.width) && (this.lr > 0) && (this.lr < this.height)) {
		return true;
	} else {
		return false;
	}
}, lu:function () {
	if (this.tR < this.lq && this.tS < this.lr) {
		this.sD.resize(this.lq - this.tR, this.lr - this.tS);
		this.sD.moveTo(this.tR, this.tS);
	} else {
		if (this.tR > this.lq && this.tS < this.lr) {
			this.sD.resize(this.tR - this.lq, this.lr - this.tS);
			this.sD.moveTo(this.lq, this.tS);
		} else {
			if (this.tR < this.lq && this.tS > this.lr) {
				this.sD.resize(this.lq - this.tR, this.tS - this.lr);
				this.sD.moveTo(this.tR, this.lr);
			} else {
				if (this.tR > this.lq && this.tS > this.lr) {
					this.sD.resize(parseInt(this.tR) - this.lq, parseInt(this.tS) - this.lr);
					this.sD.moveTo(this.lq, this.lr);
				} else {
					this.sD.resize(this.tR - this.lq, this.tS - this.lr);
					this.sD.moveTo(this.lq, this.lr);
				}
			}
		}
	}
}, v2:function () {
	if (px && this.zy && this.zy.zX.parentNode == this.lA.ld) {
		this.zy.remove();
	}
	if (px && this.tG && this.tG.zX.parentNode == this.lA.ld) {
		this.tG.remove();
	}
	this.zy = null;
	this.tG = null;
}, addPolyline:function (aK, aM, xt, qq, qr, cr) {
	var ub = new a9("pline" + this.sv, aK, aM, xt, qq, qr, cr);
	ub.maplet = this;
	this.aN[this.aN.length] = ub;
	this.sv++;
}, addPolylineString:function (x6, xT, cr) {
	var aV = x6.split(",");
	var az = new a9("pline" + this.sv, null, null, (aV.length > 2) ? aV[2] : null, (aV.length > 0) ? parseInt(aV[0]) : 0, (aV.length > 1) ? aV[1] : 1, cr);
	az.maplet = this;
	this.sv++;
	az.vp(xT);
	this.aN[this.aN.length] = az;
}, addLabelString:function (type, xQ, wV) {
	var zh = cq.vp(xQ);
	this.addLabel((type == null) ? "http://map.mapbar.com/maplite/images/marker.gif" : type, zh[1], zh[0], wV);
}, addOrigin:function (lf, li) {
	aC.setOrigin(parseFloat(lf), parseFloat(li));
}, addDestination:function (lf, li) {
	aC.setDestination(parseFloat(lf, li));
}, clean:function () {
	this.hideBubble();
	this.removeAllPoints();
	this.removeAllLabels();
	this.removeAllLines();
	pd = new Array();
	pa = new Array();
	this.refresh();
}, showBasePois:function (c2) {
	this.bp = c2;
	this.refresh();
}, showZoomBar:function (c2, yh) {
	this.ff = c2;
	if (typeof yh != "undefined" && yh != null) {
		if (this.yh != yh) {
			this.yh = yh;
			this.nI().setStyle(this.yh);
		}
	}
	if (this.ff) {
		this.ovw.hide();
		this.nI().show();
		this.AP.setZoomLevel(this.getZoomLevel());
	} else {
		if (this.AP != null) {
			this.AP.hide();
		}
	}
}, addControl:function (gB, fi, q6, zw) {
	if (typeof gB == "string" || (typeof gB == "object" && gB.toString().indexOf("MStandardControl") > 0)) {
		if (this.ga) {
			this.ga.g1();
			this.ga = null;
		}
		var t0 = null;
		if (typeof gB == "string") {
			if (q6 == null || q6 == "undefined") {
				q6 = 0;
			}
			if (zw == null || zw == "undefined") {
				zw = 0;
			}
			t0 = new MStandardControl(gB, q6, zw, fi);
		} else {
			if (typeof gB == "object") {
				t0 = gB;
			}
		}
		if (t0) {
			t0.qc(this);
		}
	} else {
		if (typeof gB == "object") {
			if (this.gc[gB.id]) {
				return;
			}
			gB.qc(this);
			this.gc[gB.id] = gB;
			this.ovw.addListener(this.gc[gB.id]);
		}
	}
}, removeControl:function (gw) {
	if (typeof gw == "object" && this.gc[gw.id]) {
		this.gc[gw.id].remove();
		this.gc[gw.id] = null;
	}
}, addBound:function (c7) {
	if (typeof c7 != "undefined") {
		this.w3[this.w3.length] = c7;
	}
}, clearAllBounds:function () {
	for (var i = 0; i < this.w3.length; i++) {
		this.w3[i] = null;
	}
	this.w3.length = 0;
}, setScaleBarValue:function (qw) {
}, getCurrentMap:function () {
	var sT = this.width * sj[this.AG] / this.pZ;
	cq.lf = this.gx;
	cq.li = this.gA;
	var gz = cq.zn();
	var vy = (this.aO.length > 0) ? "&pois=" + this.aO.length + "," : "";
	for (var i = 0; i < this.aO.length; i++) {
		vy += this.aO[i].zn() + "," + this.aO[i].xP + ",";
	}
	var vw = (this.aN.length > 0) ? "&plines=" + this.aN.length + "," : "";
	for (var i = 0; i < this.aN.length; i++) {
		vw += this.aN[i].zn() + ";";
	}
	var u1 = "";
	for (var i in this.u5) {
		if (typeof this.u5[i] == "object" && this.u5[i] != null && this.u5[i].zq) {
			if (u1.length == 0) {
				u1 = "&overlays=";
			}
			u1 += this.u5[i].zq() + ";";
		}
	}
	return "&map=" + this.AG + "," + gz + "," + this.width + "," + this.height + "&zm=" + (Math.round(parseFloat(sT) * 1000) / 10) + "&width=" + this.width + "&height=" + this.height + "&ctr=" + gz + vy + vw + "&client=" + strLicenseKey + u1;
}, getLastPoint:function () {
	var vy = "&poi=";
	if (this.aO.length > 0) {
		vy += this.aO[this.aO.length - 1].zn() + "," + this.aO[this.aO.length - 1].xP;
	}
	return vy;
}, getLastLine:function () {
	var vw = "&pline=";
	if (this.aN.length > 0) {
		vw += this.aN[this.aN.length - 1].zn();
	}
	return vw;
}, setCursorIcon:function (xI) {
	this.gJ = xI;
	this.gI.src = xI;
	nX();
}, v1:function () {
	this.gJ = null;
	this.gI.src = null;
}, setBgColor:function (xt) {
	this.vb.style.backgroundColor = xt;
}, setTransparency:function (uo) {
	this.sE.ld.style.filter = "alpha(opacity=" + uo + ");";
	this.sE.ld.style.MozOpacity = (uo / 100);
	this.sE.ld.style.opacity = (uo / 100);
	this.sE.ld.style.qK = (uo / 100);
}, getFitZoomLevel:function (lH, aL) {
	var pB = 1;
	while (lH <= aL[pB] && pB < (aL.length)) {
		pB++;
	}
	return (pB - 1);
}, setBrushStyle:function (vq, vr) {
	this.brush.color = vq;
	this.brush.stroke = vr;
}, ql:function () {
	return this.cI;
}, setActive:function (cT) {
	this.cI = cT;
}, onkeydown:function (lM) {
	var l8 = (lM) ? lM : (window.event) ? window.event : null;
	if (l8) {
		var qJ = (l8.fG) ? l8.fG : ((l8.keyCode) ? l8.keyCode : ((l8.which) ? l8.which : 0));
		if (qJ == "37" || qJ == "38" || qJ == "39" || qJ == "40") {
			if (this.ql()) {
				if (l8.target && ((l8.target.nodeName == "INPUT" && l8.target.getAttribute("type").toLowerCase() == "text") || l8.target.nodeName == "TEXTAREA")) {
					return;
				}
				if (l8.srcElement && ((l8.srcElement.tagName == "INPUT" && l8.srcElement.type == "text") || l8.srcElement.tagName == "TEXTAREA")) {
					return;
				}
				if (l8.shiftKey || l8.ctrlKey) {
					if (qJ == "37") {
						this.setRotation(this.rotation - 15);
						this.refresh();
					}
					if (qJ == "39") {
						this.setRotation(this.rotation + 15);
						this.refresh();
					}
				} else {
					if (qJ == "37") {
						this.panTo(this.width / 2, 0);
					}
					if (qJ == "38") {
						this.panTo(0, this.height / 2);
					}
					if (qJ == "39") {
						this.panTo(-this.width / 2, 0);
					}
					if (qJ == "40") {
						this.panTo(0, -this.height / 2);
					}
				}
			}
		}
	}
}, showDiy:function (xO) {
	var vn = (typeof xO == "undefined") ? new Array() : sdc(xO).split(",");
	var c2 = (vn.length > 0);
	var tq = vn[0];
	x6 = vn[1];
	var xH = vn[2];
	var lF = vn[3];
	var xR = vn[4];
	var lj = vn[5];
	var lg = vn[6];
	var xD = vn[7];
	if (c2) {
		w8 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	} else {
		w8 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 75, 0, 0, -150, 0, 0);
	}
	if (typeof tq == "undefined") {
		te = 0;
	} else {
		te = parseInt(tq);
	}
	if (typeof x6 == "undefined") {
		this.setStyle("baidu");
	} else {
		this.setStyle(x6, xH);
	}
	if (typeof lF == "undefined") {
		this.gM = 1;
	} else {
		this.gM = parseFloat(lF);
	}
	if (typeof xD == "undefined") {
		if (c2) {
			this.xL = "http://diyimg.mapbar.com/maplite/";
		} else {
			this.xL = strImgsvrUrl;
		}
	} else {
		this.xL = xD;
	}
	if (typeof lg == "undefined") {
		sz = new Array(-360, 360);
		sy = new Array(-90, 90);
	} else {
		var zh = cq.vp(xR);
		sz = new Array(zh[0] - parseFloat(lj) / 2, zh[0] + parseFloat(lj) / 2);
		sy = new Array(zh[1] - parseFloat(lg) / 2, zh[1] + parseFloat(lg) / 2);
	}
	if (typeof xR != "undefined") {
		this.centerAndZoom(new MPoint(xR), sY - 1);
	}
}, b9L:function () {
	var Af = this.width - 120;
	var nN = this.height - 100;
	if (Af > gh._5YJ) {
		Af = gh._5YJ;
	} else {
		if (Af < gh.v9641) {
			Af = gh.v9641;
		}
	}
	if (nN > gh.Pka) {
		nN = gh.Pka;
	} else {
		if (nN < gh.aD11X) {
			nN = gh.aD11X;
		}
	}
	if (Af > 590 && nN < 290) {
		nN = 290;
	}
	if (Af < nN) {
		Af = 0;
		nN = 0;
	}
	return {width:Af, height:nN};
}, j11:function (random) {
	new J5R1m(strImgsvrUrl + "mapbank/base/poireport.txt?" + random, function () {
		document["mapbar-maplet"].refresh();
		document["mapbar-maplet"].wEAok();
	}).nN0();
}, wEAok:function () {
	if (typeof basepoilist != "object") {
		//this.j11(Math.random());
	}
}, setTrajectory:function (sW, _g69, uv, lX) {
	this.ux = (uv == null || uv == "undefined") ? 5 : parseInt(uv);
	this.pid = sW;
	this.lX = lX;
	var aU = _g69.pts;
	if (aU != null && aU.length > 0) {
		var qI = 0;
		this.zf = new Array();
		this.zg = new Array();
		this.p9 = 0;
		for (var i = 0; i < aU.length; i++) {
			var pt = cq.vp(aU[i].pid);
			this.zg[qI] = parseFloat(pt[0]);
			this.zf[qI] = parseFloat(pt[1]);
			qI++;
			pt = null;
		}
		aU = null;
	}
}, rotate:function (fy) {
	if (this.uw <= this.t9) {
		this.uw = Math.min(this.t9, this.uw + this.xe);
	} else {
		if (this.uw >= this.t9) {
			this.uw = Math.max(this.t9, this.uw - this.xe);
		}
	}
	this.setRotation(this.uw);
	this.refresh();
	if (this.uw == this.t9) {
		setTimeout(fy, 100);
	} else {
		setTimeout("maplet.rotate(\"" + fy + "\")", 100);
	}
}, doEmulation:function () {
	try {
		if (this.p9 == 0) {
			this.wY = this.zf[0];
			this.wZ = this.zg[0];
			this.py = this.p9;
			this.p9++;
		}
		if (this.p9 < this.zf.length) {
			this.vh = null;
			if (this.pid.icon.ld.parentNode != this.lA) {
				this.lA.appendChild(this.pid.icon.ld.parentNode);
				this.pid.icon.ld.style.zIndex = 200;
			}
			if (this.nT == 1 && rs && this.py != this.p9) {
				this.py = this.p9;
				if (typeof this.lY == "undefined" || this.lY == null) {
					this.lY = document.createElement("div");
					this.lY.style.position = "absolute";
					this.lY.style.zIndex = 1000;
					this.lY.style.width = parseFloat(this.pid.icon.ld.style.width) + "px";
					this.lY.style.height = parseFloat(this.pid.icon.ld.style.height) + "px";
					this.lY.style.left = (this.width / 2 - parseFloat(this.pid.icon.ld.style.width) / 2) + "px";
					this.lY.style.top = (this.height / 2 - parseFloat(this.pid.icon.ld.style.height) / 2) + "px";
					this.lY.innerHTML = "<img src='" + this.pid.icon.S8x63 + "' width='" + parseFloat(this.pid.icon.ld.style.width) + "px' height='" + this.pid.icon.ld.style.height + "px'>";
					this.map.appendChild(this.lY);
				}
				var v0 = -90 + parseFloat(180 * Math.atan2(this.zf[this.p9] - this.zf[this.p9 - 1], 0.8 * (this.zg[this.p9] - this.zg[this.p9 - 1])) / Math.PI);
				if (v0 < 0) {
					v0 += 360;
				}
				v0 = v0 % 360;
				if ((Math.abs(v0 - this.rotation) % 360) > 180) {
					this.rotation += 360;
				}
				if (this.rotation - 180 - 360 > 0) {
					this.rotation = (this.rotation - 720);
				}
				this.uw = this.rotation;
				this.t9 = v0;
				if (this.p9 == 1) {
					this.setRotation(v0);
					this.setCenter(this.wY, this.wZ);
				} else {
					this.setCenter(this.wY, this.wZ);
					setTimeout("maplet.rotate(\"maplet.doEmulation()\")", 500);
					return;
				}
			}
			var yi = this.zl(this.zg[this.p9 - 1], this.zf[this.p9 - 1]);
			var yj = this.zm(this.zf[this.p9 - 1], this.zg[this.p9 - 1]);
			var l4 = this.zl(this.zg[this.p9], this.zf[this.p9]);
			var l5 = this.zm(this.zf[this.p9], this.zg[this.p9]);
			var w1 = this.zl(this.wZ, this.wY);
			var w2 = this.zm(this.wY, this.wZ);
			var zx = parseFloat(Math.sqrt((l4 - yi) * (l4 - yi) + (l5 - yj) * (l5 - yj)));
			var tN = parseFloat(Math.sqrt((w1 - yi) * (w1 - yi) + (w2 - yj) * (w2 - yj))) + this.ux;
			if (tN <= (zx - this.ux)) {
				w1 = yi + tN * (l4 - yi) / zx;
				w2 = yj + tN * (l5 - yj) / zx;
				this.wZ = this.zg[this.p9 - 1] + tN * (this.zg[this.p9] - this.zg[this.p9 - 1]) / zx;
				this.wY = this.zf[this.p9 - 1] + tN * (this.zf[this.p9] - this.zf[this.p9 - 1]) / zx;
			} else {
				w1 = l4;
				w2 = l5;
				this.wZ = this.zg[this.p9];
				this.wY = this.zf[this.p9];
				this.p9++;
			}
			if (this.nT == 0) {
				this.pid.icon.ld.style.top = (w2 - parseFloat(this.pid.icon.ld.style.height)) + "px";
				this.pid.icon.ld.style.left = (w1 - parseFloat(this.pid.icon.ld.style.width) / 2) + "px";
			}
			if (this.nT == 1 && rs) {
				this.sF.ld.style.top = parseFloat(this.sF.ld.style.top) + this.ux;
				this.vh = getTimeout(this, this.doEmulation, 100);
			} else {
				if (w1 < 0) {
					this.panTo(this.width / 2, this.height / 2 - w2, "maplet.doEmulation()");
				} else {
					if (w1 > this.width) {
						this.panTo(-this.width / 2, this.height / 2 - w2, "maplet.doEmulation()");
					} else {
						if (w2 < 0) {
							this.panTo(this.width / 2 - w1, this.height / 2, "maplet.doEmulation()");
						} else {
							if (w2 > this.height) {
								this.panTo(this.width / 2 - w1, -this.height / 2, "maplet.doEmulation()");
							} else {
								this.vh = getTimeout(this, this.doEmulation, 10);
							}
						}
					}
				}
			}
		} else {
			this.vh = null;
			this.zf = null;
			this.zg = null;
			this.pid.icon.ld.style.zIndex = 1;
			if (this.lY) {
				if (this.lY.parentNode) {
					this.lY.parentNode.removeChild(this.lY);
					this.lY = null;
				}
			}
			this.setRotation(0);
			this.refresh();
			if (this.lX != null || this.lX != "undefined") {
				this.lX();
			}
		}
	}
	catch (nf) {
	}
}, getMarkersInPolygon:function (_7O) {
	var g8h = [];
	var pts = [];
	for (var i = 0; i < _7O.pts.length; i++) {
		pts.push({x:_7O.pts[i].sU, y:_7O.pts[i].sV});
	}
	var uT5 = [];
	for (var i in this.u5) {
		if (this.u5[i] instanceof MMarker) {
			uT5.push(this.u5[i]);
		}
	}
	for (var i = 0; i < uT5.length; i++) {
		var pt = {x:uT5[i].pt.sU, y:uT5[i].pt.sV};
		if (j04l0(pt, pts)) {
			g8h.push(uT5[i]);
		}
	}
	return g8h;
}, getMarkerPolygons:function (cc605) {
	var e4e = [];
	for (var i in this.u5) {
		if (this.u5[i] instanceof MPolyline && this.u5[i].S0J68()) {
			e4e.push(this.u5[i]);
		}
	}
	var g8h = [];
	if (e4e.length > 0) {
		var pt = {x:cc605.pt.sU, y:cc605.pt.sV};
		for (var i = 0; i < e4e.length; i++) {
			var pts = [];
			var _7O = e4e[i];
			for (var h9u8W = 0; h9u8W < _7O.pts.length; h9u8W++) {
				pts.push({x:_7O.pts[h9u8W].sU, y:_7O.pts[h9u8W].sV});
			}
			if (j04l0(pt, pts)) {
				g8h.push(_7O);
			}
		}
	}
	return g8h;
}};
Maplet.prototype.toString = function () {
	return "com.mapbar.maplet.Maplet";
};
Maplet.prototype.addOverlay = function (uX) {
	if (typeof uX == "object") {
		if (this.u5[uX.id]) {
			return;
		}
		uX.qc(this);
		this.u5[uX.id] = uX;
	}
};
Maplet.prototype.getZoomLevel = function () {
	return this.AG;
};
Maplet.prototype.clearOverlays = function () {
	for (var id in this.u5) {
		if (this.u5[id] && this.u5[id].remove) {
			this.u5[id].remove();
			this.u5[id] = null;
		}
	}
};
Maplet.prototype.removeOverlay = function (uX) {
	if (typeof uX == "object") {
		if (this.u5[uX.id]) {
			this.u5[uX.id].remove();
			this.u5[uX.id] = null;
		}
	} else {
		if (typeof uX == "string") {
			if (this.u5[uX]) {
				this.u5[uX].remove();
				this.u5[uX] = null;
			}
		}
	}
};
Maplet.prototype.setAutoZoom = function (tj, tl, s4, s6) {
	var aI = [];
	if (this.setAutoZoom.arguments.length == 0) {
		for (var i in this.u5) {
			if (this.u5[i] && this.u5[i].remove) {
				if (this.u5[i].toString() == "com.mapbar.maplet.MMarker") {
					aI.push(cq.vp(this.u5[i].pt.pid));
				} else {
					if (this.u5[i].toString() == "com.mapbar.maplet.MPolyline") {
						var zh = this.u5[i].pts;
						for (var qC = 0; qC < zh.length; qC++) {
							aI.push(cq.vp(zh[qC].pid));
						}
					}
				}
			}
		}
		if (aI.length == 0) {
			return false;
		} else {
			tj = 90;
			tl = 180;
			s4 = -90;
			s6 = -180;
			for (var qI = 0; qI < aI.length; qI++) {
				tj = Math.min(parseFloat(aI[qI][1]), tj);
				tl = Math.min(parseFloat(aI[qI][0]), tl);
				s4 = Math.max(parseFloat(aI[qI][1]), s4);
				s6 = Math.max(parseFloat(aI[qI][0]), s6);
			}
		}
	}
	if (isNaN(parseFloat(tj))) {
		var zi = cq.vp(tj);
		var zj = cq.vp(tl);
		tj = zi[1];
		tl = zi[0];
		s4 = zj[1];
		s6 = zj[0];
	}
	var zG = 1.1 * (s4 - tj) * this.pZ / this.height;
	var zH = 1.1 * (s6 - tl) * this.pZ / this.width;
	var AF = this.getFitZoomLevel(zG, qP);
	var AH = this.getFitZoomLevel(zH, sj);
	var AE = Math.min(AF, AH);
	cq.lf = (s4 + tj) / 2;
	cq.li = (s6 + tl) / 2;
	this.centerAndZoom(new MPoint(cq.zn()), AE);
	return true;
};
Maplet.prototype.setZoomLevel = function (AB, fb) {
	this.fI(AB);
	AB = parseInt(AB);
	if (AB < te) {
		AB = te;
	}
	if (AB > sY) {
		AB = sY;
	}
	if (fb != undefined && !fb) {
		return AB;
	}
	if (apiType == 1) {
		MEvent.trigger(this, "zoom", AB);
	} else {
		MEvent.trigger(this, "zoom", "&act=zoom&zm=" + AB);
	}
	if (this.AG != AB && AB > 3) {
		if (iToolTipStyle == 0) {
			hideToolTipMenu();
		}
		this.hideBubble();
		if (!px) {
		} else {
			this.sG.ld.style.zoom = this.sF.ld.style.zoom;
			this.sG.ld.style.left = this.sF.ld.style.left;
			this.sG.ld.style.top = this.sF.ld.style.top;
			this.sG.ld.style.visibility = "visible";
			for (var i in this.pU) {
				if (this.pU[i] != null && typeof this.pU[i] == "object") {
					if (this.pU[i].parentNode != null) {
						this.pU[i].parentNode.removeChild(this.pU[i]);
						this.sG.ld.appendChild(this.pU[i]);
					}
				}
			}
		}
	} else {
		this.no();
	}
	if (this.ga != null) {
		this.ga.zI(AB);
	}
	if (this.gc != null) {
		for (var n8 in this.gc) {
			if (this.gc[n8].nR) {
				this.gc[n8].nR.ga.ld.zI(AB);
			}
		}
	}
	if (this.ff) {
		this.nI().setZoomLevel(AB);
	}
	this.AG = AB;
	this.xg = sj[this.AG];
	this.xf = qP[this.AG];
	this.sR = sI[this.AG] + "/";
	this.gD = Math.floor((this.gA) / this.xg);
	this.gE = Math.floor((this.gx) / this.xf);
	if (this.gD < 0) {
		this.gD += 1;
	}
	this.sU = this.width / 2 - Math.round(((this.gA * wp) % (this.xg * wp)) * this.pZ / (this.xg * wp));
	if (this.gx >= 0) {
		this.sV = this.height / 2 - this.pN + Math.round(((this.gx * wp) % (this.xf * wp)) * this.pN / (this.xf * wp));
	} else {
		this.sV = this.height / 2 + Math.round(((this.gx * wp) % (this.xf * wp)) * this.pN / (this.xf * wp));
	}
	this.zN();
	this.refresh();
};
Maplet.prototype.setCenter = function (lf, li, fb) {
	var xR = lf;
	if (typeof lf == "object") {
		xR = lf.pid;
	}
	if (isNaN(parseFloat(xR)) || (typeof xR == "string" && xR.indexOf(",") > 0)) {
		var lh = cq.vp(xR);
		lf = lh[1];
		li = lh[0];
	}
	this.gx = Math.min(sy[1], Math.max(sy[0], parseFloat(lf)));
	this.gA = Math.min(sz[1], Math.max(sz[0], parseFloat(li) % 360));
	if (fb == undefined || fb) {
		this.setZoomLevel(this.AG);
	}
};
Maplet.prototype.moveTo = function (left, top) {
	this.top = parseInt(top);
	this.left = parseInt(left);
	this.vb.style.top = parseInt(top) + "px";
	this.vb.style.left = parseInt(left) + "px";
};
Maplet.prototype.getCenter = function () {
	if (apiType == 1) {
		return new MPoint(this.getCurrentMap().split(",").slice(1, 3).join(","));
	} else {
		return this.getCurrentMap().split(",")[1];
	}
};
Maplet.prototype.resize = function (Af, nN) {
	Af = parseInt(Af);
	nN = parseInt(nN);
	if (Af == this.width && nN == this.height) {
		return;
	}
	this.hideBubble();
	this.width = Af;
	this.height = nN;
	vZ(this);
	this.z4 = Math.ceil((this.width) / (this.pZ) / 2);
	this.z5 = Math.ceil((this.height) / (this.pN) / 2);
	this.vb.style.width = Af + "px";
	this.vb.style.height = nN + "px";
	this.vb.style.clip = "rect(0 " + this.width + " " + this.height + " 0)";
	this.sF.resize(Af, nN);
	this.sE.resize(Af, nN);
	this.vx.resize(Af, nN);
	if (this.ff) {
		this.nI().resize(nN);
		this.nI().moveTo(this.width - 16, 0);
	}
	if (this.fe) {
		this.wq.moveTo(0, this.height - 24);
	}
	this.hm5_.style.left = (this.width - this.ovw.nH() - 155) + "px";
	this.crd60.style.left = (this.width - this.ovw.nH() - 157) + "px";
	var An = (navigator.appVersion.match(new RegExp("6.", "i")) == "6.") ? 0 : 2;
	this.sO.resize(Af - An, nN - An);
	this.sM.resize(this.width, 0);
	this.sJ.resize(this.width, 0);
	this.sK.resize(0, this.height);
	this.sL.resize(0, this.height);
	this.sL.moveTo(this.width - 1, 0);
	this.sJ.moveTo(0, this.height - 3 + An);
	this.lA.resize(Af, nN);
	this.setZoomLevel(this.AG);
	for (var pf in this.gc) {
		if (this.gc[pf] && this.gc[pf].onresize) {
			this.gc[pf].onresize(this);
		}
	}
	this.ovw.onresize();
	this.rjk = true;
};
Maplet.prototype.zoomIn = function () {
	this.zoomTo(Math.min(sY, this.AG + 1));
};
Maplet.prototype.zoomOut = function () {
	this.zoomTo(Math.max(0, this.AG - 1));
};
Maplet.prototype.centerAndZoom = function (pt, AB) {
	this.setCenter(pt, "", false);
	if (typeof this.sF == "undefined") {
		this.AG = this.setZoomLevel(AB, false);
		this.showMap();
	} else {
		this.setZoomLevel(AB);
	}
};
Maplet.prototype.zoomTo = function (qB, fy, x, y) {
	var nN = document.getElementById("bubble");
	if (this.fp && this.fp.parentNode == this.sF.ld) {
		this.hideBubble();
	}
	if (fy) {
		this.fy = fy;
	}
	if (px && bzt) {
		if (this.AZ != null) {
			clearTimeout(this.AZ);
		}
		this.AZ = null;
		this.Ai = 1;
		if (typeof qB != "undefined") {
			this.AT = parseInt(qB);
			if (typeof x == "undefined") {
				this.vc = 0;
			} else {
				this.vc = parseInt(x);
			}
			if (typeof y == "undefined") {
				this.vd = 0;
			} else {
				this.vd = parseInt(y);
			}
			this.AZ = getTimeout(this, this.zoomTo, 200);
		} else {
			var vG = new Number();
			if (this.AT > this.getZoomLevel()) {
				if (this.AS <= (this.AT - this.AY)) {
					if (this.AS == -1) {
						this.AS = this.getZoomLevel() + this.AY;
					} else {
						this.AS += this.AY;
					}
					vG = (this.AS - this.getZoomLevel());
					this.AN(this.AS, 2 * this.vc * vG, 2 * this.vd * vG);
					this.AZ = getTimeout(this, this.zoomTo, 20);
				} else {
					this.AS = -1;
					this.ve = this.zo(-this.vc + this.width / 2, -this.vd + this.height / 2);
					this.vf = this.zp(-this.vc + this.width / 2, -this.vd + this.height / 2);
					this.setCenter(this.ve, this.vf, false);
					this.setZoomLevel(this.AT);
					if (this.fy) {
						if (nN && nN.style.display != "none") {
							nN.style.display = "none";
							nN.style.visibility = "hidden";
							eval(this.fy);
						}
					}
				}
			} else {
				if (this.AT < this.getZoomLevel()) {
					if (this.AS == -1 || this.AS >= (this.AT + this.AY)) {
						if (this.AS == -1) {
							this.AS = this.getZoomLevel() - this.AY;
						} else {
							this.AS -= this.AY;
						}
						vG = Math.abs(this.AS - this.getZoomLevel());
						this.AN(this.AS, 2 * this.vc * vG, 2 * this.vd * vG);
						this.AZ = getTimeout(this, this.zoomTo, 20);
					} else {
						this.AS = -1;
						this.ve = this.zo(-this.vc + this.width / 2, -this.vd + this.height / 2);
						this.vf = this.zp(-this.vc + this.width / 2, -this.vd + this.height / 2);
						this.setCenter(this.ve, this.vf, false);
						this.setZoomLevel(this.AT);
						this.Ai = 0;
						if (this.fy) {
							if (nN && nN.style.display != "none") {
								nN.style.display = "none";
								nN.style.visibility = "hidden";
								eval(this.fy);
							}
						}
					}
				}
			}
		}
	} else {
		this.setZoomLevel(qB);
	}
};
Maplet.prototype.panTo = function (x, y, fy) {
	if (this.fa) {
		return;
	}
	this.xoffset = parseFloat(x);
	this.yoffset = parseFloat(y);
	this.Aq = 0;
	this.Aw = 0;
	this.fy = fy;
	this.ve = this.zo(-this.xoffset + this.width / 2, -this.yoffset + this.height / 2);
	this.vf = this.zp(-this.xoffset + this.width / 2, -this.yoffset + this.height / 2);
	this.va = parseInt(Math.sqrt(this.xoffset * this.xoffset + this.yoffset * this.yoffset));
	if (!this.fa) {
		this.doPan();
	}
};
Maplet.prototype.toMapCoordinate = function (x, y) {
	cq.li = this.zp(x, y);
	cq.lf = this.zo(x, y);
	return cq.zn();
};
Maplet.prototype.vj834 = function (xQ) {
	var f50I = [null, null];
	try {
		var dPf53 = cq.vp(xQ);
		f50I[0] = this.zl(dPf53[0], dPf53[1]);
		f50I[1] = this.zm(dPf53[1], dPf53[0]);
	}
	catch (lM) {
		throw lM;
	}
	return f50I;
};
Maplet.prototype.showLogo = function (c2) {
	if (c2) {
		this.hm5_.style.display = "block";
		this.crd60.style.display = "block";
		this.xky19.style.display = "block";
	} else {
		this.hm5_.style.display = "none";
		this.crd60.style.display = "none";
		this.xky19.style.display = "none";
	}
};
Maplet.prototype.showScale = function (c2, x4, xG, yb) {
	this.fe = c2;
	if (this.fe) {
		if (typeof x4 == "undefined" || !x4) {
			x4 = "baidu";
		}
		this.x4 = x4;
		this.u8(xG, yb);
		this.wq.show();
	} else {
		if (this.wq != null) {
			this.wq.hide();
		}
	}
};
Maplet.prototype.showOverview = function (c2, c3) {
	if (c2) {
		if (c3) {
			this.ovw.open();
		} else {
			this.ovw.close();
		}
		this.ovw.show();
	} else {
		this.ovw.close();
		this.ovw.hide();
	}
};
Maplet.prototype.showControl = function (c2) {
	this.fj = c2;
	if (this.fj) {
		if (this.ga) {
			this.ga.show();
		}
	} else {
		if (this.ga) {
			this.ga.hide();
		}
	}
};
Maplet.prototype.getViewBound = function () {
	return {"LeftUp":this.toMapCoordinate(0, 0), "LeftDown":this.toMapCoordinate(0, this.height), "RightUp":this.toMapCoordinate(this.width, 0), "RightDown":this.toMapCoordinate(this.width, this.height)};
};
Maplet.prototype.u0 = function () {
	if (this.c0) {
		return;
	}
	if (this.fs) {
		return;
	}
	this.c0 = true;
	this.fs = true;
	sb = 0;
	if (this.iy307.length > 0) {
		for (var p = 0; p < this.iy307.length; p++) {
			this.lA.removeChild(this.iy307[p]);
		}
		this.iy307 = [];
	}
	this.sF.ld.style.zoom = 1;
	var pT = "";
	for (var qC in this.pU) {
		if (this.pU[qC] != null) {
			this.pU[qC].c2 = false;
		}
	}
	var pw = 0;
	var yk = this.yl;
	var uY = (this.u2 == "undefined" || this.u2 == null) ? "poi" : this.u2;
	var nL = nM[this.AG];
	this.sZ = 0;
	this.s1 = 0;
	this.tf1 = this.width;
	this.tg = this.height;
	this.s2 = parseInt(this.gD);
	this.s3 = parseInt(this.gE);
	this.th = parseInt(this.gD);
	this.ti = parseInt(this.gE);
	var uZ = new Array();
	var u4 = new Array();
	var t1 = parseInt(new Date().getTime() / 60000);
	var s8 = (360 / sj[this.AG]);
	var AB = this.getZoomLevel();
	for (var qx = -this.z4 - 1; qx <= this.z4; qx++) {
		for (var qz = -this.z5 - 1; qz <= this.z5; qz++) {
			try {
				var pM = this.xL + "mapbank/" + yk + "/" + this.sR;
				var pQ = this.xL + "mapbank/" + uY + "/" + this.sR;
				var pG = this.xL + "mapbank/base/" + this.sR;
				var qy = parseInt(this.gD + qx);
				var qA = parseInt(this.gE + qz);
				qy = (qy) % s8;
				if (qy >= (s8 / 2)) {
					qy -= s8;
				}
				if (qy < (-s8 / 2)) {
					qy += s8;
				}
				var g7 = parseInt(Math.floor((qy) / nL));
				var g8 = parseInt(Math.floor((qA) / nL));
				if (g7 < 0) {
					g7 += 1;
				}
				if (g8 < 0) {
					g8 += 1;
				}
				var nl = (qy) - g7 * nL;
				var nm = (qA) - g8 * nL;
				pQ += g7 + "_" + g8 + "/";
				pG += g7 + "_" + g8 + "/";
				pM += g7 + "_" + g8 + "/";
				pQ += nl + "_" + nm + ".png";
				pG += nl + "_" + nm + ".js";
				pM += nl + "_" + nm + "." + this.xK;
				var p1 = (qx * this.pZ) + parseInt(this.sU);
				var p3 = (-(qz * this.pN) + parseInt(this.sV));
				var p4 = p3;
				if (this.yl != "aerial" && this.yl.indexOf("aerial") < 0) {
					p3 = p3 + w8[this.AG];
				}
				if (p1 < -this.pZ || p1 > this.width || p3 > this.height || p3 < -this.pN) {
					continue;
				}
				if (this.sZ < (p1 + this.pZ)) {
					this.sZ = (p1 + this.pZ);
					this.s2 = parseInt(this.gD) + parseInt(qx);
				}
				if (this.s1 < (p3 + this.pN)) {
					this.s1 = (p3 + this.pN);
					this.ti = parseInt(this.gE) + parseInt(qz);
				}
				if (this.tf1 > p1) {
					this.tf1 = p1;
					this.th = parseInt(this.gD) + parseInt(qx);
				}
				if (this.tg > p3) {
					this.tg = p3;
					this.s3 = parseInt(this.gE) + parseInt(qz);
				}
				var xY = ((this.AG).toString(16) + (this.gD + qx).toString(16) + "l" + (this.gE + qz).toString(16)).toLowerCase();
				if (pw == 0) {
					pw = 1;
				}
				if (pM && pM.indexOf("NaN") < 0) {
					if (this.pU[xY] == null) {
						if (!rs || !px) {
							this.pU[xY] = new Image();
							this.pU[xY].id = xY;
							this.pU[xY].name = xY;
							this.pU[xY].ntry = "0";
							this.pU[xY].unselectable = "on";
							this.pU[xY].style.position = "absolute";
						} else {
							this.pU[xY] = document.createElement("v:Image");
							this.pU[xY].id = xY;
							this.pU[xY].name = xY;
							this.pU[xY].ntry = "0";
							this.pU[xY].unselectable = "on";
							this.pU[xY].style.position = "absolute";
							this.pU[xY].cE = "f";
							this.pU[xY].style.rotation = this.rotation;
							this.pU[xY].style.width = this.pZ;
							this.pU[xY].style.height = this.pN;
						}
						f1.nk(this.pU[xY], pM, this.pZ, this.pN);
					} else {
						if (px && rs) {
							this.pU[xY].style.rotation = this.rotation;
						}
					}
					var p2 = (p1 + this.pZ / 2 - this.width / 2) * this.gk - (p3 + this.pN / 2 - this.height / 2) * this.wT + this.width / 2;
					var p5 = (p1 + this.pZ / 2 - this.width / 2) * this.wT + (p3 + this.pN / 2 - this.height / 2) * this.gk + this.height / 2;
					this.pU[xY].style.top = parseInt(p5 - this.pN / 2) + "px";
					this.pU[xY].style.left = parseInt(p2 - this.pZ / 2) + "px";
					this.pU[xY].c2 = true;
				}
				if (this.u2 != null && this.u2 == "traffic") {
					var pV = bpp[0] + "traffic_png?zm=" + AB + "&oid=o" + xY + "&now=" + t1;
					if (__mapbar_magic_id) {
						pV += "&" + __mapbar_magic_id;
					}
					if (px) {
						var d23XM = document.createElement("DIV");
						d23XM.setAttribute("unselectable", "on");
						d23XM.id = "o" + xY;
						d23XM.setAttribute("name", name);
						d23XM.style.cssText = "position:absolute;width:300px;height:300px;top:" + p4 + "px;left:" + p1 + "px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader (src='" + pV + "', sizingMethod='scale');";
						this.iy307.push(d23XM);
					} else {
						var img = document.createElement("IMG");
						img.id = "o" + xY;
						img.setAttribute("name", xY);
						img.src = pV;
						img.ntry = "0";
						img.unselectable = "on";
						img.onerror = "javascript:imageTileError(this);";
						img.onload = "javascript:imageTileOk(this);";
						img.style.cssText = "position:absolute;top:" + p3 + "px;left:" + p1 + "px;";
						this.iy307.push(img);
					}
					uZ[uZ.length] = "o" + xY;
					u4[u4.length] = g7 + "_" + g8 + "/";
				} else {
					if (this.u2 != null && this.u2 != "undefined" && pQ && pQ.indexOf("NaN") < 0) {
						var ld = document.createElement("DIV");
						ld.setAttribute("unselectable", "on");
						ld.id = "o" + xY;
						ld.setAttribute("name", xY);
						ld.style.cssText = "position:absolute;width:0px;height:0px;top:" + p4 + "px;left:" + p1 + "px;";
						this.iy307.push(ld);
						uZ[uZ.length] = "o" + xY;
						u4[u4.length] = g7 + "_" + g8 + "/";
					}
				}
				pM = null;
				pQ = null;
			}
			catch (lM) {
				throw (lM);
			}
		}
	}
	for (var qI in this.pU) {
		try {
			if (this.pU[qI] != null && typeof this.pU[qI] == "object") {
				if ((typeof this.pU[qI].c2 == "boolean" && this.pU[qI].c2) || this.pU[qI].c2 == "true") {
					if (this.pU[qI].parentNode != this.sE.ld) {
						if (this.pU[qI].parentNode != null) {
							this.pU[qI].parentNode.removeChild(this.pU[qI]);
						}
						this.sE.ld.appendChild(this.pU[qI]);
					}
				}
			}
		}
		catch (lM) {
			throw (lM);
		}
	}
	if (this.iy307.length > 0) {
		for (var q = 0; q < this.iy307.length; q++) {
			this.lA.ld.appendChild(this.iy307[q]);
		}
	}
	pT = null;
	if (this.sE.ld.parentNode != this.sF.ld) {
		this.sF.ld.appendChild(this.sE.ld);
	}
	if (this.vx.ld.parentNode != this.sF.ld) {
		this.sF.ld.appendChild(this.vx.ld);
	}
	if ((typeof this.fo == "boolean" && this.fo) && document.getElementById("LayerMap") && document.getElementById("LayerMap").filters && document.getElementById("LayerMap").filters.length > 0) {
		document.getElementById("LayerMap").filters[0].apply();
		document.getElementById("LayerMap").filters[0].vu();
	}
	if (this.aN.length > 0) {
		for (var qk = 0; qk < this.aN.length; qk++) {
			this.aN[qk].paint();
		}
	}
	if (this.zy != null) {
		this.zy.paint();
		if (this.tG != null) {
			this.tG.paint();
		}
	}
	if (this.aO.length > 0) {
		for (qk = 0; qk < this.aO.length; qk++) {
			this.aO[qk].u9(this.vx.ld);
			this.aO[qk].paint(this.lA.ld);
		}
	}
	if (this.yG.length > 0) {
		if (!px) {
			this.yG[this.yG.length - 1].label(this.lA.graphics);
		}
	} else {
		if (iToolTipStyle == 0) {
			hideToolTipMenu();
		}
	}
	if (this.lA.ld.parentNode != this.sF.ld) {
		this.sF.ld.appendChild(this.lA.ld);
	}
	if (this.aE.length > 0) {
		this.aG = null;
		this.aH = null;
		this.aF = null;
		for (qk = 0; qk < this.aE.length; qk++) {
			if (this.AG >= this.aE[qk].AJ && this.AG <= this.aE[qk].AI) {
				var w4 = this.zl(this.aE[qk].li, this.aE[qk].lf);
				var w5 = this.zm(this.aE[qk].lf, this.aE[qk].li);
				if (w4 >= 0 && w4 <= this.width && w5 >= 0 && w5 <= this.height) {
					if (this.aG == null) {
						this.aG = new Array();
						this.aH = new Array();
						this.aF = new Array();
					}
					this.aG[this.aG.length] = w4;
					this.aH[this.aH.length] = w5;
					this.aF[this.aF.length] = qk;
				}
			}
		}
	}
	if (!this.cH) {
		this.cH = true;
	}
	if (this.u2 != null && this.u2 != "undefined") {
		if (this.u2 == "base") {
			if (this.AG >= parseInt(bpp[1]) && this.AG <= parseInt(bpp[2])) {
				if (!this.r8TR) {
					//this.j11();
					this.r8TR = true;
				}
				var i = 0;
				for (var S7a in uZ) {
					try {
						if (typeof uZ[S7a] == "string") {
							if (bpp[0] != xl + "mapbank/base/" || typeof basepoilist == "object" && basepoilist[sI[this.AG] + "/" + u4[S7a] + uZ[S7a] + ".png"]) {
								if (typeof E35[uZ[S7a]] == "object") {
									var uy = E35[uZ[S7a]];
									gS9(uZ[S7a], uy.x, uy.y, uy.Af, uy.wO, uy.y6, uy.yU, uy.x85A);
								} else {
									new J5R1m(bpp[0] + sI[this.AG] + "/" + u4[S7a] + uZ[S7a] + ".png", parseInt, false, true).nN0();
								}
							}
							i++;
						}
					}
					catch (lN) {
						throw (lN);
					}
					uZ[S7a] = null;
					u4[S7a] = null;
				}
			} else {
				for (var su in uZ) {
					try {
						if (typeof uZ[su] == "string") {
							document.getElementById(uZ[su]).parentNode.removeChild(document.getElementById(uZ[su]));
						}
					}
					catch (lM) {
						throw (lM);
					}
					uZ[su] = null;
					u4[su] = null;
				}
			}
		} else {
			t1 = parseInt(new Date().getTime() / 60000);
			for (var uD in uZ) {
				try {
					if ((this.u2 != "traffic") && typeof uZ[uD] == "string") {
						XMLHttp.sendReq("GET", "maplite/" + this.u2 + ".jsp?" + this.u3 + "&oid=" + uZ[uD] + "&epoch=" + t1, "", vB, uZ[uD]);
					}
				}
				catch (lM) {
					throw (lM);
				}
				uZ[uD] = null;
				u4[uD] = null;
			}
		}
		uZ.length = 0;
		uZ = null;
		u4.length = 0;
		u4 = null;
	}
	this.c0 = false;
	this.fs = false;
	for (var i = 0; i < 2; i++) {
		for (var qi in this.u5) {
			if (this.u5[qi] && this.u5[qi].paint) {
				if (i == 0 && this.u5[qi] instanceof MMarker) {
					this.u5[qi].paint();
				} else {
					if (i == 1 && this.u5[qi] instanceof MPolyline) {
						this.u5[qi].paint();
					}
				}
			}
		}
	}
	avBubble.C75y();
	if (this.ovw) {
		this.ovw.paint();
	}
	cq.lf = this.gx;
	cq.li = this.gA;
	var gz = cq.zn();
	this.yu = gz + "@" + this.AG;
	this.fL();
	try {
		var ww = "@mapbar" + (new Date().getTime() % 86400).toString(36);
		sB.src = "http://mv.mapbar.com/?" + this.yu + "@" + this.yt + "@" + this.width.toString(36).toUpperCase() + "@" + this.height.toString(36).toUpperCase() + "@" + this.sS.toString(36).toUpperCase() + "@" + c75 + "@" + strLicenseKey.toString(36).toUpperCase() + "@" + this.yl + "@" + ((bp) ? 1 : 0) + "@" + ((this.u2) ? this.u2 : "") + ww;
	}
	catch (lM) {
		throw (lM);
	}
	this.sF.moveTo(0, 0);
	this.vx.moveTo(0, 0);
	this.lA.moveTo(0, 0);
	this.sO.moveTo(0, 0);
	MEvent.trigger(this, "update", this.yu);
};
var W9d9 = {wB:function (uL) {
	this.fo = (uL) ? true : false;
}, addLabel:function (xI, lf, li, xP, xA, cK, vD) {
	if (!xA) {
		xA = "";
	}
	this.yG[this.yG.length] = new a8("label" + this.sv, xI, xI, parseFloat(lf), parseFloat(li), xP, xA, cK, vD);
	this.sv++;
}, addPoint:function (xI, lf, li, xP, xu, cK, vD) {
	if (!xu) {
		xu = "";
	}
	this.aO[this.aO.length] = new a8("point" + this.sv, xI, xI, parseFloat(lf), parseFloat(li), xP, xu, cK, vD);
	this.sv++;
}, updatePointAt:function (pt, xP, xu, xI, xJ) {
	if (pt >= 0 && this.aO.length > pt) {
		if (!xu) {
			xu = "";
		}
		this.aO[pt].zM(xP, xu);
		if (typeof xI != "undefined") {
			if (typeof xJ == "undefined") {
				xJ = xI;
			}
			this.aO[pt].setIcon(xI, xJ);
		}
	}
}, updateLineAt:function (pr, xP, xu, cK) {
	if (pr >= 0 && this.aN.length > pr) {
		this.po = pr;
		if (xP != "undefined" && xP != null) {
			this.aN[pr].cK = (cK == "false" || cK == "0") ? false : true;
			this.aN[pr].xP = xP;
		}
		if (xu != "undefined" && xu != null) {
			this.aN[pr].xu = xu;
		}
		if (this.aN[pr].cK) {
			this.aN[pr].zM(xP, xu);
		}
	}
}, showTipOf:function (pt, ct, cM) {
	if (cM == null || cM == false || cM == "undefined" || cM == "false") {
		if (pt >= 0 && this.aO.length > pt) {
			if (this.aO[pt].pO) {
				this.aO[pt].pO.onmouseover();
				this.aO[pt].pO.wR(ct);
			}
		}
	} else {
		if (pt >= 0 && this.aN.length > pt) {
			this.aN[pt].wN();
		}
	}
}};
function a8(id, xI, xJ, lf, li, xP, xu, cK, vD) {
	this.lf = lf;
	this.li = li;
	this.setIcon = function (xI, xJ) {
		if (xI != "undefined" && xI != "") {
			this.xI = xI;
			this.pO.src = xI;
			this.pO.up = xI;
		}
		if (xJ != "undefined" && xJ != "") {
			this.xJ = xJ;
			this.pO.n1 = xJ;
		}
	};
	this.zM = function (title, content) {
		this.xP = title;
		this.xu = content;
		if (this.id != "undefined" && this.xP != "undefined") {
			pe[this.id] = this.xP;
			pa[this.id] = (this.xu == null || this.xu == "undefined") ? tX("%u8BEA%u0AAC%uCEA7%uB050") : this.xu;
		}
		if (this.cK) {
			if (typeof this.n2 != "undefined") {
				var f2 = this.n2.parentNode;
				if (f2 != null) {
					f2.removeChild(this.n2);
				}
				var left = parseInt(this.n2.style.left);
				var top = parseInt(this.n2.style.top);
				this.n2 = gu(this.xP, this.color);
				this.n2.style.left = left + "px";
				this.n2.style.top = top + "px";
				if (f2 != null) {
					f2.appendChild(this.n2);
				}
			} else {
				this.n2 = gu(this.xP, this.color);
			}
		}
	};
	if (id != "undefined" && xI != "undefined") {
		this.id = id;
		this.color = (vD == null || vD == "undefined") ? "#FF0000" : vD;
		this.cK = (cK == "1");
		this.AJ = 0;
		this.AI = 16;
		this.zM(xP, xu);
		this.pO = new Image();
		this.pO.unselectable = "on";
		this.pO.id = this.id;
		this.pO.fl = true;
		this.pO.cm = false;
		this.pO.x0 = 0;
		this.pO.As = 0;
		this.pO.lI = 0;
		this.pO.lK = 0;
		this.pO.style.position = "absolute";
		this.pO.onerror = function () {
			this.src = strImgsvrUrl + "images/marker.gif";
			this.onerror = null;
		};
		this.pO.onload = function () {
			this.onerror = null;
			this.onload = null;
		};
		this.setIcon(xI, xJ);
		this.pO.onmouseover = function () {
			var maplet = document["mapbar-maplet"];
			if (maplet.sS == ts.tb || maplet.sS == ts.ta || maplet.sS == ts.tw) {
				this.style.cursor = "default";
				return;
			}
			this.style.cursor = (px) ? "hand" : "pointer";
			if (this.style.zIndex < pF) {
				pF++;
			}
			this.style.zIndex = pF;
			if (this.n1 != "undefined" && this.n1 != "") {
				this.src = this.n1;
			}
			if (this.fl && iToolTipStyle == 0) {
				var x = parseInt(this.style.left) + parseInt(this.width) / 2;
				var y = parseInt(this.style.top) + parseInt(this.height) / 2;
				setToolTipMenu(x, y, pe[this.id], pa[this.id]);
			}
		};
		this.pO.onmouseout = function () {
			if (this.up != "undefined" && this.up != "") {
				this.src = this.up;
			}
			if (document["mapbar-maplet"].sS == ts.tu) {
				this.uI();
			}
		};
		this.pO.onclick = function () {
			if (this.fl.toString() == "false") {
				return;
			}
			var maplet = document["mapbar-maplet"];
			if (maplet.sS == ts.tb || maplet.sS == ts.ta || maplet.sS == ts.tw || maplet.sS == ts.ly || maplet.sS == ts.lz || maplet.sS == ts.np) {
				return;
			}
			if (maplet.sS == ts.l3) {
				var pn = maplet.p8(maplet.aO, this.id);
				maplet.removePointAt(pn);
				maplet.refresh();
				if (callback) {
					callback("&act=del&pid=" + pn);
				}
				return;
			}
			if (this.lI == 0 && this.lK == 0) {
				this.wR();
			}
		};
		this.pO.onmousemove = function (lM) {
			if (document["mapbar-maplet"].sS == ts.tu && this.cm) {
				var Ap = parseInt((px) ? event.clientX : lM.clientX);
				var Av = parseInt((px) ? event.clientY : lM.clientY);
				this.lK += (Av - this.As);
				this.lI += (Ap - this.x0);
				this.style.top = (parseInt(this.style.top) + (Av - this.As)) + "px";
				this.style.left = (parseInt(this.style.left) + (Ap - this.x0)) + "px";
				this.x0 = Ap;
				this.As = Av;
			}
		};
		this.pO.onmousedown = function (lM) {
			var Ap = parseInt((px) ? event.clientX : lM.clientX);
			var Av = parseInt((px) ? event.clientY : lM.clientY);
			this.cm = true;
			this.x0 = Ap;
			this.As = Av;
			this.lI = 0;
			this.lK = 0;
		};
		this.pO.onmouseup = function (lM) {
			if (document["mapbar-maplet"].sS == ts.tu) {
				this.uI(lM);
			}
		};
		this.pO.uI = function (lM) {
			if (this.cm && (this.lI != 0 || this.lK != 0)) {
				this.cm = false;
				var maplet = document["mapbar-maplet"];
				var pt = maplet.getElementById(maplet.aO, this.id);
				if (pt != null) {
					pt.lf += (maplet.zo(this.lI + maplet.width / 2, this.lK + maplet.height / 2) - maplet.gx);
					pt.li += (maplet.zp(this.lI + maplet.width / 2, this.lK + maplet.height / 2) - maplet.gA);
					cq.lf = pt.lf;
					cq.li = pt.li;
					var fQ = cq.zn();
					var pn = maplet.p8(maplet.aO, this.id);
					maplet.refresh();
					if (callback) {
						callback("&act=move&pid=" + pn + "&latlon=" + fQ);
					}
				}
				this.lI = 0;
				this.lK = 0;
			} else {
				this.cm = false;
			}
		};
		this.pO.wR = function (ct) {
			var x = parseInt(this.style.left) + parseInt(this.width) / 2;
			var y = parseInt(this.style.top) + parseInt(this.height) / 2;
			var maplet = document["mapbar-maplet"];
			if ((iToolTipStyle == "undefined" || iToolTipStyle == 1) && (pe[this.id] != null) && (pe[this.id].length > 0)) {
				avBubble.gl(pe[this.id], pa[this.id]);
				if (ct.toString() == "true" || ((x > avBubble.xoffset) && (x < (maplet.width - avBubble.width)) && (y > avBubble.height) && (y < (maplet.height)))) {
					maplet.fp = gp(pe[this.id], x, y, pa[this.id]);
					maplet.sF.ld.appendChild(maplet.fp);
				} else {
					maplet.fp = gp(pe[this.id], maplet.width / 2 + 2, avBubble.height + 10, pa[this.id]);
					var vj = maplet.width / 2 - x;
					var vk = avBubble.height + 10 - y;
					maplet.panTo(vj, vk);
				}
			} else {
				if (iToolTipStyle == 2) {
					var pn = maplet.p8(maplet.aO, this.id);
					if (callback) {
						callback("&act=click&pid=" + pn);
					}
				}
			}
		};
	}
	this.lx = function (g) {
		var maplet = document["mapbar-maplet"];
		var width = (this.pO != null) ? parseInt(this.pO.width) : 16;
		var height = (this.pO != null) ? parseInt(this.pO.height) : 16;
		var left = maplet.zl(this.li, this.lf) - width / 2;
		var top = maplet.zm(this.lf, this.li) - height;
		if (this.xP && this.cK) {
			g.setColor(this.color);
			g.lC(this.xP, maplet.zl(this.li, this.lf) + width / 2, maplet.zm(this.lf, this.li) - 12);
		}
		if (this.xI) {
			g.lB(this.xI, left, top, width, height);
		}
	};
	this.paint = function (f2) {
		if (this.xI) {
			var maplet = document["mapbar-maplet"];
			var width = (this.pO != null) ? parseInt(this.pO.width) : 16;
			var height = (this.pO != null) ? parseInt(this.pO.height) : 16;
			var left = maplet.zl(this.li, this.lf) - width / 2;
			var top = maplet.zm(this.lf, this.li) - height;
			if (left.toString() == eval("Number.NaN.toString()") || top.toString() == eval("Number.NaN.toString()")) {
				return;
			}
			this.pO.style.top = top + "px";
			this.pO.style.left = left + "px";
			if (top >= 0 && left >= 0 && top <= maplet.height && left <= maplet.width) {
				if (this.pO.parentNode != f2) {
					f2.appendChild(this.pO);
				}
				this.pO.style.visibility = "visible";
			} else {
				this.pO.style.visibility = "hidden";
				if (this.pO.parentNode == f2) {
					f2.removeChild(this.pO);
				}
			}
		}
	};
	this.u9 = function (f2) {
		if (this.xP && this.cK) {
			var maplet = document["mapbar-maplet"];
			var width = (this.pO != null) ? parseInt(this.pO.width) : 16;
			var height = (this.pO != null) ? parseInt(this.pO.height) : 16;
			var left = maplet.zl(this.li, this.lf) - width / 2;
			var top = maplet.zm(this.lf, this.li) - height;
			if (left.toString() == eval("Number.NaN.toString()") || top.toString() == eval("Number.NaN.toString()")) {
				return;
			}
			if (top >= 0 && left >= 0 && top <= maplet.height && left <= maplet.width) {
				this.n2.style.left = (left + width) + "px";
				this.n2.style.top = top + "px";
				if (this.n2.parentNode != f2) {
					f2.appendChild(this.n2);
				}
			}
		}
	};
	this.label = function () {
		if (this.xu) {
		}
	};
	this.pu = {};
	this.vp = function (li) {
		return this.pu[li] || function (pu, xT) {
			var pk = -1;
			var fE = 0;
			var ub = "";
			var fH = "";
			if (xT != null && parseInt(xT.charAt(0), 36) >= 33) {
				fH = xT.charAt(0);
				xT = xT.substring(1);
			}
			for (var i = 0; i < (xT.length - (c75 ? 1 : 0)); i++) {
				var n8 = parseInt(xT.charAt(i), 36) - 10;
				if (n8 >= 17) {
					n8 = n8 - 7;
				}
				ub += (n8).toString(36);
				if (n8 > fE) {
					pk = i;
					fE = n8;
				}
			}
			var n9 = parseInt(ub.substring(0, pk), 16);
			var n0 = parseInt(ub.substring(pk + 1), 16);
			if ("X" == fH) {
				n9 = -n9;
			}
			if ("Y" == fH) {
				n0 = -n0;
			}
			var v6 = new Array();
			v6[0] = (n9 + n0 - parseInt(strLicenseKey)) / 2;
			v6[1] = (n0 - v6[0]) / 100000;
			v6[0] /= 100000;
			if (v6[0] > 180) {
				v6[0] -= 360;
			}
			pu[xT] = v6;
			return v6;
		}(this.pu, li);
	};
	this.zn = function (li, lf) {
		if (typeof li != "undefined" && typeof lf != "undefined") {
			this.lf = parseFloat(lf);
			this.li = parseFloat(li);
		}
		var v6 = "";
		var uh = parseInt(parseFloat(Math.max(-90, Math.min(90, this.lf))) * 100000);
		var uj = parseInt(parseFloat((this.li < 0) ? (this.li + 360) : this.li) * 100000);
		var pl = uj - uh + parseInt(strLicenseKey);
		var pm = uj + uh;
		if (pl < 0) {
			v6 = "X";
			pl = -pl;
		}
		if (pm < 0) {
			v6 = "Y";
			pm = -pm;
		}
		var ph = (pl).toString(16);
		var pi = (pm).toString(16);
		for (var i = 0; i < ph.length; i++) {
			var qv = parseInt(ph.charAt(i), 16);
			v6 += (((qv >= 10) ? (qv + 7) : qv) + 10).toString(36);
		}
		v6 += "z";
		for (var qC = 0; qC < pi.length; qC++) {
			var om45 = parseInt(pi.charAt(qC), 16);
			v6 += (((om45 >= 10) ? (om45 + 7) : om45) + 10).toString(36);
		}
		if (c75) {
			v6 += v6.charAt(c75);
		}
		return v6.toUpperCase();
	};
}
function a9(id, aK, aM, xt, qq, qr, cr) {
	this.aK = (aK == null) ? new Array() : aK;
	this.aM = (aM == null) ? new Array() : aM;
	this.color = (xt == null) ? "#FF0000" : xt;
	this.stroke = (qq == 0) ? 1 : qq;
	this.style = qr;
	this.id = id;
	this.cr = (cr == "undefined" || cr == null) ? "false" : cr;
	this.xP = "";
	this.cK = false;
	this.xu = "";
	this.maplet = null;
	this.vp = function (xT) {
		var aU = xT.split(",");
		var qI = 0;
		for (var i = 0; i < aU.length; i++) {
			if (aU[i] != null && aU[i].length > 0) {
				var pt = cq.vp(aU[i]);
				this.aM[qI] = parseFloat(pt[0]);
				this.aK[qI] = parseFloat(pt[1]);
				qI++;
			}
		}
	};
	this.zn = function () {
		var xU = (this.cr.toString() == "true" || this.cr == "true") ? "2" : "0";
		var xT = this.stroke + "," + xU + "," + this.color + ":";
		for (var i = 0; i < this.aK.length; i++) {
			cq.lf = parseFloat(this.aK[i]);
			cq.li = parseFloat(this.aM[i]);
			xT += cq.zn() + ",";
		}
		return xT;
	};
	this.zM = function (title, content) {
		this.xP = title;
		this.xu = content;
		if (this.cK) {
			if (typeof this.n2 != "undefined") {
				var f2 = this.n2.parentNode;
				if (f2 != null) {
					f2.removeChild(this.n2);
				}
				var left = parseInt(this.n2.style.left);
				var top = parseInt(this.n2.style.top);
				this.n2 = gu(this.xP, this.color);
				this.n2.style.left = left + "px";
				this.n2.style.top = top + "px";
				if (f2 != null) {
					f2.appendChild(this.n2);
				}
			} else {
				this.n2 = gu(this.xP, this.color);
			}
		}
	};
	this.lx = function (g) {
		var aP = new Array();
		var aR = new Array();
		var pg = 0;
		var us = 10;
		for (var i = 0; i < this.aK.length; i++) {
			if (this.aK[i].toString() != eval("Number.NaN.toString()")) {
				aR[pg] = this.maplet.zm(this.aK[i], this.aM[i]);
				if (this.aM[i].toString() != eval("Number.NaN.toString()")) {
					aP[pg] = this.maplet.zl(this.aM[i], this.aK[i]);
					if (pg > 0 && (Math.abs(aP[pg] - aP[pg - 1]) + Math.abs(aR[pg] - aR[pg - 1])) > us) {
						pg++;
					}
				}
			}
			if (pg == 0) {
				pg++;
			}
		}
		if (this.color) {
			g.setColor(this.color);
		}
		if (this.stroke) {
			g.setStroke(this.stroke);
		}
		g.drawPolyline(aP, aR, this.style);
		g.paint();
	};
	this.paint = function (f2) {
		this.zX = document.createElement("div");
		this.zX.maplet = this.maplet;
		this.zX.id = this.id;
		this.zX.unselectable = "on";
		this.zX.style.zIndex = 10;
		this.zX.style.position = "absolute";
		this.z0 = document.createElement("v:polyline");
		this.z0.unselectable = "on";
		this.z0.id = this.id;
		this.z0.strokecolor = this.color;
		this.z0.strokeweight = this.stroke + "pt";
		this.z0.fill = false;
		this.z0.filled = this.cr;
		this.z0.style.position = "absolute";
		this.Ad = document.createElement("v:stroke");
		this.Ad.opacity = (transparencyLevel / 100);
		this.Ad.joinstyle = "round";
		this.Ad.endcap = "round";
		this.Ad.fill = "false";
		if (bArrow) {
			this.Ad.endarrow = "classic";
		}
		this.zY = document.createElement("v:fill");
		this.zY.opacity = ((transparencyLevel / 2) / 100);
		this.zY.color = this.color;
		this.z0.appendChild(this.Ad);
		this.z0.appendChild(this.zY);
		this.zX.appendChild(this.z0);
		this.zI();
		if (this.xP && this.cK && this.aK.length >= 2) {
			var Ao = 0;
			var Au = 0;
			for (var i = 1; i < this.aK.length; i++) {
				if (this.aK[i].toString() != eval("Number.NaN.toString()")) {
					Au = this.maplet.zm(this.aK[i], this.aM[i]);
				}
				if (this.aM[i].toString() != eval("Number.NaN.toString()")) {
					Ao = this.maplet.zl(this.aM[i], this.aK[i]);
				}
				if (Ao >= 0 && Au >= 0 && Au <= this.maplet.height && Ao <= this.maplet.width) {
					this.n2.style.left = Ao + "px";
					this.n2.style.top = Au + "px";
					if (this.n2.parentNode != this.zX) {
						this.zX.appendChild(this.n2);
					}
					break;
				}
			}
		}
		this.zX.style.visibility = "visible";
		if (f2 != null) {
			f2.appendChild(this.zX);
		}
		this.zX.onmouseover = function (lM) {
			if (this.maplet.sS == ts.tb || this.maplet.sS == ts.ta || this.maplet.sS == ts.tw) {
				this.style.cursor = "default";
			} else {
				this.style.cursor = (px) ? "hand" : "pointer";
			}
		};
		this.zX.onclick = function (lM) {
			var pn = this.maplet.p8(this.maplet.aN, this.id);
			var Ap;
			var Av;
			if (pn >= 0) {
				if (this.maplet.sS == ts.l3) {
					var gF = this.maplet.aN[pn];
					var fc = true;
					var pg = 0;
					if (gF.aK.length > 2) {
						fc = false;
						Ap = parseInt((px) ? event.clientX : lM.clientX) - this.maplet.left - this.maplet.offsetX;
						Av = parseInt((px) ? event.clientY : lM.clientY) - this.maplet.top - this.maplet.offsetY;
						var qM = 0;
						var qL = 0;
						var gH = 0;
						var gG = 0;
						for (var i = gF.aK.length - 1; i > 0; i--) {
							if (gF.aK[i].toString() != eval("Number.NaN.toString()")) {
								gH = this.maplet.zm(gF.aK[i], gF.aM[i]);
								if (gF.aM[i].toString() != eval("Number.NaN.toString()")) {
									gG = this.maplet.zl(gF.aM[i], gF.aK[i]);
									if (pg > 0) {
										var lK = gH - qM;
										var lI = gG - qL;
										if (Math.abs(lI) > Math.abs(lK)) {
											var Ax = lK / lI * (Ap - qL) + qM;
											if (Math.abs(Ax - Av) < 16) {
												if (i == 0) {
													fc = true;
												}
												break;
											}
										} else {
											if (Math.abs(lK) > 0) {
												var Ar = lI / lK * (Av - qM) + qL;
												if (Math.abs(Ar - Ap) < 16) {
													if (i == 0) {
														fc = true;
													}
													break;
												}
											}
										}
									}
									qL = gG;
									qM = gH;
									pg++;
								}
							}
						}
					}
					if (fc || (gF.aK.length - pg) < 2) {
						this.onclick = null;
						this.maplet.removeLineAt(pn);
						this.maplet.refresh();
						if (callback) {
							callback("&act=del&lid=" + pn);
						}
					} else {
						for (var qC = 0; qC < pg; qC++) {
							gF.aK[gF.aK.length - qC - 1] = null;
							gF.aM[gF.aM.length - qC - 1] = null;
						}
						gF.aK.length = gF.aK.length - pg;
						gF.aM.length = gF.aM.length - pg;
						this.maplet.refresh();
						if (callback) {
							callback("&act=update&lid=" + pn + "&pline=" + gF.zn());
						}
					}
				} else {
					if (this.maplet.sS == ts.ty || this.maplet.sS == ts.tu) {
						if (iToolTipStyle == 2) {
							if (callback) {
								callback("&act=click&lid=" + pn);
							}
						} else {
							if (this.maplet.aN[pn].xP != null && this.maplet.aN[pn].xP.length > 0) {
								Ap = parseInt((px) ? event.clientX : lM.clientX) - this.maplet.left - this.maplet.offsetX;
								Av = parseInt((px) ? event.clientY : lM.clientY) - this.maplet.top - this.maplet.offsetY + 8;
								this.maplet.wN(Ap, Av, this.maplet.aN[pn].xP, this.maplet.aN[pn].xu);
							}
						}
					} else {
						this.maplet.aZ(lM);
					}
				}
			}
		};
	};
	this.zI = function () {
		var aP = new Array();
		var aR = new Array();
		var pg = 0;
		var us = 10;
		if (this.aK == null || this.aK.length < 2) {
			return;
		}
		var cY = false;
		var tn = this.maplet.width;
		var to = this.maplet.height;
		for (var i = 0; i < this.aK.length; i += 1) {
			if (this.aK[i].toString() != eval("Number.NaN.toString()")) {
				aR[pg] = this.maplet.zm(this.aK[i], this.aM[i]);
				if (this.aM[i].toString() != eval("Number.NaN.toString()")) {
					aP[pg] = this.maplet.zl(this.aM[i], this.aK[i]);
					if (tn > aP[pg]) {
						tn = aP[pg];
					}
					if (to > aR[pg]) {
						to = aR[pg];
					}
					if (!cY && (aR[pg] < 0 || aR[pg] > this.maplet.height || aP[pg] < 0 || aP[pg] > this.maplet.width)) {
						cY = true;
					}
					if (pg > 0 && (Math.abs(aP[pg] - aP[pg - 1]) + Math.abs(aR[pg] - aR[pg - 1])) > us) {
						pg++;
					}
					if (pg == 0) {
						pg++;
					}
				}
			}
		}
		if (cY) {
			var aQ = new Array();
			var aS = new Array();
			pg = 0;
			for (var qC = 1; qC < aP.length; qC++) {
				if ((aR[qC] < -this.maplet.height && aR[qC - 1] < -this.maplet.height) || (aR[qC] > this.maplet.height * 2 && aR[qC - 1] > this.maplet.height * 2) || (aP[qC] > this.maplet.width * 2 && aP[qC - 1] > this.maplet.width * 2) || (aP[qC] < -this.maplet.width && aP[qC - 1] < -this.maplet.width)) {
					continue;
				}
				if (aQ.length == 0 || (aQ[pg] != aP[qC - 1] && aS[pg] != aR[qC - 1])) {
					aQ[pg] = aP[qC - 1];
					aS[pg] = aR[qC - 1];
					pg++;
				}
				aQ[pg] = aP[qC];
				aS[pg] = aR[qC];
				pg++;
			}
			aP = aQ;
			aR = aS;
			aQ = null;
			aS = null;
		}
		var Aa = "";
		for (var qI = 0; qI < aP.length; qI++) {
			if (qI > 0) {
				Aa += ",";
			}
			Aa += (parseInt(aP[qI]) + "," + parseInt(aR[qI]));
		}
		if (bmc) {
			this.z0.style.left = parseInt(tn) + "px";
			this.z0.style.top = parseInt(to) + "px";
		}
		if (this.z0) {
			if (this.z0.points) {
				this.z0.points.value = Aa;
			} else {
				this.z0.points = Aa;
			}
		}
	};
	this.wN = function () {
		var pn = this.maplet.p8(this.maplet.aN, this.id);
		if (this.maplet.aN[pn].xP != null && this.maplet.aN[pn].xP.length > 0 && this.aK.length >= 2) {
			var Ao = 0;
			var Au = 0;
			for (var i = 1; i < this.aK.length; i++) {
				if (this.aK[i].toString() != eval("Number.NaN.toString()")) {
					Au = this.maplet.zm(this.aK[i], this.aM[i]);
				}
				if (this.aM[i].toString() != eval("Number.NaN.toString()")) {
					Ao = this.maplet.zl(this.aM[i], this.aK[i]);
				}
				if (Ao >= 0 && Au >= 0 && Au <= this.maplet.height && Ao <= this.maplet.width) {
					this.maplet.wN(Ao, Au + 8, this.maplet.aN[pn].xP, this.maplet.aN[pn].xu);
					break;
				}
			}
		}
	};
}
Maplet.prototype.aZ = function (lM) {
	if (this.xc) {
		this.xc.hide();
	}
	var l6 = (px) ? event.srcElement.id : lM.target.id;
	var target = (px) ? event.srcElement : lM.target;
	var Ap = parseInt((px) ? event.clientX : lM.clientX) - this.offsetX;
	var Av = parseInt((px) ? event.clientY : lM.clientY) - this.offsetY;
	if (!px && this.vb.style.position != "absolute") {
	}
	this.l6 = l6;
	this.fS = Ap - this.left;
	this.fT = Av - this.top;
	if (this.l6 != null && this.l6.indexOf("ctrl") >= 0) {
		return false;
	}
	if (this.ff && this.nI().qn(this.fS, this.fT)) {
		this.AP.tC(this.fS, this.fT);
		return;
	}
	if (this.aY()) {
		var fR = this.zp(this.fS, this.fT);
		var fO = this.zo(this.fS, this.fT);
		if (apiType == 1) {
			MEvent.trigger(this, "click", lM, new MPoint(cq.zn(fR, fO)));
		} else {
			MEvent.trigger(this, "click", lM, cq.zn(fR, fO));
		}
		var cV = false;
		if ((this.sS == 7)) {
			this.addOrigin(fO, fR);
		} else {
			if ((this.sS == 8)) {
				this.addDestination(fO, fR);
			} else {
				if ((this.sS == 6)) {
					cq.lf = fO;
					cq.li = fR;
					var fQ = cq.zn();
					nX();
					if (apiType == 1) {
						MEvent.trigger(this, "bookmark", {action:"add", point:new MPoint(fQ), zoom:this.AG});
					} else {
						MEvent.trigger(this, "bookmark", "&act=add&latlon=" + fQ + "&zm=" + this.AG);
					}
				} else {
					if (this.sS == ts.ty || this.sS == ts.tu || this.sS == ts.l3) {
						if ((new Date().getTime() - this.tD) >= 500) {
							this.tD = new Date().getTime();
							if (this.cQ) {
								this.cQ = false;
							} else {
								if (!this.cn) {
									if (this.l6 == "LayerMask" || this.l6 == "LayerDrawMap" || this.l6 == "LayerDrawSVG" || target.parentNode.id == "LayerMap" || target.id.indexOf("OverlayBg") >= 0) {
										if (this.fp != null) {
											this.hideBubble();
										}
										if (iToolTipStyle == 0) {
											hideToolTipMenu();
										}
										if (this.clickToCenter) {
											this.waitPan(this.width / 2 - this.fS, -this.fT + this.height / 2);
										}
									}
								}
							}
							this.cn = false;
						} else {
							this.tD = new Date().getTime();
						}
					} else {
						if (this.sS == ts.tb || this.sS == ts.ta || this.sS == ts.lz || this.sS == ts.ly) {
							if (this.l6 != null && this.l6.indexOf("ctrl") >= 0) {
								return false;
							}
							if (!this.zy) {
								var cr = this.sS == ts.ly || this.sS == ts.ta;
								var fP5 = new MBrush(this.brush.color, this.brush.stroke, this.brush.style, cr, this.brush.bgcolor, this.brush.transparency, this.brush.bgtransparency, this.brush.arrow);
								var nF8 = new MPoint(cq.zn(fR, fO));
								this.zy = new MPolyline([nF8], fP5, null, null);
								this.zy.qc(this);
								this.sv++;
								this.tG = new MPolyline([nF8, nF8], fP5, null, null);
								this.tG.qc(this);
								this.sv++;
							} else {
								var L20 = new MPoint(cq.zn(fR, fO));
								this.zy.pts.push(L20);
								this.zy.zI();
								this.tG.pts[0] = this.tG.pts[1];
								this.tG.pts[1] = L20;
								this.tG.zI();
							}
							cV = true;
						}
					}
				}
			}
		}
		if (l6 == "LayerDrawMap" && !cV) {
			if (this.aG != null && this.aH != null) {
				for (var qk = 0; qk < this.aG.length; qk++) {
					if (Math.abs(this.aG[qk] - this.fS) < 8 && Math.abs(this.aH[qk] - this.fT) < 8) {
						var yg = "";
						if (apiType == 1) {
							yg = this.aE[this.aF[qk]].xP;
						} else {
							yg = "&hotspot=" + this.aE[this.aF[qk]].xP;
						}
						this.vi = 0;
						MEvent.trigger(this, "hotspot", yg);
						if (hs) {
							this.setCenter(this.aE[this.aF[qk]].lf, this.aE[this.aF[qk]].li);
							this.setZoomLevel(8);
						}
						break;
					}
				}
			}
		}
	}
};
Maplet.prototype.a1 = function (lM) {
	var l6 = (px) ? event.srcElement.id : lM.target.id;
	var target = (px) ? event.srcElement : lM.target;
	this.l6 = l6;
	nX();
	if (this.l6 != null && this.l6.toString().indexOf("ctrl") >= 0) {
		return false;
	}
	if (this.aY()) {
		this.map.style.cursor = "default";
		if (this.sS == ts.tb || this.sS == ts.ta) {
			var g0 = 0;
			var area = 0;
			if (this.zy) {
				var ur = this.zy.pts.length;
				if (!px) {
					ur = ur - 1;
				}
				if (this.sS == ts.tb) {
					var zh = [];
					var lf = new Number();
					var li = new Number();
					for (var su = 1; su < ur; su++) {
						zh.push(cq.vp(this.zy.pts[su - 1].pid));
						zh.push(cq.vp(this.zy.pts[su].pid));
						lf = zh[1][1] - zh[0][1];
						li = zh[1][0] - zh[0][0];
						g0 += Math.sqrt(lf * lf + li * li);
						zh.length = 0;
					}
				} else {
					this.zy.pts[ur] = this.zy.pts[0];
					ur = parseInt(this.zy.pts.length);
					var qC = 2;
					var qI = 0;
					for (var i = 1; i <= ur; i++) {
						var qj = (qC % ur);
						var pC = (qI % ur);
						var lon = parseFloat(cq.vp(this.zy.pts[(i % ur)].pid)[0]);
						var lat = parseFloat(cq.vp(this.zy.pts[qj].pid)[1]);
						var xD9C = parseFloat(cq.vp(this.zy.pts[pC].pid)[1]);
						area += lon * (lat - xD9C);
						qC++;
						qI++;
					}
					area = Math.abs(area / 2);
				}
				if (this.zy.zX.parentNode == this.lA.ld) {
					this.zy.remove();
				}
			}
			if (this.tG && this.tG.zX.parentNode == this.lA.ld) {
				this.tG.remove();
			}
			this.zy = null;
			this.tG = null;
			if (!px) {
				this.refresh();
			}
			if (g0.toString() == eval("Number.NaN.toString()")) {
				g0 = 0;
			}
			if (area.toString() == eval("Number.NaN.toString()")) {
				area = 0;
			}
			if (this.sS == ts.ta) {
				area = area * this.gM * this.gM;
				var xk = (en == 0) ? tX("%u603E%uF79D%u1151") + ":" + (parseInt(area * 1000000) / 10 / 10) + tX("%u5E77%uC42C%uB725%uE338") : "Total area:" + (parseInt(area * 1000000) / 10 / 10) + "km2";
				if (area < 0.001) {
					xk = (en == 0) ? tX("%u603E%uF79D%u1151") + ":" + (parseInt(area * 100000 * 100000)) + tX("%u5E76%uC42C%uE22C") : "Total area:" + (parseInt(area * 100000 * 100000)) + "m2";
				}
				if (this.vA != "undefined") {
					this.setMode(this.vA);
				}
				sC(this.width / 2 + this.left + this.offsetX, this.height / 2 + this.top + this.offsetY, xk);
				if (apiType == 1) {
					MEvent.trigger(this, "measarea", (parseInt(area * 1000000) / 10));
				} else {
					MEvent.trigger(this, "measarea", "&act=measarea&area=" + (parseInt(area * 1000000) / 10) + tX("%u5E77%uC42C%uB725%uE338"));
				}
			} else {
				g0 = g0 * this.gM;
				var xB = (en == 0) ? tX("%u603E%uEE18%u0798") + ":" + (parseInt(g0 * 1000) / 10) + tX("%u516E%uE338") : "Total distance:" + (parseInt(g0 * 1000) / 10) + "km";
				if (g0 < 0.001) {
					xB = (en == 0) ? tX("%u603E%uEE18%u0798") + ":" + (parseInt(g0 * 100000)) + tX("%u7C74") : "Total distance:" + (parseInt(g0 * 100000)) + "m";
				}
				if (this.vA != "undefined") {
					this.setMode(this.vA);
				}
				sC(this.width / 2 + this.left + this.offsetX, this.height / 2 + this.top + this.offsetY, xB);
				if (apiType == 1) {
					MEvent.trigger(this, "measure", (parseInt(g0 * 1000) / 10));
				} else {
					MEvent.trigger(this, "measure", "&act=measure&dist=" + (parseInt(g0 * 1000) / 10) + tX("%u516E%uE338"));
				}
			}
		} else {
			if (this.sS == ts.lz || this.sS == ts.ly) {
				var yg = null;
				if (this.zy) {
					var Gk8j = this.zy.pts.length;
					if (!px) {
						Gk8j = Gk8j - 1;
					}
					this.zy.pts.length = Gk8j;
					if (this.zy.zX.parentNode == this.lA.ld) {
						this.zy.remove();
					}
					if (apiType == 1) {
						yg = this.zy.zn();
						yg.zoom = this.AG;
					} else {
						yg = ("&act=add&pline=" + this.zy.zn() + "&zm=" + this.AG);
					}
				}
				if (this.tG && this.tG.zX.parentNode == this.lA.ld) {
					this.tG.remove();
				}
				this.zy = null;
				this.tG = null;
				if (!px) {
					this.refresh();
				}
				var nb = (this.sS == ts.lz) ? "drawline" : "drawarea";
				if (this.vA != "undefined") {
					this.setMode(this.vA);
				}
				MEvent.trigger(this, nb, yg);
			} else {
				if (this.sS == ts.ty || this.sS == ts.tu || this.sS == ts.l3) {
					if (this.l6 == "LayerMask" || this.l6 == "LayerDrawMap" || this.l6 == "LayerDrawSVG" || target.parentNode.id == "LayerMap" || target.id.indexOf("OverlayBg") >= 0) {
						if (px) {
							this.vi = 0;
							if (this.getZoomLevel() < sY) {
								this.zoomTo(this.getZoomLevel() + 1, void (0), this.width / 2 - this.fS, -this.fT + this.height / 2);
							} else {
								if (this.getZoomLevel() == sY) {
									this.panTo(this.width / 2 - this.fS, -this.fT + this.height / 2);
								}
							}
						} else {
							this.xoffset = this.width / 2 - this.fS;
							this.yoffset = -this.fT + this.height / 2;
							this.ve = this.zo(-this.xoffset + this.width / 2, -this.yoffset + this.height / 2);
							this.vf = this.zp(-this.xoffset + this.width / 2, -this.yoffset + this.height / 2);
							this.setCenter(this.ve, this.vf);
							if (this.getZoomLevel() < sY) {
								this.setZoomLevel(this.getZoomLevel() + 1);
							}
						}
					}
				}
			}
		}
	}
};
Maplet.prototype.a2 = function (lM) {
	MEvent.trigger(this, "mousedown", lM);
	var Ap = parseInt((px) ? event.clientX : lM.clientX) - this.offsetX;
	var Av = parseInt((px) ? event.clientY : lM.clientY) - this.offsetY;
	this.l6 = (px) ? event.srcElement.id : lM.target.id;
	if (!px && this.vb.style.position != "absolute") {
	}
	this.lq = Ap - this.left;
	this.lr = Av - this.top;
	if (this.l6 != null && this.l6.indexOf("ctrl") >= 0 && this.ga != null) {
		this.ga.onmousedown(lM);
		return;
	}
	this.tQ = "";
	if (this.ff && this.nI().qn(this.lq, this.lr)) {
		this.AP.tE(this.lq, this.lr);
		return false;
	} else {
		this.cL = this.l6 == "LayerMask" || this.l6 == "LayerDrawMap" || this.l6 == "LayerDrawSVG" || this.l6.indexOf("MPolyline") == this.l6.length - 9;
		if (this.aY() && this.cS) {
			this.sD.resize(1, 1);
			this.sD.show();
		} else {
			if (this.sS == ts.ty || this.sS == ts.tu || this.sS == ts.l3) {
				if (px && (this.l6.indexOf("MPolyline") == this.l6.length - 9)) {
					event.srcElement.style.cursor = "move";
				} else {
					eval(document.body.scrollTop);
					this.map.style.cursor = "move";
				}
			}
		}
	}
};
Maplet.prototype.a5 = function (lM) {
	if (this.rjk) {
		this.rjk = false;
		var C80F8 = Wa43(this.map);
		this.offsetX = C80F8[0] - parseInt(document.documentElement.scrollLeft) - this.left;
		this.offsetY = C80F8[1] - parseInt(document.documentElement.scrollTop) - this.top;
	}
};
Maplet.prototype.a4 = function (lM) {
	MEvent.trigger(this, "mouseout", lM);
	var l6 = (px) ? event.srcElement.id : lM.target.id;
	var Ap = parseInt((px) ? event.clientX : lM.clientX) - this.offsetX;
	var Av = parseInt((px) ? event.clientY : lM.clientY) - this.offsetY;
	this.l6 = l6;
	this.tR = Ap - this.left;
	this.tS = Av - this.top;
	this.cI = false;
	if (!this.aY()) {
		if (this.ga != null) {
			this.ga.onmouseout(lM);
		}
		this.a6((px) ? event : lM, l6, Ap, Av);
	}
	if (px) {
		document.onmousewheel = new Function("return true");
	}
};
Maplet.prototype.a3 = function (lM) {
	if (this.cL && this.xc) {
		this.xc.hide();
	}
	this.cI = true;
	if (!this.cL) {
		this.a5(lM);
	}
	this.l6 = (px) ? event.srcElement.id : lM.target.id;
	var Ap = parseInt((px) ? event.clientX : lM.clientX) - this.offsetX;
	var Av = parseInt((px) ? event.clientY : lM.clientY) - this.offsetY;
	this.tR = (Ap) - this.left;
	this.tS = (Av) - this.top;
	if (this.ga != null) {
		if (this.ga.onmousemove(lM)) {
			return;
		}
	}
	if (this.gc != null) {
		for (var n8 in this.gc) {
			if (this.gc[n8].toString().indexOf("MStandardControl") > 0 && this.gc[n8].nR && this.gc[n8].nR.onmousemove(lM)) {
				return;
			}
		}
	}
	if (this.sS == ts.tb || this.sS == ts.ta || this.sS == ts.lz || this.sS == ts.ly) {
		if (px || this.sS == ts.tb || this.sS == ts.ta) {
			var x0 = (en) ? "Double click to finish" : tX("%u8BFC%uDFC3%uA5C7%uD0CE%uE632");
			if (this.sS == ts.tb) {
			}
			showMouseTipBox(this.tR, this.tS, x0, this.map);
		}
	} else {
		if (this.sS == ts.tw) {
			if (this.gJ != null && this.gJ != "undefined" && this.gJ != "null" && this.gJ != "") {
				showMouseTipBox(this.tR - this.gI.width / 2 - 10 - 1, this.tS - this.gI.height - 2 - 18, "<img src='" + this.gI.src + "'>", this.map);
			} else {
				nX();
			}
		} else {
			nX();
		}
	}
	if (this.ff && this.nI().tF(this.l6, this.tR, this.tS)) {
		return;
	}
	if (this.sS == ts.ty) {
		var cF = false;
		if (this.aG != null && this.aH != null) {
			for (var qk = 0; qk < this.aG.length; qk++) {
				if (Math.abs(this.aG[qk] - this.tR) < 8 && Math.abs(this.aH[qk] - this.tS) < 8) {
					cF = true;
					break;
				}
			}
		}
		if (cF) {
			this.map.style.cursor = (px) ? "hand" : "pointer";
		} else {
			if (!this.cL) {
				this.map.style.cursor = "default";
			}
		}
	}
	if (this.cO && this.cL) {
		if (px) {
			if (!document.getElementById("_map_marker_speeder")) {
				var d22 = document.createElement("DIV");
				d22.id = "_map_marker_speeder";
				document.body.appendChild(d22);
			}
			document.getElementById("_map_marker_speeder").innerHTML = "";
		}
		if (iToolTipStyle == 0) {
			hideToolTipMenu();
		}
		if (iToolTipStyle == 0) {
			hideToolTipMenu();
		}
		this.S024Y = this.tR - this.lq;
		this.XP9 = this.tS - this.lr;
		this.sF.moveTo(this.S024Y, this.XP9);
		this.cN = true;
		this.cn = true;
	} else {
		if (this.cS && this.cL) {
			if (this.aY()) {
				this.cR = true;
				this.lu();
			}
		} else {
			if (this.sS == ts.tb || this.sS == ts.ta || this.sS == ts.lz || this.sS == ts.ly) {
				var tP = this.zp(this.tR, this.tS);
				var tO = this.zo(this.tR, this.tS);
				if (this.zy != null) {
					this.tG.pts[1] = new MPoint(cq.zn(tP, tO));
					this.tG.zI();
				}
			} else {
				if (this.l6 == "LayerDrawMap" && iToolTipStyle == 0) {
					hideToolTipMenu();
				}
			}
		}
	}
};
Maplet.prototype.a6 = function (lM, l6, Ap, Av) {
	var wL = 0;
	var wM = 0;
	var li = 0;
	var lf = 0;
	var maplet = document["mapbar-maplet"];
	MEvent.trigger(this, "mouseup", lM);
	l6 = (px) ? event.srcElement.id : lM.target.id;
	Ap = parseInt((px) ? event.clientX : lM.clientX) - this.offsetX;
	Av = parseInt((px) ? event.clientY : lM.clientY) - this.offsetY;
	if (!px && this.vb.style.position != "absolute") {
	}
	this.l6 = l6;
	this.zQ = Ap - this.left;
	this.zR = Av - this.top;
	this.cL = false;
	if (this.l6.indexOf("MPolyline") != -1) {
		this.cn = false;
	}
	if (this.ga != null) {
		this.ga.onmouseup(lM);
	}
	if (this.l6 != null && this.l6.indexOf("ctrl") >= 0) {
		this.sD.hide();
		return false;
	}
	if (this.sS == ts.ty || this.sS == ts.tu || this.sS == ts.l3) {
		this.map.style.cursor = "default";
		if (px && (this.l6.indexOf("MPolyline") == this.l6.length - 9)) {
			event.srcElement.style.cursor = "default";
		}
	}
	if (this.ff && this.nI().tJ(this.zQ, this.zR)) {
		this.setZoomLevel(parseInt(this.AP.getZoomLevel()));
		return;
	}
	if ((this.cN || this.cR) && (this.cS || this.cO)) {
		this.cN = false;
		this.cR = false;
		if (this.cO) {
			if (true || this.AG > 0) {
				wL = -(this.zQ - this.lq);
				wM = (this.zR - this.lr);
				li = this.zp(wL + this.width / 2, -wM + this.height / 2);
				lf = this.zo(wL + this.width / 2, -wM + this.height / 2);
				this.gA = li;
				this.gx = lf;
			}
			this.A924D = true;
			this.s16F = true;
			this.fHy00 = new Date().getTime();
			maplet.setZoomLevel(maplet.AG);
			this.s16F = false;
			if (apiType == 1) {
				MEvent.trigger(this, "pan", new MPoint(this.toMapCoordinate(this.width / 2, this.height / 2)));
			} else {
				MEvent.trigger(this, "pan", "&act=pan&ctr=" + this.toMapCoordinate(this.width / 2, this.height / 2));
			}
		} else {
			var gX = 1;
			var gW = Math.max(1, Math.abs(this.zQ - this.lq));
			if (this.sS == 1) {
				wL = (this.zQ + this.lq) / 2;
				wM = (this.zR + this.lr) / 2;
				li = this.zp(wL, wM);
				lf = this.zo(wL, wM);
				this.gA = li;
				this.gx = lf;
				if (gW < this.pZ) {
					gX = Math.min(sY - this.AG, Math.max(1, parseInt(Math.log(this.pZ / gW) / Math.log(2))));
				}
				this.setZoomLevel(this.AG + gX);
				if (apiType == 1) {
					MEvent.trigger(this, "zoomin", this.AG);
				} else {
					MEvent.trigger(this, "zoomin", "&act=zoomin&zm=" + this.AG);
				}
			} else {
				if (this.sS == 2) {
					wL = (this.zQ + this.lq) / 2;
					wM = (this.zR + this.lr) / 2;
					li = this.zp(wL, wM);
					lf = this.zo(wL, wM);
					this.gA = li;
					this.gx = lf;
					if (gW < this.pZ) {
						gX = Math.min(this.AG, Math.max(1, parseInt(Math.log(this.pZ / gW) / Math.log(2))));
					}
					this.setZoomLevel(this.AG - gX);
					if (apiType == 1) {
						MEvent.trigger(this, "zoomout", this.AG);
					} else {
						MEvent.trigger(this, "zoomout", "&act=zoomout&zm=" + this.AG);
					}
				} else {
					if (this.sS == ts.tv) {
						var s6 = this.gA + (Math.max(this.zQ, this.lq) - this.width / 2) * this.xg / this.pZ;
						var s4 = this.gx - (Math.min(this.zR, this.lr) - this.height / 2) * this.xf / this.pN;
						cq.li = s6;
						cq.lf = s4;
						var s5 = cq.zn();
						var tl = this.gA + (Math.min(this.zQ, this.lq) - this.width / 2) * this.xg / this.pZ;
						var tj = this.gx - (Math.max(this.zR, this.lr) - this.height / 2) * this.xf / this.pN;
						cq.li = tl;
						cq.lf = tj;
						var tk = cq.zn();
						cq.li = tl;
						cq.lf = s4;
						var tm = cq.zn();
						cq.li = s6;
						cq.lf = tj;
						var s7 = cq.zn();
						var yg = "&act=lookup&max=" + s5 + "&min=" + tk + "&mmx=" + tm + "&mxm=" + s7;
						if (this.vA != "undefined") {
							this.setMode(this.vA);
						}
						this.cQ = true;
						if (apiType == 1) {
							MEvent.trigger(this, "lookup", {action:"lookup", max:new MPoint(s5), min:new MPoint(tk), mmx:new MPoint(tm), mxm:new MPoint(s7)});
						} else {
							MEvent.trigger(this, "lookup", yg);
						}
					}
				}
			}
			this.sD.hide();
			this.sD.resize(1, 1);
			this.sD.moveTo(-10, -10);
		}
	}
};
Maplet.prototype.a7 = function () {
	document.onmousewheel = new Function("return false");
	var event = window.event;
	var aB = Maplet.prototype.a7.arguments;
	if (!px && typeof aB != "undefined" && aB.length > 0 && aB[0].constructor.toString() == "[MouseEvent]") {
		event = aB[0];
		event.wheelDelta = ~event.gd4nV;
		event.srcElement = event.target;
	}
	if (event) {
		if (this.getZoomLevel() == te && event.wheelDelta < 0) {
			return;
		}
		if (this.getZoomLevel() == sY && event.wheelDelta > 0) {
			return;
		}
		if (this.tL) {
			return;
		}
	}
	if (typeof this.tK == "undefined") {
		this.tK = 0;
	}
	if (typeof this.Ai == "undefined" || (event && this.Ai)) {
		this.Ai = 0;
	}
	if (event != null && !this.Ai) {
		if (event.srcElement.id == "LayerMask" || event.srcElement.id == "LayerDrawMap") {
			this.tK += event.wheelDelta > 0 ? 1 : -1;
			if (bzt) {
				this.AN(this.getZoomLevel() + this.tK);
			}
			this.Ai = parseInt(this.getZoomLevel() + this.tK);
			if (this.Ai < te) {
				this.Ai = te;
			}
			if (this.Ai > sY) {
				this.Ai = sY;
			}
			this.tL = getTimeout(this, this.a7, 200);
		}
	} else {
		this.tK = 0;
		this.setZoomLevel(this.Ai);
		this.Ai = 0;
		if (this.tL) {
			clearTimeout(this.tL);
		}
		this.tL = null;
	}
};
if (typeof xl == "undefined") {
	var xl = strImgsvrUrl;
}
if (typeof ds == "undefined") {
	var ds = "baidu";
}
if (typeof en == "undefined") {
	var en = 0;
}
if (typeof rs == "undefined") {
	var rs = 0;
}
if (typeof apiType == "undefined") {
	var apiType = 0;
}
if (typeof hs == "undefined") {
	var hs = false;
}
if (typeof mw == "undefined") {
	var mw = true;
}
if (typeof kp == "undefined") {
	var kp = true;
}
if (typeof bDefaultControlOn == "undefined") {
	var bDefaultControlOn = false;
}
if (typeof hbo == "undefined") {
	var hbo = false;
}
if (typeof otp == "undefined") {
	var otp = false;
}
if (typeof bzt == "undefined") {
	var bzt = true;
}
if (typeof bsc == "undefined") {
	var bsc = true;
}
if (typeof __mapbar_magic_id == "undefined") {
	var __mapbar_magic_id = "";
}
if (typeof rmi != "boolean") {
	var rmi = true;
}
var c75 = 2;
var ac = null;
var ad = true;
if (typeof bp == "undefined") {
	var bp = true;
}
if (typeof oo == "undefined") {
	var oo = true;
}
if (typeof bmc == "undefined") {
	var bmc = false;
}
if (typeof STD_BUBBLE_WIDTH == "undefined") {
	var STD_BUBBLE_WIDTH = 217;
}
if (typeof MIN_BUBBLE_HEIGHT == "undefined") {
	var MIN_BUBBLE_HEIGHT = 120;
}
if (typeof oww == "undefined") {
	var oww = 150;
}
if (typeof owh == "undefined") {
	var owh = 100;
}
if (typeof MAX_BUBBLE_HEIGHT == "undefined") {
	var MAX_BUBBLE_HEIGHT = 380;
}
var sX = strImgsvrUrl + "images/mask.gif";
var ul = strImgsvrUrl + "images/node.gif";
var q228 = strImgsvrUrl + "images/dragnode.png";
//var lV = strImgsvrUrl + "images/wmk.gif";
var lV = strMapIMGsvrUrl;
var t9gk = null;
if (typeof gQ == "undefined") {
	gQ = 0;
}
var xz = "";
var AB = "";
Array.prototype.clear = function () {
	while (this.length > 0) {
		this.pop();
	}
};
document.write("<img id=\"sendmapload\" style=\"display:none;visibility:hidden;\" />");
document.write("<script language=\"javascript\" src=\"" + strMapsvrUrl + "js/xmlhttp.js\"></script>");
document.writeln("<div id=\"myalert\" style=\"position:absolute;z-index:100000;filter:alpha(opacity=90);-moz-opacity:0.9;visibility:hidden;\"></div>");
var sb = 0;
var sc = "<div id=\"loading\" unselectable = \"on\"><img src=\"" + strImgsvrUrl + "images/loading.gif\"></div>";
if (typeof bArrow == "undefined") {
	var bArrow = 0;
}
var sB = new Image();
var px = navigator.appVersion.match(new RegExp("\\bMSIE\\b"));
var ut = document.qS ? 1 : 0;
var lm = (px) ? "document.all." : "document.";
var yj = (px) ? ".style" : "";
var qc = 0;
var xN = (en == 0) ? new Array(tX("%u5415%uDD90%uE7F2%uD86E"), tX("%u5415%uA728%uB18A%uD86E"), tX("%u5415%uA22D%uAC8F%uD86E"), tX("%u5415%uA768%uB1CA%uD86E"), tX("%u6D4F%uFF1A%u1FAC%u0798"), tX("%u70BF%uC2B4%uE1D6%u1827%u0775%uE467"), tX("%u6540%uBE65"), tX("%u7F2B%uDB38"), tX("%u62D1%uB571%uC179%uC628%uE732%u1827%u0775%uE467")) : new Array("Go left", "Go up", "Go right", "Go down", "Measure distance", "Click to zoom", "Zoom In", "Zoom Out", "Drag to zoom");
var lt = (en == 0) ? "\u62d6\u62fd\u6b64\u70b9" : "drag to move this point";
var pe = new Array();
var pa = new Array();
var pF = 2;
var sI = new Array("W", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "15");
var sj = new Array(90, 40, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01, 0.005, 0.002);
var qP = new Array(90 * 0.8, 40 * 0.8, 20 * 0.8, 10 * 0.8, 5 * 0.8, 2 * 0.8, 0.8, 0.5 * 0.8, 0.2 * 0.8, 0.1 * 0.8, 0.05 * 0.8, 0.02 * 0.8, 0.01 * 0.8, 0.005 * 0.8, 0.002 * 0.8);
var nM = new Array(10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 50, 50, 50, 50, 50);
var w8 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 75, 0, 0, -150, 0, 0, 0);
var gT = 13;
var gU = 0;
var sY = gT;
var te = gU;
var wp = 100000;
var sw = 105;
var sx = 35;
var sz = new Array(-360, 360);
var sy = new Array(-90, 90);
var Q3T1s = null;
var uU = 8;
var uS = 15;
var uT = strImgsvrUrl + "images/overclose.gif";
var uV = strImgsvrUrl + "images/overopen.gif";
if (!otp) {
	uT = strImgsvrUrl + "images/overclose2.gif";
	uV = strImgsvrUrl + "images/overopen2.gif";
}
var uW = [0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var bpp = [xl + "mapbank/base/", 12, 13];
var vs = strMapsvrUrl + "images/done.gif";
var vt = strMapsvrUrl + "images/edit.gif";
var v3 = strMapsvrUrl + "images/stretch.gif";
var at = 0;
var as = 1;
var au = 2;
var av = 0;
var ar = 2;
var s9 = 1001;

