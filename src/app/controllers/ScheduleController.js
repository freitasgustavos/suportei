import Ticket from '../models/Ticket';
import User from '../models/User';
import Customer from '../models/Customer';

class ScheduleController {
  async index(req, res) {
    const ticket = await Ticket.findAll({
      where: {
        provider_id: req.userId,
      },
      order: [['priority', 'DESC']],
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

    return res.json(ticket);
  }
}

export default new ScheduleController();
