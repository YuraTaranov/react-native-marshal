import moment from 'moment';

export const parseDate = (date: Date) => {
  return moment(date).format('DD.MM.YYYY hh:mm');
};
