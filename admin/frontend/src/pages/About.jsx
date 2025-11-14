import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '10,000+', label: 'Verified Providers', icon: Users },
    { number: '50,000+', label: 'Services Completed', icon: Target },
    { number: '50+', label: 'Cities Covered', icon: Award },
    { number: '4.8/5', label: 'Customer Rating', icon: Heart }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Kaam Mitra
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing how India finds and hires trusted service providers, 
              connecting communities through reliable, quality services.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To bridge the gap between service seekers and skilled professionals across India, 
                ensuring quality, trust, and convenience in every interaction.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe everyone deserves access to reliable services, whether you're in 
                a bustling metro or a quiet rural town. Our platform empowers both customers 
                and service providers to thrive together.
              </p>
            </div>
            <div className="bg-gradient-secondary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                To become India's most trusted service marketplace, where quality meets 
                convenience, and where every service provider can build a successful career 
                while helping communities thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;