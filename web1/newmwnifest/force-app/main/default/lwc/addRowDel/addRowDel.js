import { LightningElement ,track} from 'lwc';

export default class AddRowDel extends LightningElement {
    columns = [
        { label: 'Name', fieldName: 'name' },
        { label: 'Phone', fieldName: 'phone'},
    ];
    @track data = [
        { name: 'Dave', phone: '123' },
        {  name: 'Joseph', phone: '456' }
    ];
    show =true;
    handleClick(){
       this.show =false;
        var inp;
       inp  = this.template.querySelector('lightning-input').value;
       var tabledata =[];
       for(var i=0;i<inp;i++){

        tabledata.push({name: 'new'+i,phone:'23'+i });   
       }
       this.data.push(...tabledata)
       console.log('gata',this.data);
       this.show=true;
    }
    new2(event){
        this.show=false;
    }
    handleClick2(){
        var inp;
        this.show =false;
        inp  = this.template.querySelector('lightning-input').value;  
        var tabledata =[];
        var size = this.data.length;
        if(size<inp){
            alert('size is larger than table size');
        }
        else{
            for(var i =0;i<inp;i++){
                this.data.pop();
            }
            
        }
        this.show=true;
        
    }
}