public with sharing class TechsController_Service {
    public static List<Technician__c> getTechsService(String recordId){
        return TechsController_Selector.getTechs(recordId);
    }

    public static List<Technician__c> searchTechsService(){
        return TechsController_Selector.searchTechs();
    }

    public static List<Techrep__c> getTechRepsService (String recordId) {
        return TechsController_Selector.getTechReps(recordId);
    }
}