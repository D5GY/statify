(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  }

  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true);

  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true);

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });
})();

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

window.onload = () => {
  let disp = "";
  for (let i = 0; i < stat_command_array.length; i++) {
    disp += "<strong><img src="+ stat_command_array[i].image +" width='30' height='30'> "+ stat_command_array[i].command +"</strong><hr>";
    document.getElementById('commands-array').innerHTML = disp;
  }
}