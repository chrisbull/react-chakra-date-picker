export {
  monthLabelFormat as monthLabelFormatFn,
  weekdayLabelFormat as weekdayLabelFormatFn,
} from '@datepicker-react/hooks'
import dateFormat from 'date-fns/format'

export const dayLabelFormatFn = (date: Date) => dateFormat(date, 'd')

export const defaultDisplayFormat = 'MM/dd/yyyy'
