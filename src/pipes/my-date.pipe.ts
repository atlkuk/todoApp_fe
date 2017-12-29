import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myDate'
})
export class MyDatePipe implements PipeTransform {

    transform(value: string, type: string = ''): any {

        const my_date: Date = new Date(value);

        const hh = my_date.getHours() < 10 ? '0' + my_date.getHours() : my_date.getHours();
        const mm = my_date.getMinutes() < 10 ? '0' + my_date.getMinutes() : my_date.getMinutes();
        const dd = my_date.getDate() < 10 ? '0' + my_date.getDate() : my_date.getDate();
        const M = my_date.getMonth() + 1 < 10 ? '0' + my_date.getMonth() + 1 : my_date.getMonth() + 1;
        const yyyy = my_date.getFullYear();
        const timestamp = my_date.getTime();
        if (type === 'HH:mm') {
            return hh + ':' + mm;
        } else if (type === 'shortHour') {
            return value.split('T')[1].substring(0, 5);
        } else if (type === 'dd/M/yyyy - HH:mm') {
            return dd + '/' + M + '/' + yyyy + ' - ' + hh + ':' + mm;
        } else if (type === 'timestamp') {
            return timestamp;
        }

        return '';

    }

}
