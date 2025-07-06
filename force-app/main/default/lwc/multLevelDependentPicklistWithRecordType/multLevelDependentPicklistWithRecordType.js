import { LightningElement, wire, api, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class MultLevelDependentPicklistWithRecordType extends LightningElement {

    @api controllingField;
    @api dependentField;
    @api dependentField2;
    @api dependentField3;
    @api userDefaultRecordTypeId;
    @api objectApiName='Account';
    @api disableRecordTypeSelection;
    @api hideRecordTypeInput;
    @api controllingFieldValue;
    @api dependentFieldValue;
    @api dependentFieldValue2;
    @api dependentFieldValue3;
    @api recordTypeId;

    objectInfo;
    showPicklists = true;

    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    handleObjectInfoWire({error, data}) {

        if(error) {
            this.handleError(error);
            return;
        }

        if(!data) {
            return;
        }

        this.objectInfo = data;
        this.initRecordTypeId();
    }

    initRecordTypeId() {

        if(!this.objectInfo) {
            return;
        }

        this.recordTypeId = this.userDefaultRecordTypeId 
            ? Object.keys(this.objectInfo.recordTypeInfos).find(rtId => rtId === this.userDefaultRecordTypeId )
            : this.defaultRecordTypeId;
    }

    handleRTChange(event) {
        this.showPicklists = false;
        this.recordTypeId = event.detail.value;
        setTimeout(() => {this.showPicklists = true});
    }
    
    handleControllingPicklistChange(event) {
        this.controllingFieldValue = event.detail.value;
    }

    handleDependentPicklistChange(event) {
        this.dependentFieldValue = event.detail.value;
        this.dependentFieldValue2 = null;
        this.dependentFieldValue3 = null;
    }

    handleDependentPicklistChange2(event) {
        this.dependentFieldValue2 = event.detail.value;
    }

    handleDependentPicklistChange3(event) {
        this.dependentFieldValue3 = event.detail.value;
    }

    handleError(err) {
        console.error(err);
    }

    get recordTypesList() {
        if(!this.objectInfo) {
            return;
        }

        const rtInfoList = this.objectInfo.recordTypeInfos;
        let rtList = [];
        Object.keys(this.objectInfo.recordTypeInfos).forEach(rt => {
            let rtInfo = rtInfoList[rt];
            rtInfo.master || !rtInfo.available || rtList.push(this.getRecordTypeOption(rtInfo));
        });
        return rtList;
    }

    getRecordTypeOption(rtInfo) {
        return { 
            label : rtInfo.name, 
            value: rtInfo.recordTypeId 
        };
    }

    get defaultRecordTypeId() {
        return this.objectInfo?.defaultRecordTypeId;
    }

    get showRecordTypeInput() {
        return this.recordTypeId && !this.hideRecordTypeInput;
    }

}