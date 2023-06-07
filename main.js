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
    bonus = 300,
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
      this.bonus
    this.tax = tax
    this.moneyAfterTax = this.money - percent(tax, this.money)
    this.extraHours = extraHours
    this.bonus = bonus
  }

  // Setter methods

  setName(name) {
    this.name = name
  }

  setAge(age) {
    this.age = age
  }

  setOccupation(occupation) {
    this.occupation = occupation
  }

  setRate(rate) {
    this.rate = rate
  }

  setFreeDays(freeDays) {
    this.freeDays = freeDays
  }

  setWorkingHours(workingHours) {
    this.workingHours = workingHours
  }

  setExtraHours(extraHours) {
    this.extraHours = extraHours
  }

  setBonus(bonus) {
    this.bonus = bonus
  }

  setTax(tax) {
    this.tax = tax
  }

  // Calculate money

  calculateTotal() {
    if (this.money <= 12571) {
      this.tax = 0
    } else if (this.money > 12571 && this.money <= 50271) {
      this.tax = 20
    } else if (this.money > 50271 && this.money <= 125140) {
      this.tax = 40
    } else if (this.money > 125140) {
      this.tax = 45
    }

    this.money =
      this.rate * this.workingHours +
      this.rate * ((29 - this.freeDays)*8) +
      this.rate * this.extraHours +
      this.bonus

    this.moneyAfterTax = (this.money - percent(this.tax, this.money)).toFixed(2)
  }

  // Info

  displayDetails() {
    this.calculateTotal()

    console.log(
      `Name: ${this.name}, age: ${this.age} has ${this.workingHours} working hours.`,
      `\nHas worked ${this.extraHours} extra hours.`,
      `\n${this.name} is working as: ${this.occupation}.`,
      `\nFree days left: ${this.freeDays}, used ${29 - this.freeDays}.`,
      `\nHas made £${this.money.toFixed(2)} so far.`,
      `\nAnd money left after tax: ${
        this.moneyAfterTax
      }, tax payed is (${(`${this.tax}%`)}): ${(
        this.money - this.moneyAfterTax
      ).toFixed(2)}.`,
      `\n\n`,
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

  addWorkingYear(months = 12) {
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

// Testing

let employee1 = new Employee("Alina", 22)

employee1.addWorkingDay()
employee1.addWorkingMonth()
employee1.addFreeDays()
employee1.addExtraDays(3)
employee1.addExtraHours(5)
employee1.addWorkingYear()
employee1.addWorkingDay()

employee1.displayDetails()

let employee2 = new Employee("Ana", 34, "manager", 5)

employee2.setRate(21)

employee2.setName("Iuliana")

employee2.addWorkingDay()
// employee2.addWorkingMonth()
employee2.addFreeDays(20)
employee2.addExtraDays(3)
employee2.addExtraHours(5)
employee2.addWorkingYear()
employee2.addWorkingDay()

employee2.displayDetails()
