'use strict';
const { Participant, sequelize } = require('../models');
const Op = require('sequelize').Op;
const registrationEmail = require('../helpers/queueSendEmail');

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
        registrationEmail(data.email);
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

  static findEmail(req, res, next) {
    const { email } = req.body;
    Participant.findOne({
      where: { email },
    })
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        next(err);
      });
  }

  static groupAndCount(req, res, next) {
    Participant.findAll({
      group: ['region'],
      attributes: ['region', [sequelize.fn('COUNT', 'region'), 'total']],
    })
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        next(err);
      });
  }

  static parseGroup(req, res, next) {
    let count = 0; // total participants
    let group = 1; // total group
    for (let i = 13; i <= 244; i++) {
      if (count === 54) {
        count = 0;
        group++;
      }
      count++;
      Participant.update(
        { group },
        {
          where: { id: +i },
        }
      )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    res.status(200).json({ message: `Parsing group done` });
  }
}

module.exports = participantController;
