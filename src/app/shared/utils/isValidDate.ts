import * as moment from 'node_modules/moment';

export default function isValidDate(str: string) {
  return moment(str, moment.ISO_8601, true)
    .isValid();
}