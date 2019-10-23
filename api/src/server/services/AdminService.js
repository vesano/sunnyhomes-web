const Admin = require('../../database/model/Admin').Admin

const AdminService = {

  serialize: entity => {

    const result = {...entity}

    delete result.password

    return result
  },

  create: async (content) => {
    const entity = new Admin()

    return await AdminService.update(entity, content)
  },

  update: async (entity, content) => {

    entity.set(content)

    const match = await Admin.findOne({_id: {$not: {$eq: entity._id}}, email: entity.email})
      .select('_id email').lean()
    if (match) {
      throw {
        code: 400,
        message: `There is already admin with such email`,
      }
    }

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: 'Please, re-check admin information for errors',
        errors: validator.errors
      }
    }

    await entity.save()

    return entity.toObject()
  },

  remove: async id => {
    await Admin.deleteOne({_id: id})
  },

  findOneByFilter: async (filter) => {
    return await Admin.findOne(filter).select('-password').lean()
  },

  findByFilter: async (filter, page, limit) => {

    const skip = limit > 0 && page > 0 ? limit * (page - 1) : 0

    return await Admin.find(filter, null, {skip, limit})
      .select('-password')
      .sort({createdAt: 'desc'})
      .lean()
  },

  countByFilter: async (filter) => {
    return await Admin.countDocuments(filter)
  }

}

module.exports = AdminService