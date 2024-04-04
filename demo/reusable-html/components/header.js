class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="menu">
            <div class="menucontent">
                <div class="logo">
                    <a href="index.html">
                    <img src="img/logo.png" alt="Nippon Yaki"
                    title ="Nippon Yaki"/>
                    </a>
                </div>
                <div class="menus">
                    <ul class="menulist">
                        <li class="menulist foodmenu"><a href="menu.html"><i class="fas fa-bars"></i> Menu</a>
                            <ul class="foodcontent">
                                <li><a href="menu.html#salty">Salty foods</a></li>
                                <li><a href="menu.html#sweet">Sweet foods</a></li>
                                <li><a href="menu.html#beverage">Beverages</a></li>
                            </ul>
                        </li>
                        <li class="menulist"><a href="index.html#specialcontent">Promotions</a></li>
                        <li class="menulist"><a href="about.html">About Us</a></li>
                        <li class="menulist"><a href="new.html">What's new?</a></li>
                    </ul>
                </div>
                <div class="clear"></div>
            </div>	
        </div>
      `;
  }
}

customElements.define("header-component", Header);
