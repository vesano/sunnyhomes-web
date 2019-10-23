const Owner = require('../../database/model/Owner').Owner

const OwnerService = {

  serialize: entity => {

    const result = {...entity}

    delete result.password

    return result
  },

  create: async (content) => {
    const entity = new Owner()

    return await OwnerService.update(entity, content)
  },

  update: async (entity, content) => {

    entity.set(content)

    const match = await Owner.findOne({_id: {$not: {$eq: entity._id}}, email: entity.email})
      .select('_id email').lean()
    if (match) {
      throw {
        code: 400,
        message: `There is already owner with such email`,
      }
    }

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: 'Please, re-check owner information for errors',
        errors: validator.errors
      }
    }

    await entity.save()

    return entity.toObject()
  },

  remove: async id => {
    await Owner.deleteOne({_id: id})
  },

  findOneByFilter: async (filter) => {
    return await Owner.findOne(filter).select('-password').lean()
  },

  findByFilter: async (filter, page, limit) => {

    const skip = limit > 0 && page > 0 ? limit * (page - 1) : 0

    return await Owner.find(filter, null, {skip, limit})
      .select('-password')
      .sort({createdAt: 'desc'})
      .lean()
  },

  countByFilter: async (filter) => {
    return await Owner.countDocuments(filter)
  }

}

module.exports = OwnerService