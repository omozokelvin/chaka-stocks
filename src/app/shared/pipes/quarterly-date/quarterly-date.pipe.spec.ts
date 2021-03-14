import { QuarterlyDatePipe } from './quarterly-date.pipe';

describe('QuarterlyDatePipe', () => {
  it('create an instance', () => {
    const pipe = new QuarterlyDatePipe();
    expect(pipe).toBeTruthy();
  });
});
