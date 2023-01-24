import moment from 'moment';

export const formatDate = ( fecha:string ) => {
    const date = moment( fecha );
    return date.format('HH:mm a | MMMM Do');
}