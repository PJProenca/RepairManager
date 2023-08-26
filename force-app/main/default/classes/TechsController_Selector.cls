public with sharing class TechsController_Selector {
    public static List<Technician__c> getTechs(String recordId){
        List<Technician__c> technicians = new List<Technician__c>();
        for(TechRep__c tech : [SELECT Technician__r.Name FROM TechRep__c WHERE Repair_Order__r.Id =:recordId]){
            Technician__c technician = new Technician__c(Name=tech.Technician__r.Name);
            technicians.add(technician); 
        }
        
        return technicians;
    } 

    public static List<Technician__c> searchTechs(){
        return [SELECT Name,Function__c,Utilization__c FROM Technician__c WHERE Utilization__c < 100];
    }

    public static List<TechRep__c> getTechReps(String recordId){
        return [SELECT Technician__c FROM TechRep__c WHERE Repair_Order__C= :recordId];
    }

}