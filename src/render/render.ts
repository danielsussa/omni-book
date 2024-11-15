import $ from 'jquery';

export class Render {
    showText() {
        // console.log('dad')
        // $('body').load('./partials/text_container.html');
    }
    control() {
        const container = document.createElement("footer")
        $('body').append(container)
    }
}