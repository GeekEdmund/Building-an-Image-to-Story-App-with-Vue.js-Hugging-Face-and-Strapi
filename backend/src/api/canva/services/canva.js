'use strict';

/**
 * canva service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::canva.canva');
