const selectorAT4DXMethodInjectionClass: string = `/**
* AT4DX Selector Method Injection class 
* 
* @Usage
*       {{=it.smn.getSelectorMethodInjectionClassName()}}.Parameters queryParams = new {{=it.smn.getSelectorMethodInjectionClassName()}}.Parameters();
*       // queryParams.fooBarStringSet = new Set<String>{ 'FooBar' };
*       List<{{=it.smn.getApiName()}}> records = {{=it.smn.getSelectorImplementationClassName()}}.newInstance().selectInjection( {{=it.smn.getSelectorMethodInjectionClassName()}}.class, queryParams );
*/
public inherited sharing class {{=it.smn.getSelectorMethodInjectionClassName()}}
   extends AbstractSelectorMethodInjectable
   implements ISelectorMethodInjectable
{
   public List<SObject> selectQuery()
   {
      {{=it.smn.getSelectorMethodInjectionClassName()}}.Parameters params = ({{=it.smn.getSelectorMethodInjectionClassName()}}.Parameters)getParams(); 

      //  Set<String> theFooBarStringSetParameter = params.fooBarStringSet;

      fflib_QueryFactory qf = newQueryFactory();

      // Implementation Note: Add query's condition clause here
      // example: qf.setCondition( Account.Name + ' in :theFooBarStringSetParameter' );
      qf.setCondition('');

       return Database.query( qf.toSOQL() );
   }

   public class Parameters
       implements ISelectorMethodParameterable
   {
      // add parameters here
      // public Set<String> fooBarStringSet;
   }
}
`;

export default selectorAT4DXMethodInjectionClass;
