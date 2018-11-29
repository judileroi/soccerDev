var Encore = require('@symfony/webpack-encore');

Encore
  .configureBabel((config) => {
    config.presets.push('stage-1');
  })
  // the project directory where compiled assets will be stored
  .setOutputPath('public/build/')
  // the public path used by the web server to access the previous directory
  .setPublicPath('/build')
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .addEntry('app', './assets/js/app.js')
  .addEntry('home', './assets/js/home.js')
  .addEntry('admin', './assets/js/admin.js')
  .enableSassLoader() 
  .enableReactPreset();

  module.exports = Encore.getWebpackConfig();


