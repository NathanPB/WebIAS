package cf.nathanpb.webias.gui

import cf.nathanpb.webias.core.MemoryArray
import cf.nathanpb.webias.core.MemoryWord
import cf.nathanpb.webias.utils.Logger
import cf.nathanpb.webias.utils.NumericUtils
import org.w3c.dom.*
import kotlin.browser.document
import kotlin.dom.clear

class MemoryTable<T>(val domid : String, val data : MemoryArray<T>) {

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
            val size = document.createElement("input") as HTMLInputElement
            size.value = w.value.size.toString()

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
            size.addEventListener("change", {
                try{
                    data[w.key] = MemoryWord(w.value.decimal, size.value.toInt())
                } catch (e : Exception){}
            })

            tr.innerHTML += "<td>${w.key}</td>\n"
            var td = document.createElement("td") as HTMLElement
            td.appendChild(inp)
            tr.appendChild(td)

            td = document.createElement("td") as HTMLElement
            td.appendChild(size)
            tr.appendChild(td)
            el.append(tr)
        }
    }
}