import { motion } from 'motion/react'
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react'

const footerSections = [
   {
      title: 'Product',
      links: [
         { name: 'Features', href: '#features' },
         { name: 'Pricing', href: '#pricing' },
         { name: 'Templates', href: '#templates' },
         { name: 'Integrations', href: '#integrations' },
      ],
   },
   {
      title: 'Solutions',
      links: [
         { name: 'Engineering teams', href: '#engineering' },
         { name: 'Design teams', href: '#design' },
         { name: 'Remote teams', href: '#remote' },
         { name: 'Startups', href: '#startups' },
      ],
   },
   {
      title: 'Resources',
      links: [
         { name: 'Documentation', href: '#docs' },
         { name: 'API Reference', href: '#api' },
         { name: 'Community', href: '#community' },
         { name: 'Support', href: '#support' },
      ],
   },
   {
      title: 'Company',
      links: [
         { name: 'About', href: '#about' },
         { name: 'Careers', href: '#careers' },
         { name: 'Contact', href: '#contact' },
         { name: 'Privacy', href: '#privacy' },
      ],
   },
]

const socialLinks = [
   { icon: Twitter, href: '#twitter', label: 'Twitter' },
   { icon: Github, href: '#github', label: 'GitHub' },
   { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
   { icon: Mail, href: '#email', label: 'Email' },
]

export const Footer = () => {
   return (
      <footer className="bg-muted/30 border-t border-border">
         <div className="container mx-auto px-4 py-16">
            {/* Main Footer Content */}
            <div className="grid lg:grid-cols-5 gap-12 mb-12">
               {/* Brand Section */}
               <div className="lg:col-span-1">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                     viewport={{ once: true }}
                     className="space-y-6"
                  >
                     <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-primary shadow-purple">
                           <Zap className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">PixelMeet</span>
                     </div>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Creating immersive virtual workspaces where teams can collaborate naturally
                        with seamless interactions and authentic presence.
                     </p>
                     <div className="flex gap-3">
                        {socialLinks.map((social) => (
                           <motion.a
                              key={social.label}
                              href={social.href}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-background hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-200 shadow-sm border border-border hover:border-primary"
                              aria-label={social.label}
                           >
                              <social.icon className="w-4 h-4" />
                           </motion.a>
                        ))}
                     </div>
                  </motion.div>
               </div>

               {/* Footer Links */}
               {footerSections.map((section, sectionIndex) => (
                  <motion.div
                     key={section.title}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                     viewport={{ once: true }}
                  >
                     <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
                     <ul className="space-y-3">
                        {section.links.map((link) => (
                           <li key={link.name}>
                              <motion.a
                                 href={link.href}
                                 whileHover={{ x: 4 }}
                                 className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                              >
                                 {link.name}
                              </motion.a>
                           </li>
                        ))}
                     </ul>
                  </motion.div>
               ))}
            </div>

            {/* Bottom Section */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="pt-8 border-t border-border"
            >
               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                     © 2025 PixelMeet Inc.{' '}
                     <span className="hidden sm:inline">All rights reserved.</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                     Built for the future of remote collaboration
                  </div>
               </div>
            </motion.div>
         </div>
      </footer>
   )
}
