/* Your Code Here */
  const createRecord = function(keyData, valueData) {
    return Object.assign(...keyData.map((key, index) => ({[key]: valueData[index]})));
  }
  
  const createEmployeeRecord = function(employeeData) {
    let keyData = ["firstName", "familyName", "title", "payPerHour"];
    if (keyData.length != employeeData.length || keyData.length == 0 || employeeData.length == 0) {
      return null;
    }
    let recordEmployee = createRecord.call(this, keyData, employeeData);
    recordEmployee["timeInEvents"] = [];
    recordEmployee["timeOutEvents"] = [];
    return recordEmployee;
  }
  
  const createEmployeeRecords = function(arrayEmployeeDatas) {
    let employeeRecords = {};
    employeeRecords = arrayEmployeeDatas.map((employeeData) => createEmployeeRecord.call(this, employeeData));
    return employeeRecords;
  }
  
  const createTimeEvent = function(timeEvent, inOutEvent) {
    let timeWord = inOutEvent.replace("Events", "");
    let eventName = timeWord[0].toUpperCase() + timeWord.slice(1);
    let timeSplit = timeEvent.split(" ");
    timeSplit[1] = parseInt(timeSplit[1]);
    let keyTime = ["date", "hour"];
    let recordTime = createRecord.call(this, keyTime, timeSplit);
    this[inOutEvent].push(recordTime);
    this[inOutEvent][this[inOutEvent].length - 1]["type"] = eventName;
    return this;
  }
  
  const createTimeInEvent = function(timeInEvent) {
    return createTimeEvent.call(this, timeInEvent, "timeInEvents");
  }
  
  const createTimeOutEvent = function(timeOutEvent) {
    return createTimeEvent.call(this, timeOutEvent, "timeOutEvents");
  }
  
  const hoursWorkedOnDate = function(date) {
    let eventIn = this["timeInEvents"].filter(timeInEvent => timeInEvent["date"] === date);
    let eventOut = this["timeOutEvents"].filter(timeOutEvent => timeOutEvent["date"] === date);
    return (eventIn.length && eventOut.length) ? (eventOut[0].hour/100 - eventIn[0].hour/100) : 0;
  }
  
  const wagesEarnedOnDate = function(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this["payPerHour"];
  }

  const findEmployeeByFirstName = function(employeeRecords, firstNameString) {
    return employeeRecords.find(employeeRecord => employeeRecord.firstName === firstNameString);
  }
  
  const allWagesFor = function() {
    let datesList = this["timeInEvents"].map(inEvent => inEvent.date);
    let wagesToPay = datesList.reduce(((sum, date) => sum + wagesEarnedOnDate.call(this, date)), 0);
    return wagesToPay;
  }
  
  const calculatePayroll = function(employeeRecords) {
    let payroll = employeeRecords.reduce(((sum, recordEmployee) => sum + allWagesFor.call(recordEmployee)), 0);
    return payroll;
}
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

