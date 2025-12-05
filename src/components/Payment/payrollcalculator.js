function calculateCanadianPayroll({
    hoursWorked,
    hourlyRate,
    overtimePay = 0,
    bonuses = 0,
    commissions = 0,
    cppRate,
    cppBasicExemptionPerPeriod,
    cppMaxPerPeriod,
    eiRate,
    eiMaxPerPeriod,
    federalTaxBrackets,
    provincialTaxBrackets,
    federalCreditRate,
    provincialCreditRate,
    federalBasicAmount,
    provincialBasicAmount
}) {

    // Step 1 – Gross pay
    const grossPay = (hoursWorked * hourlyRate) + overtimePay + bonuses + commissions;

    // Step 2 – CPP
    const pensionableEarnings = Math.max(0, grossPay - cppBasicExemptionPerPeriod);
    let cpp = pensionableEarnings * cppRate;
    cpp = Math.min(cpp, cppMaxPerPeriod);

    // Step 3 – EI
    let ei = grossPay * eiRate;
    ei = Math.min(ei, eiMaxPerPeriod);

    // Taxable income
    const taxableIncome = grossPay - cpp - ei;

    // Step 4 – Federal tax
    let federalTaxBeforeCredits = 0;
    let remaining = taxableIncome;

    for (const bracket of federalTaxBrackets) {
        const amountInBracket = Math.min(remaining, bracket.limit);
        if (amountInBracket <= 0) break;
        federalTaxBeforeCredits += amountInBracket * bracket.rate;
        remaining -= amountInBracket;
    }

    const federalCredits = federalBasicAmount * federalCreditRate;
    const federalTax = Math.max(0, federalTaxBeforeCredits - federalCredits);

    // Step 5 – Provincial tax
    let provincialTaxBeforeCredits = 0;
    remaining = taxableIncome;

    for (const bracket of provincialTaxBrackets) {
        const amountInBracket = Math.min(remaining, bracket.limit);
        if (amountInBracket <= 0) break;
        provincialTaxBeforeCredits += amountInBracket * bracket.rate;
        remaining -= amountInBracket;
    }

    const provincialCredits = provincialBasicAmount * provincialCreditRate;
    const provincialTax = Math.max(0, provincialTaxBeforeCredits - provincialCredits);

    // Step 6 – Deductions
    const totalDeductions = cpp + ei + federalTax + provincialTax;

    // Step 7 – Net pay
    const netPay = grossPay - totalDeductions;

    return {
        grossPay,
        cpp,
        ei,
        federalTax,
        provincialTax,
        totalDeductions,
        netPay
    };
}
