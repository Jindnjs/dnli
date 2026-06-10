/**
 * Description : 파일 업로드
 * author : qkrgksgh725
 * 예시 : 
 * $("#fileDd).fileUpload({
 * 		setFile : [
 *			{name : "file_1", value : "", required : true}
 *		]
 *		, title : "사진" // default : 첨부파일
 *		, maxSize : 20 // MB 단위로  default : 10
 *      , ext : ["zip","7z"] //default : ["jpg", "jpeg", "gif", "tif", "bmp", "png","txt","hwp","doc","docx","xls","xlsx","ppt","pptx"] 
 * });
 */
;(function ($) {
var methods = {
	init : function(options) {
		return this.each(function (){
			var $this = $(this),
			title = (options && options.title) ? options.title : fileUploadFnc.default.title,
			maxSize = (options && options.maxSize) ? options.maxSize : fileUploadFnc.default.maxSize,
			ext = (options && options.ext) ? options.ext : fileUploadFnc.default.ext,
			settings = {
				title : title
				, maxSize : maxSize
				, ext : ext
			}
			if(!options.setFile){
				alert("setFile 설정 필요함");
				return false;
			}
			
			var cnt = 0;
			$.each(options.setFile, function(idx, item){
				var div = $("<div class=\"attach\"></div>").appendTo($this);
				var label = $("<label></label>").appendTo(div);
				label.attr("for",item.name);
				label.attr("class","blind");
				label.text(item.name);
				var ipt = $("<input type=\"file\">").appendTo(div);
				ipt.attr("id",item.name);
				ipt.attr("name",item.name);
				if(item.required){
					ipt.attr("class","validate[requiredFile]"); 
				}
				
				var fileSettings = $.extend({
                }, settings);
                
                if(item.title != undefined && item.title != null && item.title != ""){
                	fileSettings.title = item.title;
                }
                
                ipt.attr("title",fileSettings.title);
                
                 if(item.fileNm != undefined && item.fileNm != null && item.fileNm != ""){
                 	fileSettings.beforeFileNm = item.fileNm;
                 	fileSettings.beforeFileId = item.fileId;
                 }
                
				ipt.data('fileUpload', {
                    'settings': fileSettings
            	});
				var btn = $("<button type=\"button\" class=\"bt ico x only\" onclick=\"fileUploadFnc.del('"+item.name+"');\">삭제</button>").appendTo(div);
				var lbl = $("<label>"+(fileSettings.beforeFileNm != undefined  ? fileSettings.beforeFileNm : "선택된 파일없음")+"</label>").appendTo(div);
				lbl.attr("id",item.name+"Lbl");
				
				cnt++;
			});
			var div = $("<div class=\"note\"></div>").appendTo($this);
			var ul = $("<ul></ul>").appendTo(div);	
			if(cnt > 1){
				$("<li class=\"dot\">첨부파일은 최대 "+cnt+"개까지이며, 파일크기 개당 "+maxSize+"MB이하만 가능합니다.</li>").appendTo(ul);	
			}else{
				$("<li class=\"dot\">파일크기 "+maxSize+"MB이하만 가능합니다.</li>").appendTo(ul);	
			}
			var liExt = $("<li class=\"dot\">"+(ext.join(", "))+"만 가능합니다.</li>").appendTo(ul);
			
			$this.on('change', 'input[type=file]', function (e) {      	
				if(!fileUploadFnc.ext($(this), $(this).data('fileUpload').settings.ext)){
              		return false;
              	}
              	if(!fileUploadFnc.size($(this), $(this).data('fileUpload').settings.maxSize)){
              		return false;
              	}  
              	
              	if(!fileUploadFnc.nm($(this))){
              		return false;
              	}
              	
              	fileUploadFnc.del($(this).attr("id"),"C");
              	
            });
		});
	}
	, 
}
$.fn.fileUpload = function(method) {
	if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
    } else if (typeof method === 'object' || ! method) {
        return methods.init.apply(this, arguments);
    } else {
        $.error('Method ' + method + ' does not exist on fileUpload');
    }    
};
})(jQuery);

var fileUploadFnc = {
	del : function(id, mode){
		var obj = $("#"+id);
		if(obj.data('fileUpload').settings.beforeFileId != undefined){
			$("<input type=\"hidden\" name=\"delfile\" value=\""+obj.data('fileUpload').settings.beforeFileId+"\">").appendTo(obj.parent());
			obj.data('fileUpload').settings.beforeFileId = undefined;
		}
		if(mode == undefined){
			obj.val("");
			obj.siblings('label').text("선택된 파일없음");
		}
	}
	, ext : function(obj, exts){
		if(exts == undefined || exts == null || exts == ""){
			exts = fileUploadFnc.default.ext;
		}	
	
		var fileVal = obj.val();
		
        var ext = fileVal.split('.').pop().toLowerCase(); //확장자분리
        if(!exts.includes(ext)){
        	msgFnc.alert({text : '다음 파일만 업로드가 가능합니다.<br>'  + (exts.join(", ")) + '<br> 업로드할 파일을 다시 선택하여 주세요.'
			, callBackConfirmFnc : function(){
				fileUploadFnc.del(obj.attr("id"));
			}
			});
			return false;
        }
	    return true;
	}
	, size : function(obj, size){
		if(size == undefined || size == null || size == ""){
			size = fileUploadFnc.default.maxSize;
		}	
		
		var maxSize = size * 1024 * 1024; // 10MB
		var fileSize = obj[0].files[0].size;
		if(fileSize > maxSize){
			msgFnc.alert({text : (obj.attr("title") ? obj.attr("title") : "")+" 크기는 "+size+"MB 이내로 등록 가능합니다."
				, callBackConfirmFnc : function(){
					fileUploadFnc.del(obj.attr("id"));
				}
			});
			return false;
		}
		return true;
	}
	, nm : function(obj){
		if(obj.val().includes(",")){
			msgFnc.alert({text : (obj.attr("title") ? obj.attr("title") : "")+" 이름에 콤마(,)는 사용할 수 없습니다."
				, callBackConfirmFnc : function(){
					fileUploadFnc.del(obj.attr("id"));
				}
			});
			return false;
		}
		return true;
	}
	, default : {
	    title : "첨부파일"
	 	, maxSize : 10 //MB
	 	, ext : ["jpg", "jpeg", "gif", "tif", "bmp", "png","txt","hwp","doc","docx","xls","xlsx","ppt","pptx"] 
	}
}