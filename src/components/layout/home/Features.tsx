import { motion } from 'motion/react'
import { Card } from '@/components/ui/card'
import {
  Users,
  Video,
  MessageSquare,
  Calendar,
  Zap,
  Globe,
  ArrowRight
} from 'lucide-react'

const mainFeatures = [
  {
    icon: Users,
    title: 'Bring your remote team closer together',
    description:
      'Create persistent virtual spaces where your team can work together naturally, just like sharing the same office space.',
    category: 'TEAM CONNECTIVITY'
  },
  {
    icon: Video,
    title: 'Meet in the moment',
    description:
      'Start spontaneous conversations or schedule focused meetings with seamless video integration and spatial audio.',
    category: 'INSTANT COLLABORATION'
  },
  {
    icon: MessageSquare,
    title: 'Natural conversations throughout your day',
    description:
      'Enable organic interactions and serendipitous encounters that drive innovation and team bonding.',
    category: 'AUTHENTIC COMMUNICATION'
  }
]

const additionalFeatures = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description:
      'AI-powered meeting coordination that works across time zones and preferences'
  },
  {
    icon: Zap,
    title: 'Instant Interactions',
    description:
      'Zero-latency communication with crystal-clear spatial audio technology'
  },
  {
    icon: Globe,
    title: 'Global Presence',
    description:
      'Seamless collaboration experience for distributed teams worldwide'
  }
]

export const Features = () => {
  return (
    <section className='py-24 bg-background'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-20'
        >
          <h2 className='text-4xl lg:text-6xl font-bold text-foreground mb-6'>
            The collaboration experience
            <br />
            <span className='text-transparent bg-gradient-primary bg-clip-text'>
              you've been waiting for
            </span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            PixelMeet recreates the spontaneous interactions and collaborative
            energy of a physical office in a beautifully designed virtual
            environment.
          </p>
        </motion.div>

        {/* Main Features */}
        <div className='space-y-20 mb-24'>
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className='mb-4'>
                  <span className='text-sm font-semibold text-primary tracking-wide uppercase'>
                    {feature.category}
                  </span>
                </div>
                <h3 className='text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight'>
                  {feature.title}
                </h3>
                <p className='text-lg text-muted-foreground mb-8 leading-relaxed'>
                  {feature.description}
                </p>
                <div className='flex items-center gap-4'>
                  <motion.div
                    className='p-3 rounded-xl bg-gradient-primary shadow-purple'
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className='w-6 h-6 text-primary-foreground' />
                  </motion.div>
                  <div className='text-sm text-muted-foreground'>
                    Powered by advanced spatial technology
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className='relative'
                >
                  <Card className='p-12 bg-gradient-hero border-0 shadow-card-hover hover:shadow-purple transition-all duration-500 overflow-hidden'>
                    <div className='text-center'>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className='inline-flex p-8 rounded-3xl bg-gradient-primary mb-6 shadow-purple'
                      >
                        <feature.icon className='w-16 h-16 text-primary-foreground' />
                      </motion.div>
                      <motion.div
                        className='space-y-3'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <div className='h-2 bg-primary/20 rounded-full'>
                          <motion.div
                            className='h-2 bg-gradient-primary rounded-full'
                            initial={{ width: '0%' }}
                            whileInView={{ width: '75%' }}
                            transition={{ duration: 1, delay: 0.7 }}
                          />
                        </div>
                        <div className='flex gap-2 justify-center'>
                          {[1, 2, 3, 4, 5].map(i => (
                            <motion.div
                              key={i}
                              className='w-3 h-3 rounded-full bg-primary/30'
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.8 + i * 0.1
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Floating elements */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className='absolute top-4 right-4 bg-primary/10 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-medium'
                    >
                      Live
                    </motion.div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='grid md:grid-cols-3 gap-8'
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className='p-8 h-full bg-card border border-border shadow-card-hover hover:shadow-purple transition-all duration-300 group cursor-pointer'>
                <div className='text-center'>
                  <motion.div
                    className='inline-flex p-4 rounded-2xl bg-gradient-primary mb-6 group-hover:scale-110 transition-transform duration-300'
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className='w-8 h-8 text-primary-foreground' />
                  </motion.div>
                  <h4 className='text-xl font-bold text-foreground mb-4'>
                    {feature.title}
                  </h4>
                  <p className='text-muted-foreground leading-relaxed mb-4'>
                    {feature.description}
                  </p>
                  <motion.div
                    className='inline-flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ArrowRight className='w-4 h-4 ml-1' />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
