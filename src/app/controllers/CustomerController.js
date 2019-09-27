import * as Yup from 'yup';
import Customer from '../models/Customer';

class CustomerController {
  async index(req, res) {
    const customer = await Customer.findAll({
      attributes: ['id', 'name', 'email'],
    });

    return res.json(customer);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const customerExists = await Customer.findOne({
      where: { email: req.body.email },
    });

    if (customerExists) {
      return res.status(400).json({ error: 'Customer already exists.' });
    }

    const { id, name, email } = await Customer.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new CustomerController();
