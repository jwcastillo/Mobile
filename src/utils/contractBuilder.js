class ContractBuilder {
  constructor() {
    this.OPCODES = {
      SUM: '7FFFFFFE',
      MUL: '7FFFFFFC',
      CMP: '7FFFFFFA',
      NEG: '7FFFFFFF'
    };
    this.program = '';
  }

  programSum(v) {
    this.program += (`00000000${Math.abs(v).toString(16)}`).slice(-8);
    if (v < 0) {
      this.program += this.OPCODES.NEG;
    }
    this.program += this.OPCODES.SUM;
    return this;
  }
  
  programMul(v) {
    this.program += (`00000000${Math.abs(v).toString(16)}`).slice(-8);
    if (v < 0) {
      this.program += this.OPCODES.NEG;
    }
    this.program += this.OPCODES.MUL;
    return this;
  }

  programCmp(l, r) {
    this.program += (`00000000${Math.abs(l).toString(16)}`).slice(-8);
    if (l < 0) {
      this.program += this.OPCODES.NEG;
    }
    this.program += (`00000000${Math.abs(r).toString(16)}`).slice(-8);
    if (r < 0) {
      this.program += this.OPCODES.NEG;
    }
    this.program += this.OPCODES.CMP;
    return this;
  } 
}

export { ContractBuilder }; 
