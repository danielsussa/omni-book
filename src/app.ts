import {greet} from "./helper";
import './styles.scss';
import $ from 'jquery'

console.log(greet('Daniel'))

$(() => {
  const span = document.createElement("span")
    span.innerText = greet('Daniel')
    $("body").append(span)
})