const db = require("../models");
const Op = db.Sequelize.Op;

exports.courses = (courses = {}) => {
  const {
    number,
    name,
    SdoId,
    UtpId,
    RpId,
    startDate,
    endDate,
    hoursBottom = 0,
    hoursTop = 1000,
    capacityBottom = 0,
    capacityTop = 1000,
    groupNumberBottom = 0,
    groupNumberTop = 1000,
    FormId,
    listenersCategories,
    annotation,
  } = courses;
  return {
    model: db.courses,
    attributes: [
      "id",
      "name",
      "startDate",
      "endDate",
      "hours",
      "capacity",
      "groupNumber",
      "annotation",
    ],
    where: {
      [Op.and]: [
        number ? { number: { [Op.eq]: number } } : null,
        name ? { name: { [Op.iLike]: `%${name}%` } } : null,
        SdoId ? { SdoId: { [Op.eq]: SdoId } } : null,
        UtpId ? { UtpId: { [Op.eq]: UtpId } } : null,
        RpId ? { RpId: { [Op.eq]: RpId } } : null,
        startDate ? { startDate: { [Op.gte]: new Date(startDate) } } : null,
        endDate ? { endDate: { [Op.lte]: new Date(endDate) } } : null,
        hoursBottom || hoursTop
          ? {
              [Op.or]: [
                { hours: { [Op.gte]: hoursBottom } },
                { hours: { [Op.lte]: hoursTop } },
              ],
            }
          : null,
        capacityBottom || capacityTop
          ? {
              [Op.or]: [
                { capacity: { [Op.gte]: capacityBottom } },
                { capacity: { [Op.lte]: capacityTop } },
              ],
            }
          : null,
        groupNumberBottom || groupNumberTop
          ? {
              [Op.or]: [
                { groupNumber: { [Op.gte]: groupNumberBottom } },
                { groupNumber: { [Op.lte]: groupNumberTop } },
              ],
            }
          : null,
        FormId ? { FormId: { [Op.eq]: FormId } } : null,
        annotation ? { annotation: { [Op.iLike]: `%${annotation}%` } } : null,
      ],
    },
    include: [
      {
        model: db.sdos,
        attributes: ["id", "name"],
      },
      {
        model: db.years,
        as: "Utp",
        attributes: ["id", "year"],
      },
      {
        model: db.years,
        as: "Rp",
        attributes: ["id", "year"],
      },
      {
        model: db.forms,
        attributes: ["id", "name"],
      },
      {
        model: db.listenersCategories,
        attributes: ["id", "name"],
        where: listenersCategories
          ? { name: { [Op.iLike]: `%${listenersCategories}%` } }
          : null,
        through: {
          attributes: [],
        },
      },
    ],
  };
};
