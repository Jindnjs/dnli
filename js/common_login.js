/**
 * 
 */


			
var loginFnc = {
	    moveMenu : null
		, def : function(menuUrl, headerYn){
			loginFnc.moveMenu = menuUrl;

			
			var bt = $("#btLogin");
			var tg = bt.parent('.toggle');
			var one = tg.siblings('.toggle')
			var box = tg.children('.overbox,.dropbox');
			var slip = tg.children('.slipbox');
			if(tg.hasClass('one')  && headerYn == 'Y' && anyidAdaptor.anyIdSsoOn === 'true'){
				//20250308 anyid 추가
				anyidAdaptor.ssoLoginPage(window.location.pathname+window.location.search,'3');
				
			}			
//			setTimeout(() => {
//				if (bt.hasClass('on') && headerYn == 'Y' ) {
//					tg.removeClass('on');
//					bt.removeClass('on');
//					box.hide().removeAttr('tabindex');
//					slip.slideUp().removeAttr('tabindex');
//				} else {
//					if (tg.hasClass('one')) {
//						one.removeClass('on');
//						one.children('.toggle > .bt').removeClass('on');
//						one.children('.overbox,.dropbox').hide().removeAttr('tabindex');
//						one.children('.slipbox').slideUp().removeAttr('tabindex');
//					}
//					tg.addClass('on');
//					bt.addClass('on');
//					box.show().attr('tabindex','0').focus();
//					slip.slideDown().attr('tabindex','0').focus();
//				}
//			}, 5000);
			
			// toggle close
			function tgClose() {
				tg.removeClass('on');
				box.hide().removeAttr('tabindex');
				slip.slideUp().removeAttr('tabindex');
				bt.removeClass('on').focus();
			}
			$(tg.find('.bt.ico.close')).on('click',tgClose);
			
			if(cmCookie.get("id") != undefined){
				$("#loginUsrIde").val(cmCookie.get("id"));
				$("#chkUsrIde").prop('checked',true);
				$("#loginUsrPwd").focus();
			}else{
				$("#loginUsrIde").focus();
			}
			
			$("#loginUsrIde , #loginUsrPwd").unbind("keypress").bind("keypress", function(e){
				if (e.keyCode == 13) {
					loginFnc.login("loginUsrIde","loginUsrPwd","chkUsrIde");
				}
			});
			
			
		}
		, login : function(ipId,ipPwd,chkId){
			if(!$("#"+ipId).oneValid()){
				return false;
			}	
			if(!$("#"+ipPwd).oneValid()){
				return false;
			}	
			
			cmFunction.ajaxSubmit(
				"/v4po_usrlogin_a004.do"
				, [	  {name : "usrIdeE", value : btoa($("#"+ipId).val())}
					, {name : "usrPwdE", value : btoa($("#"+ipPwd).val())}
					, {name : "nextUrl", value : loginFnc.moveMenu}]
				, function(data){
					if(data.resultMap.result == 'error'){
						msgFnc.alert({text : data.resultMap.msg
							, callBackConfirmFnc : function(){
								$("#"+ipPwd).focus();
							  }  
						});
					}else if(data.resultMap.result == 'success'){
						if($("#"+chkId).is(':checked')){
							cmCookie.set("id",$("#"+ipId).val(),7);
						}else{
							cmCookie.remove("id");
						}
						if(data.resultMap.nextUrl != "" && data.resultMap.nextUrl != null && data.resultMap.nextUrl != undefined){
							cmFunction.submit(data.resultMap.nextUrl);
						}else if(loginFnc.moveMenu != "" && loginFnc.moveMenu != null && loginFnc.moveMenu != undefined){
							cmFunction.submit(loginFnc.moveMenu);
						}else {
							location.reload();
						}
						
					}else{
						var params = {};
						if(loginFnc.moveMenu != "" && loginFnc.moveMenu != null){
							params = {nextUrl : loginFnc.moveMenu};
						}
						msgFnc.alert({text : data.resultMap.msg
							, callBackConfirmFnc : function(){
								cmFunction.submit(data.resultMap.url, params);
							  }  
						});
					}
					
					//location.reload();
				}
				, null
			);
		}
		, logout : function(timeYn){
			if(timeYn == 'Y'){
				loginFnc.extnPopup.close();
				// 공장인허가 수정 소스 시작
//				anyidAdaptor.ssoLogout(window.location.pathname);
				// 공장인허가 수정 소스 끝
			}
			/*2025-04-21 공간정보 다운로드 페이지일 경우 페이지 보존*/
			let preUrl = window.location.pathname;
			if(preUrl.includes("/dtmk/")){preUrl = window.location.pathname+window.location.search;}
			else{preUrl = "/v4po_main.do"};
			
			cmFunction.ajaxSubmit(
				"/v4po_usrlogout_a002.do"
				, []
				, function(data){
					if(data.resultMap.result == 'error'){
						msgFnc.alert({text : data.resultMap.msg});
					}else{
						if(timeYn == 'Y'){
							msgFnc.alert({title : '자동로그아웃 안내'
									 , text : '고객님의 안전한 서비스이용을 위해 로그인 후<br/>약 30분 동안 서비스 이용이없어 자동 로그아웃 되었습니다.'
								     , callBackConfirmFnc : function(){
//								     	cmFunction.submit(preUrl);
										//20250421 anyid 추가 window.location.pathname
										anyidAdaptor.ssoLogout(window.location.pathname+window.location.search);
								     }
							});
						}else{
							msgFnc.alert({text : data.resultMap.msg
								, callBackConfirmFnc : function(){
									cmFunction.submit(preUrl);
//									cmFunction.submit("/v4po_main.do");
								  }
							});
						}
					}
					
					//
				}
				, null
			);
		}
		// 2025-02-03 세션용 / 버튼용 로그아웃 분리
		, logoutBtn : function(){
			cmFunction.ajaxSubmit(
					"/v4po_usrlogout_a003.do"
					, []
					, function(data){
						if(data.resultMap.result == 'error'){
							msgFnc.alert({text : data.resultMap.msg});
						}else{
							//20250308 anyid 추가 window.location.pathname
							anyidAdaptor.ssoLogout(window.location.pathname+window.location.search);
//							anyidAdaptor.ssoLogout("/v4po_main.do");
								msgFnc.alert({text : data.resultMap.msg
									, callBackConfirmFnc : function(){
										cmFunction.submit("/v4po_main.do");
									}
								});
						}
					}
					, null
			);
			
		}
		, loginExt : function(){
			cmFunction.ajaxSubmit(
				"/im_usrlogincheck_a001.do"
				, []
				, function(data){
					if(data.resultMap.result == 'error'){
						msgFnc.alert({text : data.resultMap.msg
							, callBackConfirmFnc : function(){
								location.reload();
							  }
						});
					}else{
						loginFnc.startSessionTimer();
						//성공시 startsessionTimeer
					}
				}
				, null
			);
			
		}
		, mnSetTimeId : null
		, startSessionTimer : function(pnSetTime, pnSetAlramTime){
			
			if(pnSetTime == undefined || pnSetTime == null || pnSetTime == ""){
				//pnSetTime = 100;
				pnSetTime = 1800;//진흥원요청(30분으로 변경)
			}
		
			if(pnSetAlramTime == undefined || pnSetAlramTime == null || pnSetAlramTime == ""){
				//pnSetAlramTime = 90;
				pnSetAlramTime = 60;
			}
		
			var format = 'mm:ss';
			var msgFormat = 'mm분';
		
			if((pnSetAlramTime % 60) != 0){
				msgFormat += " ss초";
			}
		
			if(pnSetTime > 3600){
				format = 'HH:mm:ss';
				msgFormat = "HH시 " + msgFormat;
			}
		
			$(".sessionTimmer").html(moment.utc((pnSetTime-1)*1000).format(format));
		
			// 타이머 중복 실행 방지를 위한 기존 시작된 타이머를 리셋
			clearInterval(loginFnc.mnSetTimeId);
			var countDownDate = moment().add(pnSetTime, 'seconds');
		
			loginFnc.mnSetTimeId = setInterval(function() {
		
				var diff = countDownDate.diff(moment());
				if (diff <= 0) {
		
					//타이머가 끝날 경우 TODO 처리
					clearInterval(loginFnc.mnSetTimeId);
		
					//로그아웃 기능
					loginFnc.logout('Y');
				} else if (diff < ((pnSetAlramTime*1000)+1000)) {
		
					if ((pnSetAlramTime*1000) < diff) {
						// 연장기능 알림 
						loginFnc.extnPopup.open();
					}
					$("#sessionTimmer, #sessionTimmer2").html(moment.utc(diff).format(format));
				} else {
					$("#sessionTimmer, #sessionTimmer2").html(moment.utc(diff).format(format));
				}
		
			}, 1000);
		}
		, extnPopup	 : {
			open : function(){
				var text = '<article class="popup" id="popupExtn">'+
					'<div class="conWrap">'+
						'<div class="conBody">'+
							'<h6 class="title">자동 로그아웃 안내</h6>'+
							'<br>'+
							'<div class="infotxt">장시간 활동이 없어 자동으로 로그아웃 됩니다.</div>'+
							'<div class="count timer"><span>로그아웃까지 남은 시간<b id="sessionTimmer2">01:00</b></span>계속 이용하시려면 로그인 시간을 연장해주세요.</div>'+
						'</div>'+
						'<div class="conFoot">'+
							//20250308 anyid 추가
							'<button type="button" class="bt bd" onclick="loginFnc.logoutBtn();">로그아웃하기</button>'+
//							'<button type="button" class="bt bd" onclick="anyidAdaptor.ssoLogout(window.location.pathname);">로그아웃하기</button>'+
							// 공장인허가 소스 수정 끝
							'<button type="button" class="bt bd primary" onclick="loginFnc.loginExt();loginFnc.extnPopup.close();">로그인시간 연장하기</button>'+
						'</div>'+
					'</div>'+
				'</article>';
				$("body").append(text);
			}
			, close : function(){
				$("#popupExtn").remove();
			}
		}
};