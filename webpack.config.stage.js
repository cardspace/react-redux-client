var buildConfig = require( './webpack.config.builder' );

module.exports = buildConfig( {
  config_file : 'src/js/config/stage.js',
  output_folder : 'src/dist/stage',
  debug : true
} );