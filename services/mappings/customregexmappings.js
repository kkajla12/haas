// This file contains mappings from custom IDs to lists of
// regular expressions associated with valid queries.

module.exports = {

  greeting: [
    /^hi(\s.*)?$/i,
    /^hello(\s.*)?$/i,
    /^hey(\s.*)?$/i,
    /^whats\sup(\s.*)?$/i,
    /^suh(\s.*)?$/i,
    /^yo(\s.*)?$/i
  ],

  haasName: [
    /^who\sare\syou/i,
    /^what\sis\syour\sname/i,
    /^whats\syour\sname/i
  ],

  haasOrigin: [
    /^where\sare\syou\sfrom/i,
    /^where\swere\syou\sborn/i,
    /^where\sdid\syou\scome\sfrom/i
  ],

  friend: [
    /^who\sis\syour\sbest\sfriend/i,
    /^whos\syour\sbest\sfriend/i
  ],

  compliment: [
    /^thank\syou/i,
    /^thanks/i,
    /^you\srock/i,
    /^youre\sawesome/i,
    /^you\sare\sawesome/i,
    /^youre\scool/i,
    /^you\sare\scool/i,
    /^youre\sfunny/i,
    /^you\sare\sfunny/i
  ],

  haasBirthday: [
    /^when\sis\syour\sbirthday/i,
    /^whens\syour\sbirthday/i,
    /^when\swere\syou\sborn/i
  ],

  joke: [
    /^tell\sme\sa\s(good\s)?(funny\s)?joke/i,
    /^whats\sa\s(good\s)?(funny\s)?joke/i,
    /^what\sis\sa\s(good\s)?(funny\s)?joke/i,
    /^give\sme\sa\s(good\s)?(funny\s)?joke/i
  ],

  haasCreator: [
    /^who\screated\syou/i,
    /^who\smade\syou/i
  ],

  shrek: [
    /^who\sis\sshrek/i
  ],

  momma: [
    /^how\sold\sis\syo(ur)?\sm[oa]m(m)?a/i,
    /^how\sold\sis\syo(ur)?\smother/i
  ],

  daddy: [
    /^whos\syo(ur)?\sdaddy/i,
    /^who\sis\syo(ur)?\sdaddy/i,
    /^whos\syo(ur)?\spappa/i,
    /^who\sis\syo(ur)?\spappa/i
  ],

  terminal: [
    /^cd/i,
    /^rm/i,
    /^exit$/i
  ],

  insult: [
    /^youre\sstupid/i,
    /^you\sare\sstupid/i,
    /^youre\san\sidiot/i,
    /^you\sare\san\sidiot/i,
    /^youre\sdumb/i,
    /^you\sare\sdumb/i,
    /^you\ssuck/i
  ],

  echo: [
    /^echo\s".*"$/i
  ]

}
