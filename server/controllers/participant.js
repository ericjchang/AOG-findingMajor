'use strict';
const { Participant } = require('../models');
const Op = require('sequelize').Op;

class participantController {
  static create(req, res, next) {
    const { name, email, phone, address, status, major, institution, region } = req.body;
    const data = {
      name,
      email,
      phone,
      address,
      status,
      major,
      institution,
      region,
    };

    Participant.create(data)
      .then((result) => {
        res.status(201).json({ message: 'Created successfully', name: result.name, email: result.email });
      })
      .catch((err) => {
        next(err);
      });
  }

  static update(req, res, next) {
    const id = +req.params.id;
    const { name, email, phone, address, status, major, institution, region } = req.body;
    const data = {
      name,
      email,
      phone,
      address,
      status,
      major,
      institution,
      region,
    };

    Participant.update(data, {
      where: { id },
    })
      .then((result) => {
        if (result == 1) res.status(200).json({ message: `Participant with id = ${id} updated successfully` });
        if (result == 0) next({ name: 'NOT_FOUND_ERR' });
      })
      .catch((err) => {
        next(err);
      });
  }

  static delete(req, res, next) {
    const id = +req.params.id;
    Participant.destroy({
      where: { id },
    })
      .then((result) => {
        if (result == 1) res.status(200).json({ message: `Participant with id = ${id} deleted successfully` });
        else next({ name: 'NOT_FOUND_ERR' });
      })
      .catch((err) => {
        next(err);
      });
  }

  static findAll(req, res, next) {
    const keyword = req.query.search;

    Participant.findAll({
      where: keyword ? { name: { [Op.iLike]: `%${keyword}%` } } : null,
    })
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = participantController;
