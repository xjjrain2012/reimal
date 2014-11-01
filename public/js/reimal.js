
//搜索时按回车
function EnterPress(e){ //传入 event
    var e = e || window.event;
    
    var url = $(e.target).parent().data('url');
    if(e.keyCode == 13){
      var keyword=$("#search").val();
      if(keyword==""){
          alert("检索条件不能为空");
      }else{
          window.location.href = url + "?keyword=" + keyword;
      }
    }
}

$(function() {
	$('body').on('click', '.upload_area > button', function(e) {
    e.preventDefault();
		var $this = $(this),
			$ipt = $this.prev('input[type="file"]');

		$ipt.trigger('click');
    return false;
	});
	$('body').on('change', '.upload_area input[type="file"]', function(e) {
		var files = e.target.files,
			$this = $(this),
			btn = $this.next('button'),
			small = $this.parents('.upload_box').next('.upload_preview'),
			big = btn.hasClass('large_cover') ? $('.appmsg_thumb_wrp > img.large_cover') : null,
			hasChanged = btn.next();
			

		if(!files[0]) {
			return false;
		}
		if(window.FileReader){
			var reader = new window.FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = function() {
				small.find('img').attr('src', this.result);
				small.show();
				if(big && big.length > 0) {
					big.attr('src', this.result).show();
					big.next().hide();

				}
				if(hasChanged.length > 0 && hasChanged.attr('type') == 'hidden') {
					hasChanged.val(2);
				}	
				
						
			}
		}else{
			this.tipMsg('请使用Chrome或firefox浏览器');
		}
	});

	$('body').on('click', '.js_removeCover', function() {
		var $this = $(this),
			$upload_preview = $this.parents('.upload_preview'),
			$small = $(this).prev(),
			$btn = $upload_preview.prev('.upload_box').find('button'),
			$big = $btn.hasClass('large_cover') ? $('.appmsg_thumb_wrp > img.large_cover') : null;

		$small.attr('src', '');
		$btn.prev('input[type="file"]').val('');
		
		if($btn.next().length > 0 && $btn.next().attr('type') == 'hidden') {
			$btn.next().val(1);
		}
		$upload_preview.hide();
		if($big && $big.length > 0) {
			$big.attr('src', '').hide();
			$big.next().show();
		}
	});
     //全选
     $(".check-all").click(function(){
         $(".ids").prop("checked", this.checked);
     });
     $(".ids").click(function(){
         var option = $(".ids");
         option.each(function(i){
             if(!this.checked){
                 $(".check-all").prop("checked", false);
                 return false;
             }else{
                 $(".check-all").prop("checked", true);
             }
         });
     });
     
     //列表搜索
     $("#b1").click(function(){
        var $keyword=$("#search").val();
        var url = $(this).parent().data('url');
        if($keyword==""){
            alert("检索条件不能为空");
        }else{
            window.location.href = url + "?keyword=" + $keyword;
        }
    });

    //日历控件
    if($('.rem_time').length > 0) {
        $('.rem_time').datetimepicker({
            format: 'yyyy-mm-dd hh:ii',
            language:"zh-CN",
            minView:0,
            autoclose:true
        });
    }
    
	
});


