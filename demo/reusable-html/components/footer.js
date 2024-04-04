class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="footer">
            <div class="footercontent">
                <div class="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13047.579516415022!2d-98.45103496844938!3d35.159242328004794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87adb3a7c2178e15%3A0x8ff5e443e47a558d!2sNowhere%2C+Ok!5e0!3m2!1sen!2s!4v1532408075537" width="500" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>
                <div class="footertext">
                    <h2>Contact us:</h2><br/>
                    <p><i class="fa fa-location-arrow"></i> Nowhere, OK 73038-9696</p>
                    <p>&#9743; +1-405-555-6969</p>
                    <p><i class="far fa-clock"></i> 6:00 AM - 10:00 PM</p>
                    <p><i class="far fa-envelope"></i> notarealemail@gmail.com</p><br/>
                    <p>Copyright &#169; 2018 | Nippon Yaki</p>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    `;
  }
}

customElements.define("footer-component", Footer);
