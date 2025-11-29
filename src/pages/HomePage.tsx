import { useEffect, useState } from 'react';
import { ArrowRight, Leaf, Shield, Zap, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

interface HomePageProps {
  onNavigate: (page: string, productSlug?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(4);

    if (!error && data) {
      setFeaturedProducts(data);
    }
  };

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Power Your Future with
            <span className="block text-green-400 mt-2">Clean Energy</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Experience the freedom of sustainable power solutions. Join thousands making the switch to solar energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('products')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Explore Solar</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Eco-Friendly',
                description: 'Reduce your carbon footprint with clean energy',
              },
              {
                icon: TrendingUp,
                title: 'Save Money',
                description: 'Cut electricity bills by up to 80%',
              },
              {
                icon: Shield,
                title: '25-Year Warranty',
                description: 'Industry-leading protection on all products',
              },
              {
                icon: Zap,
                title: 'Reliable Power',
                description: '24/7 energy independence and backup',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-green-50 transition-colors duration-200"
              >
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose GPower?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just selling solar panels—we're building a sustainable future, one home at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/371900/pexels-photo-371900.jpeg"
                alt="Solar Installation"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Premium Quality Products
                  </h3>
                  <p className="text-gray-600">
                    Top-tier solar panels and energy systems from trusted manufacturers with proven track records.
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Expert Installation
                  </h3>
                  <p className="text-gray-600">
                    Certified technicians ensure optimal placement and maximum energy efficiency for your system.
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Lifetime Support
                  </h3>
                  <p className="text-gray-600">
                    Dedicated customer service and maintenance support for the entire life of your solar investment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular solar energy solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => onNavigate('product', product.slug)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1">
                      <span>View</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('products')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Go Solar?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of satisfied customers who've made the switch to clean, renewable energy.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-200 shadow-xl"
          >
            Get a Free Quote
          </button>
        </div>
      </section>
    </div>
  );
}
