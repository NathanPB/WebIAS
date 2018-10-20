package cf.nathanpb.webias.gui

import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLTextAreaElement
import kotlin.browser.document

class CodingArea(val id: String){
    val dom = document.getElementById(id) as HTMLTextAreaElement

    val bgInput = document.getElementById("color-background") as HTMLInputElement
    val textInput = document.getElementById("color-text") as HTMLInputElement

    var background : String
        get() {
            if(dom.style.backgroundColor.isEmpty()){
                dom.style.backgroundColor = bgInput.value
            }
            return dom.style.backgroundColor
        }
        set(value) {
            dom.style.backgroundColor = value
        }

    var color : String
        get(){
            if(dom.style.color.isEmpty()){
                dom.style.color = textInput.value
            }
            return dom.style.color
        }
        set(value) {
            dom.style.color = value
        }

    init {
        bgInput.addEventListener("change", {
            background = (it.target as HTMLInputElement).value
        })

        textInput.addEventListener("change", {
            color = (it.target as HTMLInputElement).value
        })
        color; background
    }
}