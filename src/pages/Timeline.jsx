import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TimelineViews, TimelineMonth, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject } from '@syncfusion/ej2-react-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ChipListComponent, ChipsDirective, ChipDirective } from '@syncfusion/ej2-react-buttons';
import { extend, createElement } from '@syncfusion/ej2-base';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import './Timeline.css'
import {getCars, resourceData} from '../data/resourceData'

class Timeline extends React.Component {
    constructor() {
        super(...arguments);
        
        //this.resourceData = resourceData
        
        this.resourceData = resourceData;
        console.log(resourceData);
    }

   
    

    getCarName(value) {
        return ((value.resourceData) ?
            value.resourceData[value.resource.textField] :
            value.resourceName);
    }
    getCarLevel(value) {
        let resourceName = this.getCarName(value);
        return (resourceName === 'Car 1') ? 'ZG Benzin Plava' : (resourceName === 'Car 2') ? 'ZG Diesel Crvena' : 'ZG Struja Zelena';
    }
    resourceHeaderTemplate(props) {
        return (<div className="template-wrap">
        <div className="resource-detail"><div className="resource-name">{this.getCarName(props)}</div>
        <div className="resource-desc">{this.getCarLevel(props)}</div></div></div>);
    }

    onPopupOpen(args) {
        if (args.type === 'Editor') {
            if (!args.element.querySelector('.custom-field-row')) {
                let row = createElement('div', { className: 'custom-field-row' });
                let formElement = args.element.querySelector('.e-schedule-form');
                formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
                let container = createElement('div', { className: 'custom-field-container' });
                let inputEle = createElement('input', {
                    className: 'e-field', attrs: { name: 'Status' }
                });
                container.appendChild(inputEle);
                row.appendChild(container);
                let drowDownList = new DropDownList({
                    dataSource: [
                        { text: 'Booking', value: 'Booking' },
                        { text: 'Reserved', value: 'Reserved' },
                        { text: 'Rental', value: 'Rental' },
                        { text: 'Open', value: 'Open' },
                        { text: 'Service', value: 'Service' }
                    ],
                    fields: { text: 'text', value: 'value' },
                    value: args.data.Status,
                    floatLabelType: 'Always', placeholder: 'Status'
                });
                drowDownList.appendTo(inputEle);
                inputEle.setAttribute('name', 'Status');
            }
        }
    }

    onEventRendered(args) {
        switch (args.data.Status) {
            case 'Booking':
                args.element.style.backgroundColor = '#0f3cdb';
                break;
            case 'Reserved':
                args.element.style.backgroundColor = '#5c13c2';
                break;
            case 'Rental':
                args.element.style.backgroundColor = '#e07924';
                break;
            case 'Open':
                args.element.style.backgroundColor = '#a8a42a';
                break;
            case 'In Service':
                args.element.style.backgroundColor = '#eb4034';
                break;
        }
    }
    
    
    
    render() {
        return <div>
            <ChipListComponent id="chip-avatar">
            <ChipsDirective>
                <ChipDirective text="Booking" cssClass="e-booking"></ChipDirective>
                <ChipDirective text="Reserved" cssClass="e-reserved"></ChipDirective>
                <ChipDirective text="Rental" cssClass="e-rental"></ChipDirective>
                <ChipDirective text="Open" cssClass="e-open"></ChipDirective>
                <ChipDirective text="In Service" cssClass="e-service"></ChipDirective>
            </ChipsDirective>
        </ChipListComponent>
    <ScheduleComponent width='100%' height='100%' currentView='TimelineMonth' selectedDate={new Date()}  ref={schedule => this.scheduleObj = schedule} resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} eventSettings={{ dataSource: this.data, fields: {
                id: 'Id',
                subject: { name: 'Subject', title: 'Driver' },
                location: { name: 'Location', title: 'Pickup location' },
                description: { name: 'Description', title: 'Description' },
                startTime: { name: 'StartTime', title: 'From' },
                endTime: { name: 'EndTime', title: 'To' }
            } }} eventRendered={this.onEventRendered.bind(this)} popupOpen={this.onPopupOpen.bind(this)} group={{ resources: ['Cars'] }} >
        <ViewsDirective>
            <ViewDirective option='TimelineMonth'/>
        </ViewsDirective>
        <ResourcesDirective>
        <ResourceDirective field='CarId' title='Car' name='Cars' dataSource={this.resourceData} textField='text' idField='id' descField='desc' >
            </ResourceDirective>
        </ResourcesDirective>
        <Inject services={[TimelineViews, TimelineMonth]}/>
    </ScheduleComponent>
    </div>;
    }
}

export default Timeline;