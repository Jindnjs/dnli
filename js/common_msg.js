/**
 * Message Dialog
 * 
 * msgFnc.alert({title : '저장'
 *				 , text : '저장되었습니다.'
 *				 , confirmBtnTitle : '저장'
 *			     , callBackConfirmFnc : function(){...}
 * });
 * msgFnc.alert("저장되었습니다.");
 * msgFnc.confirm({title : '저장'
 *				 , text : '저장하시겠습니까?'
 *				 , confirmBtnTitle : '저장'
 *			     , callBackConfirmFnc : function(){...}
 *				 , callBeckCancelFnc : function(){...} 
 * });
 */

var msgFnc = {
		alert : function(obj){
			msgFnc.setDialog(obj,false);
		},
		confirm : function(obj){
			msgFnc.setDialog(obj,true);
		},
		setDialog : function(obj, showCancelButton){
			if(obj == undefined ){
				return;
			}
			
			if(obj.constructor == String ){
				obj = {text : obj}	
			}
			
			if(obj.title == undefined){
				obj.title = cmMsg.alt.title;
			}
			if(obj.confirmBtnTitle == undefined){
				obj.confirmBtnTitle = cmMsg.alt.confirm;
			}
			
			if(parent.cmIframeFnc.name != null){
				var ele = parent.document.getElementById(parent.cmIframeFnc.name);
 				ele.parentNode.removeChild(ele);
				parent.cmIframeFnc.name = null;
			}
			
			var text = "<article id=\"dialogMsg\" class=\"popup\" role=\"dialog\">\r\n" + 
				"	<div class=\"conWrap\">\r\n" + 
				"		<div class=\"conBody\">\r\n" + 
				"			<div class=\"infotxt msg\">"+
				" 				<h6 class=\"title\">"+obj.title+"</h6>"+obj.text+"</div>\r\n" + 
				"		</div>\r\n" + 
				"		<div class=\"conFoot\">\r\n"+
				"			<button type=\"button\" id=\"btnConfirm\" class=\"bt bg primary\">"+obj.confirmBtnTitle+"</button>\r\n";
				if(showCancelButton){
					text+=	"		<button type=\"button\" id=\"btnCancel\"class=\"bt bg\">"+cmMsg.alt.cancel+"</button>\r\n";
				}
				text+=	"		</div>\r\n" + 
						"	</div>\r\n" + 
						"</article>";
			$("body").append(text);
			$("#dialogMsg > .conWrap > .conFoot > #btnConfirm").focus();
			$("#dialogMsg > .conWrap > .conFoot > #btnConfirm").unbind("click").bind("click", function(){
				typeof obj.callBackConfirmFnc === "function" ? obj.callBackConfirmFnc(): null;
				$("#dialogMsg").remove();
			});
			$("#dialogMsg > .conWrap > .conFoot > #btnCancel").unbind("click").bind("click", function(){
				typeof obj.callBeckCancelFnc === "function" ? obj.callBeckCancelFnc(): null;
				$("#dialogMsg").remove();
			});
		}
};