import $ from 'jquery';
import {Render} from "./render/render";

export class Controller {
    render = new Render()

    showText(text: string) {
        this.render.showText()
    }
    showControl() {
        this.render.control()
    }
}