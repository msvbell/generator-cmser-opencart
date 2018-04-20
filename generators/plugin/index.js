/* eslint-disable capitalized-comments,prettier/prettier */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
// noinspection NpmUsedModulesInstalled
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the groovy ${chalk.red('generator-cmser-opencart')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'pluginName',
        message: 'Input plugin name'
      },
      {
        type: 'list',
        name: 'pluginType',
        message: 'What plugin type you need?',
        choices: [
          {
            name: 'analytics',
            value: 'analytics'
          },
          {
            name: 'captcha',
            value: 'captcha'
          },
          {
            name: 'dashboard',
            value: 'dashboard'
          },
          {
            name: 'extension',
            value: 'extension'
          },
          {
            name: 'feed',
            value: 'feed'
          },
          {
            name: 'fraud',
            value: 'fraud'
          },
          {
            name: 'module',
            value: 'module'
          },
          {
            name: 'payment',
            value: 'payment'
          },
          {
            name: 'report',
            value: 'report'
          },
          {
            name: 'shipping',
            value: 'shipping'
          },
          {
            name: 'theme',
            value: 'theme'
          },
          {
            name: 'total',
            value: 'total'
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let className = _.capitalize(this.props.pluginType) + _.capitalize(_.camelCase(this.props.pluginName));
    let pluginNamespace = _.snakeCase(
      _.upperFirst(this.props.pluginType) +
      _.upperFirst(this.props.pluginName)
    );
    let pluginType = _.toLower(this.props.pluginType);
    let pluginName = _.snakeCase(this.props.pluginName);

    // ==================================
    // ADMIN
    // ==================================

    // controller
    this.fs.copyTpl(
      this.templatePath('admin/controller.php'),
      this.destinationPath(
        'admin/controller/extension/' + pluginType + '/' + pluginName + '.php'
      ),
      {
        className: className,
        pluginType: pluginType,
        pluginName: pluginName,
        pluginNamespace: pluginNamespace
      }
    );

    // Model
    this.fs.copyTpl(
      this.templatePath('admin/model.php'),
      this.destinationPath(
        'admin/model/extension/' + pluginType + '/' + pluginName + '.php'
      ),
      {
        className: className,
        pluginType: pluginType,
        pluginName: pluginName
      }
    );

    // Language
    this.fs.copy(
      this.templatePath('admin/language/en-gb/language.php'),
      this.destinationPath(
        'admin/language/en-gb/extension/' + pluginType + '/' + pluginName + '.php'
      )
    );

    // View
    this.fs.copy(
      this.templatePath('admin/view.twig'),
      this.destinationPath(
        'admin/view/template/extension/' + pluginType + '/' + pluginName + '.twig'
      )
    );

    // ==================================
    // CATALOG
    // ==================================

    // controller
    this.fs.copyTpl(
      this.templatePath('catalog/controller.php'),
      this.destinationPath(
        'catalog/controller/extension/' + pluginType + '/' + pluginName + '.php'
      ),
      {
        className: className,
        pluginType: pluginType,
        pluginName: pluginName,
        pluginNamespace: pluginNamespace
      }
    );

    // Model
    this.fs.copyTpl(
      this.templatePath('catalog/model.php'),
      this.destinationPath(
        'catalog/model/extension/' + pluginType + '/' + pluginName + '.php'
      ),
      {
        className: className,
        pluginType: pluginType,
        pluginName: pluginName
      }
    );

    // Language
    this.fs.copy(
      this.templatePath('catalog/language/en-gb/language.php'),
      this.destinationPath(
        'catalog/language/en-gb/extension/' + pluginType + '/' + pluginName + '.php'
      )
    );

    // View
    this.fs.copy(
      this.templatePath('catalog/view.twig'),
      this.destinationPath(
        'catalog/view/theme/default/template/extension/' + pluginType + '/' + pluginName + '.twig'
      )
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
