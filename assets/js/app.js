// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// import css from "../css/app.scss";

// its own CSS file.
// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//

import css from "../css/app.scss";

import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import "bootstrap";
import _ from "lodash";



// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import root_init from "./root";
import store from './store';

$(() => {
  let node = $('#root')[0];
  root_init(node, store);
});