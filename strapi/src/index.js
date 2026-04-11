'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }) {
    // Set default permissions for public API access
    const publicRoles = await strapi.query('plugin::users-permissions.role').findMany({
      where: { type: 'public' },
    });

    if (publicRoles.length > 0) {
      const publicRoleId = publicRoles[0].id;

      // Grant public access to read-only endpoints
      const publicPermissions = [
        { action: 'api::menu-category.menu-category.find' },
        { action: 'api::menu-category.menu-category.findOne' },
        { action: 'api::menu-item.menu-item.find' },
        { action: 'api::menu-item.menu-item.findOne' },
        { action: 'api::gallery-image.gallery-image.find' },
        { action: 'api::gallery-image.gallery-image.findOne' },
        { action: 'api::review.review.find' },
        { action: 'api::review.review.findOne' },
        { action: 'api::team-member.team-member.find' },
        { action: 'api::team-member.team-member.findOne' },
        { action: 'api::faq.faq.find' },
        { action: 'api::faq.faq.findOne' },
        { action: 'api::testimonial.testimonial.find' },
        { action: 'api::testimonial.testimonial.findOne' },
        { action: 'api::site-setting.site-setting.find' },
        { action: 'api::seo-setting.seo-setting.find' },
        // Allow creating reservations and contact messages (no auth needed for form submissions)
        { action: 'api::reservation.reservation.create' },
        { action: 'api::contact-message.contact-message.create' },
      ];

      for (const perm of publicPermissions) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: perm.action,
            role: publicRoleId,
          },
        });
      }
    }
  },
};
