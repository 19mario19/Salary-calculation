function percent(percent, total) {
  return parseFloat((percent / 100) * total).toFixed(2)
}
function bonus(days, maximum = 300) {
  let pricePerDay = maximum / 22
  return parseFloat(pricePerDay * days)
}


class Employee {
  constructor(name, rate = 12.8) {
    this.name = name

    this.rate = rate

    this.hours = 0
    this.days = 0
    this.months = 0
    this.years = 0

    this.baseSalary = 0
    this.totalSalary = 0
    this.incomeAfterTax = 0
    this.difference = 0

    this.workingHours = 8
    this.workingDays = 22
    this.workingMonths = 12

    this.extraHours = 0
    this.extraDays = 0

    this.bonus = 0

    this.freeDaysLeft = 28

    this.tax = 0
  }

  // Setter

  setName(name) {
    this.name = name
  }

  setRate(rate) {
    this.rate = rate
  }

  // Adding working hours

  addHours(hours = 1) {
    this.hours += hours
  }

  addDays(days = 1) {
    this.days = days
    this.hours += days * this.workingHours
  }

  addMonths(month = 1) {
    this.months = month
    this.days += month * this.workingDays
    this.hours += this.days * this.workingHours
  }

  addYear(year = 1) {
    this.years = year
    this.months += year * this.workingMonths
    this.days += this.months * this.workingDays
    this.hours += this.days * this.workingHours
  }

  // Calculating base salary

  calculateBaseSalary() {
    this.baseSalary = this.rate * (this.hours + this.months + this.years)
    return this.baseSalary
  }

  // Adding bonus

  calculateBonus() {
    this.bonus = bonus(this.days, 300)
    return this.bonus
  }

  // Adding extra

  addExtraHours(hours = 1) {
    this.extraHours += hours
  }

  addExtraDays(days = 1) {
    this.extraDays += days
    this.extraHours += this.extraDays * this.workingHours
  }

  // Removing free days

  removeFreeDays(days = 1) {
    this.freeDaysLeft -= days
  }

  // Calculate total salary

  calculateTotalSalary() {
    this.calculateBaseSalary()
    this.calculateBonus()

    if (this.totalSalary <= 12571) {
      this.tax = 0
    } else if (this.totalSalary > 12571 && this.totalSalary <= 50271) {
      this.tax = 20
    } else if (this.totalSalary > 50271 && this.totalSalary <= 125140) {
      this.tax = 40
    } else if (this.totalSalary > 125140) {
      this.tax = 45
    }

    this.totalSalary =
      this.baseSalary +
      this.bonus +
      this.rate * ((28 - this.freeDaysLeft) * this.workingHours) +
      this.extraHours * this.rate

    this.incomeAfterTax = this.totalSalary - percent(this.tax, this.totalSalary)

    return this.totalSalary
  }

  calculateDifference() {
    this.calculateBaseSalary()
    this.calculateBonus()
    this.calculateTotalSalary()

    this.difference = this.totalSalary - this.baseSalary

    return this.difference
  }

  displayDetails() {

    this.calculateBaseSalary()
    this.calculateBonus()
    this.calculateDifference()
    this.calculateTotalSalary()



    const output = `Name is ${this.name} has ${
      this.hours + Number(this.extraHours)
    } working hours.
    \nHas worked ${this.extraHours} extra hours.
    \nFree days left: ${this.freeDaysLeft}, used ${28 - this.freeDaysLeft}.
    \nHas made £${this.totalSalary.toFixed(2)} so far.
    \nAnd money left after tax: ${this.incomeAfterTax.toFixed(
      2,
    )}, tax paid is (${this.tax}%): ${(
      this.totalSalary - this.incomeAfterTax
    ).toFixed(2)}.
    \n\n`

    console.log(output)
    return output
  }
}

// Testing


const one = new Employee("Alina")
// one.addMonths(12)
one.addYear(1)
// one.calculateTotalSalary()
one.displayDetails()