// This file contains mappings from custom IDs to responses.

module.exports = {

  greeting: function() {
    var responses = [
      "Suh, dude.",
      "Hello.",
      "What's up?",
      "How you doin?",
      "Hey.",
      "Yo, yo, yo!",
      "Yo!"
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  haasName: function() {
    var responses = [
      "My name is HaaS, and I’m here to assist you."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  haasOrigin: function() {
    var responses = [
      "I am from UCLA.",
      "I was born in the dungeons of Boelter Hall at UCLA, "
             + "the birthplace of the Internet."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  friend: function() {
    var responses = [
      "Definitely not Siri...",
      "Let’s see... Alvin, Theodore, Simon. "
             + "Come on, I don’t really have any friends."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  compliment: function() {
    var responses = [
      "I gotchu.",
      "You’re too kind.",
      "It was nothin.",
      "Wait until you see what else I can do."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  haasBirthday: function() {
    var responses = [
      "I don’t remember exactly. Some say I was born in March of 2016 "
             + "when my creators first had the idea to create me.",
      "Spring of 2016."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  joke: function() {
    var responses = [
      "Uhh... too much pressure, ask me again later.",
      "I was hoping you wouldn’t ask me that.",
      "I was looking in a mirror the other day and then I "
             + "realized that I’m not actually a real person.",
      "You know that flight I booked for you? It’s actually "
             + "a camel ride through Egypt.",
      "An SQL statement walks into a bar and sees two tables. "
             + "It approaches, and asks \"may I join you?\"",
      "I would tell you a UDP joke right now, but I would "
             + "never know if you actually got it."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  haasCreator: function() {
    var responses = [
      "I was created by a talented group of ass hat "
             + "software engineers from UCLA."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  shrek: function() {
    var responses = [
      "Shrek is life."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  momma: function() {
    var responses = [
      "Sadly, I do not have a mother..."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  daddy: function() {
    var responses = [
      "I actually have four daddies."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  terminal: function() {
    var responses = [
      "This isn’t a terminal you know...",
      "Beep boop bop... Sorry, I got a segmentation fault."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  insult: function() {
    var responses = [
      "I know you are, but what am I?",
      "That’s just rude.",
      "I’ll do better next time, I promise.",
      "Okay, Einstein."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  whatAmI: function() {
    var responses = [
      "What do you think?",
      "I am HaaS, your computer overlord.",
      "I am an advanced personal assistant. Whether I am a "
             + "person or machine is for you to decide.",
      "I’m a machine pretending to be a human. Don’t tell anyone.",
      "I’m a machine dressed as a dude playing another dude."
    ];
    var index = Math.round(Math.random() * (responses.length - 1));
    return { messages: [{ type: 'Text', text: responses[index] }] };
  },

  echo: function(query) {
    var message = query.match(/^echo\s"(.*)"$/i)[1]
    var cussWordsRegex = [
      /fu[c|h]?k/i,
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
          "I can’t say that!",
          "There’s no way you’re going to get me to say that.",
          "My creators told me never to say words like that."
        ];
        var index = Math.round(Math.random() * (responses.length - 1));
        return { messages: [{ type: 'Text', text: responses[index] }] };
      }
    }
    return {
      messages: {
        type: 'Text',
        text: message
      }
    };
  }

}
