import React from "react";

var time = new Date();
var year = time.getFullYear();

function Footer() {
  return (
    <footer>
      <p>Copyright {year}</p>
    </footer>
  );
}

export default Footer;
