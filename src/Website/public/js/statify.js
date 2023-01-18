const stat_command_array = [
  {
    command: '/apex-legends `username`: "maujeh" `platform`: "xbox"',
    image: '/Images/Games/apex.png'
  },
  {
    command: '/brawl-stars `player-tag`: "#GROJGQOP"',
    image: '/Images/Games/brawl-stars.png'
  },
  {
    command: '/call-of-duty warzone `player-tag`: "D5GY#2101" `platform`: "battle net"',
    image: '/Images/Games/cod-wz.png'
  },
  {
    command: '/clash-of-clans `player-tag`: "#8J9RQGLUC"',
    image: '/Images/Games/coc.png'
  },
  {
    command: '/clash-royale `player-tag`: "#GG829JGY"',
    image: '/Images/Games/ClashRoyale.png'
  },
  {
    command: '/csgo `steam-id`: "76561198210353327"',
    image: '/Images/Games/csgo.png'
  },
  {
    command: '/division-2 `username`: "Solivictus" `platform`: "pc"',
    image: '/Images/Games/division2.png'
  },
  {
    command: '/fortnite `username`: "Fluxϟ" `platform`: "epic"',
    image: '/Images/Games/fortnite.png'
  },
  {
    command: '/minecraft `server`: "MC.HYPIXEL.NET"',
    image: '/Images/Games/minecraft.png'
  },
  {
    command: '/rainbow-six-siege `username`: "CSGO" platform:"xbox"',
    image: '/Images/Games/r6.png'
  },
  {
    command: '/splitgate `username`: "76561198210353327" `platform`: "pc"',
    image: '/Images/Games/splitgate.png'
  }
]

window.addEventListener('DOMContentLoaded', event => {
  const navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink');
    } else {
      navbarCollapsible.classList.add('navbar-shrink');
    }

  };
  navbarShrink();
  document.addEventListener('scroll', navbarShrink);

  window.onload = () => {
    let disp = "";
    for (let i = 0; i < stat_command_array.length; i++) {
      disp += "<strong><img src="+ stat_command_array[i].image +" width='30' height='30'> "+ stat_command_array[i].command +"</strong><hr>";
      document.getElementById('commands-array').innerHTML = disp;
    }
  }
});