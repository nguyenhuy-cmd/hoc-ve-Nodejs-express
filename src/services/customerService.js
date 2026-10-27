import Customer from '../models/customers.model.js'

const postCustomerService =  async (data) => {
    const customer = await Customer.create(data);
    return customer;
} 

export{
    postCustomerService
}