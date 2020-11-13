import { LightningElement,track } from 'lwc';
import getAccountList from '@salesforce/apex/searchlwc.getAccountList';
export default class Searchbarlwc extends LightningElement {
    searchValue='';
     AccountRecord=[];
     @track records=[];
     pilldata=[];
     showavtar=false;
     showtable=false;
     showsearch =true;
     columns = [
        {label: 'Name', fieldName: 'name', type: 'text'},
        {label: 'Account Id', fieldName: 'id', type: 'text'}, 
        {label: 'Phone', fieldName: 'phone', type: 'text'},
      
   ];
    searchKeyword(event) {
        this.pilldata=[];
        this.searchValue = event.target.value;
        var con;
        console.log(this.searchValue);
        this.showavtar =false;
        if (this.searchValue != '') {
            getAccountList({
                    searchKey: this.searchValue
                })
                .then(result => {
                    
                    con = result;
                    this.AccountRecord=[];
                    
                    console.log('con',con);
                     for(var k in con)
                        {

                            
                        console.log('k.name',con[k].Name);
                        this.pilldata.push({type: 'avatar',label: con[k].Name,
                        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg', 
                        fallbackIconName: 'standard:user',
                         variant: 'circle',
                         alternativeText: 'User avatar',});
                        
                            
                         }
                         this.showavtar=true;
                         this.AccountRecord = con;
                         console.log('pilldata', this.pilldata);
                })
                
            
            
        }
        //console.log('pilldata ',this.pilldata);
        console.log('account record   ',this.AccountRecord);
    }

    handleClick(event) {
        this.clickedButtonLabel = event.target.label;
        var accountrecor;
        var tabledata=[];
        accountrecor = this.AccountRecord 
        for(var val in accountrecor){
            console.log(accountrecor[val].Name);
            console.log(accountrecor[val].Id);
            console.log(accountrecor[val].Phone);
          tabledata.push({name: accountrecor[val].Name,id:accountrecor[val].Id,phone:accountrecor[val].Phone});

        }
        this.records.push(...tabledata);
        this.showavtar =false;
        this.showsearch=false;
        this.showtable =true;
    }
    



}