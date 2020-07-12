import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFormat' })
export class MomentPipe implements PipeTransform {
    transform(value: Date | moment.Moment, dateFormat: string): any {
        let newDate = moment(value).startOf('date');
        console.log(newDate);
        return moment(value).format(dateFormat);
    }
}