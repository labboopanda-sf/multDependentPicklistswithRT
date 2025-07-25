# multDependentPicklistswithRT

The project provides a modified Flow Screen Component LWC based on the Flow Screen Component: Dependent Picklists with RecordType and MultiSelect Picklist Support by Narender Singh found on [Unofficial SF](https://unofficialsf.com/flow-screen-component-dependent-picklists-with-recordtype-and-multiselect-picklist-support-by-narender-singh/) or directly in hist [forcePanda blog](https://forcepanda.wordpress.com/2019/06/11/flow-screen-component-dependent-picklists-with-recordtype-and-multiselect-picklist-support/).

The use case for this was a situation where the values in the Controlling Picklist and Dependent Picklist differed by Record Type.  Additionally, the Dependent Picklist controlled 2 additional Dependent Picklists where 1 is required via page layout and the 2nd is not.

I modified Narender's LWC to include the 2 additional picklists and 2 make the Controlling Picklist and the 1st 2 Dependent Picklists required in the LWC.  If they could be required at Field Level that would have been better but because these were being added to an already existing org with data that would not be updated immediately it was elected to only require at the page and Flow level.  When the 1st Dependent Field is changed, the event handler also clears the values for the 2nd and 3rd (unless a selection that is still valid was made).

I have provided an example Object (LyndaTest__c) as well as an Example Flow (Dependent_Picklist_LWC_Example).  The flow is inactive and contains 3 example screens.  The first example uses the object and the picklist fields.  The second example limits to a specific Record Type and hides the Record Type selection.  The third example includes a MultiSelect Picklist field as the 3rd and final dependent field.

## What do I need to deploy if I want to use this?

You only need the LWC for your org.

## What modifications should I consider?

If you do not need the fields to be required within the LWC (because they are optional or because they are already required at the Field Level), remove the required parameters in the lightning-input-field lines in the HTML file of the LWC.

If you need fewer or more dependent fields, you can add/remove lightning-input-field lines in the HTML file, add/remove @api tagged Dependent Fields and Values variables and handleDependentPicklistChange#(event) functions in the JS file, and add config properties for both the field names and values in the js-meta file.

## Questions

If you have questions or need help on any of this, please reach out to me via email (labboo.gc@gmail.com).  I'd be happy to assist you.
