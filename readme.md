# Collection naming
- Collections naming is done in snake_casing
- Collections names have company names as prefixes

# Types of collections for a company
{We are using employee email as id of the employee for our platform, the company can have a differnt id of the employee which we keep in employees collection}
- companyname_employees: collection of employees -> document id is email of the employee, this is benefitial when we want to find an employee on the basis of the data we get when we verify a token on the backend
- companyname_directs: collection of directs to a manager
- companyname_performance_reviews: collection of performance reviews received by an employee, id of the document would be the employee email
