import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { ArrowRight, Filter } from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (page: string, productSlug?: string) => void;
}

export default function ProductsPage({ onNavigate }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
      setFilteredProducts(data);
    }
    setLoading(false);
  };

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'solar-panels', label: 'Solar Panels' },
    { id: 'solar-lighting', label: 'Solar Lighting' },
    { id: 'solar-generators', label: 'Solar Generators' },
    { id: 'solar-accessories', label: 'Accessories' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">
            Premium solar energy solutions for every need
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => onNavigate('product', product.slug)}
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1 text-sm">
                      <span>Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {product.stock > 0 && product.stock < 10 && (
                    <div className="mt-3 text-xs text-orange-600 font-semibold">
                      Only {product.stock} left!
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="mt-3 text-xs text-red-600 font-semibold">
                      Out of Stock
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try selecting a different category
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
