import { LightningElement,track } from 'lwc';
import getAccountList from '@salesforce/apex/searchlwc.getAccountList';
export default class Searchbarlwc extends LightningElement {
    searchValue='';
     AccountRecord;
     pilldata=[];
     showavtar=false;
     showtable=false;
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
                    this.AccountRecord= con;
                    console.log('con',con);
                     for(var k in con)
                        {

                            
                        console.log('k.name',con[k].Name);
                        this.pilldata.push({type: 'avatar',label: con[k].Name,
                        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg', 
                        fallbackIconName: 'standard:user',
                         variant: 'circle',
                         alternativeText: 'User avatar',});
                        
                            
                         }
                         this.showavtar=true;
                         console.log('pilldata', this.pilldata);
                })
                
            // fire toast event if input field is blank
            
        }
        console.log('pilldata ',this.pilldata);
        console.log('account record',this.AccountRecord);
    }
    



}