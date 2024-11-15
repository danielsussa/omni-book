import {greet} from "./helper";
import './styles/styles.scss';
import './styles/color.scss';
import $ from 'jquery';
window.$ = window.jQuery = jQuery;
import {Controller} from "./controller";

const controller = new Controller()

console.log(greet('Daniel'))

$(() => {
  controller.showControl()
  const span = document.createElement("span")
    span.innerText = greet('Daniel')
    $("body").append(span)
})