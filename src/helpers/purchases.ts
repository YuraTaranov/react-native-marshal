import moment from 'moment';

import {TPurchase, TSectionListItem} from '@types';

export const parseDate = (date: Date) => {
  return moment(date).format('DD.MM.YYYY hh:mm');
};

export const generateSectionListData = (data: TPurchase[]) => {
  const sortedData = data.sort((a, b) => {
    const dateA = moment(a.date).startOf('day');
    const dateB = moment(b.date).startOf('day');

    if (dateA.isBefore(dateB)) {
      return 1;
    } else if (dateA.isAfter(dateB)) {
      return -1;
    } else {
      return 0;
    }
  });
  const sectionListData: TSectionListItem[] = [];

  sortedData.forEach(item => {
    const dateWithoutTime = moment(item.date).format('YYYY-MM-DD');
    const existingSection = sectionListData.find(
      section => section.title === dateWithoutTime,
    );

    if (existingSection) {
      existingSection.data.push(item);
    } else {
      sectionListData.push({
        title: dateWithoutTime,
        data: [item],
      });
    }
  });

  return sectionListData;
};

export const formatDate = (date_: Date) => {
  const date = moment(date_);
  const formattedDate = date.format('D MMMM, YYYY');
  const formattedTime = date.format('HH:mm');
  return {formattedDate, formattedTime};
};
