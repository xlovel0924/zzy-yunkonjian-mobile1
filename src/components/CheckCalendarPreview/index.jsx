
import * as React from 'react';
import moment from 'moment';
import { Icon } from 'antd-mobile';
import '@/containers/calendar/index.css';

const WEEK_NAMES = ['日', '一', '二', '三', '四', '五', '六']
const LINES = [1,2,3,4,5,6]
const year = parseInt(moment().format('YYYY'));
let MONTH_DAYS = ((year%4===0 && year%100!==0) || year%400===0)?[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0,
      year: 0,
      today: moment(),
    }
  }

  componentWillMount() {
    this.initMonth(this.props.startDay)
    this.props.onRef(this);
    // this.setCurrentYearMonth(new Date(moment(this.props.startDay).format('YYYY-MM-DD')));
  }

  initMonth=(startDay)=>{
    this.setCurrentYearMonth(new Date(moment(startDay).format('YYYY-MM-DD')));
  }

  setCurrentYearMonth(date) {
    var month = Calendar.getMonth(date)
    var year = Calendar.getFullYear(date)
    this.setState({
      month,
      year
    })
  }

  static getMonth(date: Date): number{
    return date.getMonth()
  }

  static getFullYear(date: Date): number{
    return date.getFullYear()
  }

  static getCurrentMonthDays(month: number): number {
    return MONTH_DAYS[month]
  }

  static getWeeksByFirstDay(year: number, month: number): number {
    var date = Calendar.getDateByYearMonth(year, month)
    return date.getDay()
  }

  static getDayText(line: number, weekIndex: number, weekDay: number, monthDays: number): any {
    var number = line * 7 + weekIndex - weekDay + 1
    if ( number <= 0 || number > monthDays ) {
      return <span>&nbsp;</span>
    }

    return number
  }

  static formatNumber(num: number): string {
    var _num = num + 1
    return _num < 10 ? `0${_num}` : `${_num}`
  }

  static getDateByYearMonth(year: number, month: number, day: number=1): Date {
    var date = new Date()
    date.setFullYear(year)
    date.setMonth(month, day)
    return date
  }

  checkToday(line: number, weekIndex: number, weekDay: number, monthDays: number): Boolean {
    var { year, month } = this.state
    var day = Calendar.getDayText(line, weekIndex, weekDay, monthDays)
    var date = new Date()
    var todayYear = date.getFullYear()
    var todayMonth = date.getMonth()
    var todayDay = date.getDate()

    return year === todayYear && month === todayMonth && day === todayDay
  }

  monthChange(monthChanged: number) {
    var { month, year } = this.state
    var monthAfter = month + monthChanged
    var date = Calendar.getDateByYearMonth(year, monthAfter)
    this.setCurrentYearMonth(date)
  }

  handleClickDay=(day)=>{
    const { month, year } = this.state;
    const selectDate = `${year}-${month+1<10?'0'+(month+1):month+1}-${day<10?'0'+day:day}`
    // console.log(selectDate)
    this.props.handleDayClick(selectDate)
  }

  render() {
    var { year, month } = this.state
    // console.log(this.state)
    const { selectedDay } = this.props;

    var monthDays = Calendar.getCurrentMonthDays(month)
    var weekDay = Calendar.getWeeksByFirstDay(year, month)

    return (<div style={{width:'100%'}}>
      {/* {this.state.month} */}
      <table cellPadding={0} cellSpacing={0} className="table" style={{width:'100%'}}>
        <caption>
          <div className="monthHeader">
            {/* <span className="arrow" onClick={this.monthChange.bind(this, -1)}>&#60;</span> */}
            <Icon type='left' style={{color:'#999', verticalAlign:'text-top'}} />
            <span>{year} - {Calendar.formatNumber(month)}</span>
            <Icon type='right' style={{color:'#999', verticalAlign:'text-top'}} />
            {/* <span className="arrow" onClick={this.monthChange.bind(this, 1)}>&gt;</span> */}
          </div>
        </caption>
        <thead>
          <tr>
            {
              WEEK_NAMES.map((week, key) => {
                return <td key={key}><div className='weekItemTop'>{week}</div></td>
              })
            }
          </tr>
        </thead>
        <tbody>
        {
          LINES.map((l, key) => {
            return <tr key={key}>
              {
                WEEK_NAMES.map((week, index) => (<td key={index} style={{color: this.checkToday(key, index, weekDay, monthDays) ? '#f34' : '#000'}}>
                    <div 
                      onClick={()=>this.handleClickDay(Calendar.getDayText(key, index, weekDay, monthDays))}
                      className='weekItemBottom'
                      style={{
                        background: parseInt(moment(selectedDay).format('DD'))===Calendar.getDayText(key, index, weekDay, monthDays) && parseInt(moment(selectedDay).format('YYYY'))===year &&  parseInt(moment(selectedDay).format('MM'))===month+1 ?'rgb(24,144,255)':'#fff',
                        color: parseInt(moment(selectedDay).format('DD'))===Calendar.getDayText(key, index, weekDay, monthDays) && parseInt(moment(selectedDay).format('YYYY'))===year &&  parseInt(moment(selectedDay).format('MM'))===month+1 ?'#fff':'#333',
                      }} 
                    >
                      <span
                        style={(moment(this.state.today).format('YYYY-MM-DD')===`${year}-${Calendar.formatNumber(month)}-${Calendar.getDayText(key, index, weekDay, monthDays)<10?'0'+Calendar.getDayText(key, index, weekDay, monthDays):Calendar.getDayText(key, index, weekDay, monthDays)}`)?{color:'#f34', fontWeight:600}:{}
                        }
                      >
                        {Calendar.getDayText(key, index, weekDay, monthDays)}
                      </span>
                    </div>
                  </td>
                ))
              }
            </tr>
          })
        }
        </tbody>
      </table>
    </div>)
  }
}