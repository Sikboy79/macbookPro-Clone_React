import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer>
      <div className='info'>
        <p>More ways to shop: Find an Apple store or other retailer near you. Or call 800 123-45678. </p>
        <img src='/logo.svg' alt = 'logo'/>
      </div>

      <hr />

      <div className='links'>
        <p>Copyright &copy; 2024 Apple Inc. All rights reserved</p>

        <ul>
          {footerLinks.map(({label, link}) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
