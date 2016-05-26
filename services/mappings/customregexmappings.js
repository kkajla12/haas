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
    /^where\sdid\syou\scome\sfrom/i,
    /^where\swere\syou\screated/i,
    /^where\swere\syou\smade/i
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
    /^you\sare\sfunny/i,
    /^youre\s(so+\s)?smart/i,
    /^you\sare\s(so+\s)?smart/i,
    /^youre\s(such\s)?a\sgenius/i,
    /^you\sare\s(such\s)?a\sgenius/i
  ],

  haasBirthday: [
    /^when\sis\syour\sbirthday/i,
    /^whens\syour\sbirthday/i,
    /^when\swere\syou\sborn/i,
    /^when\swere\syou\screated/i,
    /^when\swere\syou\smade/i
  ],

  joke: [
    /^tell\sme\sa\s(good\s)?(funny\s)?joke/i,
    /^whats\sa\s(good\s)?(funny\s)?joke/i,
    /^what\sis\sa\s(good\s)?(funny\s)?joke/i,
    /^give\sme\sa\s(good\s)?(funny\s)?joke/i,
    /^tell\sme\sanother\s(good\s)?(funny\s)?joke/i,
    /^whats\sanother\s(good\s)?(funny\s)?joke/i,
    /^what\sis\sanother\s(good\s)?(funny\s)?joke/i,
    /^give\sme\sanother\s(good\s)?(funny\s)?joke/i
  ],

  haasCreator: [
    /^who\screated\syou/i,
    /^who\smade\syou/i,
    /^who\sbuilt\syou/i
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
    /^exit$/i,
    /^mv/i,
    /^cp/i,
    /^ls/i,
    /^mkdir/i,
    /^grep/i,
    /^chmod/i,
    /^ps/i
  ],

  insult: [
    /^youre\sstupid/i,
    /^you\sare\sstupid/i,
    /^youre\san\sidiot/i,
    /^you\sare\san\sidiot/i,
    /^youre\sdumb/i,
    /^you\sare\sdumb/i,
    /^you\ssuck/i,
    /^fuck\syou/i,
    /^you\sbastard/i
  ],

  whatAmI: [
    /^what\sare\syou/i,
    /^are\syou\sa\scomputer/i,
    /^are\syou\sa\smachine/i,
    /^are\syou\sa\srobot/i,
    /^are\syou\s(a\s)?human/i,
    /^are\syou\sa\sperson/i,
  ],

  echo: [
    /^echo\s".*"$/i
  ]

}
