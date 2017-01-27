var debug = process.env.NODE_ENV !== "production";
var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = function ( config ) {

    // config : {
    //  config_file   : path to the file that store the configuration setting 
    //  output_folder : path to output folder
    //  debug         : boolean to see if debug options should be applied.
    // }

    return {
      context: path.join(__dirname, "src"),
      devtool: config.debug ? "inline-sourcemap" : null,
      entry: "./js/client.js",
      resolve: {
        alias: {
          config: path.join( __dirname, config.config_file ),
        },
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015', 'stage-0'],
              plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
            }
          }
        ]
      },
      devServer: {
        historyApiFallback: true
      },
      output: {
        path: path.join( __dirname, config.output_folder ),
        filename: "client.min.js"
      },
      plugins: config.debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
      ],
    };
}
