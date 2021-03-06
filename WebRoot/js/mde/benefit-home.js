/**
 * 效益评价主界面（入口）
 */
function createBenefitHome() {

	var titlelabel = Edo.create({
		type : 'label',
		text : '模块化设计效益评价',
		style:	'font-size:25px;padding-top:80px;padding-bottom:80px;font-family:微软雅黑, Verdana;font-weight:bold; '
	});
	var corePanel = Edo.create({
		type: 'formitem', 
		layout : 'horizontal',
		horizontalAlign:'center',
		children:[
	       {
	    	   type: 'box', layout:'horizontal',border : [0,0,0,0],
	    	   children : [
				{
					type: 'formitem',label: '选择第一个产品的型号：',labelWidth:'140',
						children:[
					          {
					        	  type: 'autocomplete', 
					        	  id: 'product1code',
					      		  width: 150, 
					    		  queryDelay: 500,
					    		  url: 'product/product!recommentProduct.action',
					    		  popupHeight: '65',
					    		  valueField: 'id', 
					    		  displayField: 'code'
					    	  }
				          ]
				},
				{	
					type: 'space', width: 20
				},
				{
					type: 'formitem',label: '选择第二个产品的型号：',labelWidth:'140',
						children:[
						          {
						        	  type: 'autocomplete', 
						        	  id: 'product2code',
						      		  width: 150, 
						    		  queryDelay: 500,
						    		  url: 'product/product!recommentProduct.action',
						    		  popupHeight: '65',
						    		  valueField: 'id', 
						    		  displayField: 'code'
						    	  }
					          ]
				}
               ]
	    	}
   		]
	});
	
	var buttonbox = Edo.create({
		type : 'box',
		layout : 'horizontal',
		horizontalAlign:'center',
		border : [0,0,0,0],
		padding : [50,0,0,50],
		children : [
//		            {	type: 'space', width: 350},
					{
					
					    type: 'label', height:100, width:150, style: 'padding-left:30px; padding-right:2px;padding-top:5px;', text: '<a href=javascript:benefitanalysis();><div class="cims201_navtree cims201_mdebenefit_icon_indexSelect">下一步</div></a>'
					
					}
		            ]
	});
	var middlePanel = Edo.create({
		title: '<span class="cims201_con_font">模块化设计效益评价</span>',
		titleIcon: 'cims201_search_title',
		type: 'panel',
		id : 'benefithomeform',
		layout: 'vertical',
		horizontalAlign:'center',
		width: '100%',
		height: '100%',
		border : [1,1,1,1],	
		children : [titlelabel,corePanel,buttonbox]
	});

	this.getBenefitHome = function() {
		return middlePanel;
	}
}

function benefitanalysis(){
	var homebox = Edo.get('benefithomeform');
	if (homebox.valid()) {
		var o = homebox.getForm(); // 获取表单值
		var homeformvalue = Edo.util.Json.encode(o);
		var product1Id = Edo.get('product1code').getValue();
		var product2Id = Edo.get('product2code').getValue();
		if(product1Id != product2Id) {
			//alert(benefithomeform); //可以用ajax发送到服务端
			//判断当前两产品是否已经评价过，是则删除数据库中数据
//			cims201.utils.getData('product/mderesult!already.action',{product1Id:product1Id, product2Id:product2Id});				
			openNewTab('indexSelector', 'indexSelect', 
					"<div class=cims201_tab_font align=center>选择指标</div>", {product1Id:product1Id, product2Id:product2Id,btIcon:'cims201_statistics_icon_statisticswhole_small'});
		} else {
			Edo.MessageBox.alert("提示", "请选择两个不同的产品进行评价！");
		}
	}
}