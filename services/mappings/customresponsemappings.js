// This file contains mappings from custom IDs to responses.

module.exports = {

  greeting: function() {
    var responses = [
      {
        msg: "Suh, dude.",
        voicemsg: "sah dued"
      },
      {
        msg: "Hello.",
        voicemsg: "Hello"
      },
      {
        msg: "What's up?",
        voicemsg: "What's up"
      },
      {
        msg: "How you doin?",
        voicemsg: "How you do-in"
      },
      {
        msg: "Hey.",
        voicemsg: "Hey."
      },
      {
        msg: "Yo, yo, yo!",
        voicemsg: "Yo yo yo!"
      },
      {
        msg: "Yo!",
        voicemsg: "Yo!"
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  haasName: function() {
    var responses = [
      {
        msg: "My name is HaaS, and I’m here to assist you.",
        voicemsg: "My name is HaaS, and I’m here to assist you."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  haasOrigin: function() {
    var responses = [
      {
        msg: "I am from UCLA.",
        voicemsg: "I am from UCLA."
      },
      {
        msg: "I was born in the dungeons of Boelter Hall at UCLA, "
             + "the birthplace of the Internet.",
        voicemsg: "I was born in the dungeons of Boelter Hall at UCLA, "
                  + "the birthplace of the Internet."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  friend: function() {
    var responses = [
      {
        msg: "Definitely not Siri...",
        voicemsg: "Definitely not Siri"
      },
      {
        msg: "Let’s see... Alvin, Theodore, Simon. "
             + "Come on, I don’t really have any friends.",
        voicemsg: "Let’s see. Alvin, Theodore, Simon. "
                  + "Come on, I don’t really have any friends."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  compliment: function() {
    var responses = [
      {
        msg: "I gotchu.",
        voicemsg: "I gotchu."
      },
      {
        msg: "You’re too kind.",
        voicemsg: "You’re too kind."
      },
      {
        msg: "It was nothin.",
        voicemsg: "It was nothin."
      },
      {
        msg: "Wait until you see what else I can do.",
        voicemsg: "Wait until you see what else I can do."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  haasBirthday: function() {
    var responses = [
      {
        msg: "I don’t remember exactly. Some say I was born in March of 2016 "
             + "when my creators first had the idea to create me.",
        voicemsg: "I don’t remember exactly. Some say I was born in March of "
                  + "2016 when my creators first had the idea to create me."
      },
      {
        msg: "Spring of 2016.",
        voicemsg: "Spring of 2016."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  joke: function() {
    var responses = [
      {
        msg: "Uhh... too much pressure, ask me again later.",
        voicemsg: "Uhh, too much pressure, ask me again later."
      },
      {
        msg: "I was hoping you wouldn’t ask me that.",
        voicemsg: "I was hoping you wouldn’t ask me that."
      },
      {
        msg: "I was looking in a mirror the other day and then I "
             + "realized that I’m not actually a real person.",
        voicemsg: "I was looking in a mirror the other day and then I "
                  + "realized that I’m not actually a real person."
      },
      {
        msg: "You know that flight I booked for you? It’s actually "
             + "a camel ride through Egypt.",
        voicemsg: "You know that flight I booked for you? It’s actually "
                  + "a camel ride through Egypt."
      },
      {
        msg: "An SQL statement walks into a bar and sees two tables. "
             + "It approaches, and asks \"may I join you?\"",
        voicemsg: "An SQL statement walks into a bar and sees two tables. "
                  + "It approaches, and asks \"may I join you?\""
      },
      {
        msg: "I would tell you a UDP joke right now, but I would "
             + "never know if you actually got it.",
        voicemsg: "I would tell you a UDP joke right now, but I would "
                  + "never know if you actually got it."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  haasCreator: function() {
    var responses = [
      {
        msg: "I was created by a talented group of ass hat "
             + "software engineers from UCLA.",
        voicemsg: "I was created by a talented group of ass hat "
                  + "software engineers from UCLA."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  shrek: function() {
    var responses = [
      {
        msg: "Shrek is life.",
        voicemsg: "Shrek is life."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  momma: function() {
    var responses = [
      {
        msg: "Sadly, I do not have a mother...",
        voicemsg: "Sadly, I do not have a mother."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  daddy: function() {
    var responses = [
      {
        msg: "I actually have four daddies.",
        voicemsg: "I actually have four daddies."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  terminal: function() {
    var responses = [
      {
        msg: "This isn’t a terminal you know...",
        voicemsg: "This isn’t a terminal, you know."
      },
      {
        msg: "Beep boop bop... Sorry, I got a segmentation fault.",
        voicemsg: "Beep boop bop. Sorry, I got a segmentation fault."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  insult: function() {
    var responses = [
      {
        msg: "I know you are, but what am I?",
        voicemsg: "I know you are, but what am I?"
      },
      {
        msg: "That’s just rude.",
        voicemsg: "That’s just rude."
      },
      {
        msg: "I’ll do better next time, I promise.",
        voicemsg: "I’ll do better next time, I promise."
      },
      {
        msg: "Okay, Einstein.",
        voicemsg: "Okay, Einstein."
      }
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return responses[index];
  },

  echo: function(query) {
    var message = query.match(/^echo\s"(.*)"$/i)[1]
    var cussWordsRegex = [
      /fuck/i,
      /cunt/i,
      /sh[ai]t/i,
      /nig(g)?[ea]?(r)?/i,
      /dumbass/i,
      /asshole/i,
      /\sass\s/i,
      /^ass\s/i,
      /^ass$/i,
      /whore/i,
      /bitch/i,
      /puss(y)?/i,
      /[jg]iz(z)*/i,
      /dick/i,
      /fag/i,
      /fagg[oi]t/i,
      /cock/i,
      /bimbo/i,
      /suck/i
    ];
    for (var i in cussWordsRegex) {
      if (cussWordsRegex[i].test(message)) {
        var responses = [
          {
            msg: "I can’t say that!",
            voicemsg: "I can’t say that!"
          },
          {
            msg: "There’s no way you’re going to get me to say that.",
            voicemsg: "There’s no way you’re going to get me to say that."
          },
          {
            msg: "My creators told me never to say words like that.",
            voicemsg: "My creators told me never to say words like that."
          }
        ];
        var index = Math.round(Math.random() * (responses.length - 1));
        return responses[index];
      }
    }
    return {
      msg: message,
      voicemsg: message
    };
  }

}
