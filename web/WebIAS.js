if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'WebIAS'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'WebIAS'.");
}
var WebIAS = function (_, Kotlin) {
  'use strict';
  var Unit = Kotlin.kotlin.Unit;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var equals = Kotlin.equals;
  var startsWith = Kotlin.kotlin.text.startsWith_7epoxm$;
  var firstOrNull = Kotlin.kotlin.collections.firstOrNull_2p1efm$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var L0 = Kotlin.Long.ZERO;
  var L1 = Kotlin.Long.ONE;
  var arrayListOf = Kotlin.kotlin.collections.arrayListOf_i5x0yv$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var L10 = Kotlin.Long.fromInt(10);
  var ensureNotNull = Kotlin.ensureNotNull;
  var throwCCE = Kotlin.throwCCE;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var toString = Kotlin.toString;
  var indexOf = Kotlin.kotlin.text.indexOf_l5u8uk$;
  var toLong = Kotlin.kotlin.text.toLong_pdl1vz$;
  var toLong_0 = Kotlin.kotlin.text.toLong_6ic1pp$;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var HashMap = Kotlin.kotlin.collections.HashMap;
  var Any = Object;
  var StringBuilder_init = Kotlin.kotlin.text.StringBuilder_init;
  var joinTo = Kotlin.kotlin.collections.joinTo_gcc71v$;
  var HashMap_init = Kotlin.kotlin.collections.HashMap_init_bwtc7$;
  var first = Kotlin.kotlin.collections.first_us0mfu$;
  var addAll = Kotlin.kotlin.collections.addAll_ye1y7v$;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var Exception = Kotlin.kotlin.Exception;
  var clear = Kotlin.kotlin.dom.clear_asww5s$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var contains = Kotlin.kotlin.collections.contains_mjy6jw$;
  var getKClass = Kotlin.getKClass;
  var toString_0 = Kotlin.kotlin.text.toString_if0zpk$;
  var contains_0 = Kotlin.kotlin.text.contains_sgbm27$;
  InstructionType.prototype = Object.create(Enum.prototype);
  InstructionType.prototype.constructor = InstructionType;
  MemoryArray.prototype = Object.create(HashMap.prototype);
  MemoryArray.prototype.constructor = MemoryArray;
  NumericType.prototype = Object.create(Enum.prototype);
  NumericType.prototype.constructor = NumericType;
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  function AssemblyParser(core, code) {
    this.core = core;
    this.instructions = ArrayList_init();
    this.changes = LinkedHashMap_init();
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), AssemblyParser_init$lambda);
    var tmp$;
    tmp$ = split(code.toUpperCase(), ['\n']).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
      var $receiver = this.core.cpu.instructions;
      var destination = ArrayList_init_0();
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var element_0 = tmp$_0.next();
        var predicate$result;
        Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), AssemblyParser_init$lambda$lambda$lambda(element_0));
        if (equals(element, element_0.lookFor())) {
          Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), AssemblyParser_init$lambda$lambda$lambda_0(element, element_0));
          predicate$result = true;
        }
         else {
          if (element.length <= element_0.lookFor().length) {
            Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), AssemblyParser_init$lambda$lambda$lambda_1(element));
            predicate$result = false;
          }
           else {
            var next = element.charCodeAt(element_0.lookFor().length);
            Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), AssemblyParser_init$lambda$lambda$lambda_2(element, element_0, next));
            predicate$result = (startsWith(element, element_0.lookFor()) && (next === 40 || next === 91));
          }
        }
        if (predicate$result)
          destination.add_11rb$(element_0);
      }
      var opcode = firstOrNull(destination);
      var args = opcode != null ? opcode.parseArgument_61zpoe$(element) : null;
      if (opcode != null) {
        this.instructions.add_11rb$(new InstructionRuntime(opcode, args));
      }
    }
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), AssemblyParser_init$lambda_0);
  }
  function AssemblyParser$writeToMemory$lambda() {
    return 'Starting Writing Proccess';
  }
  function AssemblyParser$writeToMemory$lambda$lambda(closure$addr, closure$it, closure$word) {
    return function () {
      return 'Instruction written to M[' + closure$addr.v + ']: ' + closure$it.format() + ' | ' + closure$word.v;
    };
  }
  function AssemblyParser$writeToMemory$lambda_0(this$AssemblyParser) {
    return function () {
      var curmemory = this$AssemblyParser.core.memory.toString();
      this$AssemblyParser.core.memory.get_11rb$(0).toString() + '\n';
      return 'Writing Process is Done!' + '\n' + 'Current Memory: ' + (curmemory.length === 0 ? 'Empty' : '\n' + curmemory);
    };
  }
  AssemblyParser.prototype.writeToMemory = function () {
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), AssemblyParser$writeToMemory$lambda);
    var clockdivisor = {v: false};
    var addr = {v: 0};
    var tmp$;
    tmp$ = this.instructions.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var opcode = NumericUtils$Companion_getInstance().pad_bm4lxs$(NumericUtils$Companion_getInstance().decimalToBinary_s8cxhz$(Kotlin.Long.fromInt(element.ins.opcode)), 8);
      var adr = element.arg == null ? '000000000000' : NumericUtils$Companion_getInstance().pad_bm4lxs$(element.arg.binary, 12);
      var word = {v: new MemoryWord(NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(opcode + adr), 40)};
      if (clockdivisor.v) {
        word.v = new MemoryWord(NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(this.core.memory.get_11rb$(addr.v).firstInstruction().binary + word.v.firstInstruction().binary), 40);
      }
      var $receiver = this.core.memory;
      var key = addr.v;
      var value = word.v;
      $receiver.put_xwzc9p$(key, value);
      if (this.changes.containsKey_11rb$(addr.v))
        this.changes.remove_11rb$(addr.v);
      var $receiver_0 = this.changes;
      var key_0 = addr.v;
      var value_0 = word.v;
      $receiver_0.put_xwzc9p$(key_0, value_0);
      Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), AssemblyParser$writeToMemory$lambda$lambda(addr, element, word));
      if (clockdivisor.v) {
        addr.v = addr.v + 1 | 0;
      }
      clockdivisor.v = !clockdivisor.v;
    }
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), AssemblyParser$writeToMemory$lambda_0(this));
  };
  function AssemblyParser_init$lambda() {
    return 'Starting Parsing Process';
  }
  function AssemblyParser_init$lambda$lambda$lambda(closure$it) {
    return function () {
      return closure$it.display;
    };
  }
  function AssemblyParser_init$lambda$lambda$lambda_0(closure$line, closure$it) {
    return function () {
      return 'return ' + closure$line + ' = ' + closure$it.display;
    };
  }
  function AssemblyParser_init$lambda$lambda$lambda_1(closure$line) {
    return function () {
      return 'return ' + closure$line + ' = nada';
    };
  }
  function AssemblyParser_init$lambda$lambda$lambda_2(closure$line, closure$it, closure$next) {
    return function () {
      return startsWith(closure$line, closure$it.lookFor()) && (closure$next === 40 || closure$next === 91) ? closure$line + ' = ' + closure$it.lookFor() : closure$line + ' = nada';
    };
  }
  function AssemblyParser_init$lambda_0() {
    return 'Parsing Process is Done';
  }
  AssemblyParser.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AssemblyParser',
    interfaces: []
  };
  function CPU(core) {
    this.core = core;
    this.instructions = arrayListOf([new LoadMQ(), new LoadMQMX(), new StorMX()]);
    this.CU = new MemoryArray(4, 'CU');
    this.ALU = new MemoryArray(3, 'ALU');
    var $receiver = this.CU;
    var value = new MemoryWord(L0, 12);
    $receiver.put_xwzc9p$('PC', value);
    var $receiver_0 = this.CU;
    var value_0 = new MemoryWord(L0, 20);
    $receiver_0.put_xwzc9p$('IR', value_0);
    var $receiver_1 = this.CU;
    var value_1 = new MemoryWord(L0, 12);
    $receiver_1.put_xwzc9p$('MAR', value_1);
    var $receiver_2 = this.CU;
    var value_2 = new MemoryWord(L0, 20);
    $receiver_2.put_xwzc9p$('IBR', value_2);
    var $receiver_3 = this.ALU;
    var value_3 = new MemoryWord(L0, 20);
    $receiver_3.put_xwzc9p$('AC', value_3);
    var $receiver_4 = this.ALU;
    var value_4 = new MemoryWord(L0, 20);
    $receiver_4.put_xwzc9p$('MQ', value_4);
    var $receiver_5 = this.ALU;
    var value_5 = new MemoryWord(L0, 40);
    $receiver_5.put_xwzc9p$('MBR', value_5);
  }
  CPU.prototype.next = function () {
    this.nextSearchCycle();
    this.nextExecutionCycle();
  };
  CPU.prototype.nextSearchCycle = function () {
    if (this.CU.get_11rb$('IBR').isEmpty()) {
      var $receiver = this.CU;
      var value = this.CU.get_11rb$('PC');
      $receiver.put_xwzc9p$('MAR', value);
      var word = this.core.memory.get_11rb$(this.CU.get_11rb$('PC').decimal.toInt());
      var $receiver_0 = this.CU;
      var value_0 = word.firstInstruction();
      $receiver_0.put_xwzc9p$('IR', value_0);
      var $receiver_1 = this.CU;
      var value_1 = word.secondInstruction();
      $receiver_1.put_xwzc9p$('IBR', value_1);
      this.core.memory.read_l3l29p$(this);
    }
     else {
      var $receiver_2 = this.CU;
      var value_2 = this.CU.get_11rb$('IBR');
      $receiver_2.put_xwzc9p$('IR', value_2);
      var $receiver_3 = this.CU;
      var value_3 = new MemoryWord(L0, 0);
      $receiver_3.put_xwzc9p$('IBR', value_3);
      var $receiver_4 = this.CU;
      var value_4 = this.CU.get_11rb$('PC').plus_s8cxhz$(L1);
      $receiver_4.put_xwzc9p$('PC', value_4);
    }
  };
  function CPU$nextExecutionCycle$lambda(this$CPU) {
    return function () {
      return this$CPU.CU.get_11rb$('IR').toString() + '\n' + this$CPU.CU.get_11rb$('IR').firstOpcode() + '\n' + this$CPU.CU.get_11rb$('IR').secondOpcode();
    };
  }
  CPU.prototype.nextExecutionCycle = function () {
    var tmp$;
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), CPU$nextExecutionCycle$lambda(this));
    var $receiver = this.instructions;
    var destination = ArrayList_init();
    var tmp$_0;
    tmp$_0 = $receiver.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      if (element.opcode === this.CU.get_11rb$('IR').firstOpcode().decimal.toInt())
        destination.add_11rb$(element);
    }
    (tmp$ = firstOrNull(destination)) != null ? (tmp$.run_82bctx$(this.core), Unit) : null;
  };
  CPU.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CPU',
    interfaces: []
  };
  function IASCore() {
    IASCore$Companion_getInstance();
    this.cpu = new CPU(this);
    this.memory = new MemoryArray(1024, 'RAM');
    var tmp$;
    tmp$ = this.memory.capacity;
    for (var i = 0; i < tmp$; i++) {
      var $receiver = this.memory;
      var value = new MemoryWord(L0, 40);
      $receiver.put_xwzc9p$(i, value);
    }
  }
  function IASCore$Companion() {
    IASCore$Companion_instance = this;
    this.instance = null;
    this.debug = true;
  }
  IASCore$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var IASCore$Companion_instance = null;
  function IASCore$Companion_getInstance() {
    if (IASCore$Companion_instance === null) {
      new IASCore$Companion();
    }
    return IASCore$Companion_instance;
  }
  IASCore.prototype.toString = function () {
    var cpu = this.cpu.ALU.toString() + '\n' + this.cpu.CU.toString();
    return '[CPU]' + '\n' + cpu + '\n' + '\n' + '[Memory]' + '\n' + this.memory;
  };
  IASCore.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'IASCore',
    interfaces: []
  };
  function main(args) {
    var tmp$;
    IASCore$Companion_getInstance().instance = new IASCore();
    var $receiver = ensureNotNull(IASCore$Companion_getInstance().instance).memory;
    var value = new MemoryWord(L10, 40);
    $receiver.put_xwzc9p$(1, value);
    new GUIHandler(Kotlin.isType(tmp$ = IASCore$Companion_getInstance().instance, IASCore) ? tmp$ : throwCCE());
  }
  function InstructionRuntime(ins, arg) {
    this.ins = ins;
    this.arg = arg;
  }
  InstructionRuntime.prototype.format = function () {
    return replace(this.ins.display, 'X', this.arg == null ? '10x0' : '10x' + this.arg.decimal);
  };
  InstructionRuntime.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'InstructionRuntime',
    interfaces: []
  };
  InstructionRuntime.prototype.component1 = function () {
    return this.ins;
  };
  InstructionRuntime.prototype.component2 = function () {
    return this.arg;
  };
  InstructionRuntime.prototype.copy_pke5d9$ = function (ins, arg) {
    return new InstructionRuntime(ins === void 0 ? this.ins : ins, arg === void 0 ? this.arg : arg);
  };
  InstructionRuntime.prototype.toString = function () {
    return 'InstructionRuntime(ins=' + Kotlin.toString(this.ins) + (', arg=' + Kotlin.toString(this.arg)) + ')';
  };
  InstructionRuntime.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.ins) | 0;
    result = result * 31 + Kotlin.hashCode(this.arg) | 0;
    return result;
  };
  InstructionRuntime.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.ins, other.ins) && Kotlin.equals(this.arg, other.arg)))));
  };
  function Instruction() {
  }
  Instruction.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Instruction',
    interfaces: []
  };
  function LoadMQ() {
    this.opcode_vrzvuc$_0 = 10;
    this.description_tamtuq$_0 = 'Transfer data from MQ to AC';
    this.display_nb4ajc$_0 = 'LOAD MQ';
    this.type_f9v9gg$_0 = InstructionType$DATA_TRANSFER_getInstance();
    this.argswordsize_ilradq$_0 = 0;
  }
  Object.defineProperty(LoadMQ.prototype, 'opcode', {
    get: function () {
      return this.opcode_vrzvuc$_0;
    }
  });
  Object.defineProperty(LoadMQ.prototype, 'description', {
    get: function () {
      return this.description_tamtuq$_0;
    }
  });
  Object.defineProperty(LoadMQ.prototype, 'display', {
    get: function () {
      return this.display_nb4ajc$_0;
    }
  });
  Object.defineProperty(LoadMQ.prototype, 'type', {
    get: function () {
      return this.type_f9v9gg$_0;
    }
  });
  Object.defineProperty(LoadMQ.prototype, 'argswordsize', {
    get: function () {
      return this.argswordsize_ilradq$_0;
    }
  });
  function LoadMQ$run$lambda(this$LoadMQ) {
    return function () {
      return 'Run: ' + toString(Kotlin.getKClassFromExpression(this$LoadMQ).simpleName);
    };
  }
  LoadMQ.prototype.run_82bctx$ = function (core) {
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), LoadMQ$run$lambda(this));
    var $receiver = core.cpu.ALU;
    var value = core.cpu.ALU.get_11rb$('MQ');
    $receiver.put_xwzc9p$('AC', value);
  };
  LoadMQ.prototype.parseArgument_61zpoe$ = function (text) {
    return new MemoryWord(L0, 12);
  };
  LoadMQ.prototype.lookFor = function () {
    return this.display;
  };
  LoadMQ.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LoadMQ',
    interfaces: [Instruction]
  };
  function LoadMQMX() {
    this.opcode_2h69tj$_0 = 9;
    this.description_y8g5qr$_0 = 'Transfer data from Memory[X] to MQ';
    this.display_jqqcgd$_0 = 'LOAD MQ,M(X)';
    this.type_42012t$_0 = InstructionType$DATA_TRANSFER_getInstance();
    this.argswordsize_wzrvrx$_0 = 20;
  }
  Object.defineProperty(LoadMQMX.prototype, 'opcode', {
    get: function () {
      return this.opcode_2h69tj$_0;
    }
  });
  Object.defineProperty(LoadMQMX.prototype, 'description', {
    get: function () {
      return this.description_y8g5qr$_0;
    }
  });
  Object.defineProperty(LoadMQMX.prototype, 'display', {
    get: function () {
      return this.display_jqqcgd$_0;
    }
  });
  Object.defineProperty(LoadMQMX.prototype, 'type', {
    get: function () {
      return this.type_42012t$_0;
    }
  });
  Object.defineProperty(LoadMQMX.prototype, 'argswordsize', {
    get: function () {
      return this.argswordsize_wzrvrx$_0;
    }
  });
  function LoadMQMX$run$lambda(this$LoadMQMX) {
    return function () {
      return 'Run: ' + toString(Kotlin.getKClassFromExpression(this$LoadMQMX).simpleName);
    };
  }
  LoadMQMX.prototype.run_82bctx$ = function (core) {
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), LoadMQMX$run$lambda(this));
    var $receiver = core.cpu.CU;
    var value = core.cpu.CU.get_11rb$('IR').firstAddress();
    $receiver.put_xwzc9p$('MAR', value);
    core.memory.read_l3l29p$(core.cpu);
    var $receiver_0 = core.cpu.ALU;
    var value_0 = core.cpu.ALU.get_11rb$('MBR');
    $receiver_0.put_xwzc9p$('MQ', value_0);
  };
  LoadMQMX.prototype.parseArgument_61zpoe$ = function (text) {
    var tmp$;
    var endIndex = indexOf(text, ')');
    var t = text.substring(10, endIndex);
    switch (NumericUtils$Companion_getInstance().getType_za3rmp$(t).name) {
      case 'DECIMAL':
        tmp$ = toLong(t);
        break;
      case 'BINARY':
        tmp$ = NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(t);
        break;
      case 'HEXADECIMAL':
        tmp$ = toLong_0(t, 16);
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return new MemoryWord(tmp$, 12);
  };
  LoadMQMX.prototype.lookFor = function () {
    return this.display.substring(0, 9);
  };
  LoadMQMX.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LoadMQMX',
    interfaces: [Instruction]
  };
  function StorMX() {
    this.opcode_bv641$_0 = 33;
    this.description_1vcsh3$_0 = 'Transfers data from AC to Memory[X]';
    this.display_o7a7gz$_0 = 'STOR M(X)';
    this.type_hlk41x$_0 = InstructionType$DATA_TRANSFER_getInstance();
    this.argswordsize_ktgrc9$_0 = 20;
  }
  Object.defineProperty(StorMX.prototype, 'opcode', {
    get: function () {
      return this.opcode_bv641$_0;
    }
  });
  Object.defineProperty(StorMX.prototype, 'description', {
    get: function () {
      return this.description_1vcsh3$_0;
    }
  });
  Object.defineProperty(StorMX.prototype, 'display', {
    get: function () {
      return this.display_o7a7gz$_0;
    }
  });
  Object.defineProperty(StorMX.prototype, 'type', {
    get: function () {
      return this.type_hlk41x$_0;
    }
  });
  Object.defineProperty(StorMX.prototype, 'argswordsize', {
    get: function () {
      return this.argswordsize_ktgrc9$_0;
    }
  });
  function StorMX$run$lambda(this$StorMX) {
    return function () {
      return 'Run: ' + toString(Kotlin.getKClassFromExpression(this$StorMX).simpleName);
    };
  }
  StorMX.prototype.run_82bctx$ = function (core) {
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), StorMX$run$lambda(this));
    var $receiver = core.cpu.ALU;
    var value = core.cpu.ALU.get_11rb$('AC');
    $receiver.put_xwzc9p$('MBR', value);
    var $receiver_0 = core.cpu.CU;
    var value_0 = core.cpu.CU.get_11rb$('IR').firstAddress();
    $receiver_0.put_xwzc9p$('MAR', value_0);
    core.memory.read_l3l29p$(core.cpu);
  };
  StorMX.prototype.parseArgument_61zpoe$ = function (text) {
    var tmp$;
    var startIndex = indexOf(text, '(') + 1 | 0;
    var endIndex = indexOf(text, ')');
    var t = text.substring(startIndex, endIndex);
    switch (NumericUtils$Companion_getInstance().getType_za3rmp$(t).name) {
      case 'DECIMAL':
        tmp$ = toLong(t);
        break;
      case 'BINARY':
        tmp$ = NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(t);
        break;
      case 'HEXADECIMAL':
        tmp$ = toLong_0(t, 16);
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return new MemoryWord(tmp$, 12);
  };
  StorMX.prototype.lookFor = function () {
    return this.display.substring(0, 6);
  };
  StorMX.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StorMX',
    interfaces: [Instruction]
  };
  function InstructionType(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function InstructionType_initFields() {
    InstructionType_initFields = function () {
    };
    InstructionType$DATA_TRANSFER_instance = new InstructionType('DATA_TRANSFER', 0);
    InstructionType$UNCONDITIONA_BRANCH_instance = new InstructionType('UNCONDITIONA_BRANCH', 1);
    InstructionType$CONDITIONAL_BRANCH_instance = new InstructionType('CONDITIONAL_BRANCH', 2);
    InstructionType$ARITHIMETIC_instance = new InstructionType('ARITHIMETIC', 3);
    InstructionType$ADDRESS_MODIFY_instance = new InstructionType('ADDRESS_MODIFY', 4);
  }
  var InstructionType$DATA_TRANSFER_instance;
  function InstructionType$DATA_TRANSFER_getInstance() {
    InstructionType_initFields();
    return InstructionType$DATA_TRANSFER_instance;
  }
  var InstructionType$UNCONDITIONA_BRANCH_instance;
  function InstructionType$UNCONDITIONA_BRANCH_getInstance() {
    InstructionType_initFields();
    return InstructionType$UNCONDITIONA_BRANCH_instance;
  }
  var InstructionType$CONDITIONAL_BRANCH_instance;
  function InstructionType$CONDITIONAL_BRANCH_getInstance() {
    InstructionType_initFields();
    return InstructionType$CONDITIONAL_BRANCH_instance;
  }
  var InstructionType$ARITHIMETIC_instance;
  function InstructionType$ARITHIMETIC_getInstance() {
    InstructionType_initFields();
    return InstructionType$ARITHIMETIC_instance;
  }
  var InstructionType$ADDRESS_MODIFY_instance;
  function InstructionType$ADDRESS_MODIFY_getInstance() {
    InstructionType_initFields();
    return InstructionType$ADDRESS_MODIFY_instance;
  }
  InstructionType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'InstructionType',
    interfaces: [Enum]
  };
  function InstructionType$values() {
    return [InstructionType$DATA_TRANSFER_getInstance(), InstructionType$UNCONDITIONA_BRANCH_getInstance(), InstructionType$CONDITIONAL_BRANCH_getInstance(), InstructionType$ARITHIMETIC_getInstance(), InstructionType$ADDRESS_MODIFY_getInstance()];
  }
  InstructionType.values = InstructionType$values;
  function InstructionType$valueOf(name) {
    switch (name) {
      case 'DATA_TRANSFER':
        return InstructionType$DATA_TRANSFER_getInstance();
      case 'UNCONDITIONA_BRANCH':
        return InstructionType$UNCONDITIONA_BRANCH_getInstance();
      case 'CONDITIONAL_BRANCH':
        return InstructionType$CONDITIONAL_BRANCH_getInstance();
      case 'ARITHIMETIC':
        return InstructionType$ARITHIMETIC_getInstance();
      case 'ADDRESS_MODIFY':
        return InstructionType$ADDRESS_MODIFY_getInstance();
      default:throwISE('No enum constant cf.nathanpb.webias.core.InstructionType.' + name);
    }
  }
  InstructionType.valueOf_61zpoe$ = InstructionType$valueOf;
  function MemoryArray(capacity, name) {
    HashMap_init(capacity, this);
    this.capacity = capacity;
    this.name = name;
    this.links_0 = ArrayList_init();
  }
  function MemoryArray$get$lambda(this$MemoryArray, closure$index, closure$a) {
    return function () {
      return '[' + this$MemoryArray.name + '] Internal Memory Read: [' + closure$index + '] = ' + closure$a;
    };
  }
  MemoryArray.prototype.get_11rb$ = function (index) {
    var tmp$;
    var a = (tmp$ = HashMap.prototype.get_11rb$.call(this, index)) != null ? tmp$ : new MemoryWord(L0, 0);
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), MemoryArray$get$lambda(this, index, a));
    return a;
  };
  function MemoryArray$put$lambda(this$MemoryArray, closure$key, closure$a) {
    return function () {
      return '[' + this$MemoryArray.name + '] Internal Memory Write: [' + closure$key + '] = ' + toString(closure$a);
    };
  }
  MemoryArray.prototype.put_xwzc9p$ = function (key, value) {
    var a = HashMap.prototype.put_xwzc9p$.call(this, key, value);
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), MemoryArray$put$lambda(this, key, a));
    var tmp$;
    tmp$ = this.links_0.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.update();
    }
    return a;
  };
  MemoryArray.prototype.read_l3l29p$ = function (cpu) {
    var tmp$, tmp$_0;
    tmp$_0 = (tmp$ = cpu.CU.get_11rb$('MAR').decimal) == null || Kotlin.isType(tmp$, Any) ? tmp$ : throwCCE();
    var $receiver = cpu.ALU;
    var value = this.get_11rb$(tmp$_0);
    $receiver.put_xwzc9p$('MBR', value);
  };
  MemoryArray.prototype.write_l3l29p$ = function (cpu) {
    var tmp$, tmp$_0;
    tmp$_0 = (tmp$ = cpu.CU.get_11rb$('MAR').decimal) == null || Kotlin.isType(tmp$, Any) ? tmp$ : throwCCE();
    var value = cpu.ALU.get_11rb$('MBR');
    this.put_xwzc9p$(tmp$_0, value);
  };
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  MemoryArray.prototype.toString = function () {
    var destination = LinkedHashMap_init();
    var tmp$;
    tmp$ = this.entries.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (!element.value.isEmpty()) {
        destination.put_xwzc9p$(element.key, element.value);
      }
    }
    var destination_0 = ArrayList_init_0(destination.size);
    var tmp$_0;
    tmp$_0 = destination.entries.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      destination_0.add_11rb$(item.key.toString() + ':' + '\t' + item.value);
    }
    return joinTo(destination_0, StringBuilder_init(), '\n').toString();
  };
  MemoryArray.prototype.link_9yyv1$ = function (table) {
    return this.links_0.add_11rb$(table);
  };
  MemoryArray.prototype.unlink_9yyv1$ = function (table) {
    return this.links_0.remove_11rb$(table);
  };
  MemoryArray.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MemoryArray',
    interfaces: [HashMap]
  };
  var Array_0 = Array;
  var reversed = Kotlin.kotlin.text.reversed_gw00vp$;
  function MemoryWord(decimal, size) {
    this.size = size;
    this.bitarray = null;
    this.decimal = null;
    this.binary = null;
    this.hex = null;
    this.binrev = null;
    var tmp$;
    var num = NumericUtils$Companion_getInstance().decimalToBinary_s8cxhz$(decimal);
    var array = Array_0(this.size);
    var tmp$_0;
    tmp$_0 = array.length - 1 | 0;
    for (var i = 0; i <= tmp$_0; i++) {
      array[i] = false;
    }
    var bitbuffer = array;
    tmp$ = this.size;
    for (var i_0 = 0; i_0 < tmp$; i_0++) {
      bitbuffer[i_0] = num.charCodeAt(i_0) === 49;
    }
    var tmp$_1 = NumericUtils$Companion_getInstance();
    var $receiver = num;
    var endIndex = this.size - 1 | 0;
    num = tmp$_1.pad_bm4lxs$($receiver.substring(0, endIndex), this.size);
    this.bitarray = bitbuffer;
    var $receiver_0 = num;
    var tmp$_2;
    this.binrev = reversed(Kotlin.isCharSequence(tmp$_2 = $receiver_0) ? tmp$_2 : throwCCE()).toString();
    this.binary = num;
    this.decimal = NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(this.binary);
    this.hex = NumericUtils$Companion_getInstance().binaryToHexa_61zpoe$(this.binary);
  }
  MemoryWord.prototype.firstOpcode = function () {
    return new MemoryWord(NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(this.firstInstruction().binary.substring(0, 7)), 8);
  };
  MemoryWord.prototype.firstAddress = function () {
    return new MemoryWord(NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(this.firstInstruction().binary.substring(8, 20)), 8);
  };
  MemoryWord.prototype.secondOpcode = function () {
    return this.secondInstruction().firstOpcode();
  };
  MemoryWord.prototype.secondAddress = function () {
    return this.secondInstruction().firstAddress();
  };
  MemoryWord.prototype.firstInstruction = function () {
    return new MemoryWord(NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(this.binary.substring(20, 40)), 20);
  };
  MemoryWord.prototype.secondInstruction = function () {
    return new MemoryWord(NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(this.binary.substring(0, 19)), 20);
  };
  MemoryWord.prototype.toString = function () {
    return '[0x' + this.hex + '\t' + '10x' + this.decimal + '\t' + '2x' + this.binary + ']';
  };
  MemoryWord.prototype.and_8pxj93$ = function (words) {
    var tmp$;
    var words_0 = this.formatSizes_0(words.slice());
    var array = Array_0(first(words_0).size);
    var tmp$_0;
    tmp$_0 = array.length - 1 | 0;
    for (var i = 0; i <= tmp$_0; i++) {
      array[i] = true;
    }
    var ba = array;
    tmp$ = first(words_0).size - 1 | 0;
    loop_label: for (var i_0 = 0; i_0 <= tmp$; i_0++) {
      var any$result;
      any$break: do {
        var tmp$_1;
        for (tmp$_1 = 0; tmp$_1 !== words_0.length; ++tmp$_1) {
          var element = words_0[tmp$_1];
          if (!element.bitarray[i_0]) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
       while (false);
      if (any$result)
        ba[i_0] = false;
    }
    var sb = StringBuilder_init();
    var tmp$_2;
    for (tmp$_2 = 0; tmp$_2 !== ba.length; ++tmp$_2) {
      var element_0 = ba[tmp$_2];
      sb.append_gw00v9$(element_0 ? '1' : '0');
    }
    return new MemoryWord(NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(sb.toString()), first(words_0).size);
  };
  MemoryWord.prototype.or_8pxj93$ = function (words) {
    var tmp$;
    var words_0 = this.formatSizes_0(words.slice());
    var array = Array_0(first(words_0).size);
    var tmp$_0;
    tmp$_0 = array.length - 1 | 0;
    for (var i = 0; i <= tmp$_0; i++) {
      array[i] = false;
    }
    var ba = array;
    tmp$ = first(words_0).size - 1 | 0;
    loop_label: for (var i_0 = 0; i_0 <= tmp$; i_0++) {
      var any$result;
      any$break: do {
        var tmp$_1;
        for (tmp$_1 = 0; tmp$_1 !== words_0.length; ++tmp$_1) {
          var element = words_0[tmp$_1];
          if (element.bitarray[i_0]) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
       while (false);
      if (any$result)
        ba[i_0] = true;
    }
    var sb = StringBuilder_init();
    var tmp$_2;
    for (tmp$_2 = 0; tmp$_2 !== ba.length; ++tmp$_2) {
      var element_0 = ba[tmp$_2];
      sb.append_gw00v9$(element_0 ? '1' : '0');
    }
    return new MemoryWord(NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(sb.toString()), first(words_0).size);
  };
  MemoryWord.prototype.isEmpty = function () {
    return equals(this.decimal, L0);
  };
  function MemoryWord$formatSizes$lambda(w) {
    return w.size;
  }
  var sortedWith = Kotlin.kotlin.collections.sortedWith_eknfly$;
  var wrapFunction = Kotlin.wrapFunction;
  var compareBy$lambda = wrapFunction(function () {
    var compareValues = Kotlin.kotlin.comparisons.compareValues_s00gnj$;
    return function (closure$selector) {
      return function (a, b) {
        var selector = closure$selector;
        return compareValues(selector(a), selector(b));
      };
    };
  });
  var Comparator = Kotlin.kotlin.Comparator;
  function Comparator$ObjectLiteral(closure$comparison) {
    this.closure$comparison = closure$comparison;
  }
  Comparator$ObjectLiteral.prototype.compare = function (a, b) {
    return this.closure$comparison(a, b);
  };
  Comparator$ObjectLiteral.$metadata$ = {kind: Kind_CLASS, interfaces: [Comparator]};
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  MemoryWord.prototype.formatSizes_0 = function (words) {
    var list = ArrayList_init();
    addAll(list, words);
    if (!list.contains_11rb$(this))
      list.add_11rb$(this);
    var size = last(sortedWith(list, new Comparator$ObjectLiteral(compareBy$lambda(MemoryWord$formatSizes$lambda)))).size;
    var destination = ArrayList_init_0(collectionSizeOrDefault(list, 10));
    var tmp$;
    tmp$ = list.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(new MemoryWord(item.decimal, size));
    }
    return copyToArray(destination);
  };
  MemoryWord.prototype.compareTo_ty9t1s$ = function (word) {
    return this.decimal.compareTo_11rb$(word.decimal);
  };
  MemoryWord.prototype.rangeTo_ty9t1s$ = function (word) {
    return this.rangeTo_s8cxhz$(word.decimal);
  };
  MemoryWord.prototype.rangeTo_s8cxhz$ = function (int) {
    var tmp$;
    var al = ArrayList_init();
    tmp$ = this.decimal.rangeTo(int).iterator();
    while (tmp$.hasNext()) {
      var i = tmp$.next();
      al.add_11rb$(new MemoryWord(i, this.size));
    }
    return copyToArray(al);
  };
  MemoryWord.prototype.not = function () {
    var sb = StringBuilder_init();
    var $receiver = this.bitarray;
    var tmp$;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var element = $receiver[tmp$];
      sb.append_gw00v9$(element ? '0' : '1');
    }
    return new MemoryWord(NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(sb.toString()), this.size);
  };
  MemoryWord.prototype.plus_ty9t1s$ = function (w) {
    return new MemoryWord(this.decimal.add(w.decimal), this.size);
  };
  MemoryWord.prototype.plus_s8cxhz$ = function (int) {
    return this.plus_ty9t1s$(new MemoryWord(int, this.size));
  };
  MemoryWord.prototype.minus_ty9t1s$ = function (w) {
    return new MemoryWord(this.decimal.subtract(w.decimal), this.size);
  };
  MemoryWord.prototype.minus_s8cxhz$ = function (int) {
    return this.minus_ty9t1s$(new MemoryWord(int, this.size));
  };
  MemoryWord.prototype.div_ty9t1s$ = function (w) {
    return new MemoryWord(this.decimal.div(w.decimal), this.size);
  };
  MemoryWord.prototype.div_s8cxhz$ = function (int) {
    return this.div_ty9t1s$(new MemoryWord(int, this.size));
  };
  MemoryWord.prototype.times_ty9t1s$ = function (w) {
    return new MemoryWord(this.decimal.multiply(w.decimal), this.size);
  };
  MemoryWord.prototype.times_s8cxhz$ = function (int) {
    return this.times_ty9t1s$(new MemoryWord(int, this.size));
  };
  MemoryWord.prototype.rem_ty9t1s$ = function (w) {
    return new MemoryWord(this.decimal.modulo(w.decimal), this.size);
  };
  MemoryWord.prototype.rem_s8cxhz$ = function (int) {
    return this.rem_ty9t1s$(new MemoryWord(int, this.size));
  };
  MemoryWord.prototype.shl_za3lpa$ = function (int) {
    return new MemoryWord(this.decimal.shiftLeft(int), this.size);
  };
  MemoryWord.prototype.shr_za3lpa$ = function (int) {
    return new MemoryWord(this.decimal.shiftRight(int), this.size);
  };
  MemoryWord.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MemoryWord',
    interfaces: []
  };
  function CodingArea(id) {
    this.id = id;
    var tmp$, tmp$_0, tmp$_1;
    this.dom = Kotlin.isType(tmp$ = document.getElementById(this.id), HTMLTextAreaElement) ? tmp$ : throwCCE();
    this.bgInput = Kotlin.isType(tmp$_0 = document.getElementById('color-background'), HTMLInputElement) ? tmp$_0 : throwCCE();
    this.textInput = Kotlin.isType(tmp$_1 = document.getElementById('color-text'), HTMLInputElement) ? tmp$_1 : throwCCE();
    this.bgInput.addEventListener('change', CodingArea_init$lambda(this));
    this.textInput.addEventListener('change', CodingArea_init$lambda_0(this));
    this.color;
    this.background;
  }
  Object.defineProperty(CodingArea.prototype, 'background', {
    get: function () {
      if (this.dom.style.backgroundColor.length === 0) {
        this.dom.style.backgroundColor = this.bgInput.value;
      }
      return this.dom.style.backgroundColor;
    },
    set: function (value) {
      this.dom.style.backgroundColor = value;
    }
  });
  Object.defineProperty(CodingArea.prototype, 'color', {
    get: function () {
      if (this.dom.style.color.length === 0) {
        this.dom.style.color = this.textInput.value;
      }
      return this.dom.style.color;
    },
    set: function (value) {
      this.dom.style.color = value;
    }
  });
  function CodingArea_init$lambda(this$CodingArea) {
    return function (it) {
      var tmp$;
      this$CodingArea.background = (Kotlin.isType(tmp$ = it.target, HTMLInputElement) ? tmp$ : throwCCE()).value;
      return Unit;
    };
  }
  function CodingArea_init$lambda_0(this$CodingArea) {
    return function (it) {
      var tmp$;
      this$CodingArea.color = (Kotlin.isType(tmp$ = it.target, HTMLInputElement) ? tmp$ : throwCCE()).value;
      return Unit;
    };
  }
  CodingArea.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CodingArea',
    interfaces: []
  };
  function GUIHandler(core) {
    GUIHandler$Companion_getInstance();
    this.core = core;
    this.mainmemory = new MemoryTable('main-memory', this.core.memory);
    this.cu = new MemoryTable('cu-memory', this.core.cpu.CU);
    this.alu = new MemoryTable('alu-memory', this.core.cpu.ALU);
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    (tmp$ = document.querySelector('#button-next-search')) != null ? (tmp$.addEventListener('click', GUIHandler_init$lambda(this)), Unit) : null;
    (tmp$_0 = document.querySelector('#button-next-execution')) != null ? (tmp$_0.addEventListener('click', GUIHandler_init$lambda_0(this)), Unit) : null;
    (tmp$_1 = document.querySelector('#button-next')) != null ? (tmp$_1.addEventListener('click', GUIHandler_init$lambda_1(this)), Unit) : null;
    (tmp$_2 = document.querySelector('#button-w2m')) != null ? (tmp$_2.addEventListener('click', GUIHandler_init$lambda_2(this)), Unit) : null;
    document.querySelector('#debugger-filter');
    GUIHandler$Companion_getInstance().numBase.addEventListener('change', GUIHandler_init$lambda_3(this));
  }
  function GUIHandler$Companion() {
    GUIHandler$Companion_instance = this;
    this.terminal = new CodingArea('coding-area');
    var tmp$;
    this.numBase = Kotlin.isType(tmp$ = document.querySelector('#numeric-base-display'), HTMLSelectElement) ? tmp$ : throwCCE();
  }
  GUIHandler$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var GUIHandler$Companion_instance = null;
  function GUIHandler$Companion_getInstance() {
    if (GUIHandler$Companion_instance === null) {
      new GUIHandler$Companion();
    }
    return GUIHandler$Companion_instance;
  }
  function GUIHandler_init$lambda(this$GUIHandler) {
    return function (it) {
      this$GUIHandler.core.cpu.nextSearchCycle();
      return Unit;
    };
  }
  function GUIHandler_init$lambda_0(this$GUIHandler) {
    return function (it) {
      this$GUIHandler.core.cpu.nextExecutionCycle();
      return Unit;
    };
  }
  function GUIHandler_init$lambda_1(this$GUIHandler) {
    return function (it) {
      this$GUIHandler.core.cpu.next();
      return Unit;
    };
  }
  function GUIHandler_init$lambda_2(this$GUIHandler) {
    return function (it) {
      var text = "<span style='color: green;'>Assembled Successful<\/span>\n";
      var telement = document.querySelector('#assembler-status-text');
      var tlist = document.querySelector('#assembler-status-list');
      telement != null ? (telement.innerHTML = '') : null;
      tlist != null ? (tlist.innerHTML = '') : null;
      try {
        var parser = new AssemblyParser(this$GUIHandler.core, GUIHandler$Companion_getInstance().terminal.dom.value);
        parser.writeToMemory();
        var $receiver = parser.changes;
        var destination = ArrayList_init_0($receiver.size);
        var tmp$;
        tmp$ = $receiver.entries.iterator();
        while (tmp$.hasNext()) {
          var item = tmp$.next();
          destination.add_11rb$('M[' + item.key + '] = ' + item.value);
        }
        var tmp$_0;
        tmp$_0 = destination.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          tlist != null ? (tlist.innerHTML = (tlist != null ? tlist.innerHTML : null) + ('\n' + "<li class='list-group-item'>" + element + '<\/li>')) : null;
        }
      }
       catch (ex) {
        if (Kotlin.isType(ex, Exception)) {
          text = "<span style='color: red;'>" + toString(ex.message) + '<\/span>';
        }
         else
          throw ex;
      }
      telement != null ? (telement.innerHTML = text) : null;
      eval("$('#modal-assemblerstatus').modal({focus: true, show: true})");
      return Unit;
    };
  }
  function GUIHandler_init$lambda_3(this$GUIHandler) {
    return function (it) {
      this$GUIHandler.mainmemory.update();
      this$GUIHandler.cu.update();
      this$GUIHandler.alu.update();
      return Unit;
    };
  }
  GUIHandler.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GUIHandler',
    interfaces: []
  };
  function MemoryTable(domid, data) {
    this.domid = domid;
    this.data = data;
    this.tooltip = '<span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="%text%">\n' + '  %content%\n' + '<\/span>';
    var tmp$;
    this.dom = Kotlin.isType(tmp$ = document.getElementById(this.domid), HTMLElement) ? tmp$ : throwCCE();
    this.data.link_9yyv1$(this);
    this.update();
  }
  function MemoryTable$update$lambda(this$MemoryTable) {
    return function () {
      return "Memory Table '" + this$MemoryTable.domid + "' updated";
    };
  }
  function MemoryTable$update$lambda_0(closure$inp, closure$w, this$MemoryTable) {
    return function (it) {
      var tmp$, tmp$_0;
      try {
        tmp$_0 = closure$w.key;
        switch (GUIHandler$Companion_getInstance().numBase.value) {
          case 'hex':
            tmp$ = new MemoryWord(toLong_0(closure$inp.value, 16), closure$w.value.size);
            break;
          case 'bin':
            tmp$ = new MemoryWord(NumericUtils$Companion_getInstance().binaryToDecimal_61zpoe$(closure$inp.value), closure$w.value.size);
            break;
          default:tmp$ = new MemoryWord(toLong(closure$inp.value), closure$w.value.size);
            break;
        }
        var $receiver = this$MemoryTable.data;
        var value = tmp$;
        $receiver.put_xwzc9p$(tmp$_0, value);
      }
       catch (e) {
        if (Kotlin.isType(e, Exception)) {
          println(e.message);
        }
         else
          throw e;
      }
      return Unit;
    };
  }
  MemoryTable.prototype.update = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8, tmp$_9;
    Logger$Companion_getInstance().debug_l9770i$(Kotlin.getKClassFromExpression(this), MemoryTable$update$lambda(this));
    clear(this.dom);
    tmp$_0 = this.dom;
    tmp$_1 = tmp$_0.innerHTML;
    switch (GUIHandler$Companion_getInstance().numBase.value) {
      case 'hex':
        tmp$ = 'Hex';
        break;
      case 'dec':
        tmp$ = 'Dec';
        break;
      case 'bin':
        tmp$ = 'Bin';
        break;
      default:tmp$ = 'Unknown';
        break;
    }
    tmp$_0.innerHTML = tmp$_1 + ('<tr><td>Addr<\/td><td>' + tmp$ + '<\/td><td>Size<\/td><\/tr>');
    var el = Kotlin.isType(tmp$_2 = this.dom.firstChild, HTMLElement) ? tmp$_2 : throwCCE();
    tmp$_3 = this.data.entries.iterator();
    while (tmp$_3.hasNext()) {
      var w = tmp$_3.next();
      var tr = document.createElement('tr');
      var inp = Kotlin.isType(tmp$_4 = document.createElement('input'), HTMLInputElement) ? tmp$_4 : throwCCE();
      switch (GUIHandler$Companion_getInstance().numBase.value) {
        case 'hex':
          tmp$_5 = w.value.hex;
          break;
        case 'dec':
          tmp$_5 = w.value.decimal.toString();
          break;
        case 'bin':
          tmp$_5 = w.value.binary;
          break;
        default:tmp$_5 = '666';
          break;
      }
      inp.value = tmp$_5;
      inp.addEventListener('change', MemoryTable$update$lambda_0(inp, w, this));
      tmp$_7 = tr.innerHTML;
      switch (toString(w.key)) {
        case 'AC':
          tmp$_6 = replace(this.tooltip, '%text%', 'Accumulator | Temporary register used to store results from logic operations');
          break;
        case 'MQ':
          tmp$_6 = replace(this.tooltip, '%text%', 'Multiplier Quotient | Temporary register used to store results from logic operations');
          break;
        case 'MBR':
          tmp$_6 = replace(this.tooltip, '%text%', 'Memory Buffer Register | Used to temporarily store data read from memory or to be written');
          break;
        case 'IR':
          tmp$_6 = replace(this.tooltip, '%text%', 'Instruction Register | Stores the instruction being executed');
          break;
        case 'PC':
          tmp$_6 = replace(this.tooltip, '%text%', 'Program Counter | Stores the memory address pointing to the next word to be executed');
          break;
        case 'IBR':
          tmp$_6 = replace(this.tooltip, '%text%', 'Instruction Buffer Register | Stores the second instruction from the current word being executed');
          break;
        case 'MAR':
          tmp$_6 = replace(this.tooltip, '%text%', 'Memory Address Register | Stores a memory address that will be read from memory on read or write process');
          break;
        default:tmp$_6 = '%content%';
          break;
      }
      tr.innerHTML = tmp$_7 + ('<td>' + replace(tmp$_6, '%content%', toString(w.key)) + '<\/td>');
      var td = Kotlin.isType(tmp$_8 = document.createElement('td'), HTMLElement) ? tmp$_8 : throwCCE();
      td.appendChild(inp);
      tr.appendChild(td);
      td = Kotlin.isType(tmp$_9 = document.createElement('td'), HTMLElement) ? tmp$_9 : throwCCE();
      td.innerHTML = td.innerHTML + w.value.size.toString();
      tr.appendChild(td);
      el.append(tr);
    }
    eval('$(document).ready(function(){$(\'[data-toggle="tooltip"]\').tooltip(); });');
  };
  MemoryTable.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MemoryTable',
    interfaces: []
  };
  function Logger() {
    Logger$Companion_getInstance();
  }
  function Logger$Companion() {
    Logger$Companion_instance = this;
    this.blacklist = [getKClass(NumericUtils), getKClass(MemoryArray), getKClass(MemoryTable)];
  }
  function Logger$Companion$debug$lambda$lambda(closure$it) {
    return function () {
      return closure$it;
    };
  }
  Logger$Companion.prototype.debug_l9770i$ = function (from, run) {
    if (!contains(this.blacklist, from)) {
      var cache = split(run().toString(), ['\n']);
      if (cache.size > 1) {
        var tmp$;
        tmp$ = cache.iterator();
        while (tmp$.hasNext()) {
          var element = tmp$.next();
          this.debug_l9770i$(from, Logger$Companion$debug$lambda$lambda(element));
        }
      }
       else {
        println('[DEBUG] [' + toString(from.simpleName) + '] ' + run());
      }
    }
  };
  Logger$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Logger$Companion_instance = null;
  function Logger$Companion_getInstance() {
    if (Logger$Companion_instance === null) {
      new Logger$Companion();
    }
    return Logger$Companion_instance;
  }
  Logger.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Logger',
    interfaces: []
  };
  function NumericType(name, ordinal, prefix) {
    Enum.call(this);
    this.prefix = prefix;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function NumericType_initFields() {
    NumericType_initFields = function () {
    };
    NumericType$BINARY_instance = new NumericType('BINARY', 0, '2x');
    NumericType$DECIMAL_instance = new NumericType('DECIMAL', 1, '10x');
    NumericType$HEXADECIMAL_instance = new NumericType('HEXADECIMAL', 2, '0x');
  }
  var NumericType$BINARY_instance;
  function NumericType$BINARY_getInstance() {
    NumericType_initFields();
    return NumericType$BINARY_instance;
  }
  var NumericType$DECIMAL_instance;
  function NumericType$DECIMAL_getInstance() {
    NumericType_initFields();
    return NumericType$DECIMAL_instance;
  }
  var NumericType$HEXADECIMAL_instance;
  function NumericType$HEXADECIMAL_getInstance() {
    NumericType_initFields();
    return NumericType$HEXADECIMAL_instance;
  }
  NumericType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NumericType',
    interfaces: [Enum]
  };
  function NumericType$values() {
    return [NumericType$BINARY_getInstance(), NumericType$DECIMAL_getInstance(), NumericType$HEXADECIMAL_getInstance()];
  }
  NumericType.values = NumericType$values;
  function NumericType$valueOf(name) {
    switch (name) {
      case 'BINARY':
        return NumericType$BINARY_getInstance();
      case 'DECIMAL':
        return NumericType$DECIMAL_getInstance();
      case 'HEXADECIMAL':
        return NumericType$HEXADECIMAL_getInstance();
      default:throwISE('No enum constant cf.nathanpb.webias.utils.NumericType.' + name);
    }
  }
  NumericType.valueOf_61zpoe$ = NumericType$valueOf;
  function NumericUtils() {
    NumericUtils$Companion_getInstance();
  }
  function NumericUtils$Companion() {
    NumericUtils$Companion_instance = this;
  }
  NumericUtils$Companion.prototype.decimalToBinary_s8cxhz$ = function (num) {
    return toString_0(num, 2);
  };
  function NumericUtils$Companion$binaryToHexa$lambda(closure$num, closure$a) {
    return function () {
      return 'Convertin from binary to hexadecimal: ' + closure$num + ' is ' + closure$a;
    };
  }
  NumericUtils$Companion.prototype.binaryToHexa_61zpoe$ = function (num) {
    var a = toString_0(this.binaryToDecimal_61zpoe$(num), 16).toUpperCase();
    Logger$Companion_getInstance().debug_l9770i$(getKClass(NumericUtils), NumericUtils$Companion$binaryToHexa$lambda(num, a));
    return a;
  };
  function NumericUtils$Companion$binaryToDecimal$lambda(closure$num, closure$output) {
    return function () {
      return 'Converting from binary to decimal: ' + closure$num + ' is ' + closure$output.v;
    };
  }
  NumericUtils$Companion.prototype.binaryToDecimal_61zpoe$ = function (num) {
    var output = {v: toLong_0(num, 2)};
    Logger$Companion_getInstance().debug_l9770i$(getKClass(NumericUtils), NumericUtils$Companion$binaryToDecimal$lambda(num, output));
    return output.v;
  };
  function NumericUtils$Companion$getType$lambda(closure$num, closure$type) {
    return function () {
      return 'Finding numeric type: ' + closure$num.v + ' is ' + closure$type;
    };
  }
  NumericUtils$Companion.prototype.getType_za3rmp$ = function (num) {
    var tmp$;
    var num_0 = {v: num.toString()};
    if (startsWith(num_0.v, '2x'))
      tmp$ = NumericType$BINARY_getInstance();
    else if (startsWith(num_0.v, '0x'))
      tmp$ = NumericType$HEXADECIMAL_getInstance();
    else if (startsWith(num_0.v, '10x'))
      tmp$ = NumericType$DECIMAL_getInstance();
    else if (contains_0(num_0.v, 65) || contains_0(num_0.v, 66) || contains_0(num_0.v, 67) || contains_0(num_0.v, 68) || contains_0(num_0.v, 69) || contains_0(num_0.v, 70))
      tmp$ = NumericType$HEXADECIMAL_getInstance();
    else
      tmp$ = NumericType$DECIMAL_getInstance();
    var type = tmp$;
    Logger$Companion_getInstance().debug_l9770i$(getKClass(NumericUtils), NumericUtils$Companion$getType$lambda(num_0, type));
    return type;
  };
  NumericUtils$Companion.prototype.pad_bm4lxs$ = function (str, size) {
    var str_0 = str;
    while (str_0.length < size)
      str_0 = '0' + str_0;
    return str_0;
  };
  NumericUtils$Companion.prototype.prefix_za3rmp$ = function (num) {
    return this.getType_za3rmp$(num).prefix + toString(num);
  };
  NumericUtils$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var NumericUtils$Companion_instance = null;
  function NumericUtils$Companion_getInstance() {
    if (NumericUtils$Companion_instance === null) {
      new NumericUtils$Companion();
    }
    return NumericUtils$Companion_instance;
  }
  NumericUtils.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NumericUtils',
    interfaces: []
  };
  var package$cf = _.cf || (_.cf = {});
  var package$nathanpb = package$cf.nathanpb || (package$cf.nathanpb = {});
  var package$webias = package$nathanpb.webias || (package$nathanpb.webias = {});
  var package$core = package$webias.core || (package$webias.core = {});
  package$core.AssemblyParser = AssemblyParser;
  package$core.CPU = CPU;
  Object.defineProperty(IASCore, 'Companion', {
    get: IASCore$Companion_getInstance
  });
  package$core.IASCore = IASCore;
  package$core.main_kand9s$ = main;
  package$core.InstructionRuntime = InstructionRuntime;
  var package$instructions = package$core.instructions || (package$core.instructions = {});
  package$instructions.Instruction = Instruction;
  package$instructions.LoadMQ = LoadMQ;
  package$instructions.LoadMQMX = LoadMQMX;
  package$instructions.StorMX = StorMX;
  Object.defineProperty(InstructionType, 'DATA_TRANSFER', {
    get: InstructionType$DATA_TRANSFER_getInstance
  });
  Object.defineProperty(InstructionType, 'UNCONDITIONA_BRANCH', {
    get: InstructionType$UNCONDITIONA_BRANCH_getInstance
  });
  Object.defineProperty(InstructionType, 'CONDITIONAL_BRANCH', {
    get: InstructionType$CONDITIONAL_BRANCH_getInstance
  });
  Object.defineProperty(InstructionType, 'ARITHIMETIC', {
    get: InstructionType$ARITHIMETIC_getInstance
  });
  Object.defineProperty(InstructionType, 'ADDRESS_MODIFY', {
    get: InstructionType$ADDRESS_MODIFY_getInstance
  });
  package$core.InstructionType = InstructionType;
  package$core.MemoryArray = MemoryArray;
  package$core.MemoryWord = MemoryWord;
  var package$gui = package$webias.gui || (package$webias.gui = {});
  package$gui.CodingArea = CodingArea;
  Object.defineProperty(GUIHandler, 'Companion', {
    get: GUIHandler$Companion_getInstance
  });
  package$gui.GUIHandler = GUIHandler;
  package$gui.MemoryTable = MemoryTable;
  Object.defineProperty(Logger, 'Companion', {
    get: Logger$Companion_getInstance
  });
  var package$utils = package$webias.utils || (package$webias.utils = {});
  package$utils.Logger = Logger;
  Object.defineProperty(NumericType, 'BINARY', {
    get: NumericType$BINARY_getInstance
  });
  Object.defineProperty(NumericType, 'DECIMAL', {
    get: NumericType$DECIMAL_getInstance
  });
  Object.defineProperty(NumericType, 'HEXADECIMAL', {
    get: NumericType$HEXADECIMAL_getInstance
  });
  package$utils.NumericType = NumericType;
  Object.defineProperty(NumericUtils, 'Companion', {
    get: NumericUtils$Companion_getInstance
  });
  package$utils.NumericUtils = NumericUtils;
  main([]);
  Kotlin.defineModule('WebIAS', _);
  return _;
}(typeof WebIAS === 'undefined' ? {} : WebIAS, kotlin);
