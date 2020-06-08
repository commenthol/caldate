import { CalDate } from 'caldate';

const cd = new CalDate(); // $ExpectType CalDate

cd.set({month: 2}); // $ExpectType CalDate
cd.toDate(); // $ExpectType Date
cd.toISOString(); // $ExpectType string
