import { LightningElement,track,wire} from 'lwc';
import getobjectlist from '@salesforce/apex/GetObject.getobjectlist';
import getfields from '@salesforce/apex/GetObject.getfields';
import getchild from '@salesforce/apex/GetObject.getchild';
export default class Rollupeasy extends LightningElement {
    @track objects=[];
    @track  fields=[];
    //@track tablesdata=[];
    @track fieldsData=[];
    @track childs=[];
    selectedobject='';
    selectedfield='';
    selectedchildobject=''
    
   // @track  tablesdata =[];
    
    showbutton = true;
    showobject =false;
    showobjfields=false;
    showchild=false;
    columns = [
        {label: 'Action',type: 'button',initialWidth:135,typeAttributes:{label:'Select', name:'select',title:'click to select object',variant:"base"} },
        {label: 'Objects Name', fieldName: 'name', type: 'text'},
        {label: 'Objects Label', fieldName: 'label', type: 'text'},
      
   ];
    columnss = [
    {label: 'Action',type: 'button',initialWidth:135,typeAttributes:{label:'Select', name:'select',title:'click to select object',variant:"base"} },
    {label: 'field Name', fieldName: 'name1', type: 'text'},
    {label: 'Api Name', fieldName: 'label1', type: 'text'},
    {label: 'Data type', fieldName: 'datatype1', type: 'text'},

    ];
    columnsss = [ 
        {label: 'Action',type: 'button',initialWidth:135,typeAttributes:{label:'Select', name:'select',title:'click to select object',variant:"base"} },
        {label: 'child Object Name', fieldName: 'childObjectName', type: 'text'},
        {label: 'childFieldApi', fieldName: 'childFieldToken', type: 'text'},
        {label: 'RelationshipName', fieldName: 'RelationshipName', type: 'text'},
     ];

    @wire(getobjectlist)
    wiredResult(result)
    {
        
        if (result.data)
            {  
                var tabledata=[];
               var conts = result.data;
                for(var key in conts)
                {
                  tabledata.push({ name:key, label:conts[key]});
                   
                }
                console.log('table data ',tabledata );
                this.objects.push(...tabledata); 
                console.log('objects data ',this.objects);

            }
    }

   
   Hidebutton(){
    this.showbutton = false;
    this.showobject = true ;
    }
    handlerowaction(event)
    {
        
         var con;
         var ch;
        var labl1 =event.detail.row;
        console.log('lablel ',JSON.parse(JSON.stringify(labl1)).label);
        this.selectedobject = JSON.parse(JSON.stringify(labl1)).label;
        getfields({SelectedObj:this.selectedobject})
        .then(result => {
            con = result;
            var tablesdata=[];
            for(var k in con)
            {
             //console.log('key ',JSON.parse(JSON.stringify(k)));
             //console.log('label ',JSON.parse(JSON.stringify(con[k].label )));
            //console.log('datatype ',JSON.parse(JSON.stringify(con[k].datatype  )));
           
            tablesdata.push({ name1:JSON.parse(JSON.stringify(con[k].label )), label1:JSON.parse(JSON.stringify(k)), datatype1:JSON.parse(JSON.stringify(con[k].datatype )) });
            console.log('test');
            }
            console.log('tablesdata ',tablesdata);
            this.fields.push(...tablesdata); 
           console.log('fields data ',this.fields);
           this.showobject = false;
           this.showobjfields = true ;
           
        })
        .catch(error => {
            this.error = error;
        });
    getchild({parentObjectName:this.selectedobject})
    .then(result => {
             ch = result;
            console.log('in get child');
            var childdata =[];
            for(var k in ch)
            {
             console.log('key child ',k);
            // console.log('label ',con[k].label  );
            // console.log('datatype ',con[k].datatype );
             childdata.push({ childObjectName:ch[k].childObjectName, childFieldToken:ch[k].childFieldToken, RelationshipName:k });
           //  this.opt5.push({ label:ch[k].childObjectName, value:ch[k].childObjectName  });
            }
            console.log('jdjhbcjkbhckj');
            this.childs.push(...childdata);
           console.log('childs data',this.childs);
        })
        .catch(error => {
            this.error = error;
        });
           
       
    }
    handlerowaction1(event){
        var labl1 =event.detail.row;
        console.log('fieldselected ',JSON.parse(JSON.stringify(labl1)).label1);
        this.selectedfield = JSON.parse(JSON.stringify(labl1)).label1;
        this.showobjfields=false;
        this.showchild =true ;
        
    }
    handlerowaction2(event)
    {
        const row=event.detail.row;
        this.selectedchildobject=row.childObjectName;
        console.log('selected child object ',JSON.parse(JSON.stringify(row)).childObjectName);
    }    

}
    
   
    
