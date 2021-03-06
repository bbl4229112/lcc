function createCodeClassManage(){
	 var topBar = Edo.create({
			type:'group',
			width:'100%',
			layout:'horizontal',
			cls:'e-toolbar',
			children:[
				{type:'button',id:'CodeClassManagAddBtn',text:'新增编码大类'},
				{type: 'split'},
				{type:'button',id:'CodeClassManageDeleBtn',text:'删除编码大类',enable:false}
			]
	 });
	 
	 var tree = Edo.create({	 	
			type:'tree',id:"ClassTree",width:'100%',height:'100%',
			autoColumns:true,
			horizontalLine:false,
			//data:[{text:'<span style="color:red;">缸体</span>分类结构'}],
			columns:[
				{header:'分类结构',dataIndex:'classname'}
			],
			onselectionchange:function(e){
				CodeClassManageDeleBtn.set('enable',true);	
			}
	 });
	 CodeClassManagAddBtn.on("click",function(e){
		 showAddClassForm();
		 addClassCombo.set('data',
				 cims201.utils.getData('codeclass/code-class!findUnConstructedCodeClass.action')
		 );
	 });
	 CodeClassManageDeleBtn.on("click",function(e){
		 var classcode =ClassTree.selected.classcode;
		 if(!classcode){
			 Edo.MessageBox.alert("提示","请选中要删除的分类结构！");
		 }else{
			 Edo.MessageBox.confirm("提示",'是否删除<span style="color:red;">'+ClassTree.selected.classname+'</span>的分类结构？', function(text){
				 if(text=="yes"){
					 Edo.util.Ajax.request({
						    url: 'codeclass/code-class!deleteConstructedCodeClass.action?classcode='+classcode,
						    type: 'post',
						    onSuccess: function(text){
						    	 Edo.MessageBox.alert("提示", text);
						    	 var classTreeData =cims201.utils.getData('codeclass/code-class!findConstructedCodeClass.action');
						    		for(var i=0;i<classTreeData.length;i++){
						    			classTreeData[i].icon ='e-tree-folder';
						    		}
						    	 ClassTree.set("data",classTreeData);
						    },
						    onFail: function(code){
						        Edo.MessageBox.alert("提示", "删除失败"+code);
						    }
					});
				 }
			 });
		 }
		   
	 });
	 function showAddClassForm(){			
	    if(!Edo.get('addClassForm')) {
	        Edo.create({
	            id: 'addClassForm',            
	            type: 'window',title: '选择新建编码大类',
	            render: document.body,
	            width:260,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.hide();
	                    }
	                }
	            ],
	            children: [
	                {
	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'80',label: '选择大类：',
	                    children:[
	                    	{	type:'combo', id:'addClassCombo',
								width:'130',
								name:'classcode',
								valueField: 'classcode',
							    displayField: 'classname',	
							    readOnly : true,
							    valid :nullRegex
						    }
	                    		
	                   ]
	                },
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {name: 'submitBtn', type: 'button', text: '确定', 
	                            onclick: function(){
	                                if(addClassForm.valid()){
	                                    var o = addClassForm.getForm();
	                                    Edo.util.Ajax.request({
										    url: 'codeclass/code-class!addConstructedCodeClass.action?classcode='+o.classcode,
										    type: 'post',
										    onSuccess: function(text){
										    	 Edo.MessageBox.alert("提示", text);
										    	 CodeClassManageDeleBtn.set('enable',false);
										    	 var classTreeData =cims201.utils.getData('codeclass/code-class!findConstructedCodeClass.action');
										    		for(var i=0;i<classTreeData.length;i++){
										    			classTreeData[i].icon ='e-tree-folder';
										    		}
										    	 ClassTree.set("data",classTreeData);
										    },
										    onFail: function(code){
										        Edo.MessageBox.alert("提示", "新增失败"+code);
										    }
										});
	                                    addClassForm.hide();
	                                }
	                            }
	                        },
	                        {type: 'space', width:50},
	                        {name: 'cancleBtn', type:'button', text:'取消',
	                    		onclick:function(){
	                    			addClassForm.reset();
	                    			addClassForm.hide();
	                    		}
	                    	}
	                    ]
	                }
	            ]
	        });
	    };
	    addClassForm.show('center', 'middle', true);
	    return addClassForm;
	};
	function nullRegex(){
	    if (addClassCombo.text=="")
	        return "请选择编码大类!";
	    else return true;
	};
	
	var classTreeData =cims201.utils.getData('codeclass/code-class!findConstructedCodeClass.action');
	for(var i=0;i<classTreeData.length;i++){
		classTreeData[i].icon ='e-tree-folder';
	}
	 ClassTree.set("data",classTreeData);
	 
	 this.getTopBar = function(){
	 	return topBar;
	 };
	 
	 this.getTree = function(){
	 	return tree;
	 };
}