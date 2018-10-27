package cf.nathanpb.webias.gui

import cf.nathanpb.webias.core.MemoryArray
import cf.nathanpb.webias.core.MemoryWord
import cf.nathanpb.webias.utils.Logger
import cf.nathanpb.webias.utils.NumericUtils
import org.w3c.dom.*
import kotlin.browser.document
import kotlin.dom.clear

class MemoryTable<T>(val domid : String, val data : MemoryArray<T>) {

    val tooltip = "<span class=\"d-inline-block\" tabindex=\"0\" data-toggle=\"tooltip\" title=\"%text%\">\n" +
            "  %content%\n" +
            "</span>"

    val dom = document.getElementById(domid) as HTMLElement

    init {
        data.link(this)
        update()
    }


    fun update(){
        Logger.debug(this::class){"Memory Table '$domid' updated"}
        dom.clear()

        dom.innerHTML += "<tr><td>Addr</td><td>" + when(GUIHandler.numBase.value){
            "hex" -> "Hex"
            "dec" -> "Dec"
            "bin" -> "Bin"
            else -> "Unknown"
        } + "</td><td>Size</td></tr>"


        val el = dom.firstChild as HTMLElement
        for(w in this.data){
            val tr = document.createElement("tr")
            val inp = document.createElement("input") as HTMLInputElement

            inp.value = when(GUIHandler.numBase.value){
                "hex" -> w.value.hex
                "dec" -> w.value.decimal.toString()
                "bin" -> w.value.binary
                else -> "666"
            }
            inp.addEventListener("change", {
                try{
                    data[w.key] = when(GUIHandler.numBase.value){
                        "hex" -> MemoryWord(inp.value.toLong(16), w.value.size)
                        "bin" -> MemoryWord(NumericUtils.binaryToDecimal(inp.value), w.value.size)
                        else -> MemoryWord(inp.value.toLong(), w.value.size)
                    }
                } catch (e : Exception){
                    println(e.message)
                }
            })



            tr.innerHTML += "<td>"+when(w.key.toString()){
                "AC" -> tooltip.replace("%text%", "Accumulator | Temporary register used to store results from logic operations")
                "MQ" -> tooltip.replace("%text%", "Multiplier Quotient | Temporary register used to store results from logic operations")
                "MBR" -> tooltip.replace("%text%", "Memory Buffer Register | Used to temporarily store data read from memory or to be written")
                "IR" -> tooltip.replace("%text%", "Instruction Register | Stores the instruction being executed")
                "PC" -> tooltip.replace("%text%", "Program Counter | Stores the memory address pointing to the next word to be executed")
                "IBR" -> tooltip.replace("%text%", "Instruction Buffer Register | Stores the second instruction from the current word being executed")
                "MAR" -> tooltip.replace("%text%", "Memory Address Register | Stores a memory address that will be read from memory on read or write process")
                else -> "%content%"
            }.replace("%content%", w.key.toString())+"</td>"
            var td = document.createElement("td") as HTMLElement
            td.appendChild(inp)
            tr.appendChild(td)

            td = document.createElement("td") as HTMLElement
            td.innerHTML += w.value.size.toString()
            tr.appendChild(td)
            el.append(tr)
        }
        eval("$(document).ready(function(){$('[data-toggle=\"tooltip\"]').tooltip(); });")
    }
}