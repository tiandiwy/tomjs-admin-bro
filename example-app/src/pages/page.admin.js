const { Page } = require('./page.entity')

/** @type {import('admin-bro').ResourceOptions} */
const options = {
  properties: {
    content: {
      type: 'richtext',
      custom: {
        modules: {
          toolbar: [['bold', 'italic'], ['link', 'image']],
        },
      },
    },
    createdDate: {
      type: 'date',
    },
    createdDateTime: {
      type: 'datetime',
    },
  },
}

module.exports = {
  options,
  resource: Page,
}
