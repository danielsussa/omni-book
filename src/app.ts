import {getCursorColumn, getCursorPosition, greet, restoreCursorPosition, textToTextMap} from "./helper";
import './styles/styles.scss';
import './styles/color.scss';
import $ from 'jquery';
import {Render} from "./render";

const textMaps = textToTextMap('## Hello world\nprevious point mean that Chrome could both speak and listen on Desktop, but I haven’t tried the non OSS version (yet) … update: I did and it worked well!')
const render = new Render(textMaps)


$(() => {

  render.start()

  $('.editable').on('keyup click', function () {
    const cursor = getCursorColumn()
    const element = render.updateCursor(cursor)
     restoreCursorPosition(element, {startOffset: cursor})
  });
})