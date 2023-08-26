import { LightningElement, wire, api} from 'lwc';
import searchTechs from '@salesforce/apex/TechsController_Main.searchTechsMain'
import getTechRep from '@salesforce/apex/TechsController_Main.getTechRepsMain'
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
export default class AddTechs extends LightningElement {

col =[  
    {label:'Name',fieldName:'Name'},
    {label:'Function',fieldName:'Function__c'},
    {label:'Utilization',fieldName:'Utilization__c'}
];
searchedTechs = [];
techRepList =[];
picklistValues
techSelection = '';
error;
@api recordId;

techList=[];
connectedCallback(){
    this.loadSearchtechs();
    this.loadTechReps();
}

@wire(getObjectInfo,{objectApiName: 'Technician__c'})
objectInfo;

@wire(getPicklistValues, {recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName:'Technician__c.Function__c'})
loadPicklist({data, error}){
    if(data)
    {
        this.picklistValues =[{label: 'All', value:'All'}, 
                            ... data.values.map((val) => ({
                            label: val.label,
                            value: val.value
                            }))];
    }else if(error){
        console.error("Error Retrieving values: ", error);
    }
}
loadSearchtechs(){
    searchTechs()
    .then((result) => {
       // console.log('searchTechs data:', result);
        this.searchedTechs = result;  
        this.searchedTechs.map((data) => {
            this.techList.push(data.Id);
        });    
    })
    .catch((error) =>{
        this.error = error;
    });
}

loadTechReps(){
    getTechRep({recordId: '$recordId'})
    .then((result) =>{
        this.techRepList = result;
    })
    .catch((error) => {
        this.error = error;
    })
}

existsinRepairOrder(techRep,technician){
    return techRep.some((item) => item.Technician__c === technician);
}



get techsFilter(){
    if(this.techSelection ==='All'){
        
        console.log("Aqui-->", teste );
        return this.searchedTechs.filter((technician) => !this.existsinRepairOrder(this.techRepList,technician.Id));
        // return this.searchedTechs;
        
    }else{
       
        return this.searchedTechs.filter((tech) => tech.Function__c.includes(this.techSelection));
     }
}

handleTechs(event){
    this.techSelection = event.target.value;
}



}