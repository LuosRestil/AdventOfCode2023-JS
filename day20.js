const fs = require('fs');
const crypto = require('crypto');
const input = fs.readFileSync('inputs/day20.txt', {encoding: 'utf-8'});
const lines = input.split('\n').map(line => {
  const pieces = line.split(' -> ');
  const obj = pieces[0];
  const connections = pieces[1].split(', ');
  return {obj, connections};
});

const pulseCount = {
  0: 0,
  1: 0,
};

let pulseQueue = [];

class Broadcaster {
  constructor(name) {
    this.observers = [];
    this.id = crypto.randomUUID();
    this.name = name;
  }

  register(observer) {
    this.observers.push(observer);
  }

  update(pulse) {
    for (let observer of this.observers) {
      pulseQueue.push({source: this, destination: observer, value: pulse});
    }
  }
}

class FlipFlop extends Broadcaster {
  constructor(name) {
    super(name);
    this.state = false;
  }

  update(pulse) {
    if (pulse === 0) {
      this.state = !this.state;
      super.update(this.state ? 1 : 0);
    }
  }
}

class Conjunction extends Broadcaster {
  constructor(name) {
    super(name);
    this.inputs = {};
  }

  register(observer) {
    super.register(observer);
  }

  update(pulse, source) {
    this.inputs[source.id] = pulse;
    super.update(Object.values(this.inputs).every(val => val) ? 0 : 1);
  }

  registerInput(id) {
    this.inputs[id] = 0;
  }
}

const modules = {};
// sample only
// modules['output'] = new Broadcaster('output');

for (let line of lines) {
  let { obj } = line;
  if (obj[0] === '%') {
    modules[obj.slice(1)] = new FlipFlop(obj.slice(1));
  } else if (obj[0] === '&') {
    modules[obj.slice(1)] = new Conjunction(obj.slice(1));
  } else {
    modules[obj] = new Broadcaster(obj);
  }
}
for (let line of lines) {
  let { obj, connections } = line;
  let name = obj;
  if (obj[0] === '%' || obj[0] === '&') {
    name = obj.slice(1);
  }
  for (let connection of connections) {
    if (!modules[connection]) {
      modules[connection] = new Broadcaster(connection);
    }
    modules[name].register(modules[connection]);
    modules[connection]?.registerInput && modules[connection].registerInput(modules[name].id);
  }
}

for (let i = 0; i < 1000; i++) {
  pulseQueue = [];
  pulseQueue.push({source: null, destination: modules['broadcaster'], value: 0});
  while (pulseQueue.length) {
    const pulse = pulseQueue.shift();
    pulseCount[pulse.value]++;
    pulse.destination.update(pulse.value, pulse.source);
    
  }
}
console.log('Answer 1: ' + Object.values(pulseCount).reduce((acc, curr) => acc * curr, 1));