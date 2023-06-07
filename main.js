function percent(percent, total) {
  return parseFloat((percent / 100) * total).toFixed(2)
}

class Employee {
  constructor(
    name,
    age,
    occupation = "specialist",
    rate = 12.8,
    freeDays = 29,
    workingHours = 0,
    extraHours = 0,
    serviceCharge = 300,
    tax = 20,
  ) {
    this.name = name
    this.age = age
    this.occupation = occupation
    this.workingHours = workingHours
    this.freeDays = freeDays
    this.rate = rate
    this.money =
      this.rate * this.workingHours +
      this.rate * (29 - this.freeDays) +
      this.rate * this.extraHours +
      this.serviceCharge
    this.tax = tax
    this.moneyAfterTax = this.money - percent(tax, this.money)
    this.extraHours = extraHours
    this.serviceCharge = serviceCharge
  }

  // Calculate money

  calculateTotal() {
    this.money =
      this.rate * this.workingHours +
      this.rate * (29 - this.freeDays) +
      this.rate * this.extraHours +
      this.serviceCharge

    console.log(parseFloat(this.moneyAfterTax), this.money, this.tax)
    this.moneyAfterTax = (this.money - percent(this.tax, this.money)).toFixed(2)
  }

  // Info

  displayDetails() {
    this.calculateTotal()

    console.log(
      `Name: ${this.name}, age: ${this.age} has ${this.workingHours} working hours.`,
      `\n${this.name} is working as: ${this.occupation}`,
      `\nFree days left: ${this.freeDays}, used ${29 - this.freeDays}.`,
      `\nHas made £${this.money.toFixed(2)} so far.`,
      `\nAnd money left after tax: ${this.moneyAfterTax}, tax payed is: ${(
        this.money - this.moneyAfterTax
      ).toFixed(2)}`,
      `\nHas worked ${this.extraHours} extra hours.`,
    )
  }

  // Free days

  addFreeDays(day = 1) {
    this.freeDays -= day
    this.calculateTotal()
  }

  // Working

  addWorkingDay(hours = 8) {
    this.workingHours += hours
    this.calculateTotal()
  }

  addWorkingMonth(days = 22) {
    for (let i = 0; i < days; i++) {
      this.addWorkingDay()
    }
    this.calculateTotal()
  }

  addWorkinYear(months = 12) {
    for (let i = 0; i < months; i++) {
      this.addWorkingMonth()
    }
    this.calculateTotal()
  }

  // Extra

  addExtraHours(hours = 1) {
    this.extraHours += hours
    this.calculateTotal()
  }
  addExtraDays(days = 1) {
    for (let i = 0; i < days; i++) {
      this.extraHours += 8
    }
    this.calculateTotal()
  }
}

let employee1 = new Employee("Alina", 22)

// employee1.addWorkingDay()
employee1.addWorkingMonth()
// employee1.addFreeDays()
// employee1.addExtraDays(3)
// employee1.addExtraHours(5)
// employee1.addWorkinYear()
// employee1.addWorkingDay()

employee1.displayDetails()
