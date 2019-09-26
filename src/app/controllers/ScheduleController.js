import Ticket from '../models/Ticket';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return req.status(401).json({ error: 'User is not a provider' });
    }

    const ticket = await Ticket.findAll({
      where: {
        provider_id: req.userId,
      },
      order: ['priority'],
    });

    return res.json(ticket);
  }
}

export default new ScheduleController();
