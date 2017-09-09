'use strict';

const icon = require('../assets/icon.png');
const PLUGIN_KEYWORD = 'mailinator';
const PLUGIN_REGEX = /mailinator\s(.*)/;

const Faker = require('faker');

const MAILINATOR_URL = 'https://www.mailinator.com/v2/inbox.jsp?zone=public&query=%email%';
const MAILINATOR_EMAIL_DOMAIN = '@mailinator.com';

const plugin = ({ term, display, actions }) => {

  const match = term.match(PLUGIN_REGEX);

  if (match) {
    
    let email = '';
    
    if (match[1]) {
      email = match[1].trim();
    } else {
      email = Faker.internet.userName();    
    }
    
    display({
      title: `Open ${email}${MAILINATOR_EMAIL_DOMAIN} inbox on mailinator`,
      icon: icon,
      onSelect: (event) => {
        actions.open(MAILINATOR_URL.replace('%email%', email));
      }
    });
  }
}

module.exports = {
  fn: plugin,
  name: 'Mailinator',
  keyword: PLUGIN_KEYWORD,
  icon,
};