var buildConfig = require( './webpack.config.builder' );

module.exports = buildConfig( {
  config_file : 'src/js/config/dev.js',
  output_folder : 'src/dist/dev',
  debug : true
} );