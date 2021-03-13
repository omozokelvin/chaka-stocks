import isValidDate from './isValidDate';
import isValidNumber from './isValidNumber';

export default function dataSanitizer(dataObject: any) {
  //clean up data to match with types
  for(let [key, value] of Object.entries(dataObject)) {

    if(isValidNumber(value as string)) {
      dataObject[key] = Number.parseFloat(value as string);
      continue;
    }

    if(isValidDate(value as string)) {
      dataObject[key] = new Date(value as string);
      continue;
    }

  }

  return dataObject;
}
