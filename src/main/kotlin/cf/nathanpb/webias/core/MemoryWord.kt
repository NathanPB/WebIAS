package cf.nathanpb.webias.core

import cf.nathanpb.webias.utils.NumericUtils
import cf.nathanpb.webias.utils.StringUtils

class MemoryWord (decimal : Long, val size : Int){

    companion object {
        val EMPTY = MemoryWord(0, 1)
    }


    val bitarray : Array<Boolean>
    val decimal : Long
    val binary : String
    val hex : String

    val binrev : String

    init {
        if(size < 0){
            throw Exception("Size must be a positive integer")
        }
        var num = NumericUtils.decimalToBinary(decimal)
        val bitbuffer = Array(size){false}
        for(i in 0 .. size){
            bitbuffer[i] = num[i] == '1'
        }

        num = StringUtils.pad(num.substring(0, size), size)

        this.bitarray = bitbuffer
        this.binrev = num.reversed()
        this.binary = num
        this.decimal = NumericUtils.binaryToDecimal(this.binary)
        this.hex = NumericUtils.binaryToHex(binary)
    }


    fun leftOpcode() = MemoryWord(NumericUtils.binaryToDecimal(leftInstruction().binary.substring(0, 8)), 8)
    fun leftAddress() = MemoryWord(NumericUtils.binaryToDecimal(leftInstruction().binary.substring(8, 20)), 8)

    fun rightOpcode() = rightInstruction().leftOpcode()
    fun rightAddress() = rightInstruction().leftAddress()

    fun leftInstruction() = MemoryWord(NumericUtils.binaryToDecimal(binary.substring(0, 20)), 20)
    fun rightInstruction() = MemoryWord(NumericUtils.binaryToDecimal(binary.substring(20, 40)), 20)


    override fun toString() = "[0x$hex\t10x$decimal\t2x$binary]"

    fun and(vararg words : MemoryWord) : MemoryWord {
        val words = formatSizes(*words)
        val ba = Array(words.first().size, {true})
        for(i in 0..(words.first().size-1)){
            if(words.any{w -> !w.bitarray[i]}) ba[i] = false
        }
        val sb = StringBuilder()
        ba.forEach { w -> sb.append(if(w) "1" else "0") }
        return MemoryWord(NumericUtils.binaryToDecimal(sb.toString()), words.first().size)
    }

    fun or(vararg words : MemoryWord) : MemoryWord {
        val words = formatSizes(*words)
        val ba = Array(words.first().size, {false})
        for(i in 0..(words.first().size-1)){
            if(words.any{w -> w.bitarray[i]}) ba[i] = true
        }
        val sb = StringBuilder()
        ba.forEach { w -> sb.append(if(w) "1" else "0") }
        return MemoryWord(NumericUtils.binaryToDecimal(sb.toString()), words.first().size)
    }

    fun isEmpty() = decimal == 0L

    private fun formatSizes(vararg words : MemoryWord) : Array<MemoryWord>{
        var list = ArrayList<MemoryWord>()
        list.addAll(words)
        if(!list.contains(this)) list.add(this)
        val size = list.sortedBy { w -> w.size }.last().size
        return list.map { w -> MemoryWord(w.decimal, size) }.toTypedArray()
    }

    /*
     * Operator Overriding
     */
    operator fun compareTo(word: MemoryWord) = decimal.compareTo(word.decimal)
    operator fun rangeTo(word : MemoryWord) = rangeTo(word.decimal)
    operator fun rangeTo(int : Long) : Array<MemoryWord> {
        val al = ArrayList<MemoryWord>()
        for(i in decimal..int){
            al.add(MemoryWord(i, size))
        }
        return al.toTypedArray()
    }
    operator fun not() : MemoryWord {
        val sb = StringBuilder()
        this.bitarray.forEach { w -> sb.append(if(w) "0" else "1") }
        return MemoryWord(NumericUtils.binaryToDecimal(sb.toString()), this.size)
    }

    operator fun plus(w : MemoryWord) = MemoryWord(this.decimal + w.decimal, this.size)
    operator fun plus(int : Long) = plus(MemoryWord(int, this.size))

    operator fun minus(w : MemoryWord) = MemoryWord(this.decimal - w.decimal, this.size)
    operator fun minus(int : Long) = minus(MemoryWord(int, this.size))

    operator fun div(w : MemoryWord) = MemoryWord(this.decimal / w.decimal, this.size)
    operator fun div(int : Long) = div(MemoryWord(int, this.size))

    operator fun times(w : MemoryWord) = MemoryWord(this.decimal * w.decimal, this.size)
    operator fun times(int : Long) = times(MemoryWord(int, this.size))

    operator fun rem(w : MemoryWord) = MemoryWord(this.decimal % w.decimal, this.size)
    operator fun rem(int : Long) = rem(MemoryWord(int, this.size))


    infix fun shl(int : Int) = MemoryWord(this.decimal.shl(int), size)
    infix fun shr(int : Int) = MemoryWord(this.decimal.shr(int), size)
}