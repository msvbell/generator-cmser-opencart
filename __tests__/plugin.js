'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const _ = require('lodash');

describe('generator-cmser-opencart:plugin', () => {
  let pluginName = 'test asdf';
    let pluginType = 'payment';
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/plugin'))
      .withPrompts(
          {
            pluginName: pluginName,
            pluginType: pluginType
          }
      );
  });

  it('create admin files', () => {
    assert.file([
        'admin/controller/extension/'+pluginType+'/'+_.snakeCase(pluginName)+'.php',
        'admin/language/en-gb/extension/'+pluginType+'/'+_.snakeCase(pluginName)+'.php',
        'admin/model/extension/'+pluginType+'/'+_.snakeCase(pluginName)+'.php'
    ]);
  });

  it('create catalog files', () => {
    assert.file([
      'catalog/controller/extension/'+pluginType+'/'+_.snakeCase(pluginName)+'.php',
      'catalog/language/en-gb/extension/'+pluginType+'/'+_.snakeCase(pluginName)+'.php',
      'catalog/model/extension/'+pluginType+'/'+_.snakeCase(pluginName)+'.php',
      'catalog/view/theme/default/template/extension/'+pluginType+'/'+_.snakeCase(pluginName)+'.twig'
    ]);
  });
});
