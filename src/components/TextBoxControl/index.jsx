import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";


const createTextBoxControl = (props) => {
    // console.log('props', props)
    const position = props.position ? props.position : 'bottomleft'
    const text = props.children

    let instance = null
    if (typeof L.Control.Textbox == 'undefined') {
        L.Control.Textbox = L.Control.extend({
            onAdd: function (map) {
                console.log('onAdd:', map)

                const textDiv = L.DomUtil.create('div')
                textDiv.id = "info_text"
                textDiv.innerHTML = text
                textDiv.innerHTML = `
                    <strong id="info_text" style="
                        color: black; 
                        background: white; 
                        padding: 5px; 
                        font-size: 15px; 
                        border: solid silver 1px;
                    ">${text}</strong>
                `
                
                return textDiv
            }
        });
        L.control.Textbox = (options) => new L.Control.Textbox(options)
    
        instance = L.control.Textbox({ position: position })
    } else {
        const textDiv = document.getElementById('info_text')
        textDiv.innerHTML = text
        textDiv.innerHTML = `
            <strong id="info_text" style="
                color: black; 
                background: white; 
                padding: 5px; 
                font-size: 15px; 
                border: solid silver 1px;
            ">${text}</strong>
        `
    }

    return instance
}


export const TextBoxControl = createControlComponent((props) => createTextBoxControl(props))