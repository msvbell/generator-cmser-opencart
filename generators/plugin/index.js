'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the groovy ${chalk.red('generator-cmser-opencart')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'pluginName',
        message: 'Input plugin name',
      },
      {
        type: 'list',
        name: 'pluginType',
        message: 'What plugin type you need?',
        choices: [
          {
            name: 'analytics',
            value: 'analytics',
          },
          {
            name: 'captcha',
            value: 'captcha',
          },
          {
            name: 'dashboard',
            value: 'dashboard',
          },
          {
            name: 'extension',
            value: 'extension',
          },
          {
            name: 'feed',
            value: 'feed',
          },
          {
            name: 'fraud',
            value: 'fraud',
          },
          {
            name: 'module',
            value: 'module',
          },
          {
            name: 'payment',
            value: 'payment',
          },
          {
            name: 'report',
            value: 'report',
          },
          {
            name: 'shipping',
            value: 'shipping',
          },
          {
            name: 'theme',
            value: 'theme',
          },
          {
            name: 'total',
            value: 'total',
          }],
      },
    ];


    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    // ==================================
    // ADMIN
    // ==================================

    // controller
    this.fs.copyTpl(
      this.templatePath('admin/controller.php'),
      this.destinationPath('admin/controller/extension/'+_.toLower(this.props.pluginType)+'/'+_.snakeCase(this.props.pluginName)+'.php'),
        {
          className: _.capitalize(this.props.pluginType)+_.capitalize(this.props.pluginName),
          pluginType: _.toLower(this.props.pluginType),
          pluginName: _.snakeCase(this.props.pluginName),
          pluginNamespace: _.snakeCase(_.upperFirst(this.props.pluginType) + _.upperFirst(this.props.pluginName))
        }
    );

    // model
    this.fs.copyTpl(
        this.templatePath('admin/model.php'),
        this.destinationPath('admin/model/extension/'+_.toLower(this.props.pluginType)+'/'+_.snakeCase(this.props.pluginName)+'.php'),
        {
          className: _.capitalize(this.props.pluginType)+_.capitalize(this.props.pluginName),
          pluginType: _.toLower(this.props.pluginType),
          pluginName: _.snakeCase(this.props.pluginName)
        }
    )

    // language
    this.fs.copy(
        this.templatePath('admin/language/en-gb/language.php'),
        this.destinationPath('admin/language/en-gb/extension/'+_.toLower(this.props.pluginType)+'/'+_.snakeCase(this.props.pluginName)+'.php')
    )

    // ==================================
    // CATALOG
    // ==================================

    // controller
    this.fs.copyTpl(
        this.templatePath('catalog/controller.php'),
        this.destinationPath('catalog/controller/extension/'+_.toLower(this.props.pluginType)+'/'+_.snakeCase(this.props.pluginName)+'.php'),
        {
          className: _.capitalize(this.props.pluginType)+_.capitalize(this.props.pluginName),
          pluginType: _.toLower(this.props.pluginType),
          pluginName: _.snakeCase(this.props.pluginName),
          pluginNamespace: _.snakeCase(_.upperFirst(this.props.pluginType) + _.upperFirst(this.props.pluginName))
        }
    );

    // model
    this.fs.copyTpl(
        this.templatePath('catalog/model.php'),
        this.destinationPath('catalog/model/extension/'+_.toLower(this.props.pluginType)+'/'+_.snakeCase(this.props.pluginName)+'.php'),
        {
          className: _.capitalize(this.props.pluginType)+_.capitalize(this.props.pluginName),
          pluginType: _.toLower(this.props.pluginType),
          pluginName: _.snakeCase(this.props.pluginName)
        }
    )

    // language
    this.fs.copy(
        this.templatePath('catalog/language/en-gb/language.php'),
        this.destinationPath('catalog/language/en-gb/extension/'+_.toLower(this.props.pluginType)+'/'+_.snakeCase(this.props.pluginName)+'.php')
    )

    // view
    this.fs.copy(
        this.templatePath('catalog/view.twig'),
        this.destinationPath('catalog/view/theme/default/template/extension/'+_.toLower(this.props.pluginType)+'/'+_.snakeCase(this.props.pluginName)+'.twig')
    )
  }

  install () {
    this.installDependencies({
      bower: false
    })
  }
}
