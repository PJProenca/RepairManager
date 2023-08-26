public with sharing class TechsController_Main {
    @AuraEnabled(cacheable=true)
    public static List<Technician__c> getTechsMain(String recordId){
        try {
            return TechsController_Service.getTechsService(recordId);        
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Technician__c> searchTechsMain(){
        try {
            return TechsController_Service.searchTechsService();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<TechRep__c> getTechRepsMain(String recordId){
        try {
            return TechsController_Service.getTechRepsService(recordId);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}