import * as Yup from 'yup';
import Ticket from '../models/Ticket';
import User from '../models/User';
import Customer from '../models/Customer';
import Notification from '../schemas/notification';

class TicketController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const tickets = await Ticket.findAll({
      where: { user_id: req.userId },
      order: ['priority'],
      attributes: ['id', 'title', 'description', 'status', 'priority'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(tickets);
  }

  async show(req, res) {
    const ticket = await Ticket.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'description', 'status', 'priority'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!ticket) {
      return res.status(400).json({ error: 'Ticket is not exists' });
    }

    return res.json(ticket);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .min(6),
      description: Yup.string().required(),
      status: Yup.number().required(),
      priority: Yup.number().required(),
      provider_id: Yup.number().required(),
      customer_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      title,
      description,
      status,
      priority,
      provider_id,
      customer_id,
    } = req.body;

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create tickets with providers' });
    }

    const customerExists = await Customer.findByPk(customer_id);

    if (!customerExists) {
      return res.status(400).json({ error: 'Client does not exist' });
    }

    if (req.userId === provider_id) {
      return res
        .status(400)
        .json({ error: 'You can only create tickets for your user.' });
    }

    const ticket = await Ticket.create({
      user_id: req.userId,
      provider_id,
      customer_id,
      title,
      description,
      status,
      priority,
    });

    await Notification.create({
      content: 'Você tem um novo ticket',
      user: provider_id,
    });

    return res.json(ticket);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().min(6),
      description: Yup.string(),
      status: Yup.number().required(),
      priority: Yup.number().required(),
      provider_id: Yup.number().required(),
      customer_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const providerExists = await User.findOne({
      where: { id: req.body.provider_id, provider: true },
    });

    if (!providerExists) {
      return res.status(400).json({ error: 'Provider is not exist' });
    }

    const customerExists = await Customer.findByPk(req.body.customer_id);

    if (!customerExists) {
      return res.status(400).json({ error: 'Client does not exist' });
    }

    const ticket = await Ticket.findByPk(req.params.id);

    const {
      id,
      title,
      description,
      status,
      priority,
      provider_id,
      customer_id,
    } = await ticket.update(req.body);

    return res.json({
      id,
      title,
      description,
      status,
      priority,
      provider_id,
      customer_id,
    });
  }

  async delete(req, res) {
    res.send('Got a DELETE request at /user');
  }
}

export default new TicketController();
