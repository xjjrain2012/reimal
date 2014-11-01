
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
     //编辑器
     if($('#container').length > 0) {
          var ue = UE.getEditor('container', {
            toolbars: [
                 [
                    'anchor', //锚点
                    'undo', //撤销
                    'redo', //重做
                    'bold', //加粗
                    'indent', //首行缩进
                    // 'snapscreen', //截图
                    'italic', //斜体
                    'underline', //下划线
                    'strikethrough', //删除线
                    'subscript', //下标
                    'fontborder', //字符边框
                    'superscript', //上标
                    'formatmatch', //格式刷
                    'source', //源代码
                    'blockquote', //引用
                    'pasteplain', //纯文本粘贴模式
                    'selectall', //全选
                    // 'print', //打印
                    // 'preview', //预览
                    'horizontal', //分隔线
                    'removeformat', //清除格式
                    'time', //时间
                    'date', //日期
                    'unlink', //取消链接
                    'insertrow', //前插入行
                    'insertcol', //前插入列
                    'mergeright', //右合并单元格
                    'mergedown', //下合并单元格
                    'deleterow', //删除行
                    'deletecol', //删除列
                    'splittorows', //拆分成行
                    'splittocols', //拆分成列
                    'splittocells', //完全拆分单元格
                    'deletecaption', //删除表格标题
                    'inserttitle', //插入标题
                    'mergecells', //合并多个单元格
                    'deletetable', //删除表格
                    'cleardoc', //清空文档
                    'insertparagraphbeforetable', //"表格前插入行"
                    // 'insertcode', //代码语言
                    'fontfamily', //字体
                    'fontsize', //字号
                    'paragraph', //段落格式
                    'simpleupload', //单图上传
                    'insertimage', //多图上传
                    'edittable', //表格属性
                    'edittd', //单元格属性
                    'link', //超链接
                    // 'emotion', //表情
                    'spechars', //特殊字符
                    // 'searchreplace', //查询替换
                    // 'map', //Baidu地图
                    // 'gmap', //Google地图
                    // 'insertvideo', //视频
                    // 'help', //帮助
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    'forecolor', //字体颜色
                    'backcolor', //背景色
                    'insertorderedlist', //有序列表
                    'insertunorderedlist', //无序列表
                    'fullscreen', //全屏
                    'directionalityltr', //从左向右输入
                    'directionalityrtl', //从右向左输入
                    'rowspacingtop', //段前距
                    'rowspacingbottom', //段后距
                    // 'pagebreak', //分页
                    // 'insertframe', //插入Iframe
                    'imagenone', //默认
                    'imageleft', //左浮动
                    'imageright', //右浮动
                    'attachment', //附件
                    'imagecenter', //居中
                    'wordimage', //图片转存
                    'lineheight', //行间距
                    'edittip ', //编辑提示
                    'customstyle', //自定义标题
                    'autotypeset', //自动排版
                    // 'webapp', //百度应用
                    'touppercase', //字母大写
                    'tolowercase', //字母小写
                    'background', //背景
                    'template', //模板
                    // 'scrawl', //涂鸦
                    // 'music', //音乐
                    'inserttable', //插入表格
                    // 'drafts', // 从草稿箱加载
                    // 'charts', // 图表
                ]
            ],
            autoHeightEnabled: false,
            autoFloatEnabled: true
          });
     }

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


