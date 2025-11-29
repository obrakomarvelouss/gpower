import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { ArrowRight, Sun } from 'lucide-react';

interface ExplorePageProps {
  onNavigate: (page: string, productSlug?: string) => void;
}

export default function ExplorePage({ onNavigate }: ExplorePageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Sun className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Explore Solar Solutions
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Discover our complete range of premium solar products designed to power your life with clean, renewable energy. From residential panels to portable chargers, we have everything you need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                All Solar Products
              </h2>
              <p className="text-gray-600">
                Browse our complete collection of {products.length} solar energy products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => onNavigate('product', product.slug)}
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">
                        {product.name}
                      </h3>
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {product.category.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-3xl font-bold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-md">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    {product.stock < 10 && product.stock > 0 && (
                      <p className="text-orange-600 text-xs font-semibold mt-3">
                        Only {product.stock} left in stock!
                      </p>
                    )}
                    {product.stock === 0 && (
                      <p className="text-red-600 text-xs font-semibold mt-3">
                        Out of stock
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && !loading && (
              <div className="text-center py-20">
                <Sun className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Check back soon for our solar products!
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-green-100">Years Warranty</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-green-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
