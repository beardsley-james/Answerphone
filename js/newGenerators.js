var opGenerator = function({level = 1, payrate = 500}) {

  /* this function accepts a configuration object, all properties are optional
    config = {
      level = integer,
      payrate = integer, in cents
    } */

  this.name = initialsGenerator();

  this.level = level;

  this.payRate = payRate;

  this.experience = experience[level - 1][Math.floor(Math.rand() * experience.length)];

  this.background = backgrounds[level - 1][Math.floor(Math.rand() * backgrounds.length)];

  this.focus = this.experience.focus + this.background.focus;

  this.personability = this.experience.personability + this.backgrounds.personability;

  this.call = [];
  this.idleTime = 0;
  this.callsCompleted = 0
}
