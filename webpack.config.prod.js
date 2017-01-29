var buildConfig = require( './webpack.config.builder' );

module.exports = buildConfig( {
  config_file : 'src/js/config/prod.js',
  output_folder : 'src/dist',
  debug : false
} );