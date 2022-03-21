import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";


const createTextBoxControl = (props) => {
    // const {position} = props
    console.log('props', props)
    const position = props.position ? props.position : 'bottomleft'
    const text = props.children

    L.Control.Textbox = L.Control.extend({
        onAdd: function (map) {
            const textDiv = L.DomUtil.create('div')
            textDiv.id = "info_text"
            textDiv.innerHTML = `<strong style='color: black; background: white; padding: 5px; font-size: 15px; border: solid silver 1px;'>${text}</strong>`
            return textDiv
        },

        onRemove: function (map) {
            // Nothing to do here
        }
    });
    L.control.Textbox = (options) => new L.Control.Textbox(options)

    const instance = L.control.Textbox({ position: position })

    return instance
}

export const TextBoxControl = createControlComponent((props) => createTextBoxControl(props))